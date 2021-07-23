var socket = io();

let side = 20;

function setup() {
    frameRate(5);
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}

socket.on("send weather", function (data) {
    weather = data;
})

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                if (weather == "summer") {
                    fill("green");
                }
                else if (weather == "autumn") {
                    fill("#dea05d");
                }
                else if (weather == "winter") {
                    fill("#b3ffda");
                }
                else if (weather == "spring") {
                    fill("#19ff6a");
                }
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
                fill("#ff8400")
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
}

setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 1000
)

function addGrass() {
    console.log("sockety anum a emit");
    
 socket.emit("add Grass")
}