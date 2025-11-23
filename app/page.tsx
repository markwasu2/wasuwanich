"use client";

import { useState, useRef, useEffect } from "react";
import { HOTSPOTS } from "./hotspots";

export default function Home() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showAnimalPrints, setShowAnimalPrints] = useState(false);
  const [showBlankPage, setShowBlankPage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const paperSoundRef = useRef<HTMLAudioElement>(null);
  const pageFlipSoundRef = useRef<HTMLAudioElement>(null);
  const meowSoundRef = useRef<HTMLAudioElement>(null);
  const purrSoundRef = useRef<HTMLAudioElement>(null);

  const handleHotspotClick = (id: string) => {
    setSelectedHotspot(id);
    
    // If clicking cat, play random meow or purr sound
    if (id === "sleeping-cat") {
      const useMeow = Math.random() < 0.5;
      const soundRef = useMeow ? meowSoundRef : purrSoundRef;
      if (soundRef.current) {
        soundRef.current.currentTime = 0;
        soundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
    }
  };

  const handleHotspotDoubleClick = (id: string) => {
    if (id === "letters-box") {
      setShowEnvelope(true);
      setSelectedHotspot(null);
    } else if (id === "sleeping-cat") {
      setShowAnimalPrints(true);
      setSelectedHotspot(null);
    }
  };

  const closeEnvelope = () => {
    setShowEnvelope(false);
    setShowLetter(false);
    setIsTransitioning(false);
  };

  const closeAnimalPrints = () => {
    setShowAnimalPrints(false);
    setShowBlankPage(false);
  };

  const handleAnimalPrintsClick = () => {
    if (!showBlankPage) {
      // Play page flip sound at amplified volume (150% using gain)
      if (pageFlipSoundRef.current) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContext.createMediaElementSource(pageFlipSoundRef.current);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 1.5; // 150% volume (50% louder)
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        pageFlipSoundRef.current.currentTime = 0;
        pageFlipSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      
      // Transition to blank page
      setShowBlankPage(true);
    }
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

      {/* Animal Prints Overlay */}
      {showAnimalPrints && (
        <div className="envelope-overlay" onClick={closeAnimalPrints}>
          <button
            className="close-button"
            onClick={closeAnimalPrints}
            aria-label="Close"
          >
            ×
          </button>
          {!showBlankPage ? (
            <img 
              src="/animalprints.png" 
              alt="Animal Prints" 
              className="envelope-image letter-reveal"
              onClick={(e) => {
                e.stopPropagation();
                handleAnimalPrintsClick();
              }}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <img 
              src="/blankpage.png" 
              alt="Blank Page" 
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

      {/* Cat Meow Sound */}
      <audio 
        ref={meowSoundRef}
        preload="auto"
      >
        <source src="/audio/meow.mp3" type="audio/mpeg" />
      </audio>

      {/* Cat Purr Sound */}
      <audio 
        ref={purrSoundRef}
        preload="auto"
      >
        <source src="/audio/purr.mp3" type="audio/mpeg" />
      </audio>

      {/* Page Flip Sound */}
      <audio 
        ref={pageFlipSoundRef}
        preload="auto"
      >
        <source src="/audio/pageflip.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
