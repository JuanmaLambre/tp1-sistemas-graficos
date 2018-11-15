class Animation {
    
    constructor(duration, retObj, callbackStr) {
        this.t = 0
        this.duration = duration
        this.paused = false
        this.transformations = {
            translation: [0,0,0],
            rotation: {
                angle: 0,
                axis: [1,0,0]
            },
            scale: [1,1,1]
        }
        if (retObj && callbackStr) this.callback = {
            obj: retObj,
            method: callbackStr
        }
    }

    advance() {
        if (!this.paused) {
            this.t += 1/FPS
            if (this.callback && this.t >= this.duration) {
                this.callback.obj[this.callback.method]()
                this.callback = null
            }
        }
    }

    isActive() {
        // Esto es por la poca precision del flotante
        return Math.round(this.t*10000)/10000 < this.duration
    }

    scale(unit) {
        if (typeof(unit) === "number") this.scale(Array(3).fill(unit))
        else this.transformations.scale = unit
    }

    rotate(angle, axis) {
        this.transformations.rotation = {
            angle: angle,
            axis: axis
        }
    }

    translate(delta) {
        this.transformations.translation = delta
    }

    get transformation() {
        let transf = mat4.create()
        if (this.duration > 0 && this.isActive()) {
            mat4.mul(transf, this._getRotationMat(), transf)
            //mat4.mul(transf, this._getScaleMat(), transf)
            mat4.mul(transf, this._getTranslationMat(), transf)
        }
        return transf
    }

    _getRotationMat() {
        let r = mat4.create()
        let vals = this.transformations.rotation
        return mat4.rotate(r, r, vals.angle/FPS/this.duration, vals.axis)
    }

    _getScaleMat() {
        let s = mat4.create()
        let trans = this.transformations.scale.map((v) => {return v/FPS/this.duration})
        return mat4.scale(s, s, trans)
    }

    _getTranslationMat() {
        let t = mat4.create()
        let trans = this.transformations.translation.map((v) => {return v/FPS/this.duration})
        return mat4.translate(t, t, trans)
    }

}