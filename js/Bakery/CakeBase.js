(function(Bakery, Revolution) {

Bakery.CakeBase = function(params = {}) {

    Revolution.Object3D.call(this);

    var DEFAULT_HEIGHT = 0.7

    function buildPoints(params) {
        var {
            floors = 3,
            waveWidth = 0.125,
            radius = 1,
            height = DEFAULT_HEIGHT
        } = params

        var points = [[0,height,0],[0,height,0],[-radius+waveWidth,height,0]]
        var yDelta = height/(2*floors)

        for (var i = 0; i < floors; ++i) {
            points.push([-radius,height-(i*2+1)*yDelta,0])
            points.push([-radius+waveWidth,height-(i*2+2)*yDelta,0])
        }

        return points.concat([[0,0,0],[0,0,0]])//points.concat([[-radius+waveWidth,0,0],[0,0,0],[0,0,0]])
    }

    this.build = function() {
        var control = buildPoints(params)

        this.add(new Revolution.RevolutionSweep(revolution.buildBSpline2(control, 8)).build())
        this.setColor([0.8,0.8,0.1])

        return this
    }

    this.getHeight = function() {
        return params.height || DEFAULT_HEIGHT
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.CakeBase;
Bakery.CakeBase.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))