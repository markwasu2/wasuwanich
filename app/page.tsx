"use client";

import { useState, useRef, useEffect } from "react";
import { HOTSPOTS } from "./hotspots";

export default function Home() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showAnimalPrints, setShowAnimalPrints] = useState(false);
  const [showBlankPage, setShowBlankPage] = useState(false);
  const [showPenDrop, setShowPenDrop] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showChatbox, setShowChatbox] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const paperSoundRef = useRef<HTMLAudioElement>(null);
  const pageFlipSoundRef = useRef<HTMLAudioElement>(null);
  const penDropSoundRef = useRef<HTMLAudioElement>(null);
  const writingSoundRef = useRef<HTMLAudioElement>(null);
  const meowSoundRef = useRef<HTMLAudioElement>(null);
  const purrSoundRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const pageFlipGainNodeRef = useRef<GainNode | null>(null);

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
    console.log("Double-clicked hotspot:", id);
    if (id === "letters-box") {
      setShowEnvelope(true);
      setShowLetter(false);
      setSelectedHotspot(null);
    } else if (id === "sleeping-cat") {
      setShowAnimalPrints(true);
      setShowBlankPage(false);
      setSelectedHotspot(null);
    } else if (id === "ink-bottle") {
      // Play pen drop sound
      if (penDropSoundRef.current) {
        penDropSoundRef.current.currentTime = 0;
        penDropSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setShowPenDrop(true);
      setShowWishlist(false);
      setSelectedHotspot(null);
    } else if (id === "open-notebook") {
      console.log("Opening chatbox...");
      setShowChatbox(true);
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

  const closePenDrop = () => {
    setShowPenDrop(false);
    setShowWishlist(false);
  };

  const handlePenDropClick = () => {
    if (!showWishlist) {
      // Play writing sound
      if (writingSoundRef.current) {
        writingSoundRef.current.currentTime = 0;
        writingSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      
      // Transition to wishlist
      setShowWishlist(true);
    }
  };

  const closeChatbox = () => {
    setShowChatbox(false);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...chatMessages, { role: "user", content: userMessage }]
        }),
      });

      const data = await response.json();
      if (data.error) {
        setChatMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Sorry, I encountered an error. Please try again." 
        }]);
      } else {
        setChatMessages(prev => [...prev, { 
          role: "assistant", 
          content: data.message 
        }]);
      }
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I couldn't connect. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimalPrintsClick = () => {
    if (!showBlankPage) {
      // Play page flip sound at amplified volume (150% using gain)
      if (pageFlipSoundRef.current) {
        // Initialize audio context and gain node only once
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          const source = audioContextRef.current.createMediaElementSource(pageFlipSoundRef.current);
          pageFlipGainNodeRef.current = audioContextRef.current.createGain();
          pageFlipGainNodeRef.current.gain.value = 1.5; // 150% volume (50% louder)
          source.connect(pageFlipGainNodeRef.current);
          pageFlipGainNodeRef.current.connect(audioContextRef.current.destination);
        }
        
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

      {/* Pen Drop Overlay */}
      {showPenDrop && (
        <div className="envelope-overlay" onClick={closePenDrop}>
          <button
            className="close-button"
            onClick={closePenDrop}
            aria-label="Close"
          >
            ×
          </button>
          {!showWishlist ? (
            <img 
              src="/pendrop.png" 
              alt="Pen Drop" 
              className="envelope-image letter-reveal"
              onClick={(e) => {
                e.stopPropagation();
                handlePenDropClick();
              }}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <img 
              src="/wishlist.png" 
              alt="Wishlist" 
              className="envelope-image letter-reveal"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}

      {/* Chatbox Overlay */}
      {showChatbox && (
        <div className="envelope-overlay" onClick={closeChatbox} style={{ zIndex: 200 }}>
          <div className="chatbox" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={closeChatbox}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="chatbox-title">~ Magical Notebook ~</h2>
            <div className="chatbox-messages">
              {chatMessages.length === 0 && (
                <p className="chatbox-placeholder">The pages await your words...</p>
              )}
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.role}`}>
                  <p>{msg.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="chat-message assistant">
                  <p>Thinking...</p>
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="chatbox-form">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Write your thoughts here..."
                className="chatbox-input"
                disabled={isLoading}
              />
              <button type="submit" className="chatbox-send" disabled={isLoading}>
                Send
              </button>
            </form>
          </div>
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

      {/* Pen Drop Sound */}
      <audio 
        ref={penDropSoundRef}
        preload="auto"
      >
        <source src="/audio/pendrop.mp3" type="audio/mpeg" />
      </audio>

      {/* Writing Sound */}
      <audio 
        ref={writingSoundRef}
        preload="auto"
      >
        <source src="/audio/writing.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
