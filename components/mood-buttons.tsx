"use client"

import { motion } from "framer-motion"
import { Heart, Zap, Cloud, Frown, Target, Smile } from "lucide-react"

interface MoodButtonsProps {
  onMoodSelect: (mood: string) => void
}

const moods = [
  { label: "Calm", icon: Cloud, color: "from-blue-400 to-cyan-400" },
  { label: "Happy", icon: Smile, color: "from-yellow-400 to-orange-400" },
  { label: "Energetic", icon: Zap, color: "from-red-400 to-pink-400" },
  { label: "Sad", icon: Frown, color: "from-slate-400 to-blue-400" },
  { label: "Love", icon: Heart, color: "from-pink-400 to-red-400" },
  { label: "Focus", icon: Target, color: "from-teal-400 to-cyan-400" },
]

export default function MoodButtons({ onMoodSelect }: MoodButtonsProps) {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-3 md:gap-4"
    >
      {moods.map((mood) => {
        const Icon = mood.icon
        return (
          <motion.button
            key={mood.label}
            variants={itemVariants}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(mood.label)}
            className={`relative px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-white text-sm md:text-base overflow-hidden group transition-all duration-300`}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${mood.color} opacity-80 group-hover:opacity-100 transition-opacity`}
            />

            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${mood.color} blur-lg opacity-0 group-hover:opacity-60 transition-opacity -z-10`}
            />

            {/* Content */}
            <div className="relative flex items-center gap-2">
              <Icon size={18} />
              <span>{mood.label}</span>
            </div>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
