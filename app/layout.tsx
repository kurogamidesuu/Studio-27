import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  subsets: ['latin']
})

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  title: {
    template: '%s | Studio 27',
    default: 'Studio 27',
  },
  description: "Your personal digital atelier. Built with love, code, and coffee.",
  robots: {
    index: false,
    follow: false,
  },
  applicationName: 'Studio 27',
  authors: [{name: "Hempushp Chauhan", url: 'https://github.com/kurogamidesuu'}],
  keywords: ['Architecture', 'Design', 'Love', 'Atelier'],
  openGraph: {
    title: 'Studio 27',
    description: 'A digital workspace designed for the world\'s best architect (my Teru).',
    url: '',
    siteName: 'Studio 27',
    locale: 'en_US',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    title: "Studio 27",
    statusBarStyle: "black-translucent",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root"
        className={`${inter.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        {children}
        <ToastContainer
          position="top-center"
          autoClose={2500}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
          transition={Slide}
        />
      </body>
    </html>
  );
}
