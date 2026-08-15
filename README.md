# Tic-Tac-Toe Master

Build a complete, polished, fully functional Tic-Tac-Toe Web Application based on the Task-03 requirements shown in the reference image.

PROJECT GOAL

Create an interactive Tic-Tac-Toe game where users can:

Play against another human player

Play against an AI opponent

Choose their preferred game mode

Make moves by clicking cells

Automatically detect wins

Automatically detect draws

Restart the game

Track scores

See whose turn it is

Enjoy a polished, responsive, modern interface

This must be a real working game, not just a static UI.

TECHNOLOGY

Use:

React

TypeScript

Tailwind CSS

Component-based architecture

React state/hooks for game state

Do NOT use a backend, database, authentication, or Supabase.

The entire game should run completely in the browser.

GAME MODES

Provide two clearly selectable modes:

1. Player vs Player

Two users can play against each other on the same device.

Player 1 = X
Player 2 = O

Players take turns clicking empty cells.

2. Player vs AI

The user plays as X.

The AI plays as O.

The AI should automatically make its move after the player selects a cell.

Do NOT make the AI randomly click cells only.

Implement a proper Tic-Tac-Toe AI using the Minimax algorithm, so the AI plays intelligently and cannot be easily beaten.

Add a small indicator while the AI is thinking:

AI is thinking...

The AI should never make a move into an already occupied cell.

GAME BOARD

Create a visually attractive 3×3 Tic-Tac-Toe board.

Each cell should:

Be large enough for comfortable clicking/tapping

Have a clear hover effect

Display X or O prominently

Have smooth placement animation

Be disabled once occupied

Be keyboard accessible where practical

Use a modern glassmorphism/card-style design.

Do not use images for X and O.

Use clean text/icons or CSS-based styling.

GAME LOGIC

Implement complete game logic.

After every move:

Update the board.

Check all winning combinations.

If a player has three matching symbols in a row, column, or diagonal:

End the round.

Display the winner.

Highlight the winning cells.

Update the appropriate score.

If all cells are filled and there is no winner:

End the round.

Display "It's a Draw!"

Update the draw counter.

Winning combinations:

Rows:

0,1,2

3,4,5

6,7,8

Columns:

0,3,6

1,4,7

2,5,8

Diagonals:

0,4,8

2,4,6

GAME STATUS

Above the board display the current state.

Before starting:

Your Turn — X

During Player vs Player:

X's Turn
or
O's Turn

During Player vs AI:

Your Turn — X
or
AI's Turn — O

After a win:

🎉 X Wins!

or

🎉 O Wins!

After a draw:

🤝 It's a Draw!

Make the status visually prominent.

SCOREBOARD

Create a scoreboard above or below the game board.

Display:

X
Wins: 0

Draws
0

O
Wins: 0

The scores should update automatically after each completed round.

Keep scores when clicking "Play Again".

Add a separate:

Reset Score

button that resets:

X wins

O wins

Draws

Do not reset the scores when simply starting another round.

NEW GAME / PLAY AGAIN

After a round finishes, display a prominent:

Play Again

button.

Clicking it should:

Clear the board

Start a new round

Reset the current turn to X

Keep the scoreboard unchanged

Do not require the user to refresh the page.

RESET GAME

Provide:

Reset Game

This should:

Clear the board

Reset the current round

Reset the turn to X

Reset the scores

Exit any game-over state

Ask for confirmation before resetting the complete game if appropriate.

USER INTERFACE

Create a professional, modern gaming interface.

Overall Design

Use:

Dark modern background

Blue/purple gradient accents

Glassmorphism cards

Rounded corners

Soft shadows

Subtle borders

Clean typography

Smooth animations

The design should feel like a modern web game.

Avoid making it look like a basic school project.

HEADER

At the top:

TIC-TAC-TOE

Subtitle:

Classic strategy. Modern experience.

Keep the header clean and centered.

MODE SELECTOR

Create a mode selection area with two options:

👥 Player vs Player

🤖 Player vs AI

Use segmented buttons/cards.

The currently selected mode should be clearly highlighted.

Changing game mode should:

Clear the current board

Reset the current round

Preserve scores only if appropriate

Prevent confusing leftover moves from the previous mode

Preferably show a confirmation if switching modes during an active round.

PLAYER INDICATORS

Show two player cards:

Player X

YOU
or
PLAYER 1

Player O

AI
or
PLAYER 2

Clearly indicate whose turn it currently is.

When it is a player's turn, subtly highlight their card.

BOARD DESIGN

Make the board the main visual focus.

Use a square 3×3 grid with:

Thick but elegant separators

Rounded cell corners

Hover animations

Click animation

Large X/O symbols

Winning-cell highlight animation

Example visual layout:

