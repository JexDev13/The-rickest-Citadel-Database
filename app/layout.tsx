'use client';

import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="site-header">
          
          <div className="header-logo-container">
            <Image 
              src="/logoCitadel.png" 
              alt="Citadel Logo" 
              width={500} 
              height={300}
              priority
              style={{ width: 'auto', maxWidth: '100%', height: 'auto' }}
            />
          </div>

          <div className="header-nav">
            <Link 
              href="/" 
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.location.reload();
                }
              }}
              className="header-link"
            >
              Home
            </Link>
          </div>
        </header>

        <main className="main-wrapper">
          {children}
        </main>

        <footer className="site-footer">
          <strong>The Rickest Citadel Database powered by </strong>
          <Link 
            href="/character/103" 
            className="footer-link"
          >
            Doofus Rick
          </Link>
        </footer>
      </body>
    </html>
  );
}