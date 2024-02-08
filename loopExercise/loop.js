let character = "a";
let timesToRepeat = 10;
let output = "";

for (let i = 0; i < timesToRepeat; i++) {
    output += character;
}
console.log(output)

output = "";
character = "c";
timesToRepeat = 100;
for (let i = 0; i < timesToRepeat; i++) {
    output += character;
}
console.log(output)

output = "";
character = "🐶";
timesToRepeat = 3;
for (let i = 0; i < timesToRepeat; i++) {
    output += character;
}
console.log(output)