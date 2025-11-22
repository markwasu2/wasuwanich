"use client";

import { useState, useRef, useEffect } from "react";
import { HOTSPOTS } from "./hotspots";

export default function Home() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleHotspotClick = (id: string) => {
    setSelectedHotspot(id);
  };

  // Auto-play music when component mounts
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          // Set volume to 20% for very subtle background ambience
          audioRef.current.volume = 0.2;
          
          // Attempt to play
          await audioRef.current.play();
        } catch (error) {
          // Browser may block autoplay, user will need to interact first
          console.log("Autoplay blocked. User interaction required.");
          
          // Add click listener to start music on first user interaction
          const startMusic = async () => {
            if (audioRef.current) {
              try {
                await audioRef.current.play();
                document.removeEventListener("click", startMusic);
              } catch (e) {
                console.log("Failed to play audio:", e);
              }
            }
          };
          document.addEventListener("click", startMusic);
        }
      }
    };

    playAudio();
  }, []);

  const selectedHotspotData = HOTSPOTS.find((h) => h.id === selectedHotspot);

  return (
    <div className="scene-container">
      {/* Background Image */}
      <div className="background-image"></div>

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

      {/* Audio Element - Seamless Looping */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        playsInline
      >
        <source src="/audio/Tavern_Study_Loop_2025-11-22T205621 (1).mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
