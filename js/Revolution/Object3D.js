(function(Revolution) {
    
Revolution.Object3D = function() {

    this.tMat = mat4.create();
    mat4.identity(this.tMat)
    this.children = []
    this.animation = null


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
        else mat4.scale(this.tMat, this.tMat, unit)
    }

    this.rotate = function(angle, axis) {
        mat4.rotate(this.tMat, this.tMat, angle, axis)
    }

    this.translate = function(delta) {
        mat4.translate(this.tMat, this.tMat, delta)
    }

    this.setColor = function(color) {
        if (this.position) {
            this.color = this.position.map((x) => {return color})
        }
        applyChildren(this.children, "setColor", color)
    }


    this.getPositionBuffer = function(from = mat4.create()) {
        if (!this.position) {
            return []
        } else {
            let trans = mat4.create();
            mat4.multiply(trans, from, this.tMat)
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
        return this.tMat
    }

    this.getNormalBuffer = function() {
        if (!this.normal) {
            return []
        } else {
            var nMat = mat4.create()
            mat4.invert(nMat, this.tMat)
            mat4.transpose(nMat, nMat)
            return revolution.flatten(
                this.normal.map((p) => {
                    let res = vec4.create()
                    mat4.multiply(res, nMat, p.concat([1]))
                    return revolution.normalize(res.slice(0,3))
                }), 2)
        }
    }

    this.clone = function(clazz = Revolution.Object3D) {
        var cp = new clazz()
        cp.tMat = mat4.clone(this.tMat)
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
        if (this.animation) {
            if (this.animation.marked) this.animation.advance()
            mat4.mul(this.tMat, this.animation.transformation, this.tMat)
        }

        for (let i = 0; i < this.children.length; ++i) {
            this.children[i].advance()
            this.children[i].markAnimation()
        }

        this.markAnimation()
    }

    this.markAnimation = function() {
        if (this.animation) this.animation.marked = true
        for (let i = 0; i < this.children.length; ++i)
            this.children[i].markAnimation()
    }

    /*
        this.advance = function() {
        let anims = this.getAllAnimations()
        for (let i = 0; i <  anims.length; ++i) {
            anims[i].advance()
        }

        if (this.animation && this.animation.isActive()) 
            mat4.mul(this.tMat, this.animation.transformation, this.tMat)
    }

    this.getAllAnimations = function() {
        return (this.animation ? [this.animation] : []).concat(
            this.children.reduce((r, c) => {
                return r.concat(c.getAllAnimations())
            }, [])
        )
    }
    */
        
}
    
}(window.Revolution = window.Revolution || {}))
