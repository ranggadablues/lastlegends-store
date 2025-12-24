import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "LastLegends - Sign In",
    description: "Authentic vintage band tees from the golden era of rock, grunge, and alternative",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <main>
                {children}
            </main>
        </div>
    )
}