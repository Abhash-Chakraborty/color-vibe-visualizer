"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"

interface PaletteDisplayProps {
  colors: string[]
  moodLabel: string
}

export default function PaletteDisplay({ colors, moodLabel }: PaletteDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [floatingText, setFloatingText] = useState<{ id: number; index: number } | null>(null)

  const copyToClipboard = (color: string, index: number) => {
    navigator.clipboard.writeText(color)
    setCopiedIndex(index)

    // Show floating text
    const id = Date.now()
    setFloatingText({ id, index })

    setTimeout(() => setCopiedIndex(null), 2000)
    setTimeout(() => setFloatingText(null), 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
      {/* Mood Label */}
      <div className="text-center mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-cyan-300/70 text-sm uppercase tracking-widest font-light"
        >
          {moodLabel}
        </motion.p>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.05 }}
            className="relative group cursor-pointer"
            onClick={() => copyToClipboard(color, index)}
          >
            {/* Card Container */}
            <div className="relative rounded-xl overflow-hidden backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-2xl">
              {/* Color Display */}
              <div
                className="w-full aspect-square rounded-lg transition-all duration-300 relative overflow-hidden"
                style={{ backgroundColor: color }}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
              </div>

              {/* Hex Code Display */}
              <div className="p-3 bg-slate-900/60 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <code className="text-white/80 text-sm font-mono">{color}</code>
                  <motion.div
                    animate={{ scale: copiedIndex === index ? 1.2 : 1 }}
                    className="text-white/60 group-hover:text-white transition-colors"
                  >
                    {copiedIndex === index ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </motion.div>
                </div>
              </div>

              {/* Floating "Copied!" Text */}
              {floatingText?.index === index && (
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -30 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <span className="text-white font-semibold text-sm bg-green-500/80 px-3 py-1 rounded-full">
                    Copied!
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hint Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-cyan-300/50 text-xs mt-6"
      >
        ✨ Click any color to copy its hex code
      </motion.p>
    </motion.div>
  )
}
