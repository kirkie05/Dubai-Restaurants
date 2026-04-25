"use client";

import { useCallback, useRef, useState } from "react";

export type MediaAsset = {
  id: string;
  public_url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  asset_type: string;
  entity_type: string;
  entity_id: string;
  bucket_path: string;
  created_at: string;
};

type AssetType = "hero" | "gallery" | "menu" | "profile" | "general";

type Props = {
  entityType: "chef" | "restaurant";
  entityId?: string;
  assetType?: AssetType;
  onUpload: (asset: MediaAsset) => void;
};

const ASSET_TYPE_OPTIONS: { value: AssetType; label: string }[] = [
  { value: "general",  label: "General" },
  { value: "hero",     label: "Hero" },
  { value: "gallery",  label: "Gallery" },
  { value: "profile",  label: "Profile" },
  { value: "menu",     label: "Menu" },
];

export function ImageUploader({ entityType, entityId, assetType: initialAssetType = "general", onUpload }: Props) {
  const inputRef  = useRef<HTMLInputElement>(null);
  const [uploading, setUploading]     = useState(false);
  const [progress, setProgress]       = useState(0);
  const [error, setError]             = useState<string | null>(null);
  const [dragOver, setDragOver]       = useState(false);
  const [assetType, setAssetType]     = useState<AssetType>(initialAssetType);

  const upload = useCallback(async (file: File) => {
    setError(null);
    setUploading(true);
    setProgress(0);

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPEG, PNG, and WebP images are allowed");
      setUploading(false);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10 MB");
      setUploading(false);
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("entityType", entityType);
    if (entityId) fd.append("entityId", entityId);
    fd.append("assetType", assetType);

    // Fake progress ticks while fetch is in-flight
    const ticker = setInterval(() => setProgress((p) => Math.min(p + 8, 88)), 180);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      clearInterval(ticker);
      setProgress(100);

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");

      onUpload(json.asset as MediaAsset);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      clearInterval(ticker);
      setUploading(false);
      setProgress(0);
    }
  }, [entityType, entityId, assetType, onUpload]);

  const handleFiles = useCallback((list: FileList | null) => {
    if (list?.[0]) upload(list[0]);
  }, [upload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <div className="space-y-4">
      {/* Asset-type selector */}
      <div className="flex flex-wrap gap-2">
        {ASSET_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setAssetType(opt.value)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              assetType === opt.value
                ? "bg-primary text-white"
                : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload image"
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all select-none ${
          uploading
            ? "pointer-events-none border-primary/40"
            : dragOver
              ? "cursor-copy border-primary bg-primary/5 scale-[1.01]"
              : "cursor-pointer border-zinc-700 hover:border-zinc-500 hover:bg-white/[0.02]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
        />

        {uploading ? (
          <div className="space-y-5">
            <span className="material-symbols-outlined text-5xl text-primary animate-pulse block">cloud_upload</span>
            <div className="max-w-xs mx-auto space-y-2">
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{progress}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 pointer-events-none">
            <span className="material-symbols-outlined text-5xl text-zinc-700 block">add_photo_alternate</span>
            <div>
              <p className="text-sm font-semibold text-white">Click or drag image here</p>
              <p className="text-xs text-zinc-600 mt-1">JPEG · PNG · WebP · Max 10 MB</p>
            </div>
          </div>
        )}

        {error && (
          <p className="absolute bottom-4 inset-x-0 text-xs text-red-400 px-4">{error}</p>
        )}
      </div>
    </div>
  );
}
