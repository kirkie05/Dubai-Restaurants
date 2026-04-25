"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Navbar } from "@/components/layout/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { supabase } from "@/lib/supabase";

type Message = {
  type: "success" | "error";
  text: string;
};

interface CSVRow {
  name: string;
  location: string;
  description: string;
  cuisine: string;
  price_range?: string;
  rating?: string;
  latitude?: string;
  longitude?: string;
  image_url?: string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

export default function AdminImportPage() {
  const [data, setData] = useState<CSVRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data.filter((row) => row.name && row.location);
        setData(rows);
        setMessage({ type: "success", text: `Found ${rows.length} rows ready to upload.` });
      },
      error: (error) => {
        setMessage({ type: "error", text: `CSV parsing error: ${error.message}` });
      },
    });
  };

  const handleImport = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const { data: cuisines, error: cuisineError } = await supabase
        .from("cuisines")
        .select("id, slug, name");

      if (cuisineError) {
        throw cuisineError;
      }

      const restaurantsToInsert = data.map((row) => {
        const slug = row.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
        const cuisineSlug = row.cuisine.toLowerCase().replace(/ /g, "-");
        const matchedCuisine = cuisines?.find(
          (c) => c.slug === cuisineSlug || c.name.toLowerCase() === row.cuisine.toLowerCase()
        );

        return {
          name: row.name,
          slug,
          location: row.location,
          description: row.description,
          cuisine_id: matchedCuisine?.id,
          price_range: row.price_range || "$$$",
          rating: parseFloat(row.rating || "0"),
          latitude: parseFloat(row.latitude || "0"),
          longitude: parseFloat(row.longitude || "0"),
          image_url: row.image_url || "/placeholder_restaurant.png",
          is_claimed: false,
          plan: "free",
        };
      });

      const { error } = await supabase
        .from("restaurants")
        .upsert(restaurantsToInsert, { onConflict: "slug" });

      if (error) {
        throw error;
      }

      setMessage({
        type: "success",
        text: `Upload complete. ${restaurantsToInsert.length} restaurants are now in the claimable database.`,
      });
      setData([]);
    } catch (error) {
      setMessage({ type: "error", text: `Upload failed: ${getErrorMessage(error)}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-5xl mx-auto pt-32 pb-20 px-6">
        <Reveal className="space-y-12">
          <header className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter leading-none">
              Admin Restaurant Upload
            </h1>
            <p className="text-lg text-slate-600 font-body leading-relaxed max-w-3xl">
              Upload your restaurant CSV file here. Every imported restaurant is marked as <strong>not claimed</strong> so owners can claim it later and choose a <strong>free</strong> or <strong>paid</strong> plan.
            </p>
          </header>

          <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-xl space-y-8">
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">Step 1: Select CSV File</label>
              <div className="relative group">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center group-hover:border-primary/40 transition-all bg-slate-50">
                  <span className="material-symbols-outlined text-4xl text-slate-400 mb-4 block">upload_file</span>
                  <p className="text-sm text-slate-600">Click to choose a CSV file.</p>
                </div>
              </div>
            </div>

            {data.length > 0 ? (
              <div className="space-y-6 pt-8 border-t border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h3 className="font-headline font-black italic text-2xl tracking-tight">
                    Step 2: Review ({data.length} rows)
                  </h3>
                  <button
                    onClick={handleImport}
                    disabled={loading}
                    className="bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary transition-all disabled:opacity-50"
                  >
                    {loading ? "Uploading..." : "Upload Restaurants"}
                  </button>
                </div>

                <div className="max-h-[420px] overflow-y-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left text-sm">
                    <thead className="sticky top-0 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100">
                      <tr>
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Location</th>
                        <th className="px-5 py-3">Cuisine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.map((row, index) => (
                        <tr key={`${row.name}-${index}`} className="hover:bg-slate-50">
                          <td className="px-5 py-3 font-semibold">{row.name}</td>
                          <td className="px-5 py-3 text-slate-600">{row.location}</td>
                          <td className="px-5 py-3 text-primary font-semibold">{row.cuisine}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {message ? (
              <div
                className={`p-5 rounded-2xl text-sm ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-rose-50 text-rose-700 border border-rose-100"
                }`}
              >
                {message.text}
              </div>
            ) : null}
          </div>

          <div className="bg-zinc-900 text-white p-8 rounded-[2rem] space-y-4">
            <h4 className="font-headline font-black italic text-xl">Required CSV Columns</h4>
            <p className="text-sm text-zinc-300">`name`, `location`, `description`, `cuisine`</p>
            <p className="text-sm text-zinc-300">Optional: `price_range`, `rating`, `latitude`, `longitude`, `image_url`</p>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
