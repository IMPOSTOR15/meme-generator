export default class ErrorElement {
    constructor(elemId) {
        this.text = ''
        this._errorElement = document.getElementById(elemId)
    }
    showError(text) {
        this.text = text
        errorText.textContent = text
        errorText.style.display = 'inline'
    }
    hideError() {
        errorText.textContent = ''
        errorText.style.display = 'none'
    }
}