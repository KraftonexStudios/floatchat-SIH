'use client';

import { Dashboard } from '@/components/Dashboard';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-black">
      <Dashboard onClose={handleClose} />
    </div>
  );
}