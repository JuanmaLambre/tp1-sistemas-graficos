class Animation {
    
    constructor(duration, retObj, callbackStr) {
        this.t = 0
        this.duration = duration
        this.paused = false
        this.transformation = new Transformation()
        this.marked = false
        if (retObj && callbackStr) this.callback = {
            obj: retObj,
            method: callbackStr
        }
    }

    static pauseAll() {
        this.allPaused = true
    }

    static playAll() {
        this.allPaused = false
    }

    advance() {
        if (!this.paused && !Animation.allPaused) {
            this.t += 1/FPS
            if (this.callback && !this.isActive()) {
                this.callback.obj[this.callback.method]()
                this.callback = null
            }
        }
    }

    isActive() {
        // Esto es por la poca precision del flotante
        return Math.round(this.t*10000)/10000 < this.duration
    }

    isRunning() {
        return this.isActive() && this.marked && !this.paused && !Animation.allPaused
    }

    scale(unit) {
        this.transformation.scale(unit)
    }

    rotate(angle, axis) {
        this.transformation.rotate(angle, axis)
    }

    translate(delta) {
        this.transformation.translate(delta)
    }

    matrix() {
        let transf = mat4.create()
        if (this.duration > 0) {
            mat4.mul(transf, this._getTranslationMat(), transf)
            mat4.mul(transf, this._getScaleMat(), transf)
            mat4.mul(transf, this._getRotationMat(), transf)
        }
        return transf
    }

    get stepTransformation() {
        let t = new Transformation()
        t.scale(this._getStepScale())
        for (let i = 0; i < this.transformation.rotations.length; ++i) {
            let r = this._getStepRotation(this.transformation.rotations[i])
            t.rotate(r.angle, r.axis)
        }
        t.translate(this._getStepTranslation())
        return t
    }

    _getRotationMat() {
        let r = mat4.create()
        for (let i = 0; i < this.transformation.rotations.length; ++i) {
            let rot = this._getStepRotation(this.transformation.rotations[i])
            mat4.rotate(r, r, rot.angle, rot.axis)
        }
        return r
    }

    _getScaleMat() {
        let s = mat4.create()
        let v = this._getStepScale()
        return mat4.scale(s, s, v)
    }

    _getTranslationMat() {
        let t = mat4.create()
        return mat4.translate(t, t, this._getStepTranslation())
    }

    _getStepScale() {
        let ratio = 1 + 1/FPS/(this.duration+this.t)
        let v = revolution.sum(this.transformation.scalation, [-1,-1,-1])
        return revolution.sum(revolution.scalar(ratio, v), [1,1,1])
    }

    _getStepTranslation() {
        return this.transformation.translation.map((v) => {
            return v/FPS/this.duration
        })
    }

    _getStepRotation(rotation) {
        return {
            angle: rotation.angle/FPS/this.duration,
            axis: rotation.axis
        }
    }

}