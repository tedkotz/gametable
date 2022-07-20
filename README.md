Game Table
==========

Goal
----
Build a usable, useful touch interface gaming table.


HW
--
- 32 inch touch screen
    - Mounted horizontally
    - Maybe move to two of them at some point
- A PC to drive them.

OS & OE
-------
- HW mostly works with Linux.

- Just need to calibrate touch screen.
    - https://packages.debian.org/sid/main/xinput-calibrator

- Runs inside full screen web browser.
    - Needs to be launched on startup

Phase 1
-------
### Map
- [x] Base background map image.
- [ ] Supporting square and offset rectangle overlay.

### Tokens
- [x] Drag and drop interactive icons with transparency (PNG, GIF, SVG)
- [ ] Double clickable to show editable stat view (tied to JSON data)
- [x] Delete

### Panel
- [ ] Multiple instances (at least 1 per side??)
- [ ] Has an assortment of dice that you touch to roll.
- [x] Has a way to change the map
- [ ] Quickly add new tokens.
- [ ] Music control?

Games
-----
1. Checkers
2. Chess
3. Backgammon
4. Battle Bowl

Data Format
-----------

### .tok files
- [ ] JSON list of displayable attributes (Name, Description, etc)
- [ ] Non-displayable attributes start with `_`
- [ ] `_icon` references an image file
- [ ] Maybe allow loading just image to create an empty token that could be filled out and saved.

### .map file
- [ ] Just an image to start
- [ ] Add per space attributes later.

Additions
---------
- [ ] Add selectable spaces to the map interface.
- [ ] Animated tokens
- [ ] 3D/isometric tokens (will this work upside down??)
- [ ] Animated maps
- [ ] Randomized map generation
- [ ] Flip type tokens
- [ ] Stack type tokens
- [ ] Shuffle type tokens
- [ ] Rotation?
- [ ] Hex overlay
- [ ] Remote control visit URL to get synchronised map with independent control panel.
- [ ] Chat
- [ ] Remote play
- [ ] Save board state.

Brain Storm
-----------
1. It could be cool to make your shuffle Quest game to work with it. Auto generate maps and put creatures on it.
2. Something that could be cool is to build it into a table, or make a frame that can be put on your table easily so it would be protected a little bit.
3. I assume you will have a computer hooked up to it. Could be cool if you could have a play list of songs that would “set the mood”. Tavern noises, Star Wars Cantina song, ocean sounds, etc
4. I think generated outdoor terrain would be awesome. It could populate trees and rivers so that outdoor adventures would have more to them then just being open.
5. Select hex, grid, or off set grid map layout
6. Able to quickly add monsters, from a data base of monsters and/or premade custom NPC?
7. Randomly populate room map (Select creature and number)
8. Keep track of monster HP, stats, status (stunned, dazed, etc)
9. Able to quick create walls and obstacles
10. Keep track of room maps as they are made
11. Premade castle, exterior and boat maps
12. Two levels of maps -- overview map and room maps
13. Keep track of rounds for spell effects
14. Dice rolling feature
15. Web app interface to allow GM to effect map from laptop or tablet.
16. Area effect markers. They don't have to be detailed, but knowing where there is fire, tentacles, magic walls)
17. Being able to preset DC difficulties so players can see how hard a wall is to climb, etc.
18. Being able to draw line of sight and calculate stealth bonuses would be cool.
19. Adding a fog of war for larger maps so players have to explore to find things could be cool for indoor dungeons.

