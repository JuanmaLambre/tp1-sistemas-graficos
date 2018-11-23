class DecoAnimations {
    
    constructor(machine, count, radius) {
        this.machine = machine
        this.decorations = count
        this.counter = 0
        this.radius = radius
        this.CENTER = [3.5,0,0]
    }

    start(callbackObj, method, cake) {
        this.callback = {
            obj: callbackObj,
            method: method
        }
        this.cake = cake
        this._startDecoration()
    }

    _startDecoration() {
        this._grabDecoration()
    }

    _grabDecoration() {
        let anim = new Animation(0.5, this, "_closeHand")
        anim._debug = "grab"
        anim.translate([0,-2.5,0])
        this.machine.setArmAnimation(anim)
    }

    _closeHand() {
        this.machine.arm.closeHand(0.2, this, "_liftDecoration")
    }

    _liftDecoration() {
        let deco = this.machine.delegateDecoration()
        let anim = new Animation(0.5, this, "_moveArm")
        anim._debug = "lift"
        anim.translate([0,2.5,0])
        this.machine.setArmAnimation(anim)
    }

    _moveArm() {
        let anim = new Animation(0.5, this, "_leaveDecoration")
        anim._debug = "moveArm"
        let polar = [
            this.radius*Math.cos(this.counter*2*Math.PI/this.decorations), 
            0,
            this.radius*Math.sin(this.counter*2*Math.PI/this.decorations)
        ]
        anim.translate(revolution.sum(this.CENTER, polar))
        this.machine.setArmAnimation(anim)
    }

    _leaveDecoration() {
        let anim = new Animation(0.5, this, "_dropDecoration")
        anim.translate([0,-2.3+this.cake.height,0])
        this.machine.setArmAnimation(anim)
    }

    _dropDecoration() {
        this.machine.arm.openHand(0.2, this, "_liftArm")
        this.cake.addDecoration(-this.counter*2*Math.PI/this.decorations)
        this.machine.leaveDecoration()
    }

    _liftArm() {
        let anim = new Animation(0.5, this, "_restoreArm")
        anim.translate([0,2.3-this.cake.height,0])
        this.machine.setArmAnimation(anim)
    }

    _restoreArm() {
        let anim = new Animation(0.5, this, "_end")
        anim._debug = "restoreArm"
        let ret = this.CENTER.map((x) => {return -x})
        let polar = [
            -this.radius*Math.cos(this.counter*2*Math.PI/this.decorations), 
            0,
            -this.radius*Math.sin(this.counter*2*Math.PI/this.decorations)
        ]
        anim.translate(revolution.sum(ret, polar))
        this.machine.setArmAnimation(anim)
    }

    _end() {
        if (++this.counter < this.decorations) {
            this.machine.generateDecoration()
            this._startDecoration()
        } else if (this.callback) {
            this.callback.obj[this.callback.method]()
        }
    }

}