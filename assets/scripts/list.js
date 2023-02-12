setColors("rgb(0, 255, 0)", "main");
setColors(neg("rgb(255, 0, 255)"), "sec");
setColors("rgb(0, 255, 0)", "pos");
setColors("rgb(255, 0, 0)", "neg");


fetch(`../assets/characterSpecific/all.txt`).then(async response => {
	var chars = await response.text();
  var charListAll = chars.split("\n----\n");
  var charListdrawn = charListAll[0].split("\n");
  charListdrawn.forEach((char) => {
    var thecharstuff = char.split(" | ");
    document.querySelector("#chars").innerHTML += `<a href="../?c=${thecharstuff[0]}"><div class="profileitem">
  <div class="name">${thecharstuff[1]}</div>
  ${thecharstuff[2] ? `<div class="body">(Owned by ${thecharstuff[2]})</div>` : ""}
  <img class="profileImage" src="../assets/characterSpecific/${thecharstuff[0]}/${thecharstuff[0]}.png" />
</div>`;
  })
  var charListundrawn = charListAll[1].split("\n");
  charListundrawn.forEach((char) => {
    var thecharstuff = char.split(" | ");
    document.querySelector("#charsother").innerHTML += `<a href="../?c=${thecharstuff[0]}"><div class="profileitem">
  <div class="name">${thecharstuff[1]}</div>
  ${thecharstuff[2] ? `<div class="body">(Owned by ${thecharstuff[2]})</div>` : ""}
  <img class="profileImage" src="../assets/characterSpecific/${thecharstuff[0]}/${thecharstuff[0]}.png" />
</div>`;
  })
});