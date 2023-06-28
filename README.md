# Game Boy Tile helper JS
JS code to swipe tile ids when you use fonts

## Explanation
When font is loaded in GB it occupies first 36 places (0x24)

What the JS code does:
- reads .c file to find ONE map character array
- remake all tile ids in tilemap array