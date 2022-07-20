Game Table
==========

Goal
----
Build a usable, useful touch interface gaming table.


HW
--
32 inch touch screen
Mounted horizontally
Maybe move to two of them at some point

A PC to drive them.

OS & OE
-------
HW mostly works with linux.
Just need to calibrate touch screen.
https://packages.debian.org/jessie/xinput-calibrator

Will initially run inside full screen web browser.


Phase 1
-------
### Map 
- [] Base background map image. 
- [] Supporting square and offset rectangle overlay.

### Tokens 
- [] drag and dropable interactive icons with transparancy (PNG, GIF, SVG)
- [] double clickable to show editable stat view (tied to JSON data)
- [] deletable

### Panel (at least 1 per side??)
- [] has an assortment of dice that you touch to roll.
- [] has a way to change the map
- [] quickly add new tokens.
- [] Music control?

Games
-----
1. Checkers
2. Chess
3. Backgammon
4. Battle Bowl

Data Format
-----------

### .tok files
- [] JSON list of displayable attributes (Name, Description, etc)
- [] non-displayable attrbutes start with '_'
- [] _icon references an image file
- [] maybe allow loading just image to create an empty token that could be filled out and saved.

### .map file
- [] Just an image to start
- [] add per space attributes later.

Additions
---------
- [] Add selectable spaces to the map interface.
- [] Animated tokens
- [] 3D/isometric tokens will this work upside down??
- [] Animated maps
- [] Randomized map generation
- [] Flipable tokens
- [] stackable tokens
- [] shuffleable tokens
- [] rotatability?
- [] Hex overlay
- [] remote control visit url to get syncronised map with indepentant control panel.
- [] Chat/ remote play
- [] Save board state.

Brain Storm
-----------
1. It could be cool to make your shuffle Quest game to work with it. Auto generate maps and put creatures on it.
2. Something that could be cool is to build it into a table, or make a frame that can be put on your table easily so it would be protected a little bit.
3. I assume you will have a computer hooked up to it. Could be cool if you could have a play list of songs that would “set the mood”. Tavern noises, Star Wars Canteena song, ocean sounds etc
4. I think generated outdoor terrain would be awesome. It could populate trees and rivers so that outdoor adventures would have more to them then just being open.
5. select hex, grid, or off set grid map layout
6. able to quickly add monsters, from a data base of monsters and/or pre made custom NPC?
7. randomly populate room map (Select creature and number)
8. keep track of monster HP, stats, satus (eg, stunned dazed) 
9. able to quick create walls and obstacles
10. keep track of room maps as they are made
11. pre-made castle, exterior and boat maps 
12. two levels of maps -- overview map and room maps
13. keep track of rounds for spell effects
14. dice rolling feature
15. web app interface to allow GM to effect map from laptop or tablet.
16. area effect markers. They don't have to be detailed, but knowing where there is fire, tentacles, magic walls)
17. being abel to pre set DC difficulties so players can see how hard a wall is to climb, etc.
18. Being able to draw line of sight and calculate stealth bonuses would be cool.
19. adding a fog of war for larger maps so players have to explore to find things could be cool for indoor dungeons.

