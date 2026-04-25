"use client";

import { useCallback, useEffect, useState } from "react";
import { ImageUploader, type MediaAsset } from "@/components/upload/ImageUploader";
import { MediaGrid } from "@/components/upload/MediaGrid";

export default function ChefMediaPage() {
  const [assets, setAssets]   = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/upload?entityType=chef");
      if (!res.ok) throw new Error("Failed to load media");
      const { assets: data } = await res.json();
      setAssets(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAssets(); }, [fetchAssets]);

  const handleUpload = useCallback((asset: MediaAsset) => {
    setAssets((prev) => [asset, ...prev]);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="pb-12 border-b border-white/5 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4">
          <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block">
            Visual Archive
          </span>
          <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter">
            The <span className="text-primary">Media.</span>
          </h1>
        </div>
        <p className="text-xs text-zinc-600 max-w-xs">
          {assets.length} asset{assets.length !== 1 ? "s" : ""} · JPEG, PNG, WebP up to 10 MB
        </p>
      </header>

      <ImageUploader
        entityType="chef"
        assetType="general"
        onUpload={handleUpload}
      />

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
          <span className="material-symbols-outlined text-base">error</span>
          {error}
          <button
            onClick={fetchAssets}
            className="ml-auto text-[10px] font-black uppercase tracking-widest hover:text-red-300 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="material-symbols-outlined text-3xl text-zinc-700 animate-spin">
            progress_activity
          </span>
        </div>
      ) : (
        <MediaGrid assets={assets} onDelete={handleDelete} />
      )}
    </div>
  );
}
