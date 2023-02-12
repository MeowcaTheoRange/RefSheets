setColors("rgb(0, 255, 0)", "main");
setColors(neg("rgb(255, 0, 255)"), "sec");
setColors("rgb(0, 255, 0)", "pos");
setColors("rgb(255, 0, 0)", "neg");


fetch(`../assets/characterSpecific/all.txt`).then(async response => {
	var chars = await response.text();
  var charList = chars.split("\n");
  charList.forEach((char) => {
    var thecharstuff = char.split(" | ");
    document.querySelector("#chars").innerHTML += `<a href="../?c=${thecharstuff[0]}"><div class="profileitem">
  <div class="name">${thecharstuff[1]}</div>
  <img class="profileImage" src="../assets/characterSpecific/${thecharstuff[0]}/${thecharstuff[0]}.png" />
</div>`;
  })
});