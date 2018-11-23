(function(Revolution) {

Revolution.Sphere = function(opts = {}) {

    Revolution.Object3D.call(this);


    this.build = function constructor() {
        var { 
            radius = 1,
            discretion = 16
        } = opts

        var semicircle = revolution.semicircle(radius, {steps:discretion})
        var s = new Revolution.RevolutionSweep(semicircle, {steps:discretion, axis:[1,0,0]}).build()
        s.setName("sphere")

        this.add(s)

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.Sphere;
Revolution.Sphere.prototype = copyOfParent;

}(window.Revolution = window.Revolution || {}))