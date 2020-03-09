class CreateCanvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = [];
    }

    getCanvas() {
        if (this.width < 0) throw "Width must be more than 0";
        if (this.height < 0) throw "Height must be more than 0";

        for (let x = 0; x < this.height + 2; x++) {

            this.canvas.push([]);

            for (let y = 0; y < this.width + 2; y++) {
                this.canvas[x][y] = ' ';

                if (x == 0 || x == this.height + 1) {
                    this.canvas[x][y] = '-';
                }

                if (y == 0 || y == this.width + 1) {
                    this.canvas[x][y] = '|';
                }
            }
        }
        return this.canvas;

    }

    drawCanvas(x1, y1, x2, y2) {

        this.validateInput(x1, y1, x2, y2);

        if (x1 != x2) {
            for (let i = x1; i <= x2; i++) {
                this.canvas[y1][i] = 'x';
            }
        } else {
            for (let i = y1; i <= y2; i++) {
                this.canvas[i][x1] = 'x';
            }
        }

        return this.canvas;

    }

    drawRectangle(x1, y1, x2, y2) {

        this.validateInput(x1, y1, x2, y2);

        for (let i = x1; i <= x2; i++) {
            this.canvas[y1][i] = 'x';
            this.canvas[y2][i] = 'x';
        }

        for (let i = y1; i <= y2; i++) {
            this.canvas[i][x1] = 'x';
            this.canvas[i][x2] = 'x';
        }
        return this.canvas;
    }

    bucketFill(x, y, color) {
        let curentColor;
        if (this.height < y || this.width < x || x < 0 || y < 0) {
            throw "Can't fill out of board";
        } else if (this.canvas[y][x] == "x") {
            throw "Can't fill the line";
        } else if (this.canvas[y][x] == color) {
            return;
        }

        curentColor = this.canvas[y][x];

        let [leftCorner, rightCorner] = this.findBorders(x, y);

        for (let i = leftCorner + 1; i < rightCorner; i++) {
            this.canvas[y][i] = color;
            if (this.canvas[y + 1][i] == curentColor) {
                this.bucketFill(i, y + 1, color)
            }
            if (this.canvas[y - 1][i] == curentColor) {
                this.bucketFill(i, y - 1, color)
            }
        }

        return this.canvas;

    }

    findBorders(x, y) {
        let leftCorner = +x;
        let rightCorner = +leftCorner;

        while (this.canvas[y][leftCorner] != 'x') {
            if (leftCorner <= 0) break;
            leftCorner -= 1;
        }

        while (this.canvas[y][rightCorner] != 'x') {
            if (rightCorner > this.width) break;
            rightCorner += 1;
        }

        return [leftCorner, rightCorner];
    }

    validateInput(x1, x2, y1, y2) {
        if (x1 <= 0 || x2 <= 0 || y1 <= 0 || y2 <= 0) {
            throw "Can't draw on borders";
        }
    }

    parser() {
        let strCanvas = '';

        for (let line = 0; line < this.canvas.length; line++) {
            for (let charNum = 0; charNum < this.canvas[line].length; charNum++) {
                if (charNum == this.canvas[line].length - 1) {
                    let val = this.canvas[line][charNum] + '\n';
                    strCanvas += val;
                } else {
                    strCanvas += this.canvas[line][charNum];
                }
            }
        }
        document.getElementById("main").innerHTML = strCanvas;
    }

    outputFile(input) {
        let file = input.files[0];

        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = () => {
            let commandList = reader.result.split('\n');
            for (let i = 0; i < commandList.length; i++) {
                let command = commandList[i].split(' ');

                if (command[0] == 'C') {
                    this.width = Number(command[1]);
                    this.height = Number(command[2]);
                    this.getCanvas();
                } else if (command[0] == 'L') {
                    this.drawCanvas(+command[1], +command[2], +command[3], +command[4])
                } else if (command[0] == 'R') {
                    this.drawRectangle(+command[1], +command[2], +command[3], +command[4])
                } else if (command[0] == 'B') {
                    this.bucketFill(+command[1], +command[2], command[3])
                } else {
                    return;
                }
            }
        };

        reader.onerror = () => {
            console.log(reader.error);
        };

    }
}

module.exports = CreateCanvas;

let instance = new CreateCanvas(12, 8);

console.log(instance.getCanvas());
console.log(instance.drawCanvas(1, 2, 1, 8));
console.log(instance.drawRectangle(6, 3, 8, 7));
console.log(instance.bucketFill(12, 8, '%'));


