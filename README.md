# Terminator-Themed Tic Tac Toe Web App

![Screenshot 2025-04-18 at 7 05 48 PM](https://github.com/user-attachments/assets/68c8f701-a4ec-4f73-ba22-74455820b03e)

## Overview
This is a Terminator-themed Tic Tac Toe web application featuring an evil AI opponent. The game includes unique mechanics where the board expands when the player achieves a winning condition, making victory increasingly challenging.

## Features
- Terminator-themed visual design with dark, metallic aesthetics and red accents
- Responsive game board that works on both desktop and mobile devices
- Evil AI opponent with snarky taunts and strategic gameplay
- Board expansion mechanic: when player wins, the board expands and win condition increases
- Sound effects for player moves, AI moves, board expansion, and wins/losses
- Visual effects including scanning lines, glowing elements, and animations

## Game Mechanics
- Start with a 3x3 board where the goal is to get 3 in a row to win
- When the player wins, the board expands to (n+1)×(n+1) (e.g., 3x3 expands to 4x4)
- On the expanded board, the win condition becomes n+1 in a row (e.g., 4 in a row for a 4x4 board)
- The board can grow infinitely with each player win, maintaining existing placements
- The AI prevents stalemates and always makes strategic moves

## Files
- `index.html` - Main HTML file with game structure and styling
- `script.js` - Core game logic and AI behavior
- `sounds.js` - Sound effects using Web Audio API
- `visual-effects.js` - Additional visual enhancements and animations

## How to Run
1. Ensure all files are in the same directory
2. Open `index.html` in a modern web browser
3. Play against the Skynet AI by clicking on the grid cells

## Technologies Used
- HTML5
- CSS3 (with animations and responsive design)
- JavaScript (vanilla, no frameworks)
- Web Audio API for sound generation

## Credits
Created based on requirements for a Terminator-themed Tic Tac Toe web app with expanding board mechanics.

SKYNET DEFENSE SYSTEMS © 2029 | RESISTANCE TERMINATION DIVISION
