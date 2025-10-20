"use client"

import { useState } from "react"
import MoodInput from "@/components/mood-input"
import MoodButtons from "@/components/mood-buttons"
import PaletteDisplay from "@/components/palette-display"
import ParticleBackground from "@/components/particle-background"
import { moodPalettes } from "@/lib/palettes"

export default function Home() {
  const [palette, setPalette] = useState<string[]>([])
  const [moodLabel, setMoodLabel] = useState("")
  const [bgColor, setBgColor] = useState("from-slate-900 to-slate-800")

  const generatePalette = (mood: string) => {
    const normalizedMood = mood.toLowerCase().trim()
    const colors =
      moodPalettes[normalizedMood as keyof typeof moodPalettes] ||
      Object.values(moodPalettes)[Math.floor(Math.random() * Object.keys(moodPalettes).length)]

    setPalette(colors)
    setMoodLabel(
      normalizedMood === "" || !moodPalettes[normalizedMood as keyof typeof moodPalettes]
        ? "✨ Random Vibe"
        : normalizedMood,
    )

    // Update background gradient based on first color
    setBgColor(`from-[${colors[0]}] to-[${colors[0]}]`)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <ParticleBackground />

      {/* Dynamic background overlay */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `linear-gradient(135deg, ${palette[0] || "#1e293b"} 0%, ${palette[1] || "#0f172a"} 100%)`,
          opacity: 0.15,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
            Color Vibe
          </h1>
          <p className="text-lg md:text-xl text-cyan-200/70 font-light">Transform your mood into a vibrant palette</p>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-md mb-8">
          <MoodInput onGenerate={generatePalett} />
        </div>

        {/* Quick Mood Buttons */}
        <div className="mb-12">
          <MoodButtons onMoodSelect={generatePalette} />
        </div>

        {/* Palette Display */}
        {palette.length > 0 && (
          <div className="w-full max-w-4xl">
            <PaletteDisplay colors={palette} moodLabel={moodLabel} />
          </div>
        )}

        {/* Hint Text */}
        {palette.length === 0 && (
          <div className="text-center text-cyan-300/50 text-sm mt-8">
            <p>✨ Enter a mood or choose a quick vibe to get started</p>
          </div>
        )}
      </div>
    </main>
  )
}
