import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <link rel="icon" href="/logo.svg" type="image/svg" sizes="32x32" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Toffe Geometric</title>
      </head>
      <body
        className={`antialiased`}
      >
        <main className="w-full min-h-screen relative">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
