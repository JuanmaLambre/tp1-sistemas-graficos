(function(Revolution) {
    
Revolution.Object3D = function() {

    this.transformMat = [[1,0,0],[0,1,0],[0,0,1]]


    this.add = function(obj) {
        if (!this.children) this.children = [];
        this.children.push(obj);
    }

    this.scale = function(units) {
        this.transformMat[0][0] *= units[0]
        this.transformMat[1][1] *= units[1]
        this.transformMat[2][2] *= units[2]
    }

    this.getPositionBuffer = function() {
        if (!this.position) {
            return []
        } else {
            return revolution.flatten(
                this.position.map((point) => {
                    return revolution.transpose(revolution.dot(
                        this.transformMat, revolution.transpose([point]))
                    )[0]
                }),
                1
            )
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
        
}
    
}(window.Revolution = window.Revolution || {}))