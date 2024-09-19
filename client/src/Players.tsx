import React from 'react';
import fighters from './Figters';

interface GridItemProps {
  id: number;
}

const GridItem: React.FC<GridItemProps> = ({ id }) => (
  <div className="bg-blue-500 text-white flex items-center justify-center h-24">
    Item {id}
  </div>
);

const GridLayout: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {fighters.map((fighter) => (
        <GridItem key={fighter.name} id={fighter.id} />
      ))}
    </div>
  );
};

export default GridLayout;