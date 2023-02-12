var shortenTrollTag = un => un.split(/(?=[A-Z])/).map(x => x[0].toUpperCase()).join("");
async function setTrollian(trollian) {
	var trolltags = document.querySelectorAll("trolltag");
	trolltags.forEach((v) => {
		var trollshort = shortenTrollTag(trollian.user.name);
		v.style.color = trollian.user.color;
		v.innerHTML = `${trollian.user.name} [${trollshort}]`;
	})
	var dialogue = document.querySelectorAll("dialogue");
	dialogue.forEach((v) => {
		if (v.dataset.whispering && trollian.quirksQuiet) {
			trollian.quirksQuiet.functions?.forEach((va) => {
				v.innerHTML = String.prototype[va[0]].apply(v.innerHTML, va[1]);
			});
			trollian.quirksQuiet.regexes?.forEach((va) => {
				v.innerHTML = v.innerHTML.replace(new RegExp(va[0], "gm"), va[1]);
			});
		} else {
			trollian.quirks.functions?.forEach((va) => {
				v.innerHTML = String.prototype[va[0]].apply(v.innerHTML, va[1]);
			});
			trollian.quirks.regexes?.forEach((va) => {
				v.innerHTML = v.innerHTML.replace(new RegExp(va[0], "gm"), va[1]);
			});
		}
		var trollshort = shortenTrollTag(trollian.user.name);
		v.style.color = trollian.user.color;
		v.innerHTML = `${trollshort}: ${v.innerHTML}`;
	})
}

function setVariables(name) {
  document.documentElement.style.setProperty('--modus-url-front', `url(assets/characterSpecific/${name}/modusf.png)`);
  document.documentElement.style.setProperty('--modus-url-back', `url(assets/characterSpecific/${name}/modusb.png)`);
  document.documentElement.style.setProperty('--card-url', `url(assets/characterSpecific/${name}/card.png)`);
}

function generateInventory(inventory) {
	inventory.main.forEach((object) => {
		document.querySelector("#inventory_main").innerHTML += `<div class="slot">${object[0] ? `
		<div${object[1] && isNaN(object[1]) ? ` data-customName="${object[1]}"` : ""} class="icon-minecraft icon-minecraft-${object[0]}">${object[1] && !isNaN(object[1]) ? object[1] : ""}</div>
` : ""}</div>`;
	})
	inventory.bar.forEach((object) => {
		document.querySelector("#inventory_bar").innerHTML += `<div class="slot">${object[0] ? `
		<div${object[1] && isNaN(object[1]) ? ` data-customName="${object[1]}"` : ""} class="icon-minecraft icon-minecraft-${object[0]}">${object[1] && !isNaN(object[1]) ? object[1] : ""}</div>
` : ""}</div>`;
	})
// 	inventory.color.forEach((color) => {CHANGING_NEGCOLOR
// 		document.querySelector("#inventory_color").innerHTML += `<div class="slot">
// 	<div class="colour" style="background-color: ${color}"></div>
// </div>`;
// 	})
}

