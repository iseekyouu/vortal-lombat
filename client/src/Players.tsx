import React from 'react';
import fighters, { Fighter } from './Fighters';

interface GridItemProps {
  fighter: Fighter;
}

const GridItem: React.FC<GridItemProps> = ({ fighter }) => (
  <div className="bg-blue-500 text-white flex items-center justify-center h-24">
    {fighter.name}
  </div>
);

const GridLayout: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {fighters.map((fighter) => (
        <GridItem key={fighter.name} fighter={fighter} />
      ))}
    </div>
  );
};

export default GridLayout;