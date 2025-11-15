// components/InnerNav.tsx
'use client';

interface InnerNavProps {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function InnerNav({ tabs, activeTab, onChange, className = '' }: InnerNavProps) {
  return (
    <div className={`border-b border-gray-200 mb-6 ${className}`}>
      <nav className="flex space-x-8 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`whitespace-nowrap py-2 px-4 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab.value
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}