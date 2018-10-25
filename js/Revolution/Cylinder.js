(function(Revolution) {

Revolution.Cylinder = function(opts = {}) {

    Revolution.Object3D.call(this);

    this.build = function() {
        var { discretion = 32 } = opts
        this.position = revolution.flatten(
            revolution.revolve([[-1,0,1], [1,0,1]], Math.PI/discretion, {axis:[1,0,0]}),
            1
        )
        this.index = revolution.meshIndex(discretion*2, 2, {close: true})
        this.position.push([-1,0,0])
        this.position.push([1,0,0])
        for (var i = 0; i < this.index.length; i++) {
            if (this.index[i] == this.index[i-1]) {
                if (this.index[i] % 2 == 1) this.index.splice(i, 0, this.position.length - 1)
                else this.index.splice(i, 0, this.position.length - 2)
                i++
            }
        }
        this.index.push(this.position.length - 2)
        this.index.push(2)
        this.color = this.position.map((x,i) => {
            return [2,0,1].map((i) => {
                var bell = Array.from(Array(20)).map(() => {return Math.random()})
                bell = bell.reduce((s,x) => {return s+x}, 0)/bell.length
                return [0.26, 0.53, 0.96][i%3] - 0.5 + bell
            })
        });
        this.normal = this.position.map((x) => {
            return [0, x[1], x[2]]
        })

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Revolution.Cylinder;
Revolution.Cylinder.prototype = copyOfParent;

}(window.Revolution = window.Revolution || {}))