const HealthBar: React.FC<{ health: number; maxHealth: number; reversed?: boolean, name: string }> = ({
  health,
  maxHealth,
  reversed,
  name,
}) => {
  const healthPercentage = health > 0 ? (health / maxHealth) * 100 : 0;
  return (
    <div className="relative w-full h-12 bg-red-800 border-2 border-yellow-600 rounded-lg overflow-hidden shadow-lg">
      {/* Health indicator */}
      <div
        className={`absolute top-0 ${reversed ? "right-0" : "left-0"} h-full bg-green-500 transition-all duration-300`}
        style={{ width: `${healthPercentage}%`, transform: reversed ? 'scaleX(-1)' : 'none' }}
      ></div>

      {/* Name inside the health bar */}
      <span
        className={`absolute top-0 left-0 right-0 h-full flex items-center ${
          reversed ? "justify-end pr-4" : "justify-start pl-4"
        } text-yellow-400 font-bold text-lg uppercase z-10`}
      >
        {name}
      </span>
    </div>
  );
};

export default HealthBar;