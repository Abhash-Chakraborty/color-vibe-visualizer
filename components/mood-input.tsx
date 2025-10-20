"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface MoodInputProps {
  onGenerate: (mood: string) => void
}

export default function MoodInput({ onGenerate }: MoodInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onGenerate(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />

        <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 p-1">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a mood... (calm, happy, energetic, sad, love, focus)"
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-cyan-300/40 focus:outline-none text-sm md:text-base"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <Sparkles size={18} />
              <span className="hidden sm:inline">Generate</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </form>
  )
}
