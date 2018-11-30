class Oven extends Prism {
    
    static get DIMENSIONS() { return [5, 10, 5] }

    constructor() {
        super(...Oven.DIMENSIONS)

        this.loadTexture("maps/horno.jpg")
        this.loadReflection("maps/refmapGreyRoom1.jpg")
    }

    _buildTexture() {
        /* Texture for a jpg like this:
        --------------------------
        | front | right |  top   |
        |------------------------|
        | back  | left  | bottom |
        --------------------------
        */
        let frontWidth = 400/1024
        let sideWidth = 312/1024
        let secondLine = frontWidth + sideWidth
        return [
            [0,1],[frontWidth,1],[0,1/2],[frontWidth,1/2],
            [frontWidth,1],[secondLine,1],[frontWidth,1/2],[secondLine,1/2],
            [0,1/2],[frontWidth,1/2],[0,0],[frontWidth,0],
            [frontWidth,1/2],[secondLine,1/2],[frontWidth,0],[secondLine,0],
            [secondLine,1],[1,1],[secondLine,1/2],[1,1/2],
            [1,0],[1,1/2],[secondLine,0],[secondLine,1/2]
        ]
    }

    getReflectionIndex() {
        return 0.2
    }

}