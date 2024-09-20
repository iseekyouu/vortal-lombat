// src/Ladder.tsx
import React, { useEffect, useState } from 'react';

// Define a type for the fight record data
interface FightRecord {
  fighter: string;
  wins: number;
  loses: number;
}

const Ladder: React.FC = () => {
  const [records, setRecords] = useState<FightRecord[]>([]);

  // Fetch data from the backend API
  useEffect(() => {
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://vlombat.vlprojects.pro/api' : 'http://localhost:3092/api';
    fetch(`${apiUrl}/ladder`) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data: FightRecord[]) => setRecords(data))
      .catch((error) => console.error('Error fetching fight records:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fighting Ladder</h1>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-50 text-black">
          <tr>
            <th className="py-2 px-4 border-b">Fighter</th>
            <th className="py-2 px-4 border-b">Wins</th>
            <th className="py-2 px-4 border-b">Loses</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className="hover:bg-gray-100 text-black">
              <td className="py-2 px-4 border-b">{record.fighter}</td>
              <td className="py-2 px-4 border-b">{record.wins}</td>
              <td className="py-2 px-4 border-b">{record.loses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ladder;