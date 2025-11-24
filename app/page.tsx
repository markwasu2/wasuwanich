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
  const [showKettle, setShowKettle] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);
  const [triviaQuestion, setTriviaQuestion] = useState<any>(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaTotal, setTriviaTotal] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoadingTrivia, setIsLoadingTrivia] = useState(false);
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
  const notebookSoundRef = useRef<HTMLAudioElement>(null);
  const notebookWriteSoundRef = useRef<HTMLAudioElement>(null);
  const coffeeSoundRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const pageFlipGainNodeRef = useRef<GainNode | null>(null);
  const coffeeAudioContextRef = useRef<AudioContext | null>(null);
  const coffeeGainNodeRef = useRef<GainNode | null>(null);

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
    
    // Close info panel when double-clicking
    setSelectedHotspot(null);
    
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
      // Play notebook sound
      if (notebookSoundRef.current) {
        notebookSoundRef.current.currentTime = 0;
        notebookSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setShowChatbox(true);
      setSelectedHotspot(null);
    } else if (id === "coffee-mug") {
      // Play coffee sound at amplified volume (300% using gain)
      if (coffeeSoundRef.current) {
        // Initialize audio context and gain node only once
        if (!coffeeAudioContextRef.current) {
          coffeeAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          const source = coffeeAudioContextRef.current.createMediaElementSource(coffeeSoundRef.current);
          coffeeGainNodeRef.current = coffeeAudioContextRef.current.createGain();
          coffeeGainNodeRef.current.gain.value = 3.0; // 300% volume (3x louder)
          source.connect(coffeeGainNodeRef.current);
          coffeeGainNodeRef.current.connect(coffeeAudioContextRef.current.destination);
        }
        
        coffeeSoundRef.current.currentTime = 0;
        coffeeSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setShowKettle(true);
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

  const closeKettle = () => {
    setShowKettle(false);
  };

  const closeTrivia = () => {
    setShowTrivia(false);
    setTriviaQuestion(null);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const handleKettleClick = async () => {
    setShowKettle(false);
    setShowTrivia(true);
    await loadTriviaQuestion();
  };

  const loadTriviaQuestion = async () => {
    setIsLoadingTrivia(true);
    setSelectedAnswer(null);
    setShowAnswer(false);
    
    try {
      const response = await fetch("/api/trivia");
      const data = await response.json();
      
      if (data.error) {
        console.error("Failed to load trivia:", data.error);
      } else {
        setTriviaQuestion(data);
      }
    } catch (error) {
      console.error("Trivia loading error:", error);
    } finally {
      setIsLoadingTrivia(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showAnswer) return;
    
    // Play click sound
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    setSelectedAnswer(index);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    
    // Play click sound
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    setShowAnswer(true);
    setTriviaTotal(prev => prev + 1);
    
    if (selectedAnswer === triviaQuestion.correctIndex) {
      setTriviaScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = async () => {
    await loadTriviaQuestion();
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

    // Play notebook write sound
    if (notebookWriteSoundRef.current) {
      notebookWriteSoundRef.current.currentTime = 0;
      notebookWriteSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }

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

      if (!response.ok) {
        console.error("Chat API error:", response.status, response.statusText);
        setChatMessages(prev => [...prev, { 
          role: "assistant", 
          content: `Error: ${response.status}. Please check that the API key is configured in Vercel environment variables.` 
        }]);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      if (data.error) {
        console.error("Chat error:", data.error);
        setChatMessages(prev => [...prev, { 
          role: "assistant", 
          content: `Error: ${data.error}. Please try again.` 
        }]);
      } else {
        setChatMessages(prev => [...prev, { 
          role: "assistant", 
          content: data.message 
        }]);
      }
    } catch (error) {
      console.error("Chat fetch error:", error);
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I couldn't connect. Please check your internet connection and try again." 
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

      {/* Kettle Overlay */}
      {showKettle && (
        <div className="envelope-overlay" onClick={closeKettle}>
          <button
            className="close-button"
            onClick={closeKettle}
            aria-label="Close"
          >
            ×
          </button>
          <img 
            src="/kettle.png" 
            alt="Kettle" 
            className="envelope-image letter-reveal"
            onClick={(e) => {
              e.stopPropagation();
              handleKettleClick();
            }}
            style={{ cursor: 'pointer' }}
          />
        </div>
      )}

      {/* Trivia Game Overlay */}
      {showTrivia && (
        <div className="envelope-overlay" onClick={closeTrivia}>
          <div className="trivia-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={closeTrivia}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="trivia-title">~ Library Riddles ~</h2>
            <div className="trivia-score">Score: {triviaScore} / {triviaTotal}</div>
            
            {isLoadingTrivia ? (
              <div className="trivia-loading">Conjuring a riddle...</div>
            ) : triviaQuestion ? (
              <div className="trivia-content">
                <p className="trivia-question">{triviaQuestion.question}</p>
                
                <div className="trivia-options">
                  {triviaQuestion.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      className={`trivia-option ${
                        selectedAnswer === index ? 'selected' : ''
                      } ${
                        showAnswer && index === triviaQuestion.correctIndex ? 'correct' : ''
                      } ${
                        showAnswer && selectedAnswer === index && index !== triviaQuestion.correctIndex ? 'incorrect' : ''
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showAnswer}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showAnswer && (
                  <div className={`trivia-feedback ${selectedAnswer === triviaQuestion.correctIndex ? 'correct-feedback' : 'incorrect-feedback'}`}>
                    <p className="feedback-title">
                      {selectedAnswer === triviaQuestion.correctIndex ? '✓ Correct!' : '✗ Incorrect'}
                    </p>
                    <p className="feedback-explanation">{triviaQuestion.explanation}</p>
                  </div>
                )}

                <div className="trivia-actions">
                  {!showAnswer ? (
                    <button 
                      className="trivia-submit" 
                      onClick={handleAnswerSubmit}
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button 
                      className="trivia-next" 
                      onClick={handleNextQuestion}
                    >
                      Next Riddle
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
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

      {/* Notebook Open Sound */}
      <audio 
        ref={notebookSoundRef}
        preload="auto"
      >
        <source src="/audio/notebook.mp3" type="audio/mpeg" />
      </audio>

      {/* Notebook Write Sound */}
      <audio 
        ref={notebookWriteSoundRef}
        preload="auto"
      >
        <source src="/audio/notebookwrite.mp3" type="audio/mpeg" />
      </audio>

      {/* Coffee Sound */}
      <audio 
        ref={coffeeSoundRef}
        preload="auto"
      >
        <source src="/audio/coffee.mp3" type="audio/mpeg" />
      </audio>

      {/* Click Sound */}
      <audio 
        ref={clickSoundRef}
        preload="auto"
      >
        <source src="/audio/click.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
