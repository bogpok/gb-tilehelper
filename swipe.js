/*
  USE NODE JS
*/

function intToDexStr(integer){
  //
}

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
    
    charArray[i] = spaces + '0x' + (parseInt(number,16) + swipeN + 1).toString(16);

  }

  return charArray
}

const fs = require('fs');

const data = fs.readFileSync('./tilemap_example.c', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});

//console.log(typeof(data)); // string
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
console.log(newstring[newstring.length-5])

let charArray = newstring.split(",");
let swipedArr = swipeRight(charArray);
console.log(swipedArr);


// The map array
let content1 = swipedArr.toString();
fs.writeFile('./output.txt', content1, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});

// Everything else
let content2 = data.slice(0, start+1) + "\n...\n" + data.slice(end, data.length)
fs.writeFile('./residuals.txt', content2, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});