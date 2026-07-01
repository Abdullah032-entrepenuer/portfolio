import type { Metadata } from 'next';
import './admin.css';

export const metadata: Metadata = {
  title: 'Portfolio Control Panel — Admin',
  description: 'Manage projects, services, and general bio info.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-root">
      {children}
    </div>
  );
}
