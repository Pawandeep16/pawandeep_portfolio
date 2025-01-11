"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSpring, animated } from "@react-spring/web"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const sunSpring = useSpring({
    transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
    config: { tension: 100, friction: 10 },
  })

  const moonSpring = useSpring({
    transform: theme === "light" ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)",
    config: { tension: 100, friction: 10 },
  })

  return (
    <Button
      variant="ghost"
      size="icon"
      className=""
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <animated.div style={sunSpring}>
        <Sun className="h-[20px] w-[20px] " />
      </animated.div>
      <animated.div style={moonSpring}>
        <Moon className="h-[20px] w-[20px] " />
      </animated.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}