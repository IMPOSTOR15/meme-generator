export default class MemeImage {
    constructor(canvasContext, maxWidth = 800, maxHeight = 800) {
        this.img = new Image();
        this.ctx = canvasContext;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
    }

    loadImageFromFile(file, canvas) {
        const reader = new FileReader();
        reader.onload = (event) => {
            this.img.onload = () => {
                this.resizeCanvasToImage(canvas);
                this.drawImageOnCanvas();
            }
            this.img.src = event.target.result;
        }
        if (file) reader.readAsDataURL(file);
    }

    drawImageOnCanvas() {
        let { width, height } = this.getResizedDimensions();
        this.ctx.drawImage(this.img, 0, 0, width, height);
    }

    getImageCenter() {
        return  {
            height: this.getResizedDimensions().height / 2,
            width: this.getResizedDimensions().width / 2,
        };
    }

    getResizedDimensions() {
        let width = this.img.width;
        let height = this.img.height;
        const ratio = width / height;
        if (width > this.maxWidth || height > this.maxHeight) {
            if (ratio > 1) {
                width = this.maxWidth;
                height = this.maxWidth / ratio;
            } else {
                height = this.maxHeight;
                width = this.maxHeight * ratio;
            }
        }

        return { width, height };
    }

    resizeCanvasToImage(canvas) {
        const dimensions = this.getResizedDimensions();
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
    }
}