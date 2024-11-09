'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
  const [studentName, setStudentName] = useState('')
  const [files, setFiles] = useState(null)
  const [proyectos, setProyectos] = useState([])

  const handleFileChange = (event) => {
    setFiles(event.target.files)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!studentName || !files) {
      alert('Por favor, ingrese su nombre y seleccione archivos.')
      return
    }

    const formData = new FormData()
    formData.append('studentName', studentName)
    Array.from(files).forEach((file) => formData.append('files', file))

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (response.ok) {
      if (data) {
        listarProyectos().then((response) => {
          if (response.success) {
            setProyectos(response.data)
          }
        })
      }
      console.log(data)
    } else {
      alert(data.error || 'Error al cargar los archivos')
    }
  }

  const listarProyectos = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await fetch('/proyectos.json', options)
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        return {
          success: true,
          data: data,
        }
      } else {
        console.log(data.error)
        return {
          success: false,
          error: data.error,
        }
      }
    } catch (error) {
      console.error('error')
    }
  }

  useEffect(() => {
    // listar proyectos cargados
    listarProyectos().then((response) => {
      if (response?.success) {
        setProyectos(response.data)
      }
    })
  }, [])

  function getYear() {
    const date = new Date()
    return date.getFullYear()
  }

  return (
    <div className={styles.formContainer}>
      <nav>
        <Image src={'/CEAER-LOGO.png'} alt={'logo'} width={80} height={80} />
        <p>Introduccion a la programacion Web</p>
      </nav>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Sube tu proyecto</h1>
        <div>
          <label>Nombre del Estudiante:</label>
          <input
            type='text'
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Selecciona tus archivos (HTML, CSS, JS):</label>
          <input type='file' multiple onChange={handleFileChange} required />
        </div>
        <button type='submit'>Subir Archivos</button>
      </form>

      {proyectos.length > 0 && (
        <div className={styles.proyectosCargados}>
          <h2>Proyectos cargados:</h2>
          <ul>
            {proyectos.map((proyecto, index) => (
              <li key={index}>
                <a
                  href={proyecto.path}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {proyecto.studentName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <footer>
        <p>
          © {getYear()} <strong>CEAER</strong> - Introduccion a la programacion
          Web
        </p>
      </footer>
    </div>
  )
}
