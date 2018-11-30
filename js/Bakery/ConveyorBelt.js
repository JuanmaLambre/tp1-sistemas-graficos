class ConveyorBelt extends Prism {

    /*
    ConveyorBelt esta hecho para que la textura jpg se mueva dinamicamente
    en base a la posicion de los puntos, en vez de hacer que se mueva en
    el fragment shader
    */

    constructor(width, height, depth) {
        super(width, height, depth)

        this.offset = 0
        this.isMoving = false
        this.loadTexture("maps/cinta.jpg")

        this.setupWebGLBuffers()
    }

    turnOn() {
        this.isMoving = true
    }

    turnOff() {
        this.isMoving = false
    }

    onAdvance() {
        if (this.isMoving) {
            this.offset += BELT_VELOCITY/FPS
            while (this.offset > this.depth + this.height)
                this.offset -= this.depth + this.height
        }
    }

    draw(trans = mat4.create()) {
        let uBeltAnimation = gl.getUniformLocation(glProgram, "uBeltAnimation")
        gl.uniform1i(uBeltAnimation, true)

        let beltOffset = gl.getUniformLocation(glProgram, "beltOffset")
        let ratio = this.offset / (this.depth + this.height)
        gl.uniform1f(beltOffset, ratio)
        
        super.draw(trans)
        
        gl.uniform1i(uBeltAnimation, false)
    }


    _buildTexture() {
        let ratio = this.depth / (this.depth + this.height)
        let t0 = [ratio,0], t1 = [ratio,1], t2e = [1,0], t3e = [1,1],
            t4s = [0,0], t5s = [0,1]
        let t2s = t4s, t3s = t5s, t6 = t0, t7 = t1, t4e = t2e, t5e = t3e
        return [
            t0, t1, t2e, t3e, 
            t1, t5e, t3e, t7, 
            t5e, t4e, t7, t6,
            t4e, t0, t6, t2s, 
            t0, t4s, t1, t5s, 
            t7, t3s, t6, t2s
        ]
    }



}