class CookieDecoration extends Object3D {

    static get WIDTH() { return 0.025 }

    constructor() {
        super()
        let outline = revolution.semicircle(0.15).map((p) => {
            return p.slice(0, 2)
        })

        let cookie = new StraightSweep(outline, CookieDecoration.WIDTH)
        cookie.setColor([0.9,0.7,0.5])
        cookie.translate([-0.1,0,0])
        this.add(cookie)
    }

}