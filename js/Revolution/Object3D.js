class Object3D extends Drawing {

    constructor() {
        super()
        this.transformation = new Transformation()
        this.children = []
        this.animation = null
        this.glossiness = 0
    }


    _applyChildren(children, funcName, ...args) {
        for (var i = 0; i < children.length; ++i) {
            children[i][funcName](...args)
        }
    }


    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    add(obj) {
        if (!this.children) this.children = [];
        this.children.push(obj);
    }

    remove(objName) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].getName() == objName)
                return this.children.splice(i,1)[0]
        }
        return null
    }

    getChild(name) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].getName() == name)
                return this.children[i]
        }
        return null
    }

    setAnimation(anim) {
        this.animation = anim
    }

    scale(unit) {
        if (typeof(unit) === "number") this.scale([unit,unit,unit])
        else this.transformation.scale(unit)
    }

    rotate(angle, axis) {
        this.transformation.rotate(angle, axis)
    }

    translate(delta) {
        this.transformation.translate(delta)
    }

    setColor(color) {
        if (typeof color == "string")
            color = [
                parseInt(color.slice(0,2), 16)/256, 
                parseInt(color.slice(2,4), 16)/256, 
                parseInt(color.slice(4,6), 16)/256
            ]
        if (this.position) {
            this.color = this.position.map((x) => {return color})
        }
        this._applyChildren(this.children, "setColor", color)
        this.setupWebGLBuffers()
    }

    loadTexture(filename, mode = Drawing.TEXTURE_MODE.STRECH) {
        if (!this.texture) 
            throw "No texture defined for texture loading"
        this.textureMode = mode
        this.glTexture = gl.createTexture();
        this.glTexture.image = new Image()
        var self = this
        this.glTexture.image.onload = function() {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.bindTexture(gl.TEXTURE_2D, self.glTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.glTexture.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        this.glTexture.image.src = filename
    }

    loadReflection(filename) {
        if (!this.texture) 
            throw "No texture defined for reflection loading"
        this.glReflection = gl.createTexture()
        this.glReflection.image = new Image()
        var self = this
        this.glReflection.image.onload = function() {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.bindTexture(gl.TEXTURE_2D, self.glReflection);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.glReflection.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        this.glReflection.image.src = filename
    }

    hasTexture() {
        return this.glTexture != null
    }

    hasReflection() {
        return this.glReflection != null
    }

    getPositionBuffer() {
        return revolution.flatten(this.position || [], 2)
    }

    getIndexBuffer() {
        return this.index || [];
    }

    getColorBuffer() {
        return revolution.flatten(this.color || [], 1);
    }

    getTransformation() {
        return this.transformation.matrix()
    }

    getNormalBuffer() {
        return revolution.flatten(this.normal || [], 2)
    }

    getTextureBuffer() {
        return revolution.flatten(this.texture || [], 2)
    }

    getDrawMode() {
        return gl.TRIANGLE_STRIP
    }

    setGlossiness(val) {
        this.glossiness = val
    }

    getGlossiness() {
        return this.glossiness
    }

    getReflectionIndex() {
        return 0.1
    }

    clone(clazz = Object3D) {
        var cp = new clazz()
        cp.transformation = this.transformation.clone()
        if (this.position) cp.position = this.position.slice(0)
        if (this.color) cp.color = this.color.slice(0)
        if (this.index) cp.index = this.index.slice(0)
        if (this.normal) cp.normal = this.normal.slice(0)

        for (var i = 0; i < this.children.length; i++) {
            cp.add(this.children[i].clone())
        }

        cp.setupWebGLBuffers()

        return cp
    }

    advance() {
        this.markAnimation()

        if (this.animation && this.animation.isRunning()) {
            let anim = this.animation
            anim.advance()
            this.transformation.apply(anim.stepTransformation)
        }

        if (this.onAdvance) this.onAdvance()

        this._applyChildren(this.children, "advance")
    }

    markAnimation() {
        if (this.animation) this.animation.marked = true
        this._applyChildren(this.children, "markAnimation")
    }

    setupWebGLBuffers() { 
        super.setupWebGLBuffers()
        this._applyChildren(this.children, "setupWebGLBuffers")
    }

    draw(trans = mat4.create()) {
        super.draw(trans)
        let newTrans = this.transformation.matrix()
        mat4.mul(newTrans, trans, newTrans)
        this._applyChildren(this.children, "draw", newTrans)
    }

}
