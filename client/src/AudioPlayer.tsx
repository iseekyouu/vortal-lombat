import React, { useRef, useState } from 'react';
import { SCREENS } from './constants';

interface AudioPlayerProps {
  audioSrc: string; // Path to the audio file
  playOnStart?: boolean;
  currentScreen: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, playOnStart, currentScreen }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Manage play/pause state
  const [volume, setVolume] = useState(1); // Volume state, default 1 (100%)

  // Handle play/pause toggle
  const handlePlay = (pause?: boolean) => {
    if (audioRef.current) {
      if (pause) {
        // Fade out the audio before pausing
        const fadeStep = 0.05; // Step by which the volume will decrease
        const fadeInterval = 50; // Interval for decreasing volume in milliseconds

        let currentVolume = audioRef.current.volume;

        const fadeOut = setInterval(() => {
          if (audioRef.current) {
            if (currentVolume > 0) {
              currentVolume = Math.max(0, currentVolume - fadeStep); // Decrease volume
              audioRef.current.volume = currentVolume;
            } else {
              clearInterval(fadeOut);
              audioRef.current.pause(); // Pause the audio after fade out
              setIsPlaying(false); // Update state
              audioRef.current.volume = 1; // Reset volume to full for the next play
            }
          }
        }, fadeInterval);

        return;
      }

      if (isPlaying) {
        audioRef.current.pause(); // Pause the audio if it is currently playing
      } else {
        audioRef.current.play(); // Play the audio if it is currently paused
      }
      setIsPlaying(!isPlaying); // Toggle the play/pause state
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Set audio element volume
    }
  };

  React.useEffect(() => {
    if (playOnStart) {
      handlePlay();
    }
  }, [])

  React.useEffect(() => {
    if (currentScreen === SCREENS.FIGHT) {
      handlePlay(true);
    }
  }, [currentScreen])

  return (
    <div className="flex items-center space-x-4 mt-8"> {/* Flexbox container with space between items */}
      {/* Toggle Play/Pause button */}
      <button
        onClick={() => handlePlay}
        className="px-6 py-3 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-800"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Volume control slider */}
      <div className="flex items-center">
        <label htmlFor="volume" className="text-xl text-yellow-400 mr-2">
          Volume
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-64"
        />
      </div>

      {/* Audio element for background sound */}
      <audio ref={audioRef} src={audioSrc} loop />
    </div>
  );
};

export default AudioPlayer;