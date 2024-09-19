import { useRef } from 'react';

// Custom hook for handling audio playback
const useAudio = (audioSrc: string, muted?: boolean) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play the audio
  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to start
      if (!muted) {
        audioRef.current.play();
      }
    }
  };

  return { play, audioRef };
};

export default useAudio;