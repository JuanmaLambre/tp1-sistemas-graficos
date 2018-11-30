class Prism extends Object3D {

    _buildIndex() {
        let index = []
        for (let i = 0; i < 24; i += 4) {
            index = index.concat([i, i+1, i+2, i+3, i+3, i+4])
        }
        return index.slice(0,-2)
    }

    _buildPosition() {
        let w = this.width, h = this.height, d = this.depth
        let p0 = [-w/2,h/2,d/2], p1 = [w/2,h/2,d/2],
            p2 = [-w/2,-h/2,d/2], p3 = [w/2,-h/2,d/2],
            p4 = [-w/2,h/2,-d/2], p5 = [w/2,h/2,-d/2],
            p6 = [-w/2,-h/2,-d/2], p7 = [w/2,-h/2,-d/2]
        return [
            p0, p1, p2, p3,
            p1, p5, p3, p7,
            p5, p4, p7, p6,
            p4, p0, p6, p2,
            p0, p4, p1, p5,
            p7, p3, p6, p2
        ]
    }

    _buildNormal() {
        let n0 = [0,0,1], n1 = [1,0,0], n2 = [0,0,-1],
            n3 = [-1,0,0], n4 = [0,1,0], n5 = [0,-1,0]
        return [n0,n0,n0,n0,n1,n1,n1,n1,n2,n2,n2,n2,
            n3,n3,n3,n3,n4,n4,n4,n4,n5,n5,n5,n5]
    }

    _buildTexture() {
        let side = [[0,1],[1,1],[0,0],[1,0]]
        return [...side, ...side, ...side, ...side, ...side, ...side]
    }


    constructor(width, height, depth) {
        super()
        this.width = width
        this.height = height
        this.depth = depth
        
        this.position = this._buildPosition()
        this.index = this._buildIndex()
        this.normal = this._buildNormal()
        this.texture = this._buildTexture()
        this.setColor([0.9,0.7,0.3])

        this.setupWebGLBuffers()
    }

}