# Game Boy Tile helper JS
JS code to swipe tile ids when you use fonts

## How to use
1. Copy your ```.c``` mapset file into the folder containing ```swipe.js```. The mapset file should contain only one ```unsigned char bg2[]```.
2. Rename ```.c``` to be ```tilemap_input.c```.
3. Run swipe.js:
```bash
node swipe.js
```
4. Now you got ```tilemap_output.c```. Check if all values inside charset is OK.
5. Rename ```tilemap_output.c``` as you wish and move it to your destination folder.


## Explanation
For example, when font is loaded in GB memory it occupies first 36 places (0x24).

What the JS code does:
- reads .c file to find ONE map character array
- shift all tile ids in tilemap array to the right for **36** places

You can modify .js code to shift for less/more places.

