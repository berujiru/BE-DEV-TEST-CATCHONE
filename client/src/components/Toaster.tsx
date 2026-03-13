import { useState, useEffect } from 'react';

export const Toaster = () => {
  const [toasts, setToasts] = useState<any[]>([]);

  useEffect(() => {
    const handleToast = (e: any) => {
      const id = Math.random();
      setToasts((prev) => [...prev, { id, ...e.detail }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };

    window.addEventListener('toast', handleToast);
    return () => window.removeEventListener('toast', handleToast);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div 
          key={t.id} 
          className={`p-4 rounded-lg shadow-lg border ${t.variant === 'destructive' ? 'bg-red-600 text-white' : 'bg-white text-gray-900'}`}
        >
          <div className="font-bold">{t.title}</div>
          <div className="text-sm opacity-90">{t.description}</div>
        </div>
      ))}
    </div>
  );
};