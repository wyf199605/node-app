console.log('test');

let str = '翁';

console.log(Buffer.from(str).byteOffset);
console.log(Buffer.isEncoding('utf8'));

for(let i of Buffer.from(str)){
    console.log(i);
}
