'use client';

import { useState } from 'react';
import FancyModal from '@/components/FancyModal';

export default function TestModalsPage() {
  const [openModal, setOpenModal] = useState<
    null | 'cyber' | 'anime' | 'dark' | 'glass'
  >(null);

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Testing Semua Modal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <button
          className="px-6 py-3 bg-pink-600 text-white rounded-lg"
          onClick={() => setOpenModal('cyber')}
        >
          Cyberpunk Modal
        </button>

        <button
          className="px-6 py-3 bg-cyan-500 text-white rounded-lg"
          onClick={() => setOpenModal('anime')}
        >
          Anime Modal
        </button>

        <button
          className="px-6 py-3 bg-gray-800 text-white rounded-lg"
          onClick={() => setOpenModal('dark')}
        >
          Dark Mode Modal
        </button>

        <button
          className="px-6 py-3 bg-white/20 text-white border border-white/40 rounded-lg"
          onClick={() => setOpenModal('glass')}
        >
          Glassmorphism Modal
        </button>
      </div>

      {/* ————— MODALS ————— */}
      <FancyModal
        isOpen={openModal === 'cyber'}
        onClose={() => setOpenModal(null)}
        title="Cyberpunk Alert"
        message="This is a neon cyberpunk-style modal."
        theme="cyberpunk"
        variant="warning"
      />

      <FancyModal
        isOpen={openModal === 'anime'}
        onClose={() => setOpenModal(null)}
        title="Anime Theme Modal"
        message="Soft glow + cyan accents ala Misaka Mikoto."
        theme="anime"
        variant="success"
      />

      <FancyModal
        isOpen={openModal === 'dark'}
        onClose={() => setOpenModal(null)}
        title="Dark Mode"
        message="Elegant and minimal dark UI."
        theme="dark"
        variant="danger"
      />

      <FancyModal
        isOpen={openModal === 'glass'}
        onClose={() => setOpenModal(null)}
        title="Glassmorphism"
        message="Frosted glass + blur aesthetic."
        theme="glass"
        variant="success"
      />
    </div>
  );
}
