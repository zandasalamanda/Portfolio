import manifest from '@/content/asset-manifest.json';

export interface AssetEntry {
  exists: boolean;
  width?: number | null;
  height?: number | null;
  optional?: boolean;
}

export interface ResolvedAsset extends AssetEntry {
  rel: string;
  url: string;
}

const assets: Record<string, AssetEntry> =
  (manifest as { assets?: Record<string, AssetEntry> }).assets ?? {};

/** Look up a client-provided asset by its §9 path, e.g. "chronoiq/logo.png". */
export function asset(rel: string): ResolvedAsset {
  const entry = assets[rel] ?? { exists: false };
  return { ...entry, rel, url: `/assets/${rel}` };
}
