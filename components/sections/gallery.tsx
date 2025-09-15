"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { client, GALLERY_QUERY, urlFor } from "@/lib/sanity";
import { Artwork } from "@/lib/types";

export function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const [rotation, setRotation] = useState(false);

  // Fetch artworks
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await client.fetch(GALLERY_QUERY);
        setArtworks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  // Categories
  const categories = [
    "all",
    ...new Set(
      artworks.flatMap((art) =>
        Array.isArray(art.category) ? art.category : []
      )
    ),
  ];

  // Filtered artworks
  const filteredArtworks =
    filter === "all"
      ? artworks
      : artworks.filter(
          (art) => Array.isArray(art.category) && art.category.includes(filter)
        );

  const visibleArtworks = filteredArtworks.slice(0, visibleCount);

  // Lightbox controls
  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setShowDetails(true);
    setRotation(false);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setShowDetails(true);
    setRotation(false);
  };

  const toggleRotation = () => setRotation((r) => !r);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === 0 ? filteredArtworks.length - 1 : (prev ?? 0) - 1
    );
    setShowDetails(true);
    setRotation(false);
  }, [selectedIndex, filteredArtworks.length]);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === filteredArtworks.length - 1 ? 0 : (prev ?? 0) + 1
    );
    setShowDetails(true);
    setRotation(false);
  }, [selectedIndex, filteredArtworks.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (e.key === "ArrowLeft") goPrev();
        else if (e.key === "ArrowRight") goNext();
        else if (e.key.toLowerCase() === "r") toggleRotation();
        else if (e.key === "Escape") closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, goPrev, goNext]);

  // Auto-hide details after 3s
  useEffect(() => {
    if (selectedIndex !== null) {
      const timer = setTimeout(() => setShowDetails(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedIndex]);

  if (loading) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Gallery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Loading artworks...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A curated collection of visual artworks
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setFilter(category);
                  setVisibleCount(8);
                }}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === category
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white/20 text-gray-600 dark:text-gray-300 hover:bg-white/30"
                }`}
              >
                {category.charAt(0).toUpperCase() +
                  category.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {visibleArtworks.map((artwork, index) => {
            if (!artwork.image) return null;
            return (
              <motion.div
                key={artwork._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="break-inside-avoid mb-4 group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-2xl border bg-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-500">
                  <Image
                    src={urlFor(artwork.image).url()}
                    alt={artwork.title || "Artwork"}
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        {visibleCount < filteredArtworks.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-6 py-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300"
            >
              Load More
            </button>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null &&
            filteredArtworks[selectedIndex] &&
            filteredArtworks[selectedIndex].image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={closeLightbox}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Controls */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <button
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button
                    onClick={toggleRotation}
                    className="absolute bottom-4 right-4 z-50 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <RotateCw className="w-6 h-6" />
                  </button>

                  {/* Image */}
                  <div
                    className={`relative w-full h-full flex items-center justify-center ${
                      rotation ? "rotate-90" : ""
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 animate-pulse blur-3xl"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <Image
                      src={urlFor(
                        filteredArtworks[selectedIndex].image
                      ).url()}
                      alt={filteredArtworks[selectedIndex].title || "Artwork"}
                      width={1200}
                      height={800}
                      className="w-full h-auto max-h-[80vh] object-contain rounded-2xl relative z-10"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Gallery;
