var minecraftBlocks = {};
var tag;
var tagElements;


function setColors(col, label) {
  document.documentElement.style.setProperty(`--${label}0`, ld(col, 100, false));
  document.documentElement.style.setProperty(`--${label}10`, ld(col, 80, false));
  document.documentElement.style.setProperty(`--${label}20`, ld(col, 60, false));
  document.documentElement.style.setProperty(`--${label}30`, ld(col, 40, false));
  document.documentElement.style.setProperty(`--${label}40`, ld(col, 20, false));
  document.documentElement.style.setProperty(`--${label}50`, ld(col, 0, false));
  document.documentElement.style.setProperty(`--${label}60`, ld(col, 20, true));
  document.documentElement.style.setProperty(`--${label}70`, ld(col, 40, true));
  document.documentElement.style.setProperty(`--${label}80`, ld(col, 60, true));
  document.documentElement.style.setProperty(`--${label}90`, ld(col, 80, true));
  document.documentElement.style.setProperty(`--${label}100`, ld(col, 100, true));
	if (document.querySelector("#CHANGING_CURCOLOR") && label === "main")
		document.querySelector("#CHANGING_CURCOLOR").style.backgroundColor = col;
	else if (document.querySelector("#CHANGING_NEGCOLOR") && label === "sec")
		document.querySelector("#CHANGING_NEGCOLOR").style.backgroundColor = col;
}

async function fetchLabels() {
  await fetch('assets/minecraft-block-and-entity.json').then(async response => {
    (await response.json()).forEach((x) => {
      minecraftBlocks[x.css] = {label: x.label, name: x.name};
    });
  });
  
  tag = document.createElement("div");
  tag.innerHTML = `<div class="label"></div>
<div class="name">minecraft:</div><canvas id="processingCanvas" hidden></canvas>`;
  tag.classList.add("hoverlabel");
  document.body.appendChild(tag);
  tagElements = {
    label: tag.querySelector("div.label"),
    name: tag.querySelector("div.name")
  };



  document.addEventListener('mousemove', event => {
    tag.style.visibility = "hidden";
    var element = [...document.querySelectorAll(':hover')].slice(-1)[0];
    if (element.classList.contains("icon-minecraft")) {
  
      tagElements.label.innerHTML = element.dataset.customname ? `<i>${element.dataset.customname}</i>` : minecraftBlocks[element.classList[1]].label;
      tagElements.name.innerHTML = "minecraft:" + minecraftBlocks[element.classList[1]].name;

    } else if (element.classList.contains("colour")) {

      var colors = element.style.backgroundColor.replace(/rgb\(|\)/gm, "").split(", ").map(x => (+x).toString(16).padStart(2, '0')).join("");
      tagElements.label.innerHTML = "#" + colors;
      tagElements.name.innerHTML = element.style.backgroundColor + (element.dataset.specialText ? "<br />" + element.dataset.specialText : "");

    } else return;
    
  
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
      setColors(col, "main");
      setColors(neg(col), "sec");
    } else if (element.classList.contains("icon-minecraft")) {
      document.querySelector("#ItemName").innerHTML = element.dataset.customname ? `<i>${element.dataset.customname}</i> (${minecraftBlocks[element.classList[1]].label})` : minecraftBlocks[element.classList[1]].label;
      document.querySelector("#ItemID").innerHTML = "minecraft:" + minecraftBlocks[element.classList[1]].name;

    }
  }, true);
}