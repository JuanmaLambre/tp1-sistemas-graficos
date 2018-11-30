class Conveyor extends Object3D {

    static get RADIUS() { return 2 }


    constructor() {
        super()
        let oven = new Oven()
        oven.translate([0,1.75,-2.5])
        this.add(oven)
        
        let belt = new ConveyorBelt(3, 0.5, 20)
        belt.translate([0,0,7.5])
        belt.setName("belt")
        this.add(belt)

        let leg = new Prism(0.5, 3, 0.5)
        leg.translate([0,-1.75,0])
        leg.setColor([0.2,1,0.2])
        let xOffset = 1.25, zOffset = 3.75
        
        for (let side = -1; side < 2; side += 2) {
            for (let i = 0; i <= 4; i++) {
                let cpLeg = leg.clone()
                cpLeg.translate([xOffset*side, 0, zOffset*i])
                cpLeg.translate([0,0,1])
                this.add(cpLeg)
            }
        }

        this.translate([0,-0.25,0])
    }

}