import { insertStep } from './helpers';

const ms = (array,arraySteps, colorSteps,strt,end) => {
	if (array.length === 1) return array;
	let mid = Math.floor(array.length / 2);

	let L = ms(array.slice(0, mid), arraySteps, colorSteps,strt,end);
	let R = ms(array.slice(mid),arraySteps, colorSteps,strt + mid,end);

	let arrayNew = merge(L, R, strt, arraySteps, colorSteps);
	arraySteps.push(arraySteps[arraySteps.length - 1].slice());
	colorSteps.push(colorSteps[colorSteps.length - 1].slice().fill(arrayNew.length === arraySteps[0].length ? 2 : 0));
	return arrayNew;
};

const merge = (L, R, strt, arraySteps, colorSteps) => {
	let arrayNew = [];
	let A = 0;
	let B = 0;

	while (L.length > 0 && R.length > 0) {
		if (L[A] < R[B]) {
			arrayNew.push(L.shift());
			insertStep(arrayNew, strt, arraySteps);
		} else {
			arrayNew.push(R.shift());
			insertStep(arrayNew, strt, arraySteps);
		}
		updateColor(strt, colorSteps, arrayNew.length - 1, [], []);
	}


	if (L.length !== 0 || R.length !== 0) {
		updateColor(strt, colorSteps, arrayNew.length, L, R);
		arrayNew = arrayNew.concat(L);
		arrayNew = arrayNew.concat(R);
		insertStep(arrayNew, strt, arraySteps);
	}

	return arrayNew;
};

const updateColor = (strt, colorSteps, start, L, R) => {
	let colorKey = colorSteps[colorSteps.length - 1].slice();
	let end = strt + start + L.length + R.length;
	start = start + strt;

	if (end === start) {
		colorKey.fill(1, start, end + 1);
	} else {
		colorKey.fill(0, start, end);
	}
	colorSteps.push(colorKey);
};

export default ms;