class Transformation {
    
    constructor() {
        this.reset()
    }

    rotate(angle, axis) {
        this.rotations.push({
            angle: angle,
            axis: axis
        })
        return this
    }

    translate(offset) {
        this.translation = revolution.sum(this.translation, offset)
        return this
    }

    scale(s) {
        this.scalation = s
        return this
    }

    apply(that) {
        this.rotations = this.rotations.concat(that.rotations)
        this.translate(that.translation)
        this.scale(that.scalation)
    }

    matrix() {
        let m = mat4.create()
        mat4.translate(m, m, this.translation)
        for (let i = 0; i < this.rotations.length; ++i)
            mat4.rotate(m, m, this.rotations[i].angle, this.rotations[i].axis)
        mat4.scale(m, m, this.scalation)
        for (let i = 0; i < this.lefts.length; ++i) {
            mat4.mul(m, this.lefts[i].matrix(), m)
        }
        return m
    }

    getRotationMat() {
        let m = mat4.create()
        for (let i = 0; i < this.rotations.length; ++i)
            mat4.rotate(m, m, this.rotations[i].angle, this.rotations[i].axis)
        return m
    }

    reset() {
        this.rotations = []
        this.scalation = [1,1,1]
        this.translation = [0,0,0]
        this.lefts = []
    }

    clone() {
        let t = new Transformation()
        t.rotations = this.rotations
        t.scalation = this.scalation
        t.translation = this.translation
        return t
    }

}