# Guía de Instalación para Windows

Este README cubre los pasos necesarios para instalar **Node.js**, **pnpm**, y cómo levantar un proyecto usando `pnpm dev` en Windows.

## Instalación de Node.js con FNM (Fast Node Manager)

### 1. Instalar FNM (Fast Node Manager)

Ejecuta el siguiente comando en PowerShell o CMD para instalar `fnm` con `winget`:

```bash
winget install Schniz.fnm
```

### 2. Configurar el entorno de FNM

Configura el entorno de `fnm` para que se ejecute automáticamente al cambiar de directorio:

```bash
fnm env --use-on-cd | Out-String | Invoke-Expression
```

### 3. Descargar e instalar Node.js

Usa `fnm` para instalar la versión 22 de Node.js:

```bash
fnm use --install-if-missing 22
```

### 4. Verificar la versión de Node.js

Verifica que la versión correcta de Node.js esté en el entorno:

```bash
node -v
```

Debería mostrar `v22.11.0`.

### 5. Verificar la versión de npm

Verifica que la versión correcta de npm esté en el entorno:

```bash
npm -v
```

Debería mostrar `10.9.0`.

---

## Instalación de PNPM

### Usando otros gestores de paquetes

Existen dos formas de instalar `pnpm`:

#### Opción 1: Instalar `pnpm` usando npm

Ejecuta el siguiente comando para instalar `pnpm` globalmente:

```bash
npm install -g pnpm
```

#### Opción 2: Instalar `@pnpm/exe`

Alternativamente, puedes instalar la versión de `pnpm` que incluye Node.js y no requiere instalación previa de Node.js:

```bash
npm install -g @pnpm/exe
```

---

## Levantar el Proyecto

### 1. Levantar el proyecto en modo de desarrollo

Una vez que hayas instalado `pnpm`, navega a la carpeta de tu proyecto y ejecuta:

```bash
pnpm dev
```

Esto iniciará el proyecto en modo de desarrollo.

---

¡Listo! Ahora deberías tener **Node.js**, **pnpm** y tu proyecto corriendo correctamente en tu máquina con Windows.
