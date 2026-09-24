import "./globals.css";

export const metadata = {
  title: "College Exam Timetable",
  description: "College exam timetable management system"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
