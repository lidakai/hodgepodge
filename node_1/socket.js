var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
server.listen(3000);
var user = {};
io.on('connection', function(socket) {
    socket.on('message', function(d) {
        switch (d.type) {
        case 'reg':
            user[d.content.uid] = socket.id;
            socket.broadcast.emit('addList', d.content);
            console.log('用户上线了：用户id=' + d.content.uid + '| 客户端id=' + socket.id);
            break;
        case 'chatMessage':
            var mydata = {
                username: d.content.mine.username,
                avatar: d.content.mine.avatar,
                id: d.content.mine.id,
                content: d.content.mine.content,
                type: d.content.to.type,
                toid: d.content.to.id
            };
            if (d.content.to.type == 'friend') {
                if (user[mydata.toid]) {
                    io.sockets.sockets[user[mydata.toid]].emit('chatMessage', mydata);
                    console.log('【' + d.content.mine.username + '】对【' + d.content.to.username + '】说:' + d.content.mine.content)
                } else {
                    socket.emit('noonline', mydata)
                }
            } else if (d.content.to.type == 'group') {
                mydata.id = mydata.toid;
                socket.broadcast.emit('chatMessage', mydata)
            }
            break
        }
    }).on('disconnect', function() {
        for (x in user) {
            if (user[x] == socket.id) {
                console.log(user[x] + '下线了');
                user[x] = null
            }
        }
    })
});