import type { Metadata } from "next";
import { Geist } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
import Providers from './providers';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manoa Club Compass",
  description: "A directory for discovering student organizations at UH Manoa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classString = `${geistSans.variable} wrapper`;
  return (
       <html lang="en">
      <body className={classString}>
       <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
