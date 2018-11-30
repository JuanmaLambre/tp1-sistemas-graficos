class EdgeCylinder extends Object3D {

    static get RADIUS() { return 0.03 }

    _buildOutline() {
    	let h = 9/10*this.height
    	let r = 2/3*EdgeCylinder.RADIUS
    	return [
    		[0,h,0], [-r,h,0], [-r,this.height,0], [-EdgeCylinder.RADIUS,this.height,0],
    		[-EdgeCylinder.RADIUS,0,0], [-r,0,0], [-r,this.height-h,0], [0,this.height-h,0]
    	]
    }

    constructor(height) {
        super()
        this.height = height

    	var outline = this._buildOutline(height)
    	var c = new RevolutionSweep(outline)
    	//c.translate([-EdgeCylinder.RADIUS,0,0])
    	c.setColor([0.9,0.2,0.7])
        c.loadTexture("maps/candy.jpg")

    	this.add(c)
    }

}