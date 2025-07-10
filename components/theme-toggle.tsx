"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setIsAnimating(true);
    
    // Create water drop effect
    const dropElement = document.createElement('div');
    dropElement.className = 'fixed inset-0 pointer-events-none z-[9999]';
    dropElement.innerHTML = `
      <div class="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent water-drop-animation"></div>
    `;
    document.body.appendChild(dropElement);
    
    // Change theme after animation starts
    setTimeout(() => {
      setTheme(newTheme);
    }, 200);
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(dropElement);
      setIsAnimating(false);
    }, 800);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 rounded-xl glass"
        disabled
      >
        <div className="w-4 h-4 animate-pulse bg-gray-300 dark:bg-gray-600 rounded" />
      </Button>
    );
  }

  const themes = [
    {
      name: "light",
      label: "Light",
      icon: Sun,
    },
    {
      name: "dark",
      label: "Dark",
      icon: Moon,
    },
    {
      name: "system",
      label: "System",
      icon: Monitor,
    },
  ];

  const currentTheme = themes.find((t) => t.name === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-10 h-10 rounded-xl glass smooth-transition ripple-effect",
            "hover:scale-110 active:scale-95",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            isAnimating && "animate-pulse"
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.68, -0.55, 0.265, 1.55] 
              }}
            >
              <CurrentIcon className="w-4 h-4" />
            </motion.div>
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "w-40 mt-2 p-2",
          "glass rounded-2xl",
          "shadow-2xl shadow-black/10 dark:shadow-black/30",
          "border-0"
        )}
      >
        {themes.map((themeOption, index) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.name;
          
          return (
            <DropdownMenuItem
              key={themeOption.name}
              onClick={() => handleThemeChange(themeOption.name)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer smooth-transition",
                "text-gray-700 dark:text-gray-300",
                "hover:text-gray-900 dark:hover:text-gray-100",
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-100/60 dark:hover:bg-gray-800/60",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              )}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex items-center justify-center w-5 h-5",
                  isActive && "text-blue-600 dark:text-blue-400"
                )}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-medium">{themeOption.label}</span>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}