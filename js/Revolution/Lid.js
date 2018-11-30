class Lid extends Object3D {
	
	/*
	Outline is 2D on z=0
	*/

	constructor(outline) {
		super()

		let center = revolution.averagePoint(outline).concat(0)
		this.position = [].
			concat(outline.map((p) => { return [p[0],p[1],0] }))
		this.normal = this.position.map((p) => { return [0,0,1] })
		this.index = revolution.range(0,outline.length)
		this.setColor([0.9,0.9,0.9])
	}

	getDrawMode() {
		return gl.TRIANGLE_FAN
	}

}