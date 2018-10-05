(function(Revolution) {
    
Revolution.Object3D = function() {

    this.tMat = mat4.create();
    mat4.identity(this.tMat)
    this.children = []


    this.add = function(obj) {
        if (!this.children) this.children = [];
        this.children.push(obj);
    }

    this.scale = function(units) {
        mat4.scale(this.tMat, this.tMat, units)
    }

    this.rotate = function(angle, axis) {
        mat4.rotate(this.tMat, this.tMat, angle, axis)
    }

    this.translate = function(delta) {
        mat4.translate(this.tMat, this.tMat, delta)
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
                res = res.map((x) => {return x/res[3]}).slice(0,-1);
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
        if (!this.color) 
            return []
        else
            return revolution.flatten(this.color, 1);
    }

    this.getTransformation = function() {
        return this.tMat;
    }

    /**
      Updates the index buffer according to any movement assigned
    */
    this.advance = function(delta) {
        console.log("ADVANCE NOT IMPLEMENTATION MISSING")
        for (var i = 0; i < this.children.length; ++i) {
            // this.children[i].advance(delta)
        }
    }
        
}
    
}(window.Revolution = window.Revolution || {}))
