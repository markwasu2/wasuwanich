"use client";

import { useState, useRef, useEffect } from "react";
import { HOTSPOTS } from "./hotspots";

export default function Home() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const paperSoundRef = useRef<HTMLAudioElement>(null);

  const handleHotspotClick = (id: string) => {
    setSelectedHotspot(id);
  };

  const handleHotspotDoubleClick = (id: string) => {
    if (id === "letters-box") {
      setShowEnvelope(true);
      setSelectedHotspot(null);
    }
  };

  const closeEnvelope = () => {
    setShowEnvelope(false);
    setShowLetter(false);
    setIsTransitioning(false);
  };

  const handleEnvelopeClick = () => {
    if (!showLetter && !isTransitioning) {
      setIsTransitioning(true);
      
      // Play paper sound effect
      if (paperSoundRef.current) {
        paperSoundRef.current.currentTime = 0;
        paperSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      
      // Wait 2 seconds before showing the letter
      setTimeout(() => {
        setShowLetter(true);
        setIsTransitioning(false);
      }, 2000);
    }
  };

  // Auto-play music when component mounts
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          // Set volume to 10% for very subtle background ambience
          audioRef.current.volume = 0.1;
          
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

      {/* Instructions */}
      <div className="instructions">
        <p>click once to learn</p>
        <p>click twice to know</p>
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
          onDoubleClick={() => handleHotspotDoubleClick(hotspot.id)}
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

      {/* Envelope Overlay */}
      {showEnvelope && (
        <div className="envelope-overlay" onClick={closeEnvelope}>
          <button
            className="close-button"
            onClick={closeEnvelope}
            aria-label="Close"
          >
            ×
          </button>
          {!showLetter ? (
            <img 
              src="/envelope.png" 
              alt="Sealed Letter" 
              className={`envelope-image ${isTransitioning ? 'transitioning' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleEnvelopeClick();
              }}
              style={{ cursor: isTransitioning ? 'wait' : 'pointer' }}
            />
          ) : (
            <img 
              src="/letter.png" 
              alt="Opened Letter" 
              className="envelope-image letter-reveal"
              onClick={(e) => e.stopPropagation()}
            />
          )}
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

      {/* Paper Sound Effect */}
      <audio 
        ref={paperSoundRef}
        preload="auto"
      >
        <source src="/audio/paper.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
