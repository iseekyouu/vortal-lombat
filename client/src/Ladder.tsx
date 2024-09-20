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
    const apiUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://vlombat.vlprojects.pro/api'
        : 'http://localhost:3092/api';
    fetch(`${apiUrl}/ladder`) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data: FightRecord[]) => setRecords(data))
      .catch((error) => console.error('Error fetching fight records:', error));
  }, []);

  return (
    <div className="w-full p-8 bg-black text-yellow-400 rounded-lg shadow-lg min-h-[500px] max-h-[700px]">
      <h1 className="text-5xl font-bold text-red-600 uppercase mb-8 animate-pulse text-center">
        Fighting Ladder
      </h1>
      <table className="w-full bg-zinc-900 border-4 border-red-600 text-yellow-400 shadow-2xl rounded-lg">
        <thead>
          <tr className="bg-red-800 text-yellow-300 uppercase text-xl font-bold tracking-widest">
            <th className="py-3 px-6 border-b-4 border-red-600">Fighter</th>
            <th className="py-3 px-6 border-b-4 border-red-600">Wins</th>
            <th className="py-3 px-6 border-b-4 border-red-600">Loses</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr
              key={index}
              className="bg-zinc-800 text-yellow-400 text-center hover:bg-red-600 hover:text-yellow-300 transition-all duration-300"
            >
              <td className="py-4 px-6 border-b-2 border-red-600">{record.fighter}</td>
              <td className="py-4 px-6 border-b-2 border-red-600">{record.wins}</td>
              <td className="py-4 px-6 border-b-2 border-red-600">{record.loses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ladder;