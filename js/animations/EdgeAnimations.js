class EdgeAnimations {
        
    constructor(machine, count) {
        this.SCALE = [1.2,1,1]
        this.machine = machine
        this.counter = 0
        this.edges = count
    }

    start(callbackObj, method) {
        this.callback = {
            obj: callbackObj,
            method: method
        }
        console.log("STATION NUMBER 2")
        this._startDecoration()
    }

    _startDecoration() {
        this._moveArm()
    }

    _moveArm() {
        let anim = new Animation(0.5, this, "_restoreArm")
        anim.translate(this.SCALE)
        this.machine.setArmAnimation(anim)
    }

    _restoreArm() {
        let inverse = this.SCALE.map((v) => {return -v})
        let anim = new Animation(0.5, this, "_end")
        anim.translate(inverse)
        this.machine.setArmAnimation(anim)
    }

    _end() {
        if (++this.counter < this.edges) {
            //this._startDecoration()
            this.callback.obj[this.callback.method]()
        } else {
            this.callback.obj[this.callback.method]()
        }
    }

}