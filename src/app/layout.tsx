import { Inter } from 'next/font/google';
import { Playwrite_HU } from 'next/font/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ToasterContext from '@/components/ToasterContext';
import Provider from '@/components/Provider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const playwriteHU = Playwrite_HU({
  weight: ['400'],
  variable: '--font-playwrite-hu',
  display: 'swap',
});

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Roon - Connect Instantly, Chat Securely',
  description: 'Experience seamless real-time messaging with advanced privacy controls. Keep your conversations secure while staying connected.',
  icons: {
    icon: '/assets/logo-cat.png', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} ${playwriteHU.variable} antialiased font-sans`}
      >
        <Provider>
          <ToasterContext />
          {children}
        </Provider>
      </body>
    </html>
  );
}
