export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <p>Auth layout</p>
      {children}
    </main>
  );
}
