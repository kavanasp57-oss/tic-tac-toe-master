export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];
export type GameMode = "pvp" | "ai";
export type Difficulty = "easy" | "medium" | "hard";
export type Combo = [number, number, number];

export const WINNING_COMBOS: Combo[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export type GameResult =
  | { status: "playing" }
  | { status: "won"; winner: Player; combo: Combo }
  | { status: "draw" };

export const emptyBoard = (): Board => Array(9).fill(null);

export function evaluateBoard(board: Board): GameResult {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { status: "won", winner: board[a] as Player, combo };
    }
  }
  if (board.every((c) => c !== null)) return { status: "draw" };
  return { status: "playing" };
}

export const availableMoves = (board: Board): number[] =>
  board.map((c, i) => (c === null ? i : -1)).filter((i) => i >= 0);

function minimax(board: Board, current: Player, ai: Player, depth: number): { score: number; move: number } {
  const result = evaluateBoard(board);
  if (result.status === "won") {
    return { score: result.winner === ai ? 10 - depth : depth - 10, move: -1 };
  }
  if (result.status === "draw") return { score: 0, move: -1 };

  const maximizing = current === ai;
  let best = { score: maximizing ? -Infinity : Infinity, move: -1 };

  for (const move of availableMoves(board)) {
    const next = board.slice();
    next[move] = current;
    const { score } = minimax(next, current === "X" ? "O" : "X", ai, depth + 1);
    if (maximizing ? score > best.score : score < best.score) best = { score, move };
  }
  return best;
}

const randomMove = (board: Board): number => {
  const moves = availableMoves(board);
  return moves[Math.floor(Math.random() * moves.length)] ?? -1;
};

export function getAiMove(board: Board, ai: Player, difficulty: Difficulty): number {
  const moves = availableMoves(board);
  if (moves.length === 0) return -1;
  if (difficulty === "easy") {
    return Math.random() < 0.8 ? randomMove(board) : minimax(board, ai, ai, 0).move;
  }
  if (difficulty === "medium") {
    return Math.random() < 0.4 ? randomMove(board) : minimax(board, ai, ai, 0).move;
  }
  return minimax(board, ai, ai, 0).move;
}
