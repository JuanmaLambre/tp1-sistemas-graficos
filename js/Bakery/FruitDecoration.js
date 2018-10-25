(function(Bakery, Revolution) {

Bakery.FruitDecoration = function() {

    Revolution.Object3D.call(this);


    var WIDTH = 0.025

    this.build = function() {
        var outline = revolution.semicircle(0.15).map((p) => {
            return p.slice(0, 2)
        })

        var fruit = new Revolution.StraightSweep(outline, [0,0,WIDTH/2], [0,0,-WIDTH/2]).build()
        fruit.setColor([0.2,0.7,0.2])
        fruit.translate([-0.1,0,0])
        this.add(fruit)

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.FruitDecoration;
Bakery.FruitDecoration.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))