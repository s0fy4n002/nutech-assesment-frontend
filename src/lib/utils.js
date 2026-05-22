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
