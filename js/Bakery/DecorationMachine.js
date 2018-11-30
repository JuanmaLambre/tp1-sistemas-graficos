class DecorationMachine extends Object3D {

    _buildDecoration(deco) {
        switch (deco) {
            case "ball": return new BallDecoration()
            case "cone": return new ConeDecoration()
            case "cookie": return new CookieDecoration()
            default: throw "Unknown decoration: " + deco
        }
    }

    constructor(decoration) {
        super()
        this.decoration = decoration

        let support = new Prism(0.25, 9, 2)
        support.translate([-1/8-4,4.5,0])
        support.setColor([0.7,0.4,0.9])
        this.add(support)

        let pedestal = new Prism(1, 4, 1)
        pedestal.translate([-3.5,2,0])
        pedestal.setColor([0.5,0.2,0.7])
        this.add(pedestal)

        this.generateDecoration()

        let beam = new Prism(5, 1/4, 1.5)
        beam.translate([-1.5,8,0])
        beam.setColor([0.3,0,0.5])
        this.add(beam)

        this.arm = new DecorationArm()
        this.arm.translate([-3.5,0,0])
        this.add(this.arm)
    }

    generateDecoration() {
        let decoObj = this._buildDecoration(this.decoration)
        decoObj.translate([-3.5,4,0])
        decoObj.setName("decoration")
        this.add(decoObj)
    }

    delegateDecoration() {
        let deco = this.remove("decoration")
        deco.translate([3.5,1.6,0])
        this.arm.add(deco)
    }

    leaveDecoration() {
        this.arm.remove("decoration")
    }

    setArmAnimation(anim) {
        this.arm.setAnimation(anim)
    }

}