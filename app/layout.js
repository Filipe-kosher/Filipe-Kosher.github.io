import './globals.css'

export const metadata = {
  title: 'Portfólio Filipe - Desenvolvedor Fullstack & UI/UX Designer',
  description: 'Portfólio de Filipe: desenvolvedor web, UI/UX, especialista em projetos envolventes, entregas rápidas, segurança e suporte. Veja meus projetos e habilidades!'
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Story+Script&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Libertinus+Serif+Display&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="canonical" href="https://filipedev.pro" />
        <meta name="keywords" content="portfólio, filipe, desenvolvedor, web, UI, UX, projetos, programação, frontend, backend, javascript, react, node, design, dev, brasil" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://filipedev.pro/" />
        <meta property="og:locale" content="pt_BR" />
      </head>
      <body>{children}</body>
    </html>
  )
}
