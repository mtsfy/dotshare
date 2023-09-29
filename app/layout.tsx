import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ModalProvider } from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/Sidebar";
import Bottombar from "@/components/Bottombar";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dotshare",
  description: "Share your life.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <ModalProvider />
        {currentUser && <Sidebar currentUser={currentUser} />}
        <Navbar currentUser={currentUser} />
        {children}
        {currentUser && <Bottombar currentUser={currentUser} />}
      </body>
    </html>
  );
}
