import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = {
  title: 'Introducción a la Programación Web',
  description:
    'Cátedra de Introducción a la Programación Web. Aprende los fundamentos esenciales del desarrollo web, incluyendo HTML, CSS, y JavaScript.',
  keywords:
    'programación web, HTML, CSS, JavaScript, desarrollo web, introducción a la programación',
  author: 'Contreras Nicolás',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
