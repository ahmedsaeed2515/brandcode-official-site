import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "BrandCode | High-Performance Digital Solutions",
  description: "Premium web development agency crafting immersive 3D digital experiences. We transform complex ideas into high-performance, scalable solutions using cutting-edge technologies.",
  keywords: [
    "web development",
    "React development",
    "Next.js agency",
    "3D website",
    "digital agency",
    "UI/UX design",
    "mobile app development",
    "cloud infrastructure",
    "TypeScript",
    "Three.js",
  ],
  authors: [{ name: "BrandCode" }],
  creator: "BrandCode",
  metadataBase: new URL("https://brandcode.dev"),
  openGraph: {
    title: "BrandCode | High-Performance Digital Solutions",
    description: "Premium web development and immersive 3D digital experiences. We partner with businesses that demand reliability and scale.",
    type: "website",
    locale: "en_US",
    siteName: "BrandCode",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandCode | High-Performance Digital Solutions",
    description: "Premium web development and immersive 3D digital experiences.",
    creator: "@brandcode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        style={{
          // Prevent FOUC (Flash of Unstyled Content)
          backgroundColor: "#050510",
        }}
      >
        {children}
      </body>
    </html>
  );
}
