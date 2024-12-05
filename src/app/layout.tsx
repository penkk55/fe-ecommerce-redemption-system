"use client";

import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface User {
  id: string; // or number, depending on your data
  email: string;
  balance: number;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // Allow null as initial value
  // const [user, setUser] = useState(() => ({})); // Default to an empty object

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(updatedUser);
    };

    // Sync state with localStorage
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);

    // Add event listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("user-update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("user-update", handleStorageChange);
    };
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-between items-center p-4">
          <div
            className="text-lg font-medium cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            HOME
          </div>

          <div className="flex items-center">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                onClick={() => {
                  router.push("/");
                }}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-2 text-sm font-medium">Customer ID: {user?.id}</div>
            <div className="ml-2 text-sm font-medium">Email: {user?.email}</div>
            <div className="ml-2 mr-4 text-sm font-medium">
              Balance: {user?.balance}
            </div>
          </div>
        </div>

        {children}
        <Toaster />
      </body>
    </html>
  );
}
