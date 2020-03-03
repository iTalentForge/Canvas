class CreateCanvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    canvas() {
        if (this.width < 0) return "Width must be more than 0";
        if (this.height < 0) return "Height must be more than 0";

        let canvas = [];

        for (let x = 0; x < this.width + 2; x++) {

            canvas.push([]);

            for (let y = 0; y < this.height + 2; y++) {
                canvas[x][y] = 0;
                
                if(x == 0 || x == this.width + 1) {
                    canvas[x][y] = '-';
                }
                
                if (y == 0 || y == this.height + 1) {
                    canvas[x][y] = '|';
                }
            }
        }


        console.log(canvas);

    }

    drawCanvas(x1, y1, x2, y2) {

    }
}

let lolkek = new CreateCanvas(10, 10);
lolkek.canvas();
