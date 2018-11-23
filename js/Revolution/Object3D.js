(function(Revolution) {
    
Revolution.Object3D = function() {

    this.transformation = new Transformation()
    this.children = []
    this.animation = null
    this.center = [0,0,0]


    function applyChildren(children, funcName, ...args) {
        for (var i = 0; i < children.length; ++i) {
            children[i][funcName](...args)
        }
    }


    this.setName = function(name) {
        this.name = name
    }

    this.getName = function() {
        return this.name
    }

    this.add = function(obj) {
        if (!this.children) this.children = [];
        this.children.push(obj);
    }

    this.remove = function(objName) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].getName() == objName)
                return this.children.splice(i,1)[0]
        }
        return null
    }

    this.getChild = function(name) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].getName() == name)
                return this.children[i]
        }
        return null
    }

    this.setAnimation = function(anim) {
        this.animation = anim
    }

    this.scale = function(unit) {
        if (typeof(unit) === "number") this.scale([unit,unit,unit])
        else this.transformation.scale(unit)
    }

    this.rotate = function(angle, axis) {
        this.transformation.rotate(angle, axis)
    }

    this.translate = function(delta) {
        this.transformation.translate(delta)
        this.center = revolution.sum(this.center, delta)
    }

    this.setColor = function(color) {
        if (this.position) {
            this.color = this.position.map((x) => {return color})
        }
        applyChildren(this.children, "setColor", color)
    }

    this.loadTexture = function(filename, name) {
        this.glTextureName = name
        let img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = function() {
            this.glTexture = gl.createTexture();
            //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        img.src = filename
    }

    this.hasTexture = function() {
        return this.glTexture != null
    }

    this.getPositionBuffer = function(from = mat4.create()) {
        if (!this.position) {
            return []
        } else {
            let trans = mat4.create();
            mat4.multiply(trans, from, this.getTransformation())
            return this.position.reduce((buffer, point) => {
                let res = vec4.create(), p = vec4.clone(point.concat(1));
                mat4.multiply(res, trans, p)
                buffer.push(res[0])
                buffer.push(res[1])
                buffer.push(res[2])
                return buffer
            }, [])
        }
    }

    this.getIndexBuffer = function() {
        return this.index || [];
    }

    this.getColorBuffer = function() {
        return revolution.flatten(this.color || [], 1);
    }

    this.getTransformation = function() {
        return this.transformation.matrix()
    }

    this.getNormalBuffer = function(from = mat4.create()) {
        if (!this.normal) {
            return []
        } else {
            return revolution.flatten(
                this.normal.map((p) => {
                    let res = vec4.create()
                    mat4.multiply(res, from, p.concat([1]))
                    return revolution.normalize(res.slice(0,3))
                }), 2)
        }
    }

    this.getTextureBuffer = function() {
        return revolution.flatten(
            this.texture || this.position.map((v) => {
                let x = revolution.normalize(v.slice(0,2))
                return isNaN(x[0]) ? [1,1] : x
            }),
            2
        )
    }

    this.clone = function(clazz = Revolution.Object3D) {
        var cp = new clazz()
        cp.transformation = this.transformation.clone()
        if (this.position) cp.position = this.position.slice(0)
        if (this.color) cp.color = this.color.slice(0)
        if (this.index) cp.index = this.index.slice(0)
        if (this.normal) cp.normal = this.normal.slice(0)

        for (var i = 0; i < this.children.length; i++) {
            cp.add(this.children[i].clone())
        }

        return cp
    }

    this.advance = function() {
        this.markAnimation()

        if (this.animation && this.animation.isRunning()) {
            let anim = this.animation
            anim.advance()
            this.transformation.apply(anim.stepTransformation)
        }

        for (let i = 0; i < this.children.length; ++i) {
            this.children[i].advance()
        }
    }

    this.markAnimation = function() {
        if (this.animation) this.animation.marked = true
        for (let i = 0; i < this.children.length; ++i)
            this.children[i].markAnimation()
    }
        
}
    
}(window.Revolution = window.Revolution || {}))
