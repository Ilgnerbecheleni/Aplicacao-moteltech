'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import '../../styles/globals.css';

export default function RootLayout({ children }) {
  useEffect(() => {
    // Carrega os ícones Ionic de forma segura
    if (typeof document !== 'undefined') {
      const ioniconsModule = document.createElement('script');
      ioniconsModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
      ioniconsModule.type = 'module';
      document.body.appendChild(ioniconsModule);

      const ioniconsNoModule = document.createElement('script');
      ioniconsNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
      ioniconsNoModule.setAttribute('nomodule', '');
      document.body.appendChild(ioniconsNoModule);
    }
  }, []);

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;500;700&display=swap" />
        <title>Moteltech</title>
        {/* Carregamos apenas o core do Ionic, sem os ícones */}
        <Script
          type="module"
          src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"
          strategy="afterInteractive"
        />
        <Script
          noModule
          src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}