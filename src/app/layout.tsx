import './globals.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Content from '../components/Content';

export const metadata = {
  title: 'Dashboard',
  description: 'A responsive dashboard layout',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
          <Content/>
        </div>
      </body>
    </html>
  );
}