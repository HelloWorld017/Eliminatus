import HpBar0 from "../../images/hpbar/hpbar-0.png";
import HpBar10 from "../../images/hpbar/hpbar-10.png";
import HpBar20 from "../../images/hpbar/hpbar-20.png";
import HpBar30 from "../../images/hpbar/hpbar-30.png";
import HpBar40 from "../../images/hpbar/hpbar-40.png";
import HpBar50 from "../../images/hpbar/hpbar-50.png";
import HpBar60 from "../../images/hpbar/hpbar-60.png";
import HpBar70 from "../../images/hpbar/hpbar-70.png";
import HpBar80 from "../../images/hpbar/hpbar-80.png";
import HpBar90 from "../../images/hpbar/hpbar-90.png";
import HpBar100 from "../../images/hpbar/hpbar-100.png";
import {Sprite, SpriteMaterial, TextureLoader} from "three";

import loadPromise from "../utils/LoadPromise";

class HealthBar {
	constructor(object) {
		this.model = new Sprite(HealthBar.hpbars['100']);
		this.model.scale.set(30, 30, 1);
	}

	update(hp, maxHp) {
		this.model.material = HealthBar.hpbars[`${Math.round(hp / maxHp * 10) * 10}`];
	}

	static async getMaterial(tex) {
		const mat = new SpriteMaterial({
			map: await loadPromise(new TextureLoader, tex)
		});

		return mat;
	}

	static async init() {
		this.hpbars = {
			'0': await this.getMaterial(HpBar0),
			'10': await this.getMaterial(HpBar10),
			'20': await this.getMaterial(HpBar20),
			'30': await this.getMaterial(HpBar30),
			'40': await this.getMaterial(HpBar40),
			'50': await this.getMaterial(HpBar50),
			'60': await this.getMaterial(HpBar60),
			'70': await this.getMaterial(HpBar70),
			'80': await this.getMaterial(HpBar80),
			'90': await this.getMaterial(HpBar90),
			'100': await this.getMaterial(HpBar100)
		};
	}
}

export default HealthBar;
