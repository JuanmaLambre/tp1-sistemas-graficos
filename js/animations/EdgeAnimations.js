class EdgeAnimations {
        
    constructor(machine, count) {
        this.distance = [0,0,0]
        this.machine = machine
        this.counter = 0
        this.edges = count
    }

    start(callbackObj, method, cake) {
        this.callback = {
            obj: callbackObj,
            method: method
        }
        this.cake = cake
        this.distance = [1.5-cake.radius,0,0]
        this._startDecoration()
    }

    _startDecoration() {
        this._moveArm()
    }

    _moveArm() {
        let anim = new Animation(0.5, this, "_leaveEdge")
        anim._debug = "move edge arm"
        anim.translate(this.distance)
        this.machine.setArmAnimation(anim)
    }

    _leaveEdge() {
        this.machine.removeEdge()
        this.cake.addEdge(Math.PI-2*Math.PI*this.counter/this.edges)
        this._restoreArm()
    }

    _restoreArm() {
        let inverse = this.distance.map((v) => {return -v})
        let anim = new Animation(0.5, this, "_rotateCake")
        anim.translate(inverse)
        this.machine.setArmAnimation(anim)
    }

    _rotateCake() {
        let anim = new Animation(0.5, this, "_end")
        anim._debug = "cake rotation"
        anim.rotate(2*Math.PI/this.edges, [0,1,0])
        this.cake.setAnimation(anim)
    }

    _end() {
        if (++this.counter < this.edges) {
            this.machine.generateEdge()
            this._startDecoration()
        } else {
            this.callback.obj[this.callback.method]()
        }
    }

}