/*
  NODE JS

  Swap tiles

  Use scenario
  When font is loaded in GB it occupies first 36 places (0x24)

  so the challenge here is to read .c file and 
  remake all tile ids in tilemap array

*/

const fs = require('fs');

const data = fs.readFileSync('./bg2.c', 'utf8', (err, data) => {
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
console.log(charArray);

let content1 = newstring;
fs.writeFile('./test.txt', content1, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});


let content2 = data.slice(0, start+1) + "\n...\n" + data.slice(end, data.length)
fs.writeFile('./test2.txt', content2, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});