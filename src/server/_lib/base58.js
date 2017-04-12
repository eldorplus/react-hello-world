// https://coligo.io/create-url-shortener-with-node-express-mongo/

var alphabet = "PQRSTUVWXYZ1ab2cd3ef4ghi5jkm6nop7qrs8tuv9wxyzABCDEFGHJKLMN";
var base = alphabet.length;

module.exports.encode = (num) => {
  var encoded = '';
  while (num){
    var remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
};

module.exports.decode = (str) => {
  var decoded = 0;
  while (str){
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
};
