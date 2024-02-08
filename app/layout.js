import { Inter } from "next/font/google";
import "./globals.css";
import ToastContainerSuspense from "@/src/components/ToastContainerSuspense";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        {children}
        <ToastContainerSuspense />
      </body>
    </html>
  );
}
