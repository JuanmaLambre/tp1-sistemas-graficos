(function(Revolution) {

Revolution.Prism = function(width, height, depth) {

    Revolution.Object3D.call(this);

    function buildIndex() {
        return [0,1,2,3,6,7,4,5,0,1,1,5,3,7,7,6,6,2,4,0]
    }

    function buildTexture() {
        return [
            [0,0],[0,0.25],[0,0.75],[0,0.5],
            [1,0],[1,0.25],[1,0.75],[1,0.5]
        ]
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
        this.normal = this.position.map((p) => {
            var xSign = p[0] > 0 ? 1 : -1,
                ySign = p[1] > 0 ? 1 : -1,
                zSign = p[2] > 0 ? 1 : -1
            var l = 1/Math.sqrt(3)
            return [xSign*l, ySign*l, zSign*l]
        })
        this.texture = buildTexture()

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.Prism;
Revolution.Prism.prototype = copyOfParent;

}(window.Revolution = window.Revolution || {}))