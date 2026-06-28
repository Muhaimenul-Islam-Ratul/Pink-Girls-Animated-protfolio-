import React, { useState, useEffect } from "react";
import { Gamepad2, Info, RefreshCw, Trophy, AlertCircle, ArrowRight } from "lucide-react";

type Owner = "player" | "cpu" | null;

interface BoardCell {
  id: number;
  owner: Owner;
  x: number; // For rendering positioning percentage
  y: number;
}

// Connections database representing standard Morris board graph line segments
const connections = {
  0: [1, 3, 4],
  1: [0, 2, 4],
  2: [1, 5, 4],
  3: [0, 6, 4],
  4: [0, 1, 2, 3, 5, 6, 7, 8],
  5: [2, 8, 4],
  6: [3, 7, 4],
  7: [6, 8, 4],
  8: [5, 7, 4],
};

const WINNING_COMBOS = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6], // Diagonal 2
];

export default function ThreeMenMorris() {
  const initialCells: BoardCell[] = [
    { id: 0, owner: null, x: 15, y: 15 },
    { id: 1, owner: null, x: 50, y: 15 },
    { id: 2, owner: null, x: 85, y: 15 },
    { id: 3, owner: null, x: 15, y: 50 },
    { id: 4, owner: null, x: 50, y: 50 },
    { id: 5, owner: null, x: 85, y: 50 },
    { id: 6, owner: null, x: 15, y: 85 },
    { id: 7, owner: null, x: 50, y: 85 },
    { id: 8, owner: null, x: 85, y: 85 },
  ];

  const [cells, setCells] = useState<BoardCell[]>(initialCells);
  const [playerPiecesPlaced, setPlayerPiecesPlaced] = useState<number>(0);
  const [cpuPiecesPlaced, setCpuPiecesPlaced] = useState<number>(0);
  const [turn, setTurn] = useState<"player" | "cpu">("player");
  const [selectedPieceId, setSelectedPieceId] = useState<number | null>(null);
  const [winner, setWinner] = useState<Owner | "draw">(null);
  const [statusMessage, setStatusMessage] = useState<string>("Phase 1: Setup. Take turns placing your 3 tokens on empty nodes.");

  // Helper function to count total current parts on table
  const countPieces = (owner: Owner) => cells.filter((c) => c.owner === owner).length;

  const resetGame = () => {
    setCells(initialCells);
    setPlayerPiecesPlaced(0);
    setCpuPiecesPlaced(0);
    setTurn("player");
    setSelectedPieceId(null);
    setWinner(null);
    setStatusMessage("Phase 1: Setup. Take turns placing your 3 tokens on empty nodes.");
  };

  const checkWinner = (currentCells: BoardCell[]): Owner | null => {
    for (const combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (
        currentCells[a].owner &&
        currentCells[a].owner === currentCells[b].owner &&
        currentCells[a].owner === currentCells[c].owner
      ) {
        return currentCells[a].owner;
      }
    }
    return null;
  };

  const getAdjacentCells = (id: number): number[] => {
    return connections[id as keyof typeof connections] || [];
  };

  // CPU move triggers when it's CPU's turn
  useEffect(() => {
    if (turn === "cpu" && !winner) {
      const cpuTimer = setTimeout(() => {
        makeCpuMove();
      }, 950);
      return () => clearTimeout(cpuTimer);
    }
  }, [turn, winner, cells]);

  const makeCpuMove = () => {
    let nextCells = [...cells];

    // CPU Phase 1: Placement
    if (cpuPiecesPlaced < 3) {
      // Find empty nodes on board
      const emptyCells = nextCells.filter((c) => c.owner === null);
      if (emptyCells.length === 0) return;

      // Smart AI rule: First, try to place immediately in center or block player or win
      // Let's check if CPU has 2 pieces and can win in next placement
      let targetCellId = -1;
      
      // 1. Check for immediate CPU winning opportunities
      for (const combo of WINNING_COMBOS) {
        const owners = combo.map(idx => nextCells[idx].owner);
        const cpuCount = owners.filter(o => o === "cpu").length;
        const nullCount = owners.filter(o => o === null).length;
        if (cpuCount === 2 && nullCount === 1) {
          const emptyIdxInCombo = combo.find(idx => nextCells[idx].owner === null);
          if (emptyIdxInCombo !== undefined) {
            targetCellId = emptyIdxInCombo;
            break;
          }
        }
      }

      // 2. Check to block player winning line
      if (targetCellId === -1) {
        for (const combo of WINNING_COMBOS) {
          const owners = combo.map(idx => nextCells[idx].owner);
          const playerCount = owners.filter(o => o === "player").length;
          const nullCount = owners.filter(o => o === null).length;
          if (playerCount === 2 && nullCount === 1) {
            const emptyIdxInCombo = combo.find(idx => nextCells[idx].owner === null);
            if (emptyIdxInCombo !== undefined) {
              targetCellId = emptyIdxInCombo;
              break;
            }
          }
        }
      }

      // 3. Fallback to center or random
      if (targetCellId === -1) {
        const centerCell = nextCells.find(c => c.id === 4);
        if (centerCell && centerCell.owner === null) {
          targetCellId = 4;
        } else {
          // select random empty cell
          const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          targetCellId = randomCell.id;
        }
      }

      nextCells[targetCellId].owner = "cpu";
      setCpuPiecesPlaced((prev) => prev + 1);
      
      const gameWinner = checkWinner(nextCells);
      if (gameWinner) {
        setWinner(gameWinner);
        setStatusMessage("Computer wins! Reset to try again.");
      } else {
        setCells(nextCells);
        setTurn("player");
        if (playerPiecesPlaced >= 3 && cpuPiecesPlaced + 1 >= 3) {
          setStatusMessage("Phase 2: All tokens placed! Click one of your pink tokens, then click an adjacent empty node to slide it.");
        } else {
          setStatusMessage("Your turn. Place your next token on any empty circle.");
        }
      }
    } 
    // CPU Phase 2: Slide movement
    else {
      // Find all CPU pieces
      const cpuPieces = nextCells.filter((c) => c.owner === "cpu");
      let moved = false;

      // Smart slide: Loop through cpu pieces, check if any can move to win or block
      // Simplification: find valid moves
      const validMoves: { from: number; to: number }[] = [];
      cpuPieces.forEach((piece) => {
        const adj = getAdjacentCells(piece.id);
        adj.forEach((adjId) => {
          if (nextCells[adjId].owner === null) {
            validMoves.push({ from: piece.id, to: adjId });
          }
        });
      });

      if (validMoves.length === 0) {
        // CPU has no valid moves: stalemate -> user wins or draw
        setWinner("player");
        setStatusMessage("Computer has no legal moves! You win!");
        return;
      }

      // AI Move Selection (Prefers Winning slides, followed by blocks, followed by random)
      let selectedMove = validMoves[0];
      
      // 1. Try to find winning slide
      for (const move of validMoves) {
        const testCells = nextCells.map((c) => {
          if (c.id === move.from) return { ...c, owner: null as Owner };
          if (c.id === move.to) return { ...c, owner: "cpu" as Owner };
          return c;
        });
        if (checkWinner(testCells) === "cpu") {
          selectedMove = move;
          moved = true;
          break;
        }
      }

      // 2. Try to random-select move
      if (!moved) {
        selectedMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      }

      nextCells[selectedMove.from].owner = null;
      nextCells[selectedMove.to].owner = "cpu";

      const gameWinner = checkWinner(nextCells);
      if (gameWinner) {
        setWinner(gameWinner);
        setStatusMessage("Computer wins! Click 'Restart' to refine your tactical defense.");
      } else {
        setCells(nextCells);
        setTurn("player");
        setStatusMessage("Your turn. Slide an adjacent token to a linked empty node.");
      }
    }
  };

  const handleCellClick = (cellId: number) => {
    if (turn === "cpu" || winner) return;

    let nextCells = [...cells];
    const cell = nextCells.find((c) => c.id === cellId);
    if (!cell) return;

    // Phase 1 Placement
    if (playerPiecesPlaced < 3) {
      if (cell.owner !== null) {
        setStatusMessage("Invalid: That node is already occupied!");
        return;
      }

      nextCells[cellId].owner = "player";
      const newPlaced = playerPiecesPlaced + 1;
      setPlayerPiecesPlaced(newPlaced);

      const gameWinner = checkWinner(nextCells);
      if (gameWinner) {
        setWinner(gameWinner);
        setStatusMessage("Spectacular! You won Three Men Morris!");
      } else {
        setCells(nextCells);
        setTurn("cpu");
        setStatusMessage("Computer's turn to place a token...");
      }
    } 
    // Phase 2 Movement
    else {
      // User is selecting a piece to move
      if (selectedPieceId === null) {
        if (cell.owner !== "player") {
          setStatusMessage("Invalid Action: Click one of your own pink tokens first.");
          return;
        }
        setSelectedPieceId(cellId);
        setStatusMessage("Selected. Now click a connected empty dot to slide it.");
      } 
      // User is moving selected piece to targeted cellId
      else {
        // Can toggle/deselect if clicking another player piece
        if (cell.owner === "player") {
          setSelectedPieceId(cellId);
          setStatusMessage("Selection toggled. Click adjacent empty dot.");
          return;
        }

        if (cell.owner !== null) {
          setStatusMessage("Invalid Target: You can only slide to empty spots.");
          return;
        }

        // Validate adjacency
        const adjacentList = getAdjacentCells(selectedPieceId);
        if (!adjacentList.includes(cellId)) {
          setStatusMessage("Invalid Move: Node is not adjacent to Selected Token!");
          return;
        }

        // Apply slide move
        nextCells[selectedPieceId].owner = null;
        nextCells[cellId].owner = "player";
        setSelectedPieceId(null);

        const gameWinner = checkWinner(nextCells);
        if (gameWinner) {
          setWinner(gameWinner);
          setStatusMessage("Outstanding Victory! Monira's logic engine certified your victory!");
        } else {
          setCells(nextCells);
          setTurn("cpu");
          setStatusMessage("Computer's tactical response calculation in progress...");
        }
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-currant text-blush rounded-2xl p-6 border-2 border-peony/20 shadow-2xl overflow-hidden relative">
      {/* HUD Bar */}
      <div className="flex justify-between items-center pb-4 mb-5 border-b border-peony/15 select-none">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="text-peony animate-bounce" size={18} />
          <h4 className="font-serif text-lg md:text-xl font-bold text-blush-dark tracking-wide">
            Three Men Morris Arena
          </h4>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center space-x-1 px-3 py-1 bg-peony hover:bg-peony-light text-blush rounded-full text-xs font-mono font-bold transition-all cursor-pointer"
          id="morris-reset-btn"
        >
          <RefreshCw size={11} />
          <span>RESTART</span>
        </button>
      </div>

      {/* Warning/Win banner overlays */}
      {winner && (
        <div className="bg-peony text-white flex items-center justify-between p-3.5 rounded-xl mb-4 text-xs font-mono font-bold animate-fade-in shadow-md">
          <div className="flex items-center space-x-2">
            <Trophy size={16} />
            <span>
              {winner === "player" ? "CONGRATULATIONS! YOU WON THE GAME!" : "AI WINS. TRY IMPROVING ALIGNMENTS."}
            </span>
          </div>
          <button
            onClick={resetGame}
            className="px-2 py-1 bg-currant text-blush hover:bg-currant-light rounded text-[10px] uppercase font-bold"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Connection board node canvas/drawing */}
      <div className="relative aspect-square w-full max-w-[280px] md:max-w-[320px] mx-auto bg-currant-dark/60 rounded-xl border border-peony/10 flex items-center justify-center p-3 mb-4 shadow-inner">
        {/* SVG drawn connecting lines segments */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-peony/20" strokeWidth="2.5">
          {/* Border Box */}
          <line x1="15%" y1="15%" x2="85%" y2="15%" />
          <line x1="15%" y1="85%" x2="85%" y2="85%" />
          <line x1="15%" y1="15%" x2="15%" y2="85%" />
          <line x1="85%" y1="15%" x2="85%" y2="85%" />
          
          {/* Mid crosses */}
          <line x1="50%" y1="15%" x2="50%" y2="85%" />
          <line x1="15%" y1="50%" x2="85%" y2="50%" />

          {/* Diagonals to Center (standard premium layout) */}
          <line x1="15%" y1="15%" x2="85%" y2="85%" />
          <line x1="85%" y1="15%" x2="15%" y2="85%" />
        </svg>

        {/* Floating Cell Tokens */}
        {cells.map((cell) => {
          const isSelected = selectedPieceId === cell.id;
          const isPlayer = cell.owner === "player";
          const isCpu = cell.owner === "cpu";
          const isClickable = !winner && (turn === "player") && (
            (playerPiecesPlaced < 3 && cell.owner === null) ||
            (playerPiecesPlaced >= 3 && (cell.owner === "player" || (selectedPieceId !== null && getAdjacentCells(selectedPieceId).includes(cell.id) && cell.owner === null)))
          );

          return (
            <button
              key={cell.id}
              onClick={() => handleCellClick(cell.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 transition-all flex items-center justify-center ${
                isPlayer
                  ? isSelected
                    ? "bg-peony border-white ring-4 ring-peony-light/50 scale-110 shadow-lg"
                    : "bg-peony border-peony-light text-white shadow-md cursor-pointer hover:scale-105"
                  : isCpu
                  ? "bg-currant border-dusty shadow text-dusty/40"
                  : "bg-currant-dark border-peony/20 hover:border-peony/50 hover:bg-currant-light/30 cursor-pointer"
              } ${isClickable ? "ring-2 ring-peony/10 border-peony/40" : ""}`}
              style={{ left: `${cell.x}%`, top: `${cell.y}%` }}
              disabled={winner !== null || turn === "cpu"}
              id={`morris-cell-${cell.id}`}
            >
              <div
                className={`w-4 h-4 rounded-full transition-all ${
                  isPlayer
                    ? "bg-white shadow animate-pulse"
                    : isCpu
                    ? "bg-peony-light shadow animate-pulse"
                    : "bg-transparent group-hover:bg-peony/10"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Info Hud Box */}
      <div className="bg-currant-dark/80 p-3 h-[72px] rounded-lg border border-peony/10 flex items-start space-x-2 select-none mb-3">
        <AlertCircle size={15} className="text-peony shrink-0 mt-0.5" />
        <div className="text-[11px] font-mono leading-relaxed h-full overflow-y-auto">
          <span className="text-dusty block uppercase font-bold text-[9px] tracking-widest mb-0.5">STATUS DISPATCHER</span>
          <span className="text-blush/85">{statusMessage}</span>
        </div>
      </div>

      {/* Tokens remaining markers */}
      <div className="grid grid-cols-2 gap-3 text-[10px] font-mono select-none">
        <div className="flex justify-between items-center p-2 rounded bg-peony/10 border border-peony/25">
          <span className="text-peony-light font-bold">YOUR TOKENS</span>
          <span className="bg-peony text-white px-1.5 py-0.5 rounded font-bold">
            {countPieces("player")} / 3 Placed
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded bg-currant-dark/50 border border-peony/5">
          <span className="text-dusty font-bold">COMPUTERS (CPU)</span>
          <span className="bg-currant-light px-1.5 py-0.5 rounded font-bold">
            {countPieces("cpu")} / 3 Placed
          </span>
        </div>
      </div>
    </div>
  );
}
