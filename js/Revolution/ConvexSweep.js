(function(Revolution) {
    
Revolution.ConvexSweep = function(outline, init, end, opts={}) {

    Revolution.Object3D.call(this);


    function average(points) {
        return points[0].map((aux,i) => {
            return points.reduce((acum,x) => {return acum+x[i]}, 0) * 1.0/points.length
        })
    }
        
    this.build = function() {
        var { 
            scale = (x) => {return [1,1,1]},
            twist = (i) => {return 0},
            steps = 32,
            cover = true
        } = opts;

        var sweep = revolution.sweep(
            outline, init, end,
            {steps: steps, scale: scale, twist: twist}
        )
        this.position = revolution.flatten(revolution.transpose(sweep), 1)
        this.index = revolution.meshIndex(outline.length, steps+1, {close: true})

        if (cover) {
            // Add the middle point of the cover to the position buffer
            this.position.push(average(sweep[0]));
            this.position.push(average(sweep[sweep.length-1]));
            var last = this.position.length - 1
            
            // Add the middle points of the cover to the index buffer
            for (var i = 0; i < this.index.length; i++) {
                if (this.index[i] == this.index[i-1]) {
                    if (this.index[i] % 2 == 1) this.index.splice(i, 0, last)
                    else this.index.splice(i, 0, last-1)
                    i++
                }
            }
            this.index.push(last - 1*(outline.length % 2 == 0))
            this.index = [last-1,0,steps+1].concat(this.index)
        }

        this.setColor([0.7,0.3,0.5])
        this.normal = this.position.slice(0)

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.ConvexSweep;
Revolution.ConvexSweep.prototype = copyOfParent;
    
}(window.Revolution = window.Revolution || {}))