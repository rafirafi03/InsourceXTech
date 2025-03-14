"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import CarouselCard from '../CarouselCard/carouselCard'

// Sample data for carousel items
const carouselItems = [
  {
    id: 1,
    title: "Premium Headphones",
    description: "Noise-cancelling with superior sound quality",
    price: "$299",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    title: "Smart Watch",
    description: "Track your fitness and stay connected",
    price: "$199",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    title: "Wireless Earbuds",
    description: "Crystal clear audio with long battery life",
    price: "$149",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    description: "Powerful sound in a compact design",
    price: "$89",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    title: "Laptop Stand",
    description: "Ergonomic design for better posture",
    price: "$49",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    title: "Mechanical Keyboard",
    description: "Tactile feedback for faster typing",
    price: "$129",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    title: "Wireless Mouse",
    description: "Precise tracking and comfortable grip",
    price: "$59",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    title: "USB-C Hub",
    description: "Connect all your devices with ease",
    price: "$79",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function CustomCarousel() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleItems, setVisibleItems] = useState(4) // Default for desktop
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const totalItems = carouselItems.length

  // Function to handle window resize and set appropriate number of visible items
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile: show 1 item
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        // Tablet: show 2 items
        setVisibleItems(2)
      } else if (window.innerWidth < 1280) {
        // Small desktop: show 3 items
        setVisibleItems(3)
      } else {
        // Large desktop: show 4 items
        setVisibleItems(4)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Function to handle moving to next item
  const handleNextItem = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentItemIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1))

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  // Function to handle moving to previous item
  const handlePrevItem = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentItemIndex((prevIndex) => (prevIndex === 0 ? totalItems - 1 : prevIndex - 1))

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  // Auto-rotation effect - move one item every 3 seconds
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      handleNextItem()
    }, 3000) // Auto rotate every 3 seconds

    return () => clearInterval(interval)
  }, [currentItemIndex, isPaused, isAnimating])

  // Pause auto-rotation when hovering
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // Get the appropriate width class based on visible items
  const getItemWidthClass = () => {
    switch (visibleItems) {
      case 1: return "w-full";
      case 2: return "w-1/2";
      case 3: return "w-1/3";
      case 4: return "w-1/4";
      default: return "w-1/4";
    }
  }

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel container */}
      <div ref={carouselRef} className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${(currentItemIndex * 100) / visibleItems}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div 
              key={index} 
              className={`${getItemWidthClass()} flex-none p-2 sm:p-3`}
              style={{ 
                transform: `translateX(${index < currentItemIndex ? 100 * totalItems : 0}%)`,
                transition: "transform 0ms" 
              }}
            >
              <CarouselCard/>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevItem}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg focus:outline-none"
        aria-label="Previous item"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" />
      </button>

      <button
        onClick={handleNextItem}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg focus:outline-none"
        aria-label="Next item"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" />
      </button>

      {/* Indicators for current item - show fewer indicators on mobile */}
      <div className="mt-4 sm:mt-6 flex justify-center gap-1 sm:gap-2 overflow-x-auto px-2">
        {Array.from({ length: Math.min(totalItems, 8) }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentItemIndex(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
            className={`h-1.5 sm:h-2.5 rounded-full transition-all ${
              currentItemIndex === index ? "bg-slate-800 w-4 sm:w-6" : "bg-slate-300 w-1.5 sm:w-2.5 hover:bg-slate-400"
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}