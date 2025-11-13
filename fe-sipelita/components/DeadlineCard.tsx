'use client';

import { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker, { registerLocale } from 'react-datepicker';
import { id } from 'date-fns/locale/id';

// Import CSS untuk datepicker
import 'react-datepicker/dist/react-datepicker.css';

// Daftarkan locale Bahasa Indonesia
registerLocale('id', id);

interface DeadlineCardProps {
  title: string;
  startDate: string; // Bisa berupa "DD/MM/YYYY" atau "09T00:00:00.000000Z/12/2025"
  endDate: string;   // Bisa berupa "DD/MM/YYYY" atau "20T00:00:00.000000Z/12/2025"
  onSave: (start: string, end: string) => void;
}

// --- FUNGSI PARSE DATE ---
const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;

    let cleanDate = dateString;

    // (Logika parsing Anda yang kompleks di sini)
    if (dateString.includes('T') && dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length >= 2) {
            const lastPart = parts[parts.length - 2] + '/' + parts[parts.length - 1];
            if (lastPart.match(/^\d{1,2}\/\d{4}$/)) {
                cleanDate = `01/${lastPart}`;
            } else {
                const match = dateString.match(/(\d{1,2})\/(\d{4})$/);
                if (match) {
                    cleanDate = `01/${match[1]}/${match[2]}`;
                }
            }
        }
    }

    const parts = cleanDate.split('/');
    if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1; // JS months 0-based
        const year = parseInt(parts[2]);
        const date = new Date(year, month, day);
        if (!isNaN(date.getTime())) {
            return date;
        }
    }
    
    const isoDate = new Date(dateString);
    if (!isNaN(isoDate.getTime())) {
        return isoDate;
    }

    return null;
};

// --- FUNGSI FORMAT DATE ---
const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export default function DeadlineCard({
  title,
  startDate,
  endDate,
  onSave,
}: DeadlineCardProps) {
  // State untuk DatePicker (kalender)
  const [localStart, setLocalStart] = useState<Date | null>(parseDate(startDate));
  const [localEnd, setLocalEnd] = useState<Date | null>(parseDate(endDate));
  
  // --- PERBAIKAN 1: Inisialisasi input sebagai string kosong ---
  const [inputStart, setInputStart] = useState('');
  const [inputEnd, setInputEnd] = useState('');
  // --- AKHIR PERBAIKAN ---

  const datePickerStartRef = useRef<DatePicker>(null);
  const datePickerEndRef = useRef<DatePicker>(null);

  // --- PERBAIKAN 2: useEffect hanya mengatur DatePicker, bukan input teks ---
  useEffect(() => {
    // Kita tetap set 'local' agar kalender terbuka di tanggal yang benar
    // (Bungkus di setTimeout untuk menghindari error 'cascading renders')
    setTimeout(() => {
      const parsedStart = parseDate(startDate);
      setLocalStart(parsedStart);
      // HAPUS: setInputStart(parsedStart ? formatDate(parsedStart) : '');

      const parsedEnd = parseDate(endDate);
      setLocalEnd(parsedEnd);
      // HAPUS: setInputEnd(parsedEnd ? formatDate(parsedEnd) : '');
    }, 0);
  }, [startDate, endDate]);
  // --- AKHIR PERBAIKAN ---

  // Format input teks ke DD/MM/YYYY saat mengetik
  const formatInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    let formatted = '';
    if (numbers.length <= 2) {
      formatted = numbers;
    } else if (numbers.length <= 4) {
      formatted = `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      formatted = `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
    return formatted;
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatInput(e.target.value);
    setInputStart(value);
    if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const [day, month, year] = value.split('/');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      if (!isNaN(date.getTime())) {
        setLocalStart(date);
      }
    } else {
      setLocalStart(null);
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatInput(e.target.value);
    setInputEnd(value);
    if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const [day, month, year] = value.split('/');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      if (!isNaN(date.getTime())) {
        setLocalEnd(date);
      }
    } else {
      setLocalEnd(null);
    }
  };

  const handleSave = () => {
    // Kirim nilai dari input teks
    onSave(inputStart, inputEnd);
  };

  const handleIconClickStart = () => {
    if (datePickerStartRef.current) {
      datePickerStartRef.current.setOpen(true);
    }
  };

  const handleIconClickEnd = () => {
    if (datePickerEndRef.current) {
      datePickerEndRef.current.setOpen(true);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
        {/* Judul Card */}
        <h3 className="text-base font-semibold text-gray-800 mb-3">{title}</h3>
        
        {/* Input Tanggal Mulai */}
        <div className="mb-3">
          <label className="block text-sm text-gray-700 mb-0.5">Tanggal Mulai</label>
          <div className="relative">
            <input
              type="text"
              value={inputStart} // Sekarang kosong
              onChange={handleStartChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent placeholder-gray-400"
              placeholder="DD/MM/YYYY" // <-- Placeholder akan terlihat
              maxLength={10}
            />
            <FaCalendarAlt
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#00A86B] text-sm cursor-pointer pointer-events-auto"
              onClick={handleIconClickStart}
            />
            <DatePicker
              ref={datePickerStartRef}
              selected={localStart} // Kalender tetap tahu tanggal lama
              onChange={(date) => {
                setLocalStart(date);
                setInputStart(formatDate(date)); // <-- Update input teks saat picker berubah
              }}
              dateFormat="dd/MM/yyyy"
              locale="id"
              showPopperArrow={false}
              className="hidden"
            />
          </div>
        </div>

        {/* Input Tanggal Selesai */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-0.5">Tanggal Selesai</label>
          <div className="relative">
            <input
              type="text"
              value={inputEnd} // Sekarang kosong
              onChange={handleEndChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent placeholder-gray-400"
              placeholder="DD/MM/YYYY" // <-- Placeholder akan terlihat
              maxLength={10}
            />
            <FaCalendarAlt
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#00A86B] text-sm cursor-pointer pointer-events-auto"
              onClick={handleIconClickEnd}
            />
            <DatePicker
              ref={datePickerEndRef}
              selected={localEnd} // Kalender tetap tahu tanggal lama
              onChange={(date) => {
                setLocalEnd(date);
                setInputEnd(formatDate(date)); // <-- Update input teks saat picker berubah
              }}
              dateFormat="dd/MM/yyyy"
              locale="id"
              showPopperArrow={false}
              className="hidden"
            />
          </div>
        </div>

        {/* Tombol Simpan Perubahan */}
        <button
          onClick={handleSave}
          className="w-full bg-[#00A86B] hover:bg-[#00945F] text-white font-medium text-sm py-1.5 rounded-md transition"
        >
          Simpan
        </button>
    </div>
  );
}