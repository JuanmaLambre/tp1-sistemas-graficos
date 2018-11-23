class CakeAnimations {
    
    constructor(cake, decoAnimations, edgeAnimations) {
        this.cake = cake
        this.deco = decoAnimations
        this.edge = edgeAnimations
        this.speed = 5
        this._startInitAnimation()
    }


    _startInitAnimation() {
        let anim = new Animation(5.5/this.speed, this, "_finishInitAnimation")
        anim._debug = "cake init"
        anim.translate([0,0,5.5])
        this.cake.setAnimation(anim)
    }

    _finishInitAnimation() {
        this.deco.start(this, "_startMiddleAnimation", this.cake)
        //this._startMiddleAnimation()
    }

    _startMiddleAnimation() {
        let anim = new Animation(8/this.speed, this, "_finishMiddleAnimation")
        anim.translate([0,0,8])
        this.cake.setAnimation(anim)
    }

    _finishMiddleAnimation() {
        this.edge.start(this, "_startEndAnimation", this.cake)
    }

    _startEndAnimation() {
        let anim = new Animation(4/this.speed)
        anim.translate([0,0,4])
        this.cake.setAnimation(anim)
    }

}