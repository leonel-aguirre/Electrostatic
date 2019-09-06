
// const k = 9e9;
// var q1 = -1.25e-9;
// var q2 = 2e-5;
// var r = 0.1;

// var result = (k * (Math.abs(q1) * Math.abs(q2))) / r ** 2;

// document.getElementById('content').innerHTML = result + 'N';

var xPosLabel = document.getElementById('xPos');
var yPosLabel = document.getElementById('yPos');


//GENERATES A RANDOM HEXADECIMAL COLOR CODE WITH 6 DIGITS IF IT IS CALLED WITHOUT ARGUMENTS, BUT IF 
//IT IS CALLED WITH THE "ALPHA" ARGUMENT, THEN I WILL GENERATE AN 8 DIGIT HEXADECIMAL COLOR CODE INSTEAD.
function getRandomHexColor(alpha) {
    var hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

    var hexColor = "#";

    for (var i = 0; i < 6; i++) {
        hexColor += (hexDigits[Math.floor(Math.random() * 16)]);
    }

    if (alpha != null) {
        var hexAlpha = Math.ceil((((alpha) * 255) / 100)).toString(16);

        if (hexAlpha.length == 1) hexAlpha += "0";

        hexColor += hexAlpha;
    }

    return hexColor;
}


/* **EVENT LISTENERS** */
var btnAdd = document.getElementById('btnAdd');

btnAdd.addEventListener('click', () => {
    points.push(new DragablePoint(250, 250, count));
    count++;
});

/* **EVENT LISTENERS** */



/* ******P5.JS****** */

var label = document.getElementById('content');

var points = [];
var count = 0;

var graphRes = 20;
var graphSection;

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent('graph');
    graphSection = width / graphRes;
}

function drawLines() {
    stroke('#888');
    for (var i = 0; i < graphRes; i++) {
        if (i != 0) {
            line(i * graphSection, 0, i * graphSection, height);
            line(0, i * graphSection, width, i * graphSection);
        }
    }
}

function draw() {
    background('#EEE');
    drawLines();

    points.forEach(point => {
        point.draw();
    });
}

function mousePressed() {

    var greater = -1;
    var actual;
    points.forEach(point => {
        actual = point.mousePressed();
        if (actual > greater) greater = actual;
    });

    if (points[greater] != null) points[greater].drag();
}

function mouseReleased() {
    points.forEach(point => {
        point.mouseReleased();
    });
}

/* ******P5.JS****** */


/* ******DRAGABLE OBJECT****** */

class DragablePoint {
    constructor(x, y, id) {
        this.color = Math.floor(Math.random() * 361);

        this.dragging = false;
        this.rollover = false;

        this.x = x;
        this.y = y;

        (Math.floor(Math.random() * 2)) ? this.charge = '＋' : this.charge = '−−';

        console.log(this.charge);

        // this.size = ((Math.floor(Math.random() * 7) + 1) * 10) + 15;

        this.size = 35;

        

        this.offsetX = 10;
        this.offsetY = 10;

        this.id = id;
    }

    getId() {
        return this.id;
    }

    draw() {
        colorMode(HSL);
        strokeWeight(4);

        this.isMouseOver();

        if (this.dragging) {
            this.x = Math.round((mouseX - this.offsetX) / 25) * 25;
            this.y = Math.round((mouseY - this.offsetY) / 25) * 25;

            console.log(`X:${this.x} Y:${this.y}`)

            xPosLabel.innerHTML = `X: ${((this.x - 250) / (25)).toFixed(0)}`;
            yPosLabel.innerHTML = `Y: ${(((this.y - 250) * (-1)) / (25)).toFixed(0)}`;
        }


        if (this.dragging) {
            fill(this.color, 80, 30);
            stroke(this.color, 80, 15);
        } else if (this.rollover) {
            fill(this.color, 80, 40);
            stroke(this.color, 80, 25);
        } else {
            fill(this.color, 80, 50);
            stroke(this.color, 80, 35);
        }

        ellipse(constrain(this.x, 0, width), constrain(this.y, 0, height), this.size, this.size);

        textSize(15);

        if (this.dragging) {
            fill(this.color, 80, 15);
            stroke(this.color, 80, 15);
            text(this.charge, this.x - 7.5, this.y + 5);
        } else if (this.rollover) {
            fill(this.color, 80, 25);
            stroke(this.color, 80, 25);
            text(this.charge, this.x - 7.5, this.y + 5);
        } else {
            fill(this.color, 80, 35);
            stroke(this.color, 80, 35);
            text(this.charge, this.x - 7.5, this.y + 5);
        }


        strokeWeight(1);
        colorMode(RGB);

        textStyle(BOLD);
        fill(0);
        noStroke();
        text(`q${this.id + 1}`, this.x + this.size / 2, this.y - this.size / 2);
    }

    isMouseOver() {
        if (mouseX > this.x - (this.size / 2) + this.offsetX && mouseX < this.x + (this.size / 2) + this.offsetX && mouseY > this.y - (this.size / 2) + this.offsetY && mouseY < this.y + (this.size / 2) + this.offsetY) {
            this.rollover = true;
        }
        else {
            this.rollover = false;
        }
    }

    mousePressed() {
        if (mouseX > this.x - (this.size / 2) + this.offsetX && mouseX < this.x + (this.size / 2) + this.offsetX && mouseY > this.y - (this.size / 2) + this.offsetY && mouseY < this.y + (this.size / 2) + this.offsetY) {
            return this.id;
        }
    }

    drag() {
        this.dragging = true;
    }

    mouseReleased() {
        this.dragging = false;
    }

}

/* ******DRAGABLE OBJECT****** */


