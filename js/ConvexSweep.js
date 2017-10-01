(function(Revolution) {
    
Revolution.ConvexSweep = function() {

    this.build = function(outline, init, end, opts={}) {
        function average(points) {
            return points[0].map((aux,i) => {
                return points.reduce((acum,x) => {return acum+x[i]}, 0) * 1.0/points.length
            })
        }

        var { scale = (x) => {return [1,1,1]},
            twist = (i) => {return 0},
            steps = 50,
            cover = true
        } = opts;

        var sweep = revolution.sweep(
            outline, init, end,
            {steps: steps, scale: scale, twist: twist}
        )
        this.position = revolution.flattenSurface(revolution.transpose(sweep))
        this.index = revolution.meshIndex(outline.length, steps+1, {close: true})
        this.color = this.position.map((x,i) => {return [0.26, 0.53, 0.96][i%3]+(Math.random()-0.5)})        

        if (cover) {
            // Add the middle point of the cover to the position buffer
            this.position = this.position.
                    concat(average(sweep[0])).
                    concat(average(sweep[sweep.length-1]));
            var last = this.position.length/3 - 1
            
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
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.ConvexSweep;
Revolution.ConvexSweep.prototype = copyOfParent;
    
}(window.Revolution = window.Revolution || {}))