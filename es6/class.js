/*
	如何创建一个类 class

	在写类的过程中，有一点需要注意：class没有预解析，实例化一定要放在下面；
	在ES5里面用函数来模拟类就可以，因为函数是有提升的功能的
 */


// es6写法

class Animal {
	constructor (name, food) {
		this.name = name
		this.food = food
	}
	eatWhat () {
		console.log(`${this.name} eat ${this.food}`)
	}
	// 静态方法
	static canTalk () {
		console.log(`they can't talk!`)
	}
}

let elephant = new Animal('elephant', 'glass')

elephant.eatWhat()

// es6 如何继承


class Monkey extends Animal {
	constructor (name, food) {
		super (name, food)
	}
	feature () {
		console.log(this.name)
	}
	eatWhat () {
		// console.log('eat what')
		super.eatWhat()
	}
}

let monkey01 = new Monkey('monkey01','banana')

monkey01.feature()
monkey01.eatWhat()
// monkey01.eatWhat() //子类无法调用 父类中的静态方法

Animal.canTalk()
















/*
	---------------------- ES 5--------------------------
 */


// es5 写法 

function Animals (name,food) {
	this.name = name
	this.food = food
	this.sayHello = function () {
		console.log(`my name is ${this.name}`)
	}
}
Animals.prototype.eatWhat = function () {
	console.log(`${this.name} eat ${this.food}`)
}

let tiger = new Animals('tiger', 'meat')

tiger.eatWhat()


// es5 如何继承？

function tigerClass (name, food, legs) {

	/*
		A.call(B,x,y)

		1、 改变函数A的this指向，使之指向B;

		2、 把A函数放到B中运行，x和y是A函数的参数

	 */

	//借助 call 实现继承
	Animals.call(this, name, food)

	this.name = 'huangj'

	this.legs = legs
}

// tigerClass.prototype = new Animals()

let tiger01 = new tigerClass('tiger', 'meat', 4)

console.log(tiger01.legs)
console.log(tiger01.name)

// tiger01.eatWhat()
tiger01.sayHello()