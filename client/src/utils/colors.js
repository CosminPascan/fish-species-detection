export default class Colors {
    constructor() {
      this.palette = [
        "#FFB703",
        "#B33234",
        "#51518E",
        "#A98600",
        "#410179",
        "#FF4D00",
        "#03045E"
      ]
      this.n = this.palette.length
    }

    get = (i) => this.palette[Math.floor(i) % this.n]

    static hexToRgba = (hex, alpha) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
        ? `rgba(${[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(
            ", "
            )}, ${alpha})`
        : null
    }
}
