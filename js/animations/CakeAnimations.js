class CakeAnimations {
    
    constructor(cake, decoAnimations, edgeAnimations, belt) {
        this.cake = cake
        this.deco = decoAnimations
        this.edge = edgeAnimations
        this.belt = belt
        this.velocity = BELT_VELOCITY
        this._startInitAnimation()
    }


    _startInitAnimation() {
        let anim = new Animation(5.5/this.velocity, this, "_finishInitAnimation")
        anim._debug = "cake init"
        anim.translate([0,0,5.5])
        this.cake.setAnimation(anim)
        this.belt.turnOn()
    }

    _finishInitAnimation() {
        this.deco.start(this, "_startMiddleAnimation", this.cake)
        this.belt.turnOff()
        //this._startMiddleAnimation()
    }

    _startMiddleAnimation() {
        let anim = new Animation(8/this.velocity, this, "_finishMiddleAnimation")
        anim.translate([0,0,8])
        this.cake.setAnimation(anim)
        this.belt.turnOn()
    }

    _finishMiddleAnimation() {
        this.edge.start(this, "_startEndAnimation", this.cake)
        this.belt.turnOff()
        //this._startEndAnimation()
    }

    _startEndAnimation() {
        let anim = new Animation(4/this.velocity, this, "_turnOffBelt")
        anim.translate([0,0,4])
        this.cake.setAnimation(anim)
        this.belt.turnOn()
    }

    _turnOffBelt() {
        this.belt.turnOff()
    }

}