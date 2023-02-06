var minecraftBlocks = {};
var tag;
var tagElements;

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
function setColors(col) {
  document.documentElement.style.setProperty('--main0', ld(col, 100, false));
  document.documentElement.style.setProperty('--main10', ld(col, 80, false));
  document.documentElement.style.setProperty('--main20', ld(col, 60, false));
  document.documentElement.style.setProperty('--main30', ld(col, 40, false));
  document.documentElement.style.setProperty('--main40', ld(col, 20, false));
  document.documentElement.style.setProperty('--main50', ld(col, 0, false));
  document.documentElement.style.setProperty('--main60', ld(col, 20, true));
  document.documentElement.style.setProperty('--main70', ld(col, 40, true));
  document.documentElement.style.setProperty('--main80', ld(col, 60, true));
  document.documentElement.style.setProperty('--main90', ld(col, 80, true));
  document.documentElement.style.setProperty('--main100', ld(col, 100, true));
}

async function fetchLabels() {
  await fetch('/assets/minecraft-block-and-entity.json').then(async response => {
    (await response.json()).forEach((x) => {
      minecraftBlocks[x.css] = {label: x.label, name: x.name};
    });
  });
  
  tag = document.createElement("div");
  tag.innerHTML = `<div class="label"></div>
<div class="name">minecraft:</div>`;
  tag.classList.add("hoverlabel");
  document.body.appendChild(tag);
  tagElements = {
    label: tag.querySelector("div.label"),
    name: tag.querySelector("div.name")
  };

  document.addEventListener('mousemove', event => {
    tag.style.visibility = "hidden";
    var element = [...document.querySelectorAll(':hover')].slice(-1)[0];
    if (!element.classList.contains("icon-minecraft")) return;
  
    tagElements.label.innerHTML = minecraftBlocks[element.classList[1]].label;
    tagElements.name.innerHTML = "minecraft:" + minecraftBlocks[element.classList[1]].name;
    
  
    if ((event.clientX + tag.offsetWidth) + 16 >= window.innerWidth)
      tag.style.left = ((event.clientX - tag.offsetWidth) - 16) + "px";
    else
      tag.style.left = (event.clientX + 16) + "px";
  
    if ((event.clientY + tag.offsetHeight) + 16 >= window.innerHeight)
      tag.style.top = ((event.clientY - tag.offsetHeight) - 16) + "px";
    else
      tag.style.top = (event.clientY + 16) + "px";
  
    tag.style.visibility = "visible";
  });
  document.body.addEventListener('click', event => {
    var element = [...document.querySelectorAll(':hover')].slice(-1)[0];
    if (element.classList.contains("colour")) {
      var col = element.style.backgroundColor;
      var colors = col.replace(/rgb\(|\)/gm, "").split(", ").map(x => (+x).toString(16).padStart(2, '0')).join("");
      document.querySelector("#HexColor").innerHTML = "#" + colors;
      document.querySelector("#RGBColor").innerHTML = col;
      setColors(col);
    } else if (element.classList.contains("icon-minecraft")) {
      document.querySelector("#ItemName").innerHTML = minecraftBlocks[element.classList[1]].label;
      document.querySelector("#ItemID").innerHTML = "minecraft:" + minecraftBlocks[element.classList[1]].name;

    }
  }, true);
}

setColors("rgb(192, 255, 0)");

fetchLabels();