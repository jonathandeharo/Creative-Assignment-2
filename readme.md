# README Documentation

## JavaScript Arcade Website Information
- This site was created by Jonathan De Haro under the MIT License. Assets are cited where used.
- All games are that of my own creation with the exception of Flappy Bat (more info below)
- Instructions for each game listed below


## Coin Flip Game Information

### Instructions
- Flip the coin once or many times by hitting the "Flip Coin" button.

### Assets
- **Coin Images:** 
  - Source: [Kenney's Puzzle Pack 2](https://www.kenney.nl/assets/puzzle-pack-2)
  - License: Creative Commons CC0, dated 14/04/2015

---

## Flappy Bat Game Information

### Instructions
- Game difficulty sets the speed of side scroll (warning: impossible is quite literally... impossible)
- Use either the space bar or click on the screen to maneuver the bat sprite through obstacles.
- Each obstacle passed scores one additional point.
- The game is lost if you collide with an obstacle or the game border.

### Assets
- **Bat Sprite:**
  - Source: [OpenGameArt - Bat 32x32 by MoikMellah](https://opengameart.org/content/bat-32x32)
  - License: CC0 (Public Domain)

- **Original Code:**
  - Source: [Flappy Bird JavaScript by Patrick](https://github.com/patlov/flappy_bird_js)
  - License: MIT License, Copyright Patrick ©2023

### Changes Made to Open Source Code
- Modified the game to reset the score to 0 upon restart, as originally it did not.
- Modified the sprite to provide a flapping animation.
- Added click functionality for accessibility, whereas the original game only allowed spacebar input.
- Enhanced game descriptions for better accessibility.
- Added score helper text and a potential start screen.
- Fixed an issue where the "personal best" was left blank if no points were scored; now defaults to 0.

---

## Snake Game Information

### Instructions
- Game difficulty sets the speed of snake movement.
- Use arrow keys to control snake movement up, down, left, or right.
- Eat apples to score points.
- The game is lost if you collide with the game border or yourself.

### Assets
- **Game Logo:**
  - Icon of a snake eating an apple, created by Jonathan De Haro.

---

## General Assets

- **Gradient Background:**
  - Source: [Haikei App](https://app.haikei.app/)
  - Used for creating dynamic SVG backgrounds.
