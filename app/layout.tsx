export const metadata = { title: "Telnyx SMS on Vercel" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 640, margin: "48px auto", padding: "0 20px", lineHeight: 1.5 }}>
        {children}
      </body>
    </html>
  );
}
