import HpBar0 from "../../images/hpbar-0.png";
import HpBar10 from "../../images/hpbar-10.png";
import HpBar20 from "../../images/hpbar-20.png";
import HpBar30 from "../../images/hpbar-30.png";
import HpBar40 from "../../images/hpbar-40.png";
import HpBar50 from "../../images/hpbar-50.png";
import HpBar60 from "../../images/hpbar-60.png";
import HpBar70 from "../../images/hpbar-70.png";
import HpBar80 from "../../images/hpbar-80.png";
import HpBar90 from "../../images/hpbar-90.png";
import HpBar100 from "../../images/hpbar-100.png";
import {Sprite, SpriteMaterial, TextureLoader} from "three";

import loadPromise from "../utils/LoadPromise";

class HealthBar {
	constructor(object) {
		this.model = new Sprite(HealthBar.hpbars['100']);
	}

	update(hp, maxHp) {
		this.model.material = HealthBar.hpbars[`${Math.round(hp / maxHp * 10) * 10}`];
	}

	static async init() {
		this.hpbars = {
			'0': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar0)}),
			'10': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar10)}),
			'20': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar20)}),
			'30': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar30)}),
			'40': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar40)}),
			'50': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar50)}),
			'60': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar60)}),
			'70': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar70)}),
			'80': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar80)}),
			'90': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar90)}),
			'100': new SpriteMaterial({map: await loadPromise(new TextureLoader, HpBar100)})
		};
	}
}

export default HealthBar;
