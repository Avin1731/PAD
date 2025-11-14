'use client';

interface StatCardProps {
  title: string;
  value: string | number;
  bgColor?: string;
  borderColor?: string;
  titleColor?: string;
  valueColor?: string;
}

export default function StatCard({
  title,
  value,
  // Berikan nilai default jika props tidak dikirim
  bgColor = 'bg-white',
  borderColor = 'border-gray-100',
  titleColor = 'text-gray-500',
  valueColor = 'text-gray-800',
}: StatCardProps) {
  return (
    // PERBAIKAN: Tambahkan h-full (tinggi 100%) dan flex flex-col
    <div
      className={`${bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border ${borderColor} 
      h-full flex flex-col justify-center`}
    >
      <h3 className={`text-sm font-medium mb-1 ${titleColor}`}>{title}</h3>
      <div className={`text-3xl font-extrabold ${valueColor}`}>{value}</div>
    </div>
  );
}