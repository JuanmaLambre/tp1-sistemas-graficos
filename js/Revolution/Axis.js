class Axis extends Object3D {

    constructor(scale = 1) {
        super()
        
        var xAxis = new Cylinder();
        var yAxis = new Cylinder();
        var zAxis = new Cylinder();

        xAxis.name = "x"
        yAxis.name = "y"
        zAxis.name = "z"

        xAxis.setColor([1,0,0])
        yAxis.setColor([0,1,0])
        zAxis.setColor([0,0,1])

        xAxis.scale([scale/2,0.1,0.1])
        xAxis.translate([scale/2,0,0])

        yAxis.scale([scale/2,0.1,0.1])
        yAxis.rotate(Math.PI/2, [0,0,1])
        yAxis.translate([0,scale/2,0])
        
        zAxis.scale([scale/2,0.1,0.1])
        zAxis.rotate(Math.PI/2, [0,1,0])
        zAxis.translate([0,0,scale/2])

        this.add(xAxis);
        this.add(yAxis);
        this.add(zAxis);
    }

}