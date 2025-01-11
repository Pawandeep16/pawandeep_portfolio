"use client"

import { useState } from "react"
import Image from "next/image"
import { useTransition, animated } from "@react-spring/web"
import { artworks } from "@/components/data/gallarydata"
import { Maximize2 } from "lucide-react"

const ITEMS_PER_PAGE = 6 // Number of images to show initially or per load

export function Gallery() {
  const [visibleImages, setVisibleImages] = useState(ITEMS_PER_PAGE)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)

  const transitions = useTransition(
    artworks.slice(0, visibleImages),
    {
      keys: (item) => item.image,
      from: { opacity: 0, transform: "scale(0.95)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0.95)" },
      trail: 100, // Delay between item transitions
    }
  )

  const handleViewMore = () => {
    setVisibleImages((prev) => prev + ITEMS_PER_PAGE)
  }

  const handleImageClick = (image: string) => {
    setCurrentImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentImage(null)
  }

  return (
    <section id="gallery" className="min-h-screen bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {transitions((style, artwork) => (
            <animated.div key={artwork.image} style={style} className="relative group">
              <Image
                src={artwork.image}
                alt={artwork.title}
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-lg"
                style={{
                  aspectRatio: artwork.aspectRatio || "1/1", // Use artwork's aspect ratio or default to 1:1
                }}
              />
              {/* Overlay with Enlarge Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleImageClick(artwork.image)}
                  className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition-all"
                  title="Enlarge"
                >
                  <Maximize2 className="w-6 h-6 text-black" />
                </button>
              </div>
            </animated.div>
          ))}
        </div>

        {visibleImages < artworks.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewMore}
              className="px-6 py-3 bg-white text-black rounded-full shadow-md hover:shadow-lg transition-all"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ✕
          </button>
          <div className="max-w-5xl w-full px-4">
            <Image
              src={currentImage}
              alt="Full Screen"
              width={1600}
              height={900}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  )
}
