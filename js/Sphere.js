(function(Revolution) {
    
Revolution.Sphere = function(opts = {}) {
 
    Revolution.Object3D.call(this);
    
    this.build = function() {
        var { discretion = 32,
            radius = 1 } = opts
        this.position = revolution.flatten(
            revolution.revolve(
                revolution.semicircle(radius, {discretion: discretion}),
                Math.PI/discretion, {axis:0}
        ), 1)
        this.index = revolution.meshIndex(discretion*2, discretion+1, {close: true})
        this.color = this.position.map((x,i) => {
            return [0,1,2].map((i) => {return [0.26, 0.53, 0.96][i%3]+(Math.random()-0.5)})
        });
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.Sphere;
Revolution.Sphere.prototype = copyOfParent;
    
}(window.Revolution = window.Revolution || {}))