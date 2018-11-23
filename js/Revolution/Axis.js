(function(Revolution) {

Revolution.Axis = function(scale = 1) {

    Revolution.Object3D.call(this);

    this.build = function() {
        var xAxis = new Revolution.Cylinder().build();
        var yAxis = new Revolution.Cylinder().build();
        var zAxis = new Revolution.Cylinder().build();

        xAxis._debug = "x"
        yAxis._debug = "y"
        zAxis._debug = "z"

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

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.Axis;
Revolution.Axis.prototype = copyOfParent;

}(window.Revolution = window.Revolution || {}))