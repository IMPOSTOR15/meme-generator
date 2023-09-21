import '../assets/styles/index.css'
import CanvasManager from './CanvasManager';
import MemeText from './MemeText';
import palaceholderImgae from '../assets/img/image-placeholder.jpg'
import ErrorElement from './Error';

const canvas = document.getElementById("canvas");
const canvasManager = new CanvasManager(canvas);
const errorElement = new ErrorElement()
document.getElementById("imageInput").addEventListener("change", function(e) {
    canvasManager.loadImage(e.target.files[0]);
});

document.querySelectorAll('.input-file input[type=file]').forEach(function(inputElement) {
    
    inputElement.addEventListener('change', function() {
        if (errorElement.text === 'Загрузите изображение') errorElement.hideError()
        let file = this.files[0];
        let inputContainer = this.closest('.input-file');
        let textElement = inputContainer.querySelector('.input-file-text');
        textElement.innerHTML = file ? file.name : '';
    });
});

document.querySelector('#drawBtn').addEventListener('click', function() {
    if (!canvasManager.isImage) return errorElement.showError('Загрузите изображение')
    let text = document.querySelector('#memeText').value;
    let fontSize = parseInt(document.querySelector('#fontSize').value);
    let color = document.querySelector('#textColor').value;
    let strokeColor = document.querySelector('#strokeColor').value;
    let lineWidth = document.querySelector('#lineWidth').value;
    if (!text || !fontSize || !color || !strokeColor || !lineWidth) return errorElement.showError('Проверьте заполнения полей')
    errorElement.hideError()
    let {height, width} = canvasManager.getCurrentImage().getImageCenter()
    const textElement = new MemeText(text, width, height, fontSize, color, strokeColor, lineWidth);
    canvasManager.addTextElement(textElement);
});

document.querySelector('#saveBtn').addEventListener('click', () => {
    if (!canvasManager.isImage) return errorElement.showError('Загрузите изображение')
    let link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
});
const deleteElemHandler = (event) => {
    if (event.key === 'Delete' || event.type === 'click') {
        canvasManager.deleteSelectedText()
    }
}

document.querySelector('#deleteBtn').addEventListener('click', deleteElemHandler)
window.addEventListener('keydown', deleteElemHandler)

const palaceholderImageObject = new Image()
palaceholderImageObject.src = palaceholderImgae
palaceholderImageObject.onload = function() {
    canvas.getContext("2d").drawImage(palaceholderImageObject, 0, 0, 600, 600);
};

  
