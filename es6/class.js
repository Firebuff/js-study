/*
	如何创建一个类 class

	在写类的过程中，有一点需要注意：class没有预解析，实例化一定要放在下面；
	在ES5里面用函数来模拟类就可以，因为函数是有提升的功能的
 */


// es6写法

/*class Animal {
	constructor (name, food) {
		this.name = name
		this.food = food
	}

	// 为Animal的原型加上eatWhat方法
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
		super (name, food) //继承父类的属性，必须写在任何this的开头，不然会报错
	}
	feature () {
		console.log(this.name)
	}

	//重写原型方法
	eatWhat () {
		console.log('eat what')
		// super.eatWhat()
	}
}

let monkey01 = new Monkey('monkey01','banana')

monkey01.feature()
monkey01.eatWhat()
// monkey01.eatWhat() //子类无法调用 父类中的静态方法

Animal.canTalk()

*/








/*
	---------------------- ES 5--------------------------
 */



// 创建一个构造函数作为原型

function Animals (name,food) {
	this.name = name
	this.food = food
	this.sayHello = function () {
		console.log(`my name is ${this.name}`)
	}

}


//加上静态方法
Animals.isAnimal = function isAnimal() {
	console.log('i don\'t know ')
}

// 在原型上添加一个方法( es5 )
Animals.prototype.eatWhat = function () {
	console.log(`${this.name} eat ${this.food}`)
}


let tiger = new Animals('tiger', 'meat')

tiger.eatWhat()


/* 
	es5 如何继承？ 先创建一个 tigerClass 子类（也就是构造函数),

	在调用call方法将 父类的 this指向 tigerClass， 这样 tigerClass 就拥有了

	父类 this.xxx 的所有属性；

	但是 父类prototype上面的挂载的东西怎么继承过来呢？ 

	因为tigerClass 不是通过 new Animals() 创建的 一个实例，所以无法通过 原型链调用 Animals原型上挂载的东西


	我们 可以通过创建一个 新的拥有 Animals原型 所有属性 和 方法的 对象 挂载到 tigerClass 的原型上，这样 new tigerClass()

	创建的实例就可以调用和访问了:

	tigerClass.prototype = Object.create(Animal.prototype)



*/

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

tigerClass.prototype = Object.create(Animals.prototype)


let tiger01 = new tigerClass('tiger01', 'meat', 4)

console.log(tiger01.legs)
console.log(tiger01.name)

// eatWhat 是 Animals 原型挂载的方法，无法通过原型链查找到的， 除非 tigerClass.prototype = Object.create(Animals.prototype)

tiger01.eatWhat()  

tiger01.sayHello() // my name is huangj

// tiger01.isAnimal()  //报错因为 isAnimal 是 Animals 的静态方法，只能由 Animals 调用

Animals.isAnimal()