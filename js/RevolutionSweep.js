(function(Revolution) {
    
Revolution.RevolutionSweep = function(outline, opts={}) {

    Revolution.Object3D.call(this);


    this.build = function() {
        var {
            steps = 32,
            axis = [0,1,0]
        } = opts

        this.position = revolution.revolve(outline, Math.PI*2/steps, {axis:axis})
        this.position = revolution.flattenGrid(this.position)
        this.index = revolution.meshIndex(steps, outline.length, {close:true}) // steps o steps+1?
        this.color = this.position.map((x,i) => {
            return [1,1,0].map((c) => {return Math.random()*c} )
        })

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.RevolutionSweep;
Revolution.RevolutionSweep.prototype = copyOfParent;
    
}(window.Revolution = window.Revolution || {}))