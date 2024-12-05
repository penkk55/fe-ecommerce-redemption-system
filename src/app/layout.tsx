"use client";

import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  // State to track user
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(updatedUser);
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Update state directly when localStorage changes from the same tab
  useEffect(() => {
    const handleCustomChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(updatedUser);
    };

    // Custom event for same-tab updates
    window.addEventListener("user-update", handleCustomChange);

    return () => {
      window.removeEventListener("user-update", handleCustomChange);
    };
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <div className="flex justify-between items-center p-4">
  {/* Left section: Home */}
  <div
    className="text-lg font-medium cursor-pointer"
    onClick={() => {
      router.push("/");
    }}
  >
    HOME
  </div>

  {/* Right section: Avatar and user details */}
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
    <div className="ml-2 text-sm font-medium">Customer ID: {user.id}</div>
    <div className="ml-2 text-sm font-medium">Email: {user.email}</div>
    <div className="ml-2 mr-4 text-sm font-medium">Balance: {user.balance}</div>
  </div>
</div>


        {children}
        <Toaster />
      </body>
    </html>
  );
}
