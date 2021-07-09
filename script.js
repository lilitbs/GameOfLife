function generator(matLen, gr, grEat, pr, monst, riv, bet,end) {
    let matrix = [];
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
    return matrix;
}

let side = 20;

let matrix = generator(15, 40, 25, 10, 5, 5, 5, 2);

var grassArr = [];
var grassEaterArr = []
var grassPredatorArr = []
var grassMonsterArr = []
var grassRiverArr = []
var grassBeautyArr = []
var grassEndArr = []

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

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
                let newBeauty = new GrassBeauty(x, y)
                grassBeautyArr.push(newBeauty)
            }
            else if (matrix[y][x] == 7) {
                let newEnd = new GrassEnd(x, y)
                grassEndArr.push(newEnd)
            }
        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 3) {
                fill("red")
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 4) {
                fill("orange")
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 5) {
                fill("blue")
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 6) {
                fill("violet")
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 7) {
                fill("aqua")
                rect(x * side, y * side, side, side)
            }
        }
    }
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
    for (var i in grassBeautyArr) {
        grassBeautyArr[i].eat();
    }
    for (var i in grassEndArr) {
        grassEndArr[i].mul();
        grassEndArr[i].eat()
    }
}

