(function(Bakery, Revolution) {

Bakery.EdgeCylinder = function(height) {

    Revolution.Object3D.call(this);


    var RADIUS = 0.03

    function buildOutline(height) {
    	let h = 9/10*height
    	let r = 2/3*RADIUS
    	return [
    		[0,h,0], [-r,h,0], [-r,height,0], [-RADIUS,height,0],
    		[-RADIUS,0,0], [-r,0,0], [-r,height-h,0], [0,height-h,0]
    	]
    }

    this.build = function() {
        this.height = height
    	var outline = buildOutline(height)
    	var c = new Revolution.RevolutionSweep(outline).build()
    	c.translate([-RADIUS,0,0])
    	c.setColor([0.9,0.2,0.7])
    	this.add(c)

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.EdgeCylinder;
Bakery.EdgeCylinder.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))