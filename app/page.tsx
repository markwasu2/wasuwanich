"use client";

import { useState, useRef } from "react";
import { HOTSPOTS } from "./hotspots";

export default function Home() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleHotspotClick = (id: string) => {
    setSelectedHotspot(id);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const selectedHotspotData = HOTSPOTS.find((h) => h.id === selectedHotspot);

  return (
    <div className="scene-container">
      {/* Background Image */}
      <div className="background-image">
        {/* Placeholder for the magical bookstore image */}
        <div className="placeholder-text">
          Add your magical bookstore image to public/magic-bookstore.jpg
        </div>
      </div>

      {/* Hotspots */}
      {HOTSPOTS.map((hotspot) => (
        <button
          key={hotspot.id}
          className="hotspot"
          style={{
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
          }}
          onClick={() => handleHotspotClick(hotspot.id)}
          aria-label={hotspot.label}
        >
          <span className="hotspot-pulse"></span>
        </button>
      ))}

      {/* Info Panel */}
      {selectedHotspotData && (
        <div className="info-panel">
          <button
            className="close-button"
            onClick={() => setSelectedHotspot(null)}
            aria-label="Close"
          >
            ×
          </button>
          <h2>{selectedHotspotData.label}</h2>
          <p>{selectedHotspotData.description}</p>
        </div>
      )}

      {/* Music Control */}
      <button className="music-button" onClick={toggleMusic}>
        {isPlaying ? "🔇 Pause Music" : "🎵 Play Music"}
      </button>

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/audio/lofi.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
