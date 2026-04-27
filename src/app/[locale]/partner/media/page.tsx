"use client";

import { useCallback } from "react";
import PartnerLayout from "@/components/layout/PartnerLayout";
import { ImageUploader, type MediaAsset } from "@/components/upload/ImageUploader";
import { MediaGrid } from "@/components/upload/MediaGrid";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function MediaAssets() {
  const queryClient = useQueryClient();

  const { data: assets = [], isLoading, error, refetch } = useQuery<MediaAsset[]>({
    queryKey: ["media", "restaurant"],
    queryFn: async () => {
      const res = await fetch("/api/upload?entityType=restaurant");
      if (!res.ok) throw new Error("Failed to load media");
      const { assets: data } = await res.json();
      return data ?? [];
    }
  });

  const handleUpload = useCallback((asset: MediaAsset) => {
    queryClient.setQueryData(["media", "restaurant"], (old: MediaAsset[] = []) => [asset, ...old]);
  }, [queryClient]);

  const handleDelete = useCallback((id: string) => {
    queryClient.setQueryData(["media", "restaurant"], (old: MediaAsset[] = []) => old.filter((a) => a.id !== id));
  }, [queryClient]);

  return (
    <PartnerLayout>
      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <header className="pb-12 border-b border-white/5 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block">
              Visual Repository
            </span>
            <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-white">
              The <span className="text-primary">Media.</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-600 max-w-xs">
            {assets.length} asset{assets.length !== 1 ? "s" : ""} · JPEG, PNG, WebP up to 10 MB
          </p>
        </header>

        <ImageUploader
          entityType="restaurant"
          assetType="general"
          onUpload={handleUpload}
        />

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
            <span className="material-symbols-outlined text-base">error</span>
            {error instanceof Error ? error.message : "Failed to load media"}
            <button
              onClick={() => refetch()}
              className="ml-auto text-[10px] font-black uppercase tracking-widest hover:text-red-300 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-3xl text-zinc-700 animate-spin">
              progress_activity
            </span>
          </div>
        ) : (
          <MediaGrid assets={assets} onDelete={handleDelete} />
        )}
      </div>
    </PartnerLayout>
  );
}
