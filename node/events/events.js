let EventEmitter = require('events').EventEmitter;

let lift = new EventEmitter();

lift.setMaxListeners(0);


function removeEventFn(who){
    console.log('给' + who + '倒水');
}

lift.on('求安慰',removeEventFn);

lift.on('求安慰',function(who){
    console.log('给' + who + '揉肩');
})

lift.on('求安慰',function(who){
    console.log('给' + who + '洗脸');
})

lift.on('求安慰',function(who){
    console.log('给' + who + '刷牙');
})

lift.on('求安慰',function(who){
    console.log('给' + who + '做饭');
})

lift.on('求安慰',function(who){
    console.log('给' + who + '买菜');
})

lift.on('求安慰',function(who){
    console.log('给' + who + '充电');
})

lift.on('求安慰',function(who){
    console.log('给' + who + '开电脑');
})

lift.on('求安慰',function(who){
    console.log('给' + who + '拿手机');
})

lift.on('求安慰',function(who){
    console.log('给' + who + '喂猫');
})

lift.on('求安慰',function(who){
    console.log('给' + who + '你想累死哦我');
})

lift.on('求溺爱',function(who){
    console.log('给' + who + '交工资');
})


lift.removeListener('求安慰',removeEventFn)

let hasConfortListener = lift.emit('求安慰','妹子');
let hasLoveListener = lift.emit('求安慰','汉子');
let hasPayleListener = lift.emit('举高高','嘤嘤嘤');


console.log(hasLoveListener)
console.log(hasConfortListener);
console.log(hasPayleListener);