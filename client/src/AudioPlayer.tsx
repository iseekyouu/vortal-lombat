import React, { useRef, useState } from 'react';

interface AudioPlayerProps {
  audioSrc: string; // Path to the audio file
  playOnStart?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, playOnStart }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Manage play/pause state
  const [volume, setVolume] = useState(1); // Volume state, default 1 (100%)

  // Handle play/pause toggle
  const handlePlay = () => {
    if (audioRef.current) {
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

  return (
    <div className="flex items-center space-x-4 mt-8"> {/* Flexbox container with space between items */}
      {/* Toggle Play/Pause button */}
      <button
        onClick={handlePlay}
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