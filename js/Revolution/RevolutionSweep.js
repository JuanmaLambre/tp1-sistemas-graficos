(function(Revolution) { 
    
Revolution.RevolutionSweep = function(outline, opts={}) {

    Revolution.Object3D.call(this);


    function buildNormals(outline) {
        return outline.map((point,i) => {
            var tg = revolution.minus(
                i == 0 ? point : outline[i-1],
                i == outline.length-1 ? point : outline[i+1]
            )
            return revolution.normalize(revolution.cross_prod([0,0,1],tg))
        })
    }

    this.build = function() {
        var {
            steps = 32,
            axis = [0,1,0]
        } = opts

        this.position = revolution.revolve(outline, Math.PI*2/steps, {axis:axis})
        this.position = revolution.flattenGrid(this.position)
        this.index = revolution.meshIndex(steps, outline.length, {close:true})
        this.color = this.position.map((x,i) => {
            return [1,1,0].map((c) => {return Math.random()*c} )
        })

        let normalOutline = buildNormals(outline)
        this.normal = revolution.revolve(normalOutline, Math.PI*2/steps, {axis:axis})
        this.normal = revolution.flattenGrid(this.normal)

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.RevolutionSweep;
Revolution.RevolutionSweep.prototype = copyOfParent;
    
}(window.Revolution = window.Revolution || {}))