class DecorationArm extends Object3D {

    constructor() {
        super()
        
        let cyl = new Cylinder()
        cyl.translate([0,8,0])
        cyl.scale([2,0.1,0.1])
        cyl.rotate(Math.PI/2, [0,0,1])
        this.add(cyl)

        var hand = new Prism(0.3, 0.05, 0.7)
        hand.translate([0,6,0])
        this.add(hand)

        this.finger1 = new Prism(0.2, 0.4, 0.05)
        this.finger1.translate([0,5.8,1/6])
        this.add(this.finger1)

        this.finger2 = new Prism(0.2, 0.4, 0.05)
        this.finger2.translate([0,5.8,-1/6])
        this.add(this.finger2)

        this.translate([0,0.9,0])
        this.setColor([0.7,0,0.7])
    }

    closeHand(duration, cbObj, method) {
        let anim1 = new Animation(duration, cbObj, method)
        anim1.translate([0,0,-1/12])
        this.finger1.setAnimation(anim1)

        let anim2 = new Animation(duration)
        anim2.translate([0,0,1/12])
        this.finger2.setAnimation(anim2)
    }

    openHand(duration, cbObj, method) {
        let anim1 = new Animation(duration, cbObj, method)
        anim1.translate([0,0,1/12])
        this.finger1.setAnimation(anim1)

        let anim2 = new Animation(duration)
        anim2.translate([0,0,-1/12])
        this.finger2.setAnimation(anim2)
    }

}