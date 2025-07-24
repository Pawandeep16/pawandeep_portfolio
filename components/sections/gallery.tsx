'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { client, GALLERY_QUERY, urlFor } from '@/lib/sanity';
import { Artwork } from '@/lib/types';

export function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  // Lightbox state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const [rotation, setRotation] = useState(false);

  // Fetch artworks
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await client.fetch(GALLERY_QUERY);
        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowLeft') goPrev();
        else if (e.key === 'ArrowRight') goNext();
        else if (e.key.toLowerCase() === 'r') toggleRotation();
        else if (e.key === 'Escape') closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Filter categories
  const categories = ['all', ...new Set(
    artworks.flatMap((artwork) =>
      Array.isArray(artwork.category) ? artwork.category : []
    )
  )];

  // Filter artworks by category
  const filteredArtworks =
    filter === 'all'
      ? artworks
      : artworks.filter((artwork) =>
          Array.isArray(artwork.category) && artwork.category.includes(filter)
        );

  // Open lightbox with index
  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setShowDetails(true);
    setRotation(false);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedIndex(null);
    setShowDetails(true);
    setRotation(false);
  };

  // Show details briefly then fade out after 3s
  useEffect(() => {
    if (selectedIndex !== null) {
      const timer = setTimeout(() => setShowDetails(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedIndex]);

  // Rotate image toggle
  const toggleRotation = () => setRotation((r) => !r);

  // Check if artwork image is landscape
  const isLandscape = (artwork: Artwork) => {
    if (!artwork.image?.asset?.metadata) return false;
    const { width, height } = artwork.image.asset.metadata.dimensions;
    return width > height;
  };

  // Go to previous artwork
  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(prev => (prev === 0 ? filteredArtworks.length - 1 : (prev ?? 0) - 1));
    setShowDetails(true);
    setRotation(false);
  };

  // Go to next artwork
  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(prev => (prev === filteredArtworks.length - 1 ? 0 : (prev ?? 0) + 1));
    setShowDetails(true);
    setRotation(false);
  };

  if (loading) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">Gallery</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Loading artworks...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6 float-animation">Gallery</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            A curated collection of visual artworks and creative expressions
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/20 text-gray-600 dark:text-gray-300 hover:bg-white/30'
                }`}
              >
                {category
                  ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
                  : ''}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <Image
                  src={urlFor(artwork.image).url()}
                  alt={artwork.title}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ aspectRatio: 'auto' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold mb-1">{artwork.title}</h3>
                  {artwork.year && <p className="text-sm opacity-80">{artwork.year}</p>}
                  {artwork.client && <p className="text-xs opacity-60">Client: {artwork.client}</p>}
                </div>
                {artwork.category?.[0] && (
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
                      {artwork.category[0]?.replace('-', ' ')}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
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
                className="relative max-w-7xl max-h-full w-full max-w-md md:max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-20"
                  aria-label="Close"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Prev Button */}
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20">
                  <button
                    onClick={goPrev}
                    className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>

                {/* Next Button */}
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20">
                  <button
                    onClick={goNext}
                    className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Rotate Button (only show if landscape and on small screens) */}
                {isLandscape(filteredArtworks[selectedIndex]) && (
                  <div className="absolute bottom-20 right-4 md:hidden z-20">
                    <button
                      onClick={toggleRotation}
                      className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                      aria-label="Rotate Image"
                      title="Rotate Image"
                    >
                      <RotateCw className="w-6 h-6" />
                    </button>
                  </div>
                )}

                {/* Image Container with rotation */}
                <div
                  className={`relative overflow-hidden rounded-2xl glow-effect transition-transform duration-500 ${
                    rotation ? "rotate-90" : ""
                  }`}
                  style={{ maxHeight: "90vh" }}
                >
                  <Image
                    src={urlFor(filteredArtworks[selectedIndex].image).url()}
                    alt={filteredArtworks[selectedIndex].title}
                    width={1200}
                    height={800}
                    className="max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl transition-opacity duration-700 ${
                    showDetails ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {filteredArtworks[selectedIndex].title}
                  </h3>
                  {showDetails && (
                    <>
                      {filteredArtworks[selectedIndex].description && (
                        <p className="text-gray-300 mb-2">
                          {filteredArtworks[selectedIndex].description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {filteredArtworks[selectedIndex].category?.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                          >
                            {cat.replace("-", " ")}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        {filteredArtworks[selectedIndex].year && (
                          <span>Year: {filteredArtworks[selectedIndex].year}</span>
                        )}
                        {filteredArtworks[selectedIndex].client && (
                          <span>Client: {filteredArtworks[selectedIndex].client}</span>
                        )}
                      </div>
                    </>
                  )}
                  <div className="w-16 h-1 bg-blue-400 rounded-full mt-4" />
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
