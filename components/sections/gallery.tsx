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
  const [visibleCount, setVisibleCount] = useState(8);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const [rotation, setRotation] = useState(false);

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

  const categories = ['all', ...new Set(
    artworks.flatMap((art) => Array.isArray(art.category) ? art.category : [])
  )];

  const filteredArtworks = filter === 'all'
    ? artworks
    : artworks.filter((art) => Array.isArray(art.category) && art.category.includes(filter));

  const visibleArtworks = filteredArtworks.slice(0, visibleCount);

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

  useEffect(() => {
    if (selectedIndex !== null) {
      const timer = setTimeout(() => setShowDetails(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedIndex]);

  const toggleRotation = () => setRotation((r) => !r);

  const isLandscape = (art: Artwork) => {
    if (!art.image?.asset?.metadata) return false;
    const { width, height } = art.image.asset.metadata.dimensions;
    return width > height;
  };

  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(prev => (prev === 0 ? filteredArtworks.length - 1 : (prev ?? 0) - 1));
    setShowDetails(true);
    setRotation(false);
  };

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
            <p className="text-xl text-gray-600 dark:text-gray-300">Loading artworks...</p>
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
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">Gallery</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">A curated collection of visual artworks</p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => { setFilter(category); setVisibleCount(8); }}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/20 text-gray-600 dark:text-gray-300 hover:bg-white/30'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {visibleArtworks.map((artwork, index) => (
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
                  alt={artwork.title}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < filteredArtworks.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="px-6 py-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300"
            >
              Load More
            </button>
          </div>
        )}

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
                className="relative max-w-7xl w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={closeLightbox} className="absolute -top-12 right-0 text-white">
                  <X className="w-8 h-8" />
                </button>
                <div className="absolute top-1/2 left-2 -translate-y-1/2">
                  <button onClick={goPrev} className="w-10 h-10 bg-black/50 text-white rounded-full">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-1/2 right-2 -translate-y-1/2">
                  <button onClick={goNext} className="w-10 h-10 bg-black/50 text-white rounded-full">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                <div className={`relative rounded-2xl transition-transform duration-500 ${rotation ? 'rotate-90' : ''}`}
                     style={{ maxHeight: '90vh' }}>
                  <Image
                    src={urlFor(filteredArtworks[selectedIndex].image).url()}
                    alt={filteredArtworks[selectedIndex].title}
                    width={1200}
                    height={800}
                    className="max-w-full object-contain"
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
