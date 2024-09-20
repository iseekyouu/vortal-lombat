import React from 'react';

const FightTimer: React.FC<{}> = () => {
  const [timeLeft, setTimeLeft] = React.useState(99); // Initial fight timer (99 seconds)

    // Timer logic
    React.useEffect(() => {
      if (timeLeft > 0) {
        const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [timeLeft]);

  return (
    <div className="flex items-center justify-center w-20 h-12 bg-black border-2 border-yellow-600 text-yellow-400 text-3xl font-bold">
      {timeLeft}
    </div>
  );
};

export default FightTimer;