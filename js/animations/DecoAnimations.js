class DecoAnimations {
    
    constructor(machine, count, radius) {
        this.machine = machine
        this.decorations = count
        this.counter = 0
        this.radius = radius
        this.CENTER = [3.5,0,0]
    }

    start(callbackObj, method) {
        this.callback = {
            obj: callbackObj,
            method: method
        }
        this._startDecoration()
    }

    _startDecoration() {
        this._moveArm()
    }

    _moveArm() {
        let anim = new Animation(0.5, this, "_pause")
        let polar = [
            this.radius*Math.cos(this.counter*2*Math.PI/this.decorations), 
            0,
            this.radius*Math.sin(this.counter*2*Math.PI/this.decorations)
        ]
        anim.translate(revolution.sum(this.CENTER, polar))
        this.machine.setArmAnimation(anim)
    }

    _pause() {
        this._restoreArm()
    }

    _restoreArm() {
        let anim = new Animation(0.5, this, "_end")
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
            this._startDecoration()
        } else if (this.callback) {
            this.callback.obj[this.callback.method]()
        }
    }

}