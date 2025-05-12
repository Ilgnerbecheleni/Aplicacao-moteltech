
export const metadata = {
  title: 'Moteltech',
  description: 'Aplicação geral',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;500;700&display=swap" 
        />
        <link 
      
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}