/*
  USE NODE JS
*/


console.log('Start swiping...\n');

/**
 * Shifts all entries in charArray for swipeN places
 * @param  {Array} charArray All entries should be strings with Dex numbers
 * @param  {number} swipeN Integer number of places to shift
 * @return {Array}      Shifted array
 */
function swipeRight(charArray, swipeN = 36){
  let number = new String;
  for (let i=0; i<charArray.length; i++) {
    let spaces = '';
    let ns = charArray[i];
    if (ns.length > 4) {
      spaces = '\r\n  ';
      number = ns.slice(ns.length-4,ns.length)
    } else { 
      number = ns 
    }    
    charArray[i] = spaces + '0x' + (parseInt(number,16) + swipeN).toString(16);
  }
  return charArray
}

// INPUT
const fs = require('fs');
const data = fs.readFileSync('./tilemap_input.c', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});

//#region Get array with map_array entries
// Get string
let start = 0;
let end = 0;
let write = false;
newstring = new String;
for (let i=0; i < data.length; i++){
  d = data[i]
  if (write) newstring += d;
  if (d === '{') {
    start = i;
    write = true;
  } else if (data[i+1] === '}'){
    end = i;
    write = false;
  }  
}
// Get array
let charArray = newstring.split(",");
//#endregion

// Swipe all values to the right
// You can specify swipeN here!
// e.g. swipeRight(charArray, swipeN=-1);
let swipedArr = swipeRight(charArray);

// Check sums
if (charArray.length!==swipedArr.length) {
  console.warn("Length of input and output arrays are not equal!");
  console.warn("Initial lenght: ", charArray.length);
  console.warn("Result lenght: ", swipedArr.length);
}

let writeData = (content, outputFileName) => {
  fs.writeFile(outputFileName, content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
  });
}

// The map_array
let content1 = swipedArr.toString();
// Everything else
let content2 = data.slice(0, start+1) + content1 + data.slice(end, data.length)

writeData(content1, './arrdata.txt');
writeData(content2, './tilemap_output.c');

console.log("Fin!\n");