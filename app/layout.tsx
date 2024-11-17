import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-darkSlateBlue to-midnightBlack h-screen w-screen overflow-hidden">
        <div className="relative h-full w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
