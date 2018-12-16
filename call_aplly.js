
let pet = {
	words:'...',
	speak:function(argument) {
		// body...
		console.log(argument + ' ' + this.words);
	}
}
let dog = {
	words:'Wang'
}
pet.speak.call(dog,'Speak');
console.log(pet);