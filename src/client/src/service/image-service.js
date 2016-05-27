export default class ImageService {
    constructor(config) {
        this.config = config;
        this.img = this.getImgConfig();
    }

    getImgConfig() {
        return this.config.images;
    }

    expandImgUrl(url, size) {
        return `${this.img.base_url}${size}${url}`;
    }
}
