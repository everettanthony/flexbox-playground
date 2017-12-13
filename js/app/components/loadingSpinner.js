export default class LoadingSpinner {
    static get CSS_CLASS() {
        return 'loading-spinner';
    }

    static get HTML_TAG() {
        return `<span class="${LoadingSpinner.CSS_CLASS}"></span>`;
    }
}