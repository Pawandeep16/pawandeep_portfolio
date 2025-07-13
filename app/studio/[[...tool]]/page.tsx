'use client'; // 👈 Add this at the top

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export const dynamic = 'force-static';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
