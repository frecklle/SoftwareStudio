import "./style.css";

export const metadata = {
  title: "Login page",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
