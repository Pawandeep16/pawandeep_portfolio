"use client";

import { useCallback, useEffect, useState } from "react";
import { client, GALLERY_QUERY } from "@/lib/sanity";
import { fallbackGallery } from "@/lib/fallback-data";
import type { Artwork } from "@/lib/types";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { BorderlessViewer } from "@/components/gallery-3d/viewer";
import type { OriginRect } from "@/components/gallery-3d/frame";

/**
 * Gallery — MDJAmin's "Animated image slider" (CodePen GgpdKPy), v26,
 * with the research quick wins in v28: autoplay off by default with a
 * progress ring, 48px arrows, category filters + Featured, and a
 * "View all" grid. The carousel reports its filtered list up via
 * onVisibleChange so the fullscreen viewer follows the same filter.
 * Data comes from Sanity (GALLERY_QUERY) with the fallback snapshot.
 * The v12 Three.js room stays dormant.
 */
export function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>(fallbackGallery);
  const [visibleArtworks, setVisibleArtworks] = useState<Artwork[]>(fallbackGallery);
  const [selected, setSelected] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<OriginRect | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch(GALLERY_QUERY);
        if (alive && Array.isArray(data) && data.length) setArtworks(data);
      } catch {
        /* snapshot stays */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const total = visibleArtworks.length;

  const handleVisibleChange = useCallback((list: Artwork[]) => {
    setVisibleArtworks(list);
  }, []);

  const openArtwork = useCallback((index: number, rect: OriginRect | null) => {
    setOriginRect(rect);
    setSelected(index);
  }, []);
  const close = useCallback(() => setSelected(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setSelected((cur) => (cur === null ? cur : (cur + dir + total) % total));
    },
    [total]
  );

  return (
    <>
      <GalleryCarousel artworks={artworks} onOpen={openArtwork} onVisibleChange={handleVisibleChange} />

      {/* Borderless viewer — only Previous / Next visible; Esc or backdrop closes */}
      <BorderlessViewer artworks={visibleArtworks} selected={selected} originRect={originRect} onClose={close} onStep={step} />
    </>
  );
}
