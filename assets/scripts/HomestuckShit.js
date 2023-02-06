async function generateHomestucks() {
  await fetch('/assets/characterSpecific/thaero.json').then(async response => {
    window.__trollian = (await response.json()).trollian;
  });
	var trolltags = document.querySelectorAll("trolltag");
	trolltags.forEach((v) => {
		var trolltag = window.__trollian.user.name.split(/(?=[A-Z])/);
		var trollshort = trolltag.map(x => x[0].toUpperCase()).join("");
		v.style.color = "rgb(" + window.__trollian.user.color.join(", ") + ")";
		v.innerHTML = `${trolltag.join("")} [${trollshort}]`;
	})
	var dialogue = document.querySelectorAll("dialogue");
	dialogue.forEach((v) => {
		if (!(v.dataset.quirks == "no" || v.dataset.quirks == "false")) {
			window.__trollian.quirks.forEach((va) => {
				v.textContent = v.textContent.replace(new RegExp(va[0], "gm"), va[1]);
			});
		}

		var trolltag = window.__trollian.user.name.split(/(?=[A-Z])/);
		var trollshort = trolltag.map(x => x[0].toUpperCase()).join("");
		v.style.color = "rgb(" + window.__trollian.user.color.join(", ") + ")";
		v.innerHTML = `${trollshort}: ${v.innerHTML}`;
	})
}

generateHomestucks();