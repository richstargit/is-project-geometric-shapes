import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <main className="w-full min-h-screen">
          <Navbar/>
          {children}
        </main>
      </body>
    </html>
  );
}