var char = new URLSearchParams(window.location.search).get("c") ?? "thaero";
fetch(`assets/characterSpecific/${char}/${char}.json`).then(async response => {
	var charinfo = await response.json();
	setTrollian(charinfo.trollian);

	document.querySelector("#general_fullName").innerHTML = charinfo.general.fullName.toUpperCase();
	document.querySelector("#trollian_user_name").innerHTML = charinfo.trollian.user.name + " [" +shortenTrollTag(charinfo.trollian.user.name) + "]";
	document.querySelector("#general_description").innerHTML = charinfo.general.description.join("\n");
	document.querySelector("#general_age").innerHTML = charinfo.general.age + " years (" + Math.round((charinfo.general.age /2.1666666666666665) * 10) / 10 + " sweeps)";
	document.querySelector("#general_sign").innerHTML = charinfo.general.sign[0] + " (" + charinfo.general.sign[1] + " caste)";
	document.querySelector("#general_species").innerHTML = charinfo.general.species;
	document.querySelector("#general_pronouns").innerHTML = charinfo.general.pronouns.map(x => x.join("/")).join(", ") + ", " + charinfo.general.gender;
	document.querySelector("#general_height").innerHTML = Math.floor(charinfo.general.height / 12) + "'" + (charinfo.general.height % 12) + '" (' + (Math.floor((charinfo.general.height / 39.37) * 100) / 100) + "m)";
	document.querySelector("#image").style.backgroundImage = `url("assets/characterSpecific/${char}/${char}.png")`;
	document.querySelector("#general_pronounciation").innerHTML = charinfo.general.pronounciation;

	charinfo.general.likes.forEach((likes) => {
		document.querySelector("#general_likes").innerHTML += `<div class="listitem ${likes[1]}">${likes[0]}</div>`;
	});
	charinfo.general.facts.forEach((fact) => {
		document.querySelector("#general_facts").innerHTML += `<div class="listitem">${fact}</div>`;
	});
	document.querySelector("#general_owner_label").innerHTML = charinfo.general.owners.length > 1 ? "OWNERS" : "OWNER";
	charinfo.general.owners.forEach((owner) => {
		document.querySelector("#general_owners").innerHTML += `<a href="${owner[0]}" target="_blank" class="listitem">${owner[1]}</a>`;
	})
	

	document.querySelector("#policies_artalone").classList.add(charinfo.policies.artalone);
	document.querySelector("#policies_artgroup").classList.add(charinfo.policies.artgroup);
	document.querySelector("#policies_kinning").classList.add(charinfo.policies.kinning);
	document.querySelector("#policies_shipping").classList.add(charinfo.policies.shipping);
	document.querySelector("#policies_fanfiction").classList.add(charinfo.policies.fanfiction);

	generateInventory(charinfo.inventory);
	
	charinfo.modus.settings.forEach((element) => {
		document.querySelector("#modus_settings").innerHTML += element;
		document.querySelectorAll("#modus_settings input").forEach(x => x.disabled = true);
	});
	charinfo.modus.showcase.forEach((element) => {
		document.querySelector("#modus_showcase").innerHTML += element;
	});

	setVariables(char);
	setColors(charinfo.general.mainColor, "main");
	setColors(neg(charinfo.general.mainColor), "sec");
	setColors("rgb(0, 255, 0)", "pos");
	setColors("rgb(255, 0, 0)", "neg");
	charinfo.css.customVars.forEach((arr) => {
		document.documentElement.style.setProperty(...arr);
	});
	generateImageColors(char, charinfo);
});

var generateImageColors = (char, charinfo) => {
  var image = new Image();
	image.src = `assets/characterSpecific/${char}/${char}.png`;
	console.log(image, image.src)
  // var file = imgFile.files[0];
  // var fileReader = new FileReader();

  // fileReader.onload = () => {
    image.onload = () => {
      var canvas = document.getElementById("processingCanvas");
      canvas.width = image.width;
      canvas.height = image.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			var rgbValues = [];
			for (let i = 0; i < imageData.data.length; i += 4) {
				if (imageData.data[i + 3] <= 10) continue;
				var gran = 8;
				var rgb = {
					r: clamp(Math.round(imageData.data[i] / gran) * gran, 0, 255),
					g: clamp(Math.round(imageData.data[i + 1] / gran) * gran, 0, 255),
					b: clamp(Math.round(imageData.data[i + 2] / gran) * gran, 0, 255),
				};
				rgbValues.push(rgb);
			}
			rgbValues = rgbValues.map((v) => "#" + (v.r).toString(16).padStart(2, "0") + (v.g).toString(16).padStart(2, "0") + (v.b).toString(16).padStart(2, "0"));
			rgbValues = [...new Set(rgbValues)];
			console.log(rgbValues);
			document.querySelector("#inventory_syscolors").innerHTML += `<div class="slot">
	<div class="colour" style="background-color: ${charinfo.general.mainColor}"></div>
</div>`;
			document.querySelector("#inventory_syscolors").innerHTML += `<div class="slot">
	<div class="colour" style="background-color: ${charinfo.trollian.user.color}"></div>
</div>`;
document.querySelector("#inventory_syscolors").innerHTML += `<div class="vspacer"></div>`;
document.querySelector("#inventory_syscolors").innerHTML += `<div class="slot">
<div class="colour" id="CHANGING_CURCOLOR" data-special-text="Current Colour" style="background-color: ${charinfo.general.mainColor}"></div>
</div>`;
document.querySelector("#inventory_syscolors").innerHTML += `<div class="slot">
<div class="colour" id="CHANGING_NEGCOLOR" data-special-text="Negative Current Colour" style="background-color: ${neg(charinfo.general.mainColor)}"></div>
</div>`;
			rgbValues.forEach((color) => {
				document.querySelector("#inventory_color").innerHTML += `<div class="slot">
	<div class="colour" style="background-color: ${color}"></div>
</div>`;
			})
    }
  // }
}
