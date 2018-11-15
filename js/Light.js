class Light {
    
    constructor(color) {
        this._color = typeof color === "number" ? [color,color,color] : color
        this._position = [0,0,0]
    }

    at(position) {
        this._position = position
        return this
    }

    get color() {
        return this._color
    }

    get position() {
        return this._position
    }

    get spectral() {
        return [1,1,1]
    }

    set color(c) {
        this._color = c
    }

    set position(p) {
        this._position = p
    }

}