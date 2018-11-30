class BallDecoration extends Object3D {

    static get RADIUS() { return 0.07 }


    constructor() {
        super()
        var sphere = new Sphere({radius:BallDecoration.RADIUS})
        sphere.setColor([0.9,0.3,0.3])
        sphere.translate([0,0.03,0])

        this.add(sphere)
    }

    getGlossiness() {
    	return 0
    }

}