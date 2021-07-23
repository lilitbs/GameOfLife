var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html')
});
server.listen(7777);

weather = "summer"

setInterval(function () {
    if (weather == "summer") {
        weather = "autumn"
    }
    else if (weather == "autumn") {
        weather = "winter"
    }
    else if (weather == "winter") {
        weather = "spring"
    }
    else if (weather == "spring") {
        weather = "summer"
    }
    io.sockets.emit('send weather', weather)
}, 4000)

matrix = [];

io.sockets.emit('send matrix', matrix)

function generator(matLen, gr, grEat, pr, monst, riv, bet, end) {

    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < monst; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < riv; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < bet; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    } for (let i = 0; i < end; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 7;
        }
    }
    io.sockets.emit("send matrix", matrix)

}

generator(20, 45, 30, 15, 10, 5, 5, 2);

grassArr = [];
grassEaterArr = []
grassPredatorArr = []
grassMonsterArr = []
grassRiverArr = []
grassMonsterEaterArr = []
grassEndArr = []


var Grass = require("./grass.js")
var GrassEater = require("./grasseater.js")
var GrassPredator = require("./grasspredator.js")
var GrassMonster = require("./grassmonster.js")
var GrassRiver = require("./grassriver.js")
var GrassMonsterEater = require("./grassMonsterEater.js")
var GrassEnd = require("./grassend.js")

function createobject(matrix) {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            }
            else if (matrix[y][x] == 3) {
                let grPredat = new GrassPredator(x, y)
                grassPredatorArr.push(grPredat)
            }
            else if (matrix[y][x] == 4) {
                let newMonster = new GrassMonster(x, y)
                grassMonsterArr.push(newMonster)
            }
            else if (matrix[y][x] == 5) {
                let newRiver = new GrassRiver(x, y)
                grassRiverArr.push(newRiver)
            }
            else if (matrix[y][x] == 6) {
                let newMonsterEater = new GrassMonsterEater(x, y)
                grassMonsterEaterArr.push(newMonsterEater)
            }
            else if (matrix[y][x] == 7) {
                let newEnd = new GrassEnd(x, y)
                grassEndArr.push(newEnd)
            }
        }
    }
    io.sockets.emit("send matrix", matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat()
    }
    for (var i in grassPredatorArr) {
        grassPredatorArr[i].mul();
        grassPredatorArr[i].eat()
    }
    for (var i in grassMonsterArr) {
        grassMonsterArr[i].mul();
        grassMonsterArr[i].eat()
    }
    for (var i in grassRiverArr) {
        grassRiverArr[i].eat();
    }
    for (var i in grassMonsterEaterArr) {
        grassMonsterEaterArr[i].eat();
    }
    for (var i in grassEndArr) {
        grassEndArr[i].mul();
        grassEndArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix)
}

var flag = true


io.on('connection', function (socket) {
    if (flag) {
        console.log(1111);

        createobject(matrix)
        flag = false
    }

    socket.on("add Grass", function addGrass() {
        console.log("es avelacnum em gras");

    })
})

setInterval(game, 1000)

var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.GrassPredator = grassPredatorArr.length;
    statistics.GrassMonster = grassMonsterArr.length;
    statistics.GrassRiver = grassRiverArr.length;
    statistics.GrassMonsterEater = grassMonsterEaterArr.length;
    statistics.grassEnd = grassEndArr.length;

    fs.writeFileSync("statistics.json", JSON.stringify(statistics))
}, 1000)

