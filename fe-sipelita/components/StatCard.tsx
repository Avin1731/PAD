// src/app/components/StatCard.tsx
'use client';

interface StatCardProps {
  title: string;
  value: string | number;
  bgColor?: string;     // tambahkan props opsional
  borderColor?: string; // tambahkan props opsional
  titleColor?: string; // tambahkan props opsional
  valueColor?: string; // tambahkan props opsional
}

export default function StatCard({
  title,
  value,
  bgColor,
  borderColor,
  titleColor,
  valueColor,
}: StatCardProps) {
  return (
    <div
      className={`${bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border ${borderColor}`}
    >
      <h3 className={`text-sm font-medium mb-1 ${titleColor}`}>{title}</h3>
      <div className={`text-3xl font-extrabold ${valueColor}`}>{value}</div>
    </div>
  );
}
