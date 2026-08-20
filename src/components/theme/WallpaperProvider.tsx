"use client";

import React, { createContext, useContext, useState } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";

export interface WallpaperItem {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
}

export const WALLPAPERS: WallpaperItem[] = [
  {
    id: "akane-1",
    name: "Akane 01",
    thumbnail: "/wallpapers/akane/1-akane.jpg",
    url: "/wallpapers/akane/1-akane.jpg",
  },
  {
    id: "akane-2",
    name: "Akane 02",
    thumbnail: "/wallpapers/akane/2-akane.jpg",
    url: "/wallpapers/akane/2-akane.jpg",
  },
  {
    id: "akane-3",
    name: "Akane 03",
    thumbnail: "/wallpapers/akane/3-akane.jpg",
    url: "/wallpapers/akane/3-akane.jpg",
  },
  {
    id: "akane-4",
    name: "Akane 04",
    thumbnail: "/wallpapers/akane/4-akane.jpg",
    url: "/wallpapers/akane/4-akane.jpg",
  },
  {
    id: "akane-5",
    name: "Akane 05",
    thumbnail: "/wallpapers/akane/5-akane.jpg",
    url: "/wallpapers/akane/5-akane.jpg",
  },
  {
    id: "akane-6",
    name: "Akane 06",
    thumbnail: "/wallpapers/akane/6-akane.jpg",
    url: "/wallpapers/akane/6-akane.jpg",
  },
  {
    id: "akane-7",
    name: "Akane 07",
    thumbnail: "/wallpapers/akane/7-akane.jpg",
    url: "/wallpapers/akane/7-akane.jpg",
  },
  {
    id: "akane-8",
    name: "Akane 08",
    thumbnail: "/wallpapers/akane/8-akane.jpg",
    url: "/wallpapers/akane/8-akane.jpg",
  },
];

interface WallpaperContextType {
  currentWallpaper: WallpaperItem | null;
  wallpaperId: string | null;
  opacity: number;
  setWallpaperId: (id: string | null) => void;
  setOpacity: (opacity: number) => void;
  wallpapers: WallpaperItem[];
}

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined);

function getInitialWallpaperId(): string | null {
  if (typeof window === "undefined") return "akane-1";
  try {
    const stored = localStorage.getItem("ldo_wallpaper");
    if (stored === "none") return null;
    if (stored && WALLPAPERS.some((w) => w.id === stored)) return stored;
    return "akane-1";
  } catch {
    return "akane-1";
  }
}

function getInitialOpacity(): number {
  if (typeof window === "undefined") return 0.90;
  try {
    const stored = localStorage.getItem("ldo_terminal_opacity");
    if (stored) {
      const parsed = parseFloat(stored);
      if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 1.0) {
        return parsed;
      }
    }
  } catch {
    // Ignore
  }
  return 0.90;
}

export const WallpaperProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wallpaperId, setWallpaperIdState] = useState<string | null>(getInitialWallpaperId);
  const [opacity, setOpacityState] = useState<number>(getInitialOpacity);
  const mounted = useIsMounted();

  const setWallpaperId = (id: string | null) => {
    setWallpaperIdState(id);
    try {
      if (id) {
        localStorage.setItem("ldo_wallpaper", id);
      } else {
        localStorage.setItem("ldo_wallpaper", "none");
      }
    } catch (e) {
      console.warn("Could not save wallpaper preference", e);
    }
  };

  const setOpacity = (newOpacity: number) => {
    const clamped = Math.min(Math.max(newOpacity, 0.5), 1.0);
    setOpacityState(clamped);
    try {
      localStorage.setItem("ldo_terminal_opacity", clamped.toString());
    } catch (e) {
      console.warn("Could not save opacity preference", e);
    }
  };

  const currentWallpaper =
    mounted && wallpaperId
      ? WALLPAPERS.find((w) => w.id === wallpaperId) || null
      : null;

  return (
    <WallpaperContext.Provider
      value={{
        currentWallpaper,
        wallpaperId,
        opacity,
        setWallpaperId,
        setOpacity,
        wallpapers: WALLPAPERS,
      }}
    >
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => {
  const context = useContext(WallpaperContext);
  if (!context) {
    throw new Error("useWallpaper must be used within a WallpaperProvider");
  }
  return context;
};
