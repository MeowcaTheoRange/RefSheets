const clamp = (n, mi, ma) => Math.max(mi, Math.min(n, ma));
function ld(col, amt, lighter) {
  var colorArray = col.replace(/rgb\(|\)/gm, "").split(", ");
  var newColor;
  if (lighter)
    newColor = [
      clamp(Math.round(+colorArray[0] + ((amt / 100) * (255 - +colorArray[0]))), 0, 255),
      clamp(Math.round(+colorArray[1] + ((amt / 100) * (255 - +colorArray[1]))), 0, 255),
      clamp(Math.round(+colorArray[2] + ((amt / 100) * (255 - +colorArray[2]))), 0, 255)
    ];
  else
    newColor = [
      clamp(Math.round(+colorArray[0] - ((amt / 100) * +colorArray[0])), 0, 255),
      clamp(Math.round(+colorArray[1] - ((amt / 100) * +colorArray[1])), 0, 255),
      clamp(Math.round(+colorArray[2] - ((amt / 100) * +colorArray[2])), 0, 255)
    ];
  return "rgb(" + newColor.join(", ") + ")";
}
function neg(col) {
  var colorArray = col.replace(/rgb\(|\)/gm, "").split(", ");
  return "rgb(" + colorArray.map(x => 255 - x).join(", ") + ")";
}

String.prototype.toFirstUpperCase = function () {
  var arr = this.toLowerCase().split("");
  arr.unshift(arr.shift().toUpperCase());
  return arr.join("");
}

String.prototype.toAllUpperCase = function () {
  return this.split(" ").map(x => x.toFirstUpperCase()).join(" ");
}

String.prototype.toFirstLowerCase = function () {
  var arr = this.toUpperCase().split("");
  arr.unshift(arr.shift().toLowerCase());
  return arr.join("");
}

String.prototype.toAllLowerCase = function () {
  return this.split(" ").map(x => x.toFirstLowerCase()).join(" ");
}

String.prototype.toStupidCase = function (mindSpaces) {
  if (mindSpaces)
  return this.split(" ").map(x => x.split("").map((x, i) => i % 2 === 0 ? x.toLowerCase() : x.toUpperCase()).join("")).join(" ");
  return this.split("").map((x, i) => i % 2 === 0 ? x.toLowerCase() : x.toUpperCase()).join("");
}

String.prototype.randomReplace = function (weight, regex, replacement) {
  if (Math.random() < weight) return this.replace(new RegExp(regex, "gm"), replacement);
  else return this;
}