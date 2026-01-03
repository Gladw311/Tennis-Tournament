import React, { useState } from 'react';
import { Trash2, Plus, RotateCcw, Printer, Users } from 'lucide-react';

export default function TennisRoundRobin() {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - Hidden in print */}
        <div className="print:hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-3">Tennis Round Robin Schedule</h1>
              <p className="text-gray-600 text-lg">Manage multiple age groups and generate complete schedules</p>
            </div>
            <button
              onClick={handlePrint}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Printer size={22} />
              Print Schedule
            </button>
          </div>

          {/* Age Group Management */}
          <div className="mb-8 pb-8 border-b-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={24} className="text-emerald-600" />
              Age Groups
            </h3>
            <div className="flex items-center gap-3 mb-5">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addAgeGroup()}
                placeholder="Enter age group name (e.g., Under 14)"
                className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
                maxLength={30}
              />
              <button
                onClick={addAgeGroup}
                disabled={!newGroupName.trim() || ageGroups.length >= 10}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus size={20} />
                Add Group
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {ageGroups.map((group, index) => (
                <div key={index} className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveGroupIndex(index)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
                      activeGroupIndex === index
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    {group.name} ({group.players.length})
                  </button>
                  {ageGroups.length > 1 && (
                    <button
                      onClick={() => removeAgeGroup(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove age group"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Player Management */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-800">
                Players in {activeGroup.name}
              </h3>
              <input
                type="text"
                value={activeGroup.name}
                onChange={(e) => updateGroupName(activeGroupIndex, e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-semibold transition-all"
                maxLength={30}
              />
            </div>

            <div className="flex items-center gap-3 mb-5">
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer(activeGroupIndex)}
                placeholder="Enter player name"
                className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
                maxLength={30}
              />
              <button
                onClick={() => addPlayer(activeGroupIndex)}
                disabled={!newPlayerName.trim() || activeGroup.players.length >= 30}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus size={20} />
                Add Player
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {activeGroup.players.map((player, index) => (
                <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md">
                  <span className="flex items-center justify-center w-8 h-8 bg-emerald-600 text-white font-bold rounded-full text-sm">{index + 1}</span>
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => updatePlayerName(activeGroupIndex, index, e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all"
                    maxLength={30}
                  />
                  <button
                    onClick={() => removePlayer(activeGroupIndex, index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove player"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border-2 border-emerald-200">
              <p className="text-sm font-semibold text-gray-700">
                📊 {activeGroup.players.length} players · 🎾 {matches.length} total matches
              </p>
            </div>
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
        <div className="print:hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-6">Match Schedule: {activeGroup.name}</h2>
          
          {matches.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎾</div>
              <p className="text-gray-500 text-lg">Add at least 2 players to generate matches</p>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((match, index) => (
                <div key={index} className="flex items-center gap-5 p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-xl border-2 border-emerald-200 hover:border-emerald-400 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-full font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-6">
                    <span className="font-bold text-gray-800 text-xl">{match.player1}</span>
                    <span className="text-emerald-600 font-extrabold text-xl">VS</span>
                    <span className="font-bold text-gray-800 text-xl">{match.player2}</span>
                  </div>
                  <div className="px-6 py-3 bg-white rounded-xl border-2 border-gray-300 text-center text-sm text-gray-600 font-semibold shadow-sm min-w-[140px]">
                    Court: _____
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="print:hidden mt-8 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 inline-block shadow-lg border border-white/30">
            <p className="text-sm text-gray-700 font-medium">💡 Click <span className="font-bold text-emerald-600">"Print Schedule"</span> to generate a printer-friendly version with all age groups!</p>
          </div>
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