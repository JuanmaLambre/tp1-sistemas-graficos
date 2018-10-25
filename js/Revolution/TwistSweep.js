(function(Revolution) {
    
Revolution.TwistSweep = function(outline, radius, twists, opts={}) {

    Revolution.Object3D.call(this);


    this.build = function() {
        var {
            steps = 32,
            angle = 2*Math.PI,
            close = true
        } = opts

        this.position = revolution.revolve_twisted(outline, radius, twists, angle/steps, {angle:angle})
        this.position = revolution.flattenGrid(this.position)
        this.index = revolution.meshIndex(steps, outline.length, {close:close})
        this.color = this.position.map((x,i) => {
            return revolution.normalize(x)
        })
        this.normal = revolution.revolve_twisted(outline, 0, twists, angle/steps, {angle:angle})
        this.normal = revolution.flattenGrid(this.normal)

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.TwistSweep;
Revolution.TwistSweep.prototype = copyOfParent;
    
}(window.Revolution = window.Revolution || {}))