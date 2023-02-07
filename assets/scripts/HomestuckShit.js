var shortenTrollTag = un => un.split(/(?=[A-Z])/).map(x => x[0].toUpperCase()).join("");
async function setTrollian(trollian) {
	var trolltags = document.querySelectorAll("trolltag");
	trolltags.forEach((v) => {
		var trollshort = shortenTrollTag(trollian.user.name);
		v.style.color = "rgb(" + trollian.user.color.join(", ") + ")";
		v.innerHTML = `${trollian.user.name} [${trollshort}]`;
	})
	var dialogue = document.querySelectorAll("dialogue");
	dialogue.forEach((v) => {
		if (!(v.dataset.quirks == "no" || v.dataset.quirks == "false")) {
			trollian.quirks.forEach((va) => {
				v.textContent = v.textContent.replace(new RegExp(va[0], "gm"), va[1]);
			});
		}

		var trollshort = shortenTrollTag(trollian.user.name);
		v.style.color = "rgb(" + trollian.user.color.join(", ") + ")";
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
		<div class="icon-minecraft icon-minecraft-${object[0]}">${object[1] ?? ""}</div>
` : ""}</div>`;
	})
	inventory.bar.forEach((object) => {
		document.querySelector("#inventory_bar").innerHTML += `<div class="slot">${object[0] ? `
		<div class="icon-minecraft icon-minecraft-${object[0]}">${object[1] ?? ""}</div>
` : ""}</div>`;
	})
	inventory.color.forEach((color) => {
		document.querySelector("#inventory_color").innerHTML += `<div class="slot">
	<div class="colour" style="background-color: ${color}"></div>
</div>`;
	})
}

var char = new URLSearchParams(window.location.search).get("c");
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
	document.querySelector("#image").style.backgroundImage = `url("assets/characterSpecific/${char}/${char}.png")`;

	charinfo.general.likes.forEach((likes) => {
		document.querySelector("#general_likes").innerHTML += `<div class="listitem ${likes[1]}">${likes[0]}.</div>`;
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
	setColors(charinfo.general.mainColor);
	charinfo.css.customVars.forEach((arr) => {
		document.documentElement.style.setProperty(...arr);
	});
});