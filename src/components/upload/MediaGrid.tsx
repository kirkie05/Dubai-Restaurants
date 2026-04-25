"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaAsset } from "./ImageUploader";

type Props = {
  assets: MediaAsset[];
  onDelete: (id: string) => void;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function MediaGrid({ assets, onDelete }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    setConfirmId(null);
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (res.ok || res.status === 204) onDelete(id);
    } finally {
      setDeleting(null);
    }
  };

  if (assets.length === 0) {
    return (
      <div className="text-center py-24 space-y-4 text-zinc-700">
        <span className="material-symbols-outlined text-6xl block">photo_library</span>
        <p className="text-sm font-black uppercase tracking-widest">No media uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="group relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
        >
          <Image
            src={asset.public_url}
            alt={asset.file_name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
          />

          {/* Scrim */}
          <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/20 transition-all" />

          {/* Meta */}
          <div className="absolute bottom-6 left-6 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              {asset.asset_type}
            </p>
            <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">
              {formatBytes(asset.file_size)} · {formatDate(asset.created_at)}
            </p>
          </div>

          {/* Delete button / confirm */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            {confirmId === asset.id ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(asset.id)}
                  disabled={deleting === asset.id}
                  className="px-3 py-1.5 bg-red-600 rounded-xl text-[9px] font-black uppercase tracking-widest text-white hover:bg-red-500 transition-colors"
                >
                  {deleting === asset.id ? "…" : "Delete"}
                </button>
                <button
                  onClick={() => setConfirmId(null)}
                  className="px-3 py-1.5 bg-zinc-800 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmId(asset.id)}
                className="p-2.5 bg-zinc-900/80 backdrop-blur-xl rounded-full text-zinc-500 hover:text-red-400 transition-colors"
                aria-label="Delete image"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
