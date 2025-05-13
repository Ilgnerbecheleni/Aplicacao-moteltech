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
   
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          noModule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}