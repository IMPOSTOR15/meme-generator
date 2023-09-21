import MemeImage from "./MemeImage";
export default class CanvasManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.textElements = [];
        this.memeImage = new MemeImage(this.ctx);
        this.isDragging = false;
        this.lastX = 0;
        this.lastY = 0;
        this.currentlyEditingElement = null;
        this.attachEventListeners();

        this.isImage = false
    }
    getCurrentImage() {
        return this.memeImage
    }
    attachEventListeners() {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
    
    onMouseDown(e) {
        let mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
        let mouseY = e.clientY - this.canvas.getBoundingClientRect().top;

        let element = this.findTextElementAtPosition(mouseX, mouseY);
        if (element) {
            this.textElements.forEach((textElement) => {
                textElement.unSelect()
            })
            element.select()
            this.isDragging = true;
            this.lastX = mouseX;
            this.lastY = mouseY;
            this.currentlyEditingElement = element;
        }
    }

    onMouseMove(e) {
        let mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
        let mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
        this.findTextElementAtPosition(mouseX, mouseY) ? this.canvas.style.cursor = "grab" : this.canvas.style.cursor = "auto"
        if (!this.isDragging) return;
        this.canvas.style.cursor = "grabbing"
        

        let offsetX = mouseX - this.lastX;
        let offsetY = mouseY - this.lastY;
        if (this.currentlyEditingElement) {
            this.currentlyEditingElement.moveBy(offsetX, offsetY);
        }

        this.lastX = mouseX;
        this.lastY = mouseY;

        this.drawMeme();
    }

    deleteSelectedText() {
        this.textElements = this.textElements.filter(element => element.isSelected === false);
        this.drawMeme();
    }

    onMouseUp(e) {
        this.isDragging = false;
        this.canvas.style.cursor = "auto"
        this.currentlyEditingElement = null;
    }

    findTextElementAtPosition(x, y) {
        for (let i = this.textElements.length - 1; i >= 0; i--) {
            if (this.textElements[i].isPositionInside(this.ctx, x, y)) {
                return this.textElements[i];
            }
        }
        return null;
    }

    drawMeme() {
        this.memeImage.drawImageOnCanvas(this.ctx);
        this.textElements.forEach(element => element.draw(this.ctx));
    }

    addTextElement(textElement) {
        this.textElements.push(textElement);
        this.drawMeme();
    }

    loadImage(file) {
        this.isImage = true
        this.memeImage.loadImageFromFile(file, this.canvas);
    }

    
}