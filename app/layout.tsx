import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";

const inter = Inter({
  weight: '500',
  variable: '--font-inter',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Studio 27",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root"
        className={`${inter.variable} antialiased`}
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
