import type { NextConfig } from 'next';
const figmaPreviewHost = process.env.LESSONCONNECT_FIGMA_PREVIEW_HOST;
const config: NextConfig = {
  output: 'export',
  images: {unoptimized: true},
  devIndicators: false,
  turbopack: {root: process.cwd()},
  // Only the explicitly configured Figma preview may use the remote dev server.
  allowedDevOrigins: figmaPreviewHost ? [figmaPreviewHost] : [],
};
export default config;
