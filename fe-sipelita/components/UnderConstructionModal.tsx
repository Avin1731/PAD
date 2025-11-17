// src/components/UnderConstructionModal.tsx
"use client";

import { useRouter } from "next/navigation";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  message: string;
}

export default function UnderConstructionModal({ title, message }: Props) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // ⬅ kembali ke halaman sebelumnya
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center border border-gray-300 animate-scale-in">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>

        <div className="flex justify-center mb-4">
          <WrenchScrewdriverIcon
            className="w-16 h-16 text-[#00A86B] animate-bounce-vibrate"
          />
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <button
          type="button"
          onClick={handleClose}
          className="block w-full bg-[#00A86B] text-white font-bold py-3 px-4 rounded-lg hover:brightness-90 transition duration-300 shadow-sm"
        >
          Kembali
        </button>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes scale-in {
            0% { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in {
            animation: scale-in .25s ease-out;
          }

          @keyframes vibrate {
            0%, 100% { transform: translate(0, 0); }
            20% { transform: translate(-2px, 1px); }
            40% { transform: translate(2px, -1px); }
            60% { transform: translate(-1px, -2px); }
            80% { transform: translate(1px, 2px); }
          }
          .animate-bounce-vibrate {
            animation: vibrate 0.2s infinite;
          }
        `}
      </style>
    </div>
  );
}