┌───────┬───────┬───────┐
│ │ │ │
│ X │ O │ │
│ │ │ │
├───────┼───────┼───────┤
│ │ │ │
│ X │ X │ │
│ │ │ │
├───────┼───────┼───────┤
│ │ │ │
│ O │ │ O │
│ │ │ │
└───────┴───────┴───────┘

Do not literally render the ASCII board. Use a proper responsive CSS grid.

WINNING ANIMATION

When someone wins:

Highlight the three winning cells

Add a subtle glow/pulse animation

Display the winner message

Disable further moves

Show the Play Again button

Do not allow additional moves after the game ends.

DRAW STATE

When all 9 cells are occupied without a winner:

Display a draw message

Add a subtle board animation

Disable further moves

Show Play Again

AI IMPLEMENTATION

For Player vs AI mode:

Human = X
AI = O

Use Minimax to determine the AI's optimal move.

Requirements:

AI must evaluate possible future moves.

AI should prioritize winning.

AI should block the player's winning move.

AI should choose strategically.

AI should never play on an occupied cell.

AI should stop immediately if the game has already ended.

Add a short artificial delay of approximately 300–600ms before the AI move so the game feels natural.

Do not make the delay interfere with game state.

Prevent the player from clicking additional cells while the AI is thinking.

AI DIFFICULTY

Provide three difficulty options:

Easy

AI makes mostly random legal moves.

Medium

AI combines strategic moves with occasional random choices.

Hard

AI uses full Minimax and plays optimally.

Default difficulty should be:

Medium

Only show the difficulty selector when Player vs AI mode is selected.

GAME STATISTICS

Below the game, show a small statistics section:

Total Games
0

X Wins
0

O Wins
0

Draws
0

Win Rate
0%

Calculate these dynamically.

For Player vs AI mode, the win rate should represent the human player's wins divided by completed games.

RESPONSIVE DESIGN

The application must work perfectly on:

Desktop

Laptop

Tablet

Mobile

On mobile:

Board should remain square

Board should fit within the viewport

No horizontal scrolling

Buttons should be touch-friendly

Scoreboard should stack if necessary

Mode selector should remain usable

Text should resize appropriately

ACCESSIBILITY

Implement:

Semantic buttons

Accessible labels

Keyboard focus states

Visible focus indicators

Good color contrast

aria-label for game cells where useful

Each cell should communicate something meaningful such as:

"Cell 1, empty"
"Cell 2, occupied by X"

Do not rely only on color to communicate game state.

ANIMATIONS

Use tasteful animations:

Page/card entrance

Cell hover

X/O placement

Winning cells

Status changes

Button transitions

AI thinking indicator

Keep animations smooth and professional.

Do not overuse animations.

COMPONENT STRUCTURE

Organize the application into reusable components such as:

App

GameHeader

GameModeSelector

DifficultySelector

ScoreBoard

PlayerCard

GameBoard

GameCell

GameStatus

GameControls

GameStatistics

Create appropriate TypeScript types for:

Player

GameMode

Difficulty

GameStatus

Board state

Winning combination

Keep game logic separate from presentation where practical.

IMPORTANT GAME RULES

Make sure:

A cell cannot be selected twice.

Players cannot move after the game ends.

AI cannot move after the game ends.

AI cannot move while the player is making a move.

Winning cells are correctly identified.

Draws are correctly detected.

Scores update exactly once per completed round.

Play Again does not reset scores.

Reset Game resets everything.

Switching game modes does not leave stale game state.

Changing difficulty affects future AI decisions.

The game never gets stuck.

DATA PERSISTENCE

Use browser localStorage to remember:

Scores

Selected game mode

Selected AI difficulty

When the page is refreshed, restore these settings.

Provide a reset option to clear stored game data.

Do not use a backend.

POLISH

Add a small footer:

Built with React • TypeScript • Tailwind CSS

Do not add unnecessary links or fake information.

FINAL QUALITY CHECK

Before finishing, thoroughly test the application.

Test:

Player vs Player.

X wins by row.

X wins by column.

X wins diagonally.

O wins.

Draw.

Play Again.

Reset Game.

Reset Score.

Player vs AI Easy.

Player vs AI Medium.

Player vs AI Hard.

AI blocks an immediate winning move.

AI takes a winning move when available.

AI never selects an occupied cell.

Multiple rounds.

Switching game modes.

Changing AI difficulty.

Browser refresh/localStorage.

Mobile responsiveness.

Keyboard accessibility.

No TypeScript errors.

No runtime errors.

No console errors.

No broken buttons or placeholder functionality.

IMPORTANT:

Do not stop after creating the UI.

Implement the COMPLETE WORKING GAME including all game logic, AI logic, score tracking, animations, responsive design, and interactions.

The final result should look and behave like a polished professional Tic-Tac-Toe web application suitable for submitting as a frontend development task.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/25caaa60-ff41-4429-a776-a5f03f8d0413).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
