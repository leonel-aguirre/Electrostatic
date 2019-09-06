
// const k = 9e9;
// var q1 = -1.25e-9;
// var q2 = 2e-5;
// var r = 0.1;

// var result = (k * (Math.abs(q1) * Math.abs(q2))) / r ** 2;

// document.getElementById('content').innerHTML = result + 'N';


var keyMap = {
    "up": false,
    "down": false,
    "left": false,
    "right": false,
}


var label = document.getElementById('content');

var points = [];
var count = 0;

/* ******P5.JS****** */

var scl = 1;
var transX = 0;
var transY = 0;

var constr = 2310;

var canvasW = document.documentElement.clientWidth;
var canvasH = document.documentElement.clientHeight;

var canvas;

function setup() {
    canvas = createCanvas(canvasW, canvasH);
    canvas.parent('graph');
}

function drawLines() {
    stroke('#888');
    for (var i = -60; i < 60; i++) {
        if (i == 0) {
            push();
            stroke('#F07');
            strokeWeight(1.5);
        }
        line(i * 50, -3000, i * 50, 3000);
        line(-3000, i * 50, 3000, i * 50);
        if (i == 0)
            pop();
    }

}

function draw() {
    background('#EEE');
    translate(width / 2 + transX, height / 2 + transY)
    scale(scl);
    drawLines();
    updatePosition();


    points.forEach(point => {
        point.draw();
    });

}

function updatePosition() {

    if (keyMap.left)
        transX += 10;
    if (keyMap.right)
        transX -= 10;
    if (keyMap.up)
        transY += 10;
    if (keyMap.down)
        transY -= 10;

    transX = constrain(transX, -constr, constr);
    transY = constrain(transY, -constr, constr);

}

/* **EVENT LISTENERS** */

var zoomSld = document.getElementById('zoomSlider');

document.addEventListener('wheel', (e) => {

    if (scl + -e.deltaY / 1000 >= 0.3 && scl + -e.deltaY / 1000 <= 2) scl += -e.deltaY / 1000;
    scl = (Math.round(scl * 10) / 10);
    zoomSld.value = scl;

    //GENERATES THE X TRANSLATION CONSTRAIN RELATIVE TO ZOOM
    constr = (((((scl - 0.3) * 10)) * 300) + 210);

    // console.log(scl, constr);

});

document.addEventListener('keydown', (e) => {

    // console.log(transX, transY);


    if (e.which == 65) {
        keyMap.left = true;
    } else if (e.which == 68) {
        keyMap.right = true;
    } else if (e.which == 87) {
        keyMap.up = true;
    } else if (e.which == 83) {
        keyMap.down = true;
    } else if (e.which == 81) {
        points.push(new DragablePoint(0, 0, count));
    }

});

document.addEventListener('keyup', (e) => {

    if (e.which == 65) {
        keyMap.left = false;
    } else if (e.which == 68) {
        keyMap.right = false;
    } else if (e.which == 87) {
        keyMap.up = false;
    } else if (e.which == 83) {
        keyMap.down = false;
    }

});

zoomSld.addEventListener('input', (e) => {

    scl = e.target.value;

    constr = (((((scl - 0.3) * 10)) * 300) + 210);

});

window.onresize = () => {
    canvasW = document.documentElement.clientWidth;
    canvasH = document.documentElement.clientHeight;

    canvas = createCanvas(canvasW, canvasH);

}


/* **EVENT LISTENERS** */


function mousePressed() {

    console.log("MOUSE PRESSED");

    console.log((mouseX) - width / 2, (mouseY) - height / 2);



    var greater = -1;
    var actual;
    points.forEach(point => {
        actual = point.mousePressed();
        if (actual > greater) greater = actual;
    });

    if (points[greater] != null) {
        points[greater].drag();
        console.log(greater);
    }
}

function mouseReleased() {

    console.log("MOUSE RELEASED");


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


        // this.size = ((Math.floor(Math.random() * 7) + 1) * 10) + 15;

        this.size = 35;



        this.offsetX = 10;
        this.offsetY = 10;

        this.id = id;

        count++;

        console.log(this.id);
    }

    getId() {
        return this.id;
    }

    draw() {
        colorMode(HSL);
        strokeWeight(4);

        this.isMouseOver();

        if (this.dragging) {
            this.x = Math.round(((mouseX - width / 2) - this.offsetX) / 25) * 25;
            this.y = Math.round(((mouseY - height / 2) - this.offsetY) / 25) * 25;

            console.log(`X:${this.x} Y:${this.y}`)

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
        if ((mouseX - width / 2) > this.x - (this.size / 2) + this.offsetX && (mouseX - width / 2) < this.x + (this.size / 2) + this.offsetX && (mouseY - height / 2) > this.y - (this.size / 2) + this.offsetY && (mouseY - height / 2) < this.y + (this.size / 2) + this.offsetY) {
            this.rollover = true;
        }
        else {
            this.rollover = false;
        }
    }

    mousePressed() {
        if ((mouseX - width / 2) > this.x - (this.size / 2) + this.offsetX && (mouseX - width / 2) < this.x + (this.size / 2) + this.offsetX && (mouseY - height / 2) > this.y - (this.size / 2) + this.offsetY && (mouseY - height / 2) < this.y + (this.size / 2) + this.offsetY) {
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



