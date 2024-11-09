import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const formData = await req.formData()
  const studentName = formData.get('studentName')
  const files = formData.getAll('files')

  console.log('studentName:', studentName)
  console.log('files:', files)

  // Ruta de la carpeta donde se almacenarán los proyectos
  const projectDir = path.join(
    process.cwd(),
    'public',
    'proyectos',
    studentName
  )

  // Crear la carpeta si no existe
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true }) // { recursive: true } para crear carpetas intermedias si no existen
  }

  // Guardar los archivos en la carpeta del estudiante
  for (let file of files) {
    const filePath = path.join(projectDir, file.name)

    // Leer el ReadableStream y convertirlo a un Buffer
    const buffer = await streamToBuffer(file.stream())

    // Escribir el archivo en el sistema de archivos
    fs.writeFileSync(filePath, buffer)
  }

  // Buscar el archivo .html
  const htmlFileName = files.find((file) => file.name.endsWith('.html'))
  const projectPath = `http://192.168.100.120:3000/proyectos/${studentName}/${htmlFileName.name}`

  // Leer el archivo JSON que contiene los proyectos, si existe
  const proyectosFilePath = path.join(process.cwd(), 'public', 'proyectos.json')
  let proyectos = []
  if (fs.existsSync(proyectosFilePath)) {
    const proyectosData = fs.readFileSync(proyectosFilePath)
    proyectos = JSON.parse(proyectosData)
  }

  // Agregar el nuevo proyecto y si ya existe reemplazar
  const existingProjectIndex = proyectos.findIndex(
    (project) => project.studentName === studentName
  )
  if (existingProjectIndex !== -1) {
    proyectos[existingProjectIndex] = {
      studentName,
      path: projectPath,
    }
  } else {
    proyectos.push({
      studentName,
      path: projectPath,
    })
  }

  // Escribir de vuelta el archivo JSON con la lista de proyectos
  fs.writeFileSync(proyectosFilePath, JSON.stringify(proyectos, null, 2))

  return NextResponse.json({ studentName, path: projectPath })
}

// Función para convertir un ReadableStream en un Buffer
async function streamToBuffer(stream) {
  const chunks = []
  for await (let chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}
