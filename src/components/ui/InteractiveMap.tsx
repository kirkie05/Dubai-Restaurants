"use client";

import { GoogleMap, MarkerF, useJsApiLoader, type Libraries } from "@react-google-maps/api";
import { useCallback } from "react";
import Image from "next/image";
import { Link } from "@/navigation";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 25.2048,
  lng: 55.2708,
};

const mapStyles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#666666" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#C5A059" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#111111" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#222222" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#050505" }],
  },
];

const libraries: Libraries = ["marker"];

interface InteractiveMapProps {
  markers?: { id: string | number; name: string; position: { lat: number; lng: number } }[];
}

export function InteractiveMap({ markers = [] }: InteractiveMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
    libraries,
  });

  const onLoad = useCallback(() => {
    // Map loaded.
  }, []);

  const onUnmount = useCallback(() => {
    // Map unmounted.
  }, []);

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center relative overflow-hidden group">
        <Image
          src="/dubai_map_placeholder_1776870966162.png"
          alt="Dubai Spatial Discovery"
          fill
          className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-1000 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

        <div className="relative z-10 p-12 text-center space-y-8 max-w-xl">
          <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-xl flex items-center justify-center mx-auto border border-primary/30 group-hover:scale-110 transition-transform duration-700">
            <span className="material-symbols-outlined text-primary text-5xl animate-pulse">map</span>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-headline text-3xl md:text-5xl font-black italic tracking-tighter leading-tight">
              Interactive Discovery <br />
              <span className="text-primary">Coming Soon.</span>
            </h3>
            <p className="text-zinc-400 font-body text-base md:text-xl italic leading-relaxed">
              We are finalizing our high-fidelity spatial engine. Please use our verified directory listings in the meantime.
            </p>
          </div>
          <div className="pt-6">
            <Link
              href="/restaurants"
              className="inline-block bg-white text-zinc-900 px-10 py-5 rounded-2xl font-headline font-black text-xl italic hover:bg-primary hover:text-white transition-all shadow-2xl"
            >
              Browse Repository
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-center p-8">
        <p className="text-zinc-500 font-body italic text-sm">Failed to load spatial discovery engine. Please refresh or try again later.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-zinc-900 animate-pulse flex items-center justify-center">
        <span className="text-zinc-500 font-headline italic">Loading Spatial Discovery...</span>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {markers.map((marker) => (
        <MarkerF
          key={marker.id}
          position={marker.position}
          title={marker.name}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#DC2626",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
            scale: 2,
            anchor: new google.maps.Point(12, 22),
          }}
        />
      ))}
    </GoogleMap>
  );
}
