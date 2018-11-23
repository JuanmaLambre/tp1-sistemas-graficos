(function(Bakery, Revolution) {

Bakery.Conveyor = function(params = {}) {

    Revolution.Object3D.call(this);

    var RADIUS = 2


    this.build = function() {
        var oven = new Revolution.Prism(5, 11, 5).build()
        oven.translate([0,2.25,-2.5])
        this.add(oven)
        
        var belt = new Revolution.Prism(3, 0.5, 20).build()
        belt.translate([0,0,7.5])
        belt.setColor([0.5,0.5,0.5])
        this.add(belt)

        var leg = new Revolution.Prism(0.5, 3, 0.5).build()
        leg.translate([0,-1.75,0])
        leg.setColor([0.2,1,0.2])
        var xOffset = 1.25, zOffset = 3.75
        
        for (var side = -1; side < 2; side += 2) {
            for (var i = 0; i <= 4; i++) {
                var cpLeg = leg.clone()
                cpLeg.translate([xOffset*side, 0, zOffset*i])
                cpLeg.translate([0,0,1])
                this.add(cpLeg)
            }
        }

        this.translate([0,-0.25,0])

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.Conveyor;
Bakery.Conveyor.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))