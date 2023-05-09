const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

let users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];

class User {
	constructor(obj) {
		this.name = obj?.name || '';
		this.age = obj?.age || '';
		this.img = obj?.img || '';
		this.role = obj?.role || '';
		this.courses = obj?.courses || [];
	}
	render() {
		return `<div class="user__info">
		<div class="user__info">
		
		<img src="images/users/${this.img}.png" alt="${this.img}" height="50">
		<div  class="user__naming"><p>Name:<b> ${this.name}</b></p>
		<p>Age:<b> ${this.age}</b></p>
		</div></div>
		<div class="user__info--role student"><img src="images/roles/${this.role}.png" height="25"">
		<p> ${this.role}</p></div>
		</div>`
	}
	renderCourses() {
		return `<div class="user__courses"> ${this.courses.map(({ title, mark }) => `
		    <p class="user__courses--course ${this.role}"> ${title}: <span class="${this.renderMarks(mark)}">${this.renderMarks(mark)}</span></p>
		`).join('')}</div>`


	}
	renderMarks(mark) {
		return Object.entries(gradation).reduce((sum, [key, value],) => {

			if (mark <= key && !sum) {
				sum += value
			}

			return sum

		}, '')
	}
}

class Student extends User {
	constructor(obj) {
		super(obj)
	}
}


class lector extends User {
	constructor(obj) {
		super(obj)
	}

	renderCourses() {

		return `<div class="user__courses admin--info">${this.courses.map(({ title, score, studentsScore }) => `<div class="user__courses--course lector">
		<p>Title:
		<b> ${title}</b>
		</p>
		<p>Lector's score: 
		<span class ="${this.renderMarks(score)}">
		 ${this.renderMarks(score)}</span>
		</p>
		<p> Average student's score:
		<span class ="${this.renderMarks(studentsScore)}">
		 ${this.renderMarks(studentsScore)}</span>
		</p>
		</div>`).join(" ")}
		</div>`
	}
}
class Admin extends User {
	constructor(obj) {
		super(obj)
	}

	renderCourses() {
		console.log(this)
		return `<div class="user__courses admin--info">${this.courses.map(({ lector, title, score }) => `<div class="user__courses--course admin">
		<p>Title:
		<b> ${title}</b>
		</p>
		<p> Admin's score:
		<span class ="${this.renderMarks(score)}">
		 ${this.renderMarks(score)}</span>
		</p>
		<p>Lector:
		<b> ${lector}</b>
		</p>
		</div>`).join(" ")}
		</div>`
	}
}
class createUser {
	constructor(user) {
		this.user = user;
	}
	getUserRole() {
		switch (this.user?.role) {
			case 'admin': {
				return new Admin(this.user)
			}
			case 'lector': {
				return new lector(this.user)
			}
			default:
				return new Student(this.user)
		}
	}




}

const render = users.map((elem) => {
	const role = new createUser(elem).getUserRole();

	return ` <div class="user">${role.render()}
        <div >     
            ${role.renderCourses()}
        </div>
    </div>`
}).join('')

document.write(`<div class="users" >${render}</div>`);


// let ren = users.map((elem) => elem = new User(Object.values(elem).map((sv) => sv.join())));
// console.log(ren);
/*return	this.courses.map((elem) => {
			console.log(elem);
			 `
			<div>
			<p><span>${elem.title}</span></p>
			<p><span>${elem.score = () => {
					switch (elem.score) {
						case (elem.score >= 20):
							gradation[20]
							break;
						case (elem.score >= 50):
							gradation[50]
							break;


						case (elem.score >= 85):
							gradation[85]
							break;


						case (elem.score >= 100):
							gradation[100]
							break;



						default:
							' '
							break;
					}

				}}</span></p>
			<p><span>${elem.studentsScore = () => {
					switch (elem.studentsScore) {
						case (elem.studentsScore >= 20):
							gradation[20]
							break;
						case (elem.studentsScore >= 50):
							gradation[50]
							break;


						case (elem.studentsScore >= 85):
							gradation[85]
							break;


						case (elem.studentsScore >= 100):
							gradation[100]
							break;



						default:
							' '
							break;
					}
				}
				}</span></p>
			</div>`
		})*/