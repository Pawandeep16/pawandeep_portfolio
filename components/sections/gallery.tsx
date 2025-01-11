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
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null)

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

  const handleImageClick = (image: string, index: number) => {
    setCurrentImage(image)
    setExpandedImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentImage(null)
    setExpandedImageIndex(null)
  }

  return (
    <section id="gallery" className="min-h-screen ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {transitions((style, artwork, t, index) => (
            <animated.div
              key={artwork.image}
              style={style}
              className="relative group"
            >
              <Image
                src={artwork.image}
                alt={artwork.title}
                width={artwork.width || 400}  // Dynamic width based on artwork
                height={artwork.height || 400} // Dynamic height based on artwork
                className="object-cover w-full h-full rounded-lg cursor-pointer"
                style={{
                  aspectRatio: artwork.aspectRatio || "1/1", // Use artwork's aspect ratio or default to 1:1
                  transform: expandedImageIndex === index ? "scale(1.2)" : "scale(1)",
                  transition: "transform 0.3s ease",
                  zIndex: expandedImageIndex === index ? 10 : "auto",
                }}
                onClick={() => handleImageClick(artwork.image, index)}
              />
              <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="absolute bottom-4 left-4 text-white p-2 rounded-lg">
                  <h1 className="text-xl">{artwork.category}</h1>
                  <p className="text-lg">{artwork.title}</p>
                  <p className="text-sm">{artwork.description}</p> {/* Image title or description */}
                </div>
                <button
                  onClick={() => handleImageClick(artwork.image, index)}
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
              Load More
            </button>
          </div>
        )}
      </div>

     
    </section>
  )
}
