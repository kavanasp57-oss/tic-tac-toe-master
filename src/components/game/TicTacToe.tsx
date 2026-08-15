import { useCallback, useEffect, useRef, useState } from "react";
import {
  emptyBoard,
  evaluateBoard,
  getAiMove,
  type Board,
  type Combo,
  type Difficulty,
  type GameMode,
  type Player,
} from "@/lib/ttt";
import { cn } from "@/lib/utils";
import {
  DifficultySelector,
  GameHeader,
  GameModeSelector,
  GameStatistics,
  PlayerCard,
  ScoreBoard,
} from "./GamePanels";
import { GameBoard } from "./GameBoard";

interface Scores {
  x: number;
  o: number;
  draws: number;
}

const STORAGE_KEY = "ttt-state-v1";
const emptyScores: Scores = { x: 0, o: 0, draws: 0 };

const btn =
  "rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [turn, setTurn] = useState<Player>("X");
  const [mode, setMode] = useState<GameMode>("pvp");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [scores, setScores] = useState<Scores>(emptyScores);
  const [aiThinking, setAiThinking] = useState(false);
  const scoredRef = useRef(false);

  // Restore persisted settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<{
        scores: Scores;
        mode: GameMode;
        difficulty: Difficulty;
      }>;
      if (saved.scores) setScores({ ...emptyScores, ...saved.scores });
      if (saved.mode === "pvp" || saved.mode === "ai") setMode(saved.mode);
      if (saved.difficulty) setDifficulty(saved.difficulty);
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ scores, mode, difficulty }));
    } catch {
      /* storage unavailable */
    }
  }, [scores, mode, difficulty]);

  const result = evaluateBoard(board);
  const gameOver = result.status !== "playing";
  const winningCombo: Combo | null = result.status === "won" ? result.combo : null;

  // Score exactly once per completed round
  useEffect(() => {
    if (!gameOver || scoredRef.current) return;
    scoredRef.current = true;
    setScores((s) =>
      result.status === "draw"
        ? { ...s, draws: s.draws + 1 }
        : result.status === "won" && result.winner === "X"
          ? { ...s, x: s.x + 1 }
          : { ...s, o: s.o + 1 },
    );
  }, [gameOver, result]);

  const startRound = useCallback(() => {
    scoredRef.current = false;
    setAiThinking(false);
    setBoard(emptyBoard());
    setTurn("X");
  }, []);

  const aiTurn = mode === "ai" && turn === "O";
  const locked = gameOver || aiThinking || aiTurn;

  // AI move
  useEffect(() => {
    if (mode !== "ai" || turn !== "O" || gameOver) return;
    setAiThinking(true);
    const snapshot = board;
    const timer = setTimeout(
      () => {
        const move = getAiMove(snapshot, "O", difficulty);
        setBoard((prev) => {
          if (move < 0 || prev[move] !== null || evaluateBoard(prev).status !== "playing") return prev;
          const next = prev.slice();
          next[move] = "O";
          return next;
        });
        setTurn("X");
        setAiThinking(false);
      },
      350 + Math.random() * 250,
    );
    return () => clearTimeout(timer);
  }, [mode, turn, gameOver, board, difficulty]);

  const handleSelect = (index: number) => {
    if (locked || board[index] !== null) return;
    const next = board.slice();
    next[index] = turn;
    setBoard(next);
    setTurn(turn === "X" ? "O" : "X");
  };

  const handleModeChange = (nextMode: GameMode) => {
    if (nextMode === mode) return;
    const inProgress = board.some((c) => c !== null) && !gameOver;
    if (inProgress && !confirm("Switching modes will end the current round. Continue?")) return;
    setMode(nextMode);
    startRound();
  };

  const handleResetScore = () => setScores(emptyScores);

  const handleResetGame = () => {
    if (!confirm("Reset the game and clear all scores?")) return;
    setScores(emptyScores);
    startRound();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const status =
    result.status === "won"
      ? `🎉 ${result.winner} Wins!`
      : result.status === "draw"
        ? "🤝 It's a Draw!"
        : mode === "ai"
          ? turn === "X"
            ? "Your Turn — X"
            : "AI's Turn — O"
          : `${turn}'s Turn`;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-8 sm:py-12">
      <GameHeader />

      <GameModeSelector mode={mode} onChange={handleModeChange} />
      {mode === "ai" && <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />}

      <div className="flex flex-col gap-2 sm:flex-row">
        <PlayerCard
          player="X"
          label={mode === "ai" ? "You" : "Player 1"}
          wins={scores.x}
          active={!gameOver && turn === "X"}
        />
        <PlayerCard
          player="O"
          label={mode === "ai" ? "AI" : "Player 2"}
          wins={scores.o}
          active={!gameOver && turn === "O"}
        />
      </div>

      <ScoreBoard x={scores.x} o={scores.o} draws={scores.draws} />

      <p
        aria-live="polite"
        className={cn(
          "animate-fade-in text-center text-2xl font-black tracking-tight sm:text-3xl",
          gameOver ? "text-primary" : "text-foreground",
        )}
      >
        {status}
      </p>
      {aiThinking && !gameOver && (
        <p className="animate-pulse text-center text-sm font-medium text-muted-foreground">
          AI is thinking...
        </p>
      )}

      <GameBoard
        board={board}
        winningCombo={winningCombo}
        locked={locked}
        isDraw={result.status === "draw"}
        onSelect={handleSelect}
      />

      <div className="flex flex-wrap justify-center gap-2">
        {gameOver && (
          <button
            type="button"
            onClick={startRound}
            className={cn(btn, "animate-pop bg-primary text-primary-foreground shadow-elegant hover:opacity-90")}
          >
            Play Again
          </button>
        )}
        <button
          type="button"
          onClick={handleResetScore}
          className={cn(btn, "border border-border/60 bg-card/40 text-foreground hover:bg-muted/40")}
        >
          Reset Score
        </button>
        <button
          type="button"
          onClick={handleResetGame}
          className={cn(btn, "border border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/20")}
        >
          Reset Game
        </button>
      </div>

      <GameStatistics x={scores.x} o={scores.o} draws={scores.draws} mode={mode} />

      <footer className="pt-2 text-center text-xs text-muted-foreground">
        Built with React • TypeScript • Tailwind CSS
      </footer>
    </div>
  );
}
