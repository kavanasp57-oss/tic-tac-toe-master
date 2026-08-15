import type { Board, Combo } from "@/lib/ttt";
import { cn } from "@/lib/utils";

interface GameCellProps {
  value: Board[number];
  index: number;
  winning: boolean;
  disabled: boolean;
  onSelect: (index: number) => void;
}

function GameCell({ value, index, winning, disabled, onSelect }: GameCellProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      disabled={disabled || value !== null}
      aria-label={`Cell ${index + 1}, ${value ? `occupied by ${value}` : "empty"}`}
      className={cn(
        "group relative flex aspect-square items-center justify-center rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        !value && !disabled && "hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card/70 active:translate-y-0 active:scale-95",
        winning && "border-primary bg-primary/15 animate-pulse-glow",
      )}
    >
      {value && (
        <span
          className={cn(
            "animate-pop select-none text-5xl font-black leading-none sm:text-6xl",
            value === "X" ? "text-x-mark drop-shadow-[0_0_18px_var(--x-mark)]" : "text-o-mark drop-shadow-[0_0_18px_var(--o-mark)]",
          )}
        >
          {value}
        </span>
      )}
    </button>
  );
}

interface GameBoardProps {
  board: Board;
  winningCombo: Combo | null;
  locked: boolean;
  isDraw: boolean;
  onSelect: (index: number) => void;
}

export function GameBoard({ board, winningCombo, locked, isDraw, onSelect }: GameBoardProps) {
  return (
    <div
      role="grid"
      aria-label="Tic Tac Toe board"
      className={cn(
        "mx-auto grid w-full max-w-md grid-cols-3 gap-3 rounded-3xl border border-border/60 bg-card/30 p-3 shadow-elegant backdrop-blur-xl sm:gap-4 sm:p-4",
        isDraw && "animate-shake",
      )}
    >
      {board.map((value, i) => (
        <GameCell
          key={i}
          index={i}
          value={value}
          winning={!!winningCombo?.includes(i)}
          disabled={locked}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
