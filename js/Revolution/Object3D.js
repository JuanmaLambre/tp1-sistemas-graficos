(function(Revolution) {
    
Revolution.Object3D = function() {

    this.tMat = mat4.create();
    mat4.identity(this.tMat)
    this.children = []


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
        } else if (!this._positionBuffer) {
            let trans = mat4.create();
            mat4.multiply(trans, from, this.tMat)
            this._positionBuffer = this.position.reduce((buffer, point) => {
                let res = vec4.create(), p = vec4.clone(point.concat(1));
                mat4.multiply(res, trans, p)
                buffer.push(res[0])
                buffer.push(res[1])
                buffer.push(res[2])
                return buffer
            }, [])
        }
        return this._positionBuffer
    }

    this.getIndexBuffer = function() {
        return this.index || [];
    }

    this.getColorBuffer = function() {
        return revolution.flatten(this.color || [], 1);
    }

    this.getTransformation = function() {
        return this.tMat;
    }

    this.getNormalBuffer = function() {
        return revolution.flatten(this.normal || [], 1)
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


    /**
      Updates the index buffer according to any movement assigned
    */
    this.advance = function(delta) {
        console.log("ADVANCE NOT IMPLEMENTED")
        for (var i = 0; i < this.children.length; ++i) {
            // this.children[i].advance(delta)
        }
    }
        
}
    
}(window.Revolution = window.Revolution || {}))
