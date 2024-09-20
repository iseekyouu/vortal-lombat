const useAudio = (audioSrc: string, muted?: boolean) => {
  const audio = new Audio(audioSrc);
  const play = () => {
    audio.currentTime = 0; // Rewind to start
    if (!muted) {
      audio.play();
    }
};

  return { play };
};

export default useAudio;