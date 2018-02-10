class Tween {
	constructor(value, step=10) {
		this.value = value;
		this.target = value;
		this.step = 0;
		this.maxStep = step;
		this.currentStep = 0;
	}

	update() {
		if(this.currentStep < this.maxStep) {
			this.value += this.step;
			this.currentStep++;
		} else if (this.currentStep === this.maxStep) this.value = this.target;
	}

	setTargetValue(target) {
		this.target = target;
		this.step = (target - this.value) / this.maxStep;
		this.currentStep = 0;
	}
}

export default Tween;
