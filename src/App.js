import React, { useState } from "react";
import { Users, DollarSign, Wrench, Percent, Trash2, Plus } from "lucide-react";

export default function LootSplitter() {
  const [players, setPlayers] = useState([""]);
  const [lootAmount, setLootAmount] = useState("");
  const [repairCost, setRepairCost] = useState("");
  const [commission, setCommission] = useState("");

  const addPlayer = () => {
    setPlayers([...players, ""]);
  };

  const removePlayer = (index) => {
    if (players.length > 1) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const roundToEven = (num) => {
    return Math.round(num / 2) * 2;
  };

  const calculateSplit = () => {
    const loot = parseFloat(lootAmount) || 0;
    const repair = parseFloat(repairCost) || 0;
    const comm = parseFloat(commission) || 0;

    const activePlayers = players.filter((p) => p.trim() !== "");
    if (activePlayers.length === 0) return null;

    const afterRepair = loot - repair;
    const commissionAmount = (afterRepair * comm) / 100;
    const afterCommission = afterRepair - commissionAmount;
    const perPlayer = afterCommission / activePlayers.length;
    const perPlayerRounded = roundToEven(perPlayer);

    return {
      activePlayers,
      loot,
      repair,
      afterRepair,
      commission: comm,
      commissionAmount,
      afterCommission,
      perPlayer: perPlayerRounded,
    };
  };

  const result = calculateSplit();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-purple-500/20">
          <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Loot Splitter
          </h1>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="text-purple-400" size={20} />
              <label className="text-lg font-semibold text-purple-200">
                Players
              </label>
            </div>
            {players.map((player, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updatePlayer(index, e.target.value)}
                  placeholder={`Player ${index + 1}`}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition"
                />
                {players.length > 1 && (
                  <button
                    onClick={() => removePlayer(index)}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addPlayer}
              className="w-full mt-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-300 flex items-center justify-center gap-2 transition"
            >
              <Plus size={18} />
              Add Player
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-green-400" size={20} />
              <label className="text-sm font-semibold text-purple-200">
                Loot Amount
              </label>
            </div>
            <input
              type="number"
              value={lootAmount}
              onChange={(e) => setLootAmount(e.target.value)}
              placeholder="1000"
              className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="text-orange-400" size={20} />
              <label className="text-sm font-semibold text-purple-200">
                Repair Cost
              </label>
            </div>
            <input
              type="number"
              value={repairCost}
              onChange={(e) => setRepairCost(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="text-yellow-400" size={20} />
              <label className="text-sm font-semibold text-purple-200">
                Commission (%)
              </label>
            </div>
            <input
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition"
            />
          </div>

          {result && result.activePlayers.length > 0 && (
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/30">
              <h2 className="text-xl font-bold mb-4 text-purple-200">
                Calculation
              </h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-slate-300">
                  <span>Loot:</span>
                  <span className="font-semibold">
                    {result.loot.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Repair:</span>
                  <span className="font-semibold text-red-400">
                    -{result.repair.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300 border-t border-purple-500/20 pt-2">
                  <span>After Repair:</span>
                  <span className="font-semibold">
                    {result.afterRepair.toFixed(2)}
                  </span>
                </div>
                {result.commission > 0 && (
                  <>
                    <div className="flex justify-between text-slate-300">
                      <span>Commission ({result.commission}%):</span>
                      <span className="font-semibold text-yellow-400">
                        -{result.commissionAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300 border-t border-purple-500/20 pt-2">
                      <span>After Commission:</span>
                      <span className="font-semibold">
                        {result.afterCommission.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-purple-500/20 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-purple-300 mb-1">
                    Per Player (Rounded to Even)
                  </div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    {result.perPlayer}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-purple-200 mb-2">
                  Players ({result.activePlayers.length}):
                </h3>
                {result.activePlayers.map((player, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-700/30 rounded-lg px-3 py-2"
                  >
                    <span className="text-slate-200">{player}</span>
                    <span className="text-green-400 font-semibold">
                      {result.perPlayer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
