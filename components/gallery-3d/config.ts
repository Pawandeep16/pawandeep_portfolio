// Re-export: the single source of truth lives in lib/gallery-config.ts.
// This file exists so the gallery-3d/ folder is self-describing.
export {
  GALLERY_CONFIG,
  segmentCentreZ,
  cameraZForProgress,
  isWebGLAvailable,
} from "@/lib/gallery-config";
export type { GalleryConfig } from "@/lib/gallery-config";
