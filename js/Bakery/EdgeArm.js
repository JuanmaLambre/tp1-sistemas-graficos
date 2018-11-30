class EdgeArm extends Object3D {

    constructor() {
        super()

        this.bar = new Prism(1.5, 0.25, 0.25)
        this.bar.translate([-1.75,4.5,0])
        this.bar.setColor([0.7,0.6,0.2])
        this.add(this.bar)

        let hand = new Prism(0.05, 0.5, 0.5)
        hand.translate([-1,4.5,0])
        hand.setColor([0.9,0.8,0.4])
        this.add(hand)
    }

    addEdge(edge) {
        edge.translate([-0.95,4.2,0])
        edge.setName("deco")
        this.add(edge)
    }

    removeEdge() {
        return this.remove("deco")
    }

}