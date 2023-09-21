export default class MemeText {
    constructor(text, x, y, fontSize, color, strokeColor, lineWidth) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.color = color;
        this.strokeColor = strokeColor;
        this.lineWidth = lineWidth
        this.selected = false
    }

    draw(ctx) {
        ctx.font = this.fontSize + "px Arial";
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
        ctx.strokeText(this.text, this.x, this.y);
    }

    isPositionInside(ctx, x, y) {
        let textWidth = ctx.measureText(this.text).width;
        return x > this.x - textWidth / 2 && x < this.x + textWidth / 2 && y > this.y - this.fontSize && y < this.y;
    }
    select() {
        this.isSelected = true
    }
    unSelect() {
        this.isSelected = false
    }
    moveBy(offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
    }
}