import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const SERVICES = [
    { name: "PBB", icon: "/assets/PBB.png", id: "pbb" },
    { name: "Listrik", icon: "/assets/Listrik.png", id: "listrik" },
    { name: "Pulsa", icon: "/assets/Pulsa.png", id: "pulsa" },
    { name: "PDAM", icon: "/assets/PDAM.png", id: "pdam" },
    { name: "PGN", icon: "/assets/PGN.png", id: "pgn" },
    { name: "TV", icon: "/assets/Televisi.png", id: "tv" },
    { name: "Musik", icon: "/assets/Musik.png", id: "musik" },
    { name: "Game", icon: "/assets/Game.png", id: "game" },
    { name: "Makanan", icon: "/assets/Voucher Makanan.png", id: "makanan" },
    { name: "Kurban", icon: "/assets/Kurban.png", id: "kurban" },
    { name: "Zakat", icon: "/assets/Zakat.png", id: "zakat" },
    { name: "Data", icon: "/assets/Paket Data.png", id: "data" },
  ];

export const formatNumber = (val) => {
  const number = val.replace(/\D/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatToIndonesian = (isoString) => {
  const date = new Date(isoString);
  
  return date.toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Memastikan format 24 jam
  }).replace('.', ':'); // Mengganti titik pemisah jam bawaan ID menjadi titik dua
};