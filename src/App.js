import React, { useState } from 'react';
import { Trash2, Plus, RotateCcw, Printer, Users } from 'lucide-react';

export default function App() {
  const [ageGroups, setAgeGroups] = useState([
    { name: 'Under 12', players: ['Player 1', 'Player 2', 'Player 3', 'Player 4'] }
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const addAgeGroup = () => {
    if (newGroupName.trim() && ageGroups.length < 10) {
      setAgeGroups([...ageGroups, { name: newGroupName.trim(), players: [] }]);
      setNewGroupName('');
      setActiveGroupIndex(ageGroups.length);
    }
  };

  const removeAgeGroup = (index) => {
    if (ageGroups.length > 1) {
      setAgeGroups(ageGroups.filter((_, i) => i !== index));
      if (activeGroupIndex >= index && activeGroupIndex > 0) {
        setActiveGroupIndex(activeGroupIndex - 1);
      }
    }
  };

  const updateGroupName = (index, name) => {
    const updated = [...ageGroups];
    updated[index].name = name;
    setAgeGroups(updated);
  };

  const addPlayer = (groupIndex) => {
    if (newPlayerName.trim() && ageGroups[groupIndex].players.length < 30) {
      const updated = [...ageGroups];
      updated[groupIndex].players.push(newPlayerName.trim());
      setAgeGroups(updated);
      setNewPlayerName('');
    }
  };

  const removePlayer = (groupIndex, playerIndex) => {
    const updated = [...ageGroups];
    updated[groupIndex].players = updated[groupIndex].players.filter((_, i) => i !== playerIndex);
    setAgeGroups(updated);
  };

  const updatePlayerName = (groupIndex, playerIndex, name) => {
    const updated = [...ageGroups];
    updated[groupIndex].players[playerIndex] = name;
    setAgeGroups(updated);
  };

  const generateMatches = (players) => {
    if (players.length < 2) return [];
    const matches = [];
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        matches.push({ player1: players[i], player2: players[j] });
      }
    }
    return matches;
  };

  const handlePrint = () => {
    window.print();
  };

  const activeGroup = ageGroups[activeGroupIndex];
  const matches = generateMatches(activeGroup.players);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header - Hidden in print */}
        <div className="print:hidden bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Tennis Round Robin Schedule</h1>
              <p className="text-gray-600">Manage multiple age groups and generate complete schedules</p>
            </div>
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold"
            >
              <Printer size={20} />
              Print Schedule
            </button>
          </div>

          {/* Age Group Management */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Age Groups</h3>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addAgeGroup()}
                placeholder="Enter age group name (e.g., Under 14)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={30}
              />
              <button
                onClick={addAgeGroup}
                disabled={!newGroupName.trim() || ageGroups.length >= 10}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Users size={20} />
                Add Group
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {ageGroups.map((group, index) => (
                <div key={index} className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveGroupIndex(index)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      activeGroupIndex === index
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {group.name} ({group.players.length})
                  </button>
                  {ageGroups.length > 1 && (
                    <button
                      onClick={() => removeAgeGroup(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Remove age group"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Player Management */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Players in {activeGroup.name}
              </h3>
              <input
                type="text"
                value={activeGroup.name}
                onChange={(e) => updateGroupName(activeGroupIndex, e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                maxLength={30}
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer(activeGroupIndex)}
                placeholder="Enter player name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                maxLength={30}
              />
              <button
                onClick={() => addPlayer(activeGroupIndex)}
                disabled={!newPlayerName.trim() || activeGroup.players.length >= 30}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus size={20} />
                Add Player
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {activeGroup.players.map((player, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-600 font-semibold min-w-[24px]">{index + 1}.</span>
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => updatePlayerName(activeGroupIndex, index, e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={30}
                  />
                  <button
                    onClick={() => removePlayer(activeGroupIndex, index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Remove player"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600">
              {activeGroup.players.length} players · {matches.length} total matches
            </p>
          </div>
        </div>

        {/* Print View - Shows all age groups */}
        <div className="hidden print:block">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Tennis Round Robin Tournament</h1>
            <p className="text-gray-600">Complete Match Schedule</p>
          </div>

          {ageGroups.map((group, groupIndex) => {
            const groupMatches = generateMatches(group.players);
            if (groupMatches.length === 0) return null;

            return (
              <div key={groupIndex} className="mb-12 break-inside-avoid">
                <div className="border-b-4 border-green-600 pb-2 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{group.name}</h2>
                  <p className="text-gray-600">{group.players.length} players · {groupMatches.length} matches</p>
                </div>

                <div className="space-y-2">
                  {groupMatches.map((match, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border-2 border-gray-300 rounded">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full font-bold text-gray-700 text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 flex items-center justify-between gap-4">
                        <span className="font-semibold text-gray-800">{match.player1}</span>
                        <span className="text-gray-500 font-bold text-sm">vs</span>
                        <span className="font-semibold text-gray-800">{match.player2}</span>
                      </div>
                      <div className="w-24 px-2 py-1 border-2 border-gray-400 rounded text-center text-xs text-gray-500">
                        Court: _____
                      </div>
                      <div className="w-32 px-2 py-1 border-2 border-gray-400 rounded text-center text-xs text-gray-500">
                        Winner: __________
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Screen View - Current age group only */}
        <div className="print:hidden bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Match Schedule: {activeGroup.name}</h2>
          
          {matches.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Add at least 2 players to generate matches</p>
          ) : (
            <div className="space-y-3">
              {matches.map((match, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full font-bold text-gray-700 border-2 border-green-600">
                    {index + 1}
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-4">
                    <span className="font-semibold text-gray-800 text-lg">{match.player1}</span>
                    <span className="text-gray-500 font-bold">vs</span>
                    <span className="font-semibold text-gray-800 text-lg">{match.player2}</span>
                  </div>
                  <div className="w-32 px-3 py-2 bg-white rounded border border-gray-300 text-center text-sm text-gray-500">
                    Court ___
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="print:hidden mt-6 text-center text-sm text-gray-600">
          <p>💡 Click "Print Schedule" to generate a printer-friendly version with all age groups!</p>
        </div>
      </div>

      <style>{`
        @media print {
          body { 
            background: white !important;
            margin: 0;
            padding: 20px;
          }
          @page {
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
}