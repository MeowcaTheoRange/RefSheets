// Unfinished. Do not touch.

class int_Color {
	#prefix;
	#prefixLong;
	Color;
	constructor (prefix, prefixLong, color) {
		this.#prefix = prefix;
		this.#prefixLong = prefixLong ?? prefix;
		this.Color = color
	}
	
	getPrefix (long) {
		return long ? this.#prefix : this.#prefixLong;
	}
}

class int_Aspect {
	Prospit;
	Derse;
	long;
	constructor (Prospit, Derse, long, connect) {
		this.Prospit = Prospit;
		this.Derse = Derse;
		this.long = long;
	}
	
	getSuffix (sway) {
		return this[sway];
	}
}

class Sign {
	static Colors = {
		"Rust": new int_Color("Ar"),
		"Bronze": new int_Color("Taur"),
		"Gold": new int_Color("Gem"),
		"Lime": new int_Color("Ca", "Can"),
		"Olive": new int_Color("Le"),
		"Jade": new int_Color("Vir"),
		"Teal": new int_Color("Li", "Lib"),
		"Blue": new int_Color("Scor"),
		"Indigo": new int_Color("Sagi"),
		"Purple": new int_Color("Capri"),
		"Violet": new int_Color("Aqu", "Aqua"),
		"Fuchsia": new int_Color("Pi")
	};
	static Aspects = {
		"Time": new int_Aspect("rist", "ries", true, true),
		"Space": new int_Aspect("go", "ga", true, true),
		"Void": new int_Aspect("ittanius", "ittarius", false, true),
		"Light": new int_Aspect("pio", "pia", true, true),
		"Mind": new int_Aspect("ra", "za", true, false),
		"Heart": new int_Aspect("lo", "o", [true, false], false),
		"Rage": new int_Aspect("icorn", "iborn", false),
		"Hope": new int_Aspect("nius", "rius", true),
		"Doom": new int_Aspect("mino", "mini", true),
		"Life": new int_Aspect("sci", "sces", true),
		"Blood": new int_Aspect("cer", "cen", true),
		"Breath": new int_Aspect("us", "un", false, "i")
	};
	Color;
	Aspect;
	Sway;
	constructor (Color, Sway, Aspect) {
		this.Color = Color;
		this.Aspect = Aspect;
		this.Sway = Sway;
	}

	get compiled () {
		var curAspObj = Sign.Aspects[this.Aspect];
		console.log(Sign.Colors, Sign.Aspects, this.Color, this.Aspect, this.Sway);
		return Sign.Colors[this.Color].getPrefix(curAspObj.long) + curAspObj.getSuffix(this.Sway);
	}
}