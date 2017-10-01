(function(Revolution) {
    
Revolution.Sphere = function(opts = {}) {
 
    Revolution.Object3D.call(this);
    
    this.build = function() {
        var { steps = 32,
            radius = 1 } = opts
        this.position = revolution.flatten(
            revolution.revolve(
                revolution.semicircle(radius, {steps: steps}),
                Math.PI/steps, {axis:0}
        ), 1)
        this.index = revolution.meshIndex(steps*2, steps+1, {close: true})
        this.color = this.position.map((x,i) => {
            return [0,1,2].map((i) => {
                var bell = Array.from(Array(20)).map(() => {return Math.random()})
                bell = bell.reduce((s,x) => {return s+x}, 0)/bell.length
                return [0.26, 0.53, 0.96][i%3] - 0.5 + bell
            })
        });
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.Sphere;
Revolution.Sphere.prototype = copyOfParent;
    
}(window.Revolution = window.Revolution || {}))