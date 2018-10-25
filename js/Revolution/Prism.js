(function(Revolution) {

Revolution.Prism = function(width, height, depth) {

    Revolution.Object3D.call(this);

    function buildIndex() {
        return [0,1,2,3,6,7,4,5,0,1,1,5,3,7,7,6,6,2,4,0]
    }

    this.build = function() {
        var square = [
            [-width/2, height/2],
            [-width/2,-height/2],
            [ width/2, height/2],
            [ width/2,-height/2]
        ]
        var init = [0,0,depth/2], end = [0,0,-depth/2]

        this.position = revolution.flattenGrid(revolution.sweep(square, init, end, {steps:1}))
        this.index = buildIndex()
        this.color = this.position.map((x) => {
            return [1,0,1].map( (i) => {return i*Math.random()} )
        })
        this.normal = this.position.map((p,i) => {return [0,0,1]})

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.Prism;
Revolution.Prism.prototype = copyOfParent;

}(window.Revolution = window.Revolution || {}))