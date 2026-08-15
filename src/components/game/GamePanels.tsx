import type { Difficulty, GameMode, Player } from "@/lib/ttt";
import { cn } from "@/lib/utils";

export function GameHeader() {
  return (
    <header className="animate-fade-in text-center">
      <h1 className="bg-gradient-to-r from-x-mark via-primary to-o-mark bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl">
        TIC-TAC-TOE
      </h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Classic strategy. Modern experience.
      </p>
    </header>
  );
}

const segment =
  "flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function GameModeSelector({
  mode,
  onChange,
}: {
  mode: GameMode;
  onChange: (mode: GameMode) => void;
}) {
  const options: { value: GameMode; label: string }[] = [
    { value: "pvp", label: "👥 Player vs Player" },
    { value: "ai", label: "🤖 Player vs AI" },
  ];
  return (
    <div
      role="group"
      aria-label="Game mode"
      className="flex gap-2 rounded-2xl border border-border/60 bg-card/40 p-1.5 backdrop-blur-xl"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={mode === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            segment,
            mode === o.value
              ? "bg-primary text-primary-foreground shadow-elegant"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function DifficultySelector({
  difficulty,
  onChange,
}: {
  difficulty: Difficulty;
  onChange: (d: Difficulty) => void;
}) {
  const options: Difficulty[] = ["easy", "medium", "hard"];
  return (
    <div
      role="group"
      aria-label="AI difficulty"
      className="animate-fade-in flex gap-2 rounded-2xl border border-border/60 bg-card/40 p-1.5 backdrop-blur-xl"
    >
      {options.map((d) => (
        <button
          key={d}
          type="button"
          aria-pressed={difficulty === d}
          onClick={() => onChange(d)}
          className={cn(
            segment,
            "capitalize",
            difficulty === d
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
          )}
        >
          {d}
        </button>
      ))}
    </div>
  );
}

export function PlayerCard({
  player,
  label,
  wins,
  active,
}: {
  player: Player;
  label: string;
  wins: number;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 backdrop-blur-xl transition-all",
        active && "border-primary/70 bg-primary/10 shadow-elegant",
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl font-black",
          player === "X" ? "bg-x-mark/15 text-x-mark" : "bg-o-mark/15 text-o-mark",
        )}
      >
        {player}
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-bold text-foreground">Wins: {wins}</p>
      </div>
      {active && <span className="ml-auto shrink-0 text-xs font-semibold text-primary">TURN</span>}
    </div>
  );
}

export function ScoreBoard({
  x,
  o,
  draws,
}: {
  x: number;
  o: number;
  draws: number;
}) {
  const items = [
    { label: "X", value: x, tone: "text-x-mark" },
    { label: "Draws", value: draws, tone: "text-muted-foreground" },
    { label: "O", value: o, tone: "text-o-mark" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border/60 bg-card/40 p-3 backdrop-blur-xl">
      {items.map((i) => (
        <div key={i.label} className="text-center">
          <p className={cn("text-xs font-bold uppercase tracking-widest", i.tone)}>{i.label}</p>
          <p className="text-2xl font-black text-foreground">{i.value}</p>
        </div>
      ))}
    </div>
  );
}

export function GameStatistics({
  x,
  o,
  draws,
  mode,
}: {
  x: number;
  o: number;
  draws: number;
  mode: GameMode;
}) {
  const total = x + o + draws;
  const winRate = total === 0 ? 0 : Math.round((x / total) * 100);
  const stats = [
    { label: "Total Games", value: total },
    { label: "X Wins", value: x },
    { label: "O Wins", value: o },
    { label: "Draws", value: draws },
    { label: mode === "ai" ? "Your Win Rate" : "X Win Rate", value: `${winRate}%` },
  ];
  return (
    <section
      aria-label="Game statistics"
      className="grid grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-card/30 p-3 backdrop-blur-xl sm:grid-cols-5"
    >
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl bg-muted/30 p-2.5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {s.label}
          </p>
          <p className="text-lg font-black text-foreground">{s.value}</p>
        </div>
      ))}
    </section>
  );
}
