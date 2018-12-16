 
 var arr=[
 {name:"a",muen:2},
 {name:"a",muen:21},
 {name:"g",muen:2},
 {name:"g",muen:3},
 {name:"g",muen:3},
 {name:"c",muen:4},
 {name:"c",muen:44}
 ]
//问你个问题怎么把这数组里name相等的的去重并且muen求重复的总和

function pivot(arr){
	for(i in arr){	
		for(j in arr){
			if(arr[i].name == arr[j].name && i!=j){
			  arr[i].muen=arr[i].muen += arr[j].muen
			  arr.splice(j,1)
					}else{
				arr[i]
			}
		}
	}
	return arr
	}
	console.log(pivot(arr))