import { createFileRoute } from "@tanstack/react-router";
import { TicTacToe } from "@/components/game/TicTacToe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tic-Tac-Toe — Play vs Friend or Minimax AI" },
      {
        name: "description",
        content:
          "Play Tic-Tac-Toe online: two-player mode or an unbeatable Minimax AI with easy, medium and hard difficulty, live scoreboard and stats.",
      },
      { property: "og:title", content: "Tic-Tac-Toe — Play vs Friend or Minimax AI" },
      {
        property: "og:description",
        content:
          "Classic strategy, modern experience. Player vs Player or Player vs AI with score tracking and statistics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-x-mark/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-o-mark/20 blur-3xl" />
      <div className="relative">
        <TicTacToe />
      </div>
    </main>
  );
}
