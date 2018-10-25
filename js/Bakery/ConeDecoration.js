(function(Bakery, Revolution) {

Bakery.ConeDecoration = function() {

    Revolution.Object3D.call(this);


    function buildControl() {
        return [
            [0,0.5,0], [0,5/12,0], [-1/12,5/12,0], [-1/12,1/3,0],
            [-1/12,1/6,0], [-5/24,1/6,0], [-5/24,0,0]
        ]
    }

    this.build = function() {
        var outline = revolution.buildBezier(buildControl())
        outline.push([0,0,0])

        var cone = new Revolution.RevolutionSweep(outline).build()
        cone.scale(0.3)
        cone.setColor([0.2,0.2,0.7])

        this.add(cone)
        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.ConeDecoration;
Bakery.ConeDecoration.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))