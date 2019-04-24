
// const k = 9e9;
// var q1 = -1.25e-9;
// var q2 = 2e-5;
// var r = 0.1;

// var result = (k * (Math.abs(q1) * Math.abs(q2))) / r ** 2;

// document.getElementById('content').innerHTML = result + 'N';




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



/* ******P5.JS****** */

var label = document.getElementById('content')

var points = [];
var count = 0;

function pressed() {
    points.push(new DragablePoint(300, 300, 30, 30, count));
    count++;
}

var graphRes = 10;
var graphSection;

function setup() {
    var canvas = createCanvas(600, 600);
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
    constructor(x, y, w, h, zPos) {
        this.color = Math.floor(Math.random() * 361);

        this.dragging = false;
        this.rollover = false;

        this.x = x;
        this.y = y;

        this.size = Math.floor(Math.random() * 100);

        this.offsetX = 10;
        this.offsetY = 10;

        this.zPos = zPos;
    }

    getZPos() {
        return this.zPos;
    }
    
    draw() {
        colorMode(HSL);
        strokeWeight(4);

        this.isMouseOver();

        if (this.dragging) {
            this.x = mouseX - this.offsetX;
            this.y = mouseY - this.offsetY;
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
        
        strokeWeight(1);
        colorMode(RGB);
        
        textSize(15);
        fill(0);
        stroke(0);
        text(`q${this.zPos+1}`, this.x + this.size, this.y - this.size);
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
            return this.zPos;
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


