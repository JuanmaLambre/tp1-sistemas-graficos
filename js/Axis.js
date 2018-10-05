(function(Revolution) {

Revolution.Axis = function(opts = {}) {

    Revolution.Object3D.call(this);

    this.build = function() {
        var xAxis = new Revolution.Cylinder().build();
        var yAxis = new Revolution.Cylinder().build();
        var zAxis = new Revolution.Cylinder().build();

        xAxis.color = xAxis.position.map((x,i) => {
            return [1,0,0].map((i) => {
                return i * Math.random()
            })
        });
        yAxis.color = yAxis.position.map((x,i) => {
            return [0,1,0].map((i) => {
                return i * Math.random()
            })
        });
        zAxis.color = zAxis.position.map((x,i) => {
            return [0,0,1].map((i) => {
                return i * Math.random()
            })
        });

        xAxis.scale([1,0.1,0.1])
        xAxis.translate([1,0,0])

        yAxis.scale([0.1,1,0.1])
        yAxis.rotate(Math.PI/2, [0,0,1])
        yAxis.translate([1,0,0])
        
        zAxis.scale([0.1,0.1,1])
        zAxis.rotate(Math.PI/2, [0,1,0])
        zAxis.translate([-1,0,0])

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