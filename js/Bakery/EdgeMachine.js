class EdgeMachine extends Object3D {

    _buildEdge() {
        switch(this.edge) {
            case "cylinder": return new EdgeCylinder(this.height*1.1)
            case "prism": return new EdgePrism(this.height*1.1)
            default: throw "Unknown edge: " + this.edge
        }
    }


    constructor(edge, height) {
        super()
        this.edge = edge
        this.height = height

        var support = new Prism(1, 6, 1)
        support.translate([-2.5,3,0])
        support.setColor([0.7,0.4,0.9])
        this.add(support)

        this.arm = new EdgeArm()
        this.arm.translate([-0.5,0,0])
        this.add(this.arm)
        
        this.generateEdge()
    }

    generateEdge() {
        let edgeDeco = this._buildEdge()
        edgeDeco.rotate(Math.PI, [0,1,0])
        this.arm.addEdge(edgeDeco)
    }

    removeEdge() {
        return this.arm.removeEdge()
    }

    setArmAnimation(anim) {
        this.arm.setAnimation(anim)
    }

}