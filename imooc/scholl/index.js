const student = require('./student');
const teacher = require('./teacher');
const { list }  = require('./datalist');

console.log(list);

list.forEach((item,index)=>{
	teacher.add(item.teacherName);
	item.studentList.forEach((value,key)=>{
		student.add(value);
	})
})

