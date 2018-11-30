function setDefaultPerspective() {
    mat4.perspective(pMatrix, 45, 640.0/480.0, 0.1, 100.0);
    var r = camera.radius
    camera = jQuery.extend({}, CAMERA_DEFAULTS)
    camera.radius = r
}

function setOrthographic(axis) {
    camera.perspective = false
    camera.orthographic = true
    camera.translation = [0,0,0]
    camera.followCake = false

    switch (axis.toLowerCase()) {
        case "x":
            camera.rho = 0
            camera.alpha = Math.PI/2
            mat4.ortho(pMatrix, 20, -10, -3, 17, 50, -30)
            break
        case "y":
            camera.rho = -Math.PI/2
            camera.alpha = Math.PI/2
            mat4.ortho(pMatrix, 25, -10, -10, 10, 50, -30)
            break
        case "z":
            camera.rho = 0
            camera.alpha = Math.PI
            mat4.ortho(pMatrix, 15, -15, -3, 17, 50, -30)
            break
        default:
            throw "Wrong axis: " + axis
    }
}


$('#contenedor3D').mousedown(function(e) {       
    camera.mouse.down = true
    if (camera.perspective) {
        camera.mouse.prevX = camera.mouse.x = e.clientX || e.pageX
        camera.mouse.prevY = camera.mouse.y = e.clientY || e.pageY 
    }
});

$('#contenedor3D').mouseup(function(event) {       
    camera.mouse.down = false
});

$("#contenedor3D").mousemove(function(e) {
    if (camera.mouse.down && camera.perspective) {
        camera.mouse.x = e.clientX || e.pageX
        camera.mouse.y = e.clientY || e.pageY
        camera.alpha += (camera.mouse.x - camera.mouse.prevX)*0.01
        camera.rho += (camera.mouse.y - camera.mouse.prevY)*0.01 
        camera.mouse.prevX = camera.mouse.x
        camera.mouse.prevY = camera.mouse.y 
    }
})

$("body").on("keydown", (e) => {
    let key = e.key.toUpperCase()
    if (key == "W" && camera.perspective) {
        camera.radius *= 9/10
    } else if (key == "S" && camera.perspective) {
        camera.radius /= 9/10
    } else if ((key == "A" || key == "D") && camera.perspective) {
        let phi = -camera.alpha - Math.PI/2, theta = Math.PI/2 - camera.rho
        let viewVec = revolution.polarToCart(camera.radius, phi, theta)
        let planeVec = revolution.polarToCart(camera.radius, phi, theta+1)
        let norm = revolution.normalize(revolution.cross_prod(planeVec, viewVec))
        let scale = 0.5 * (key == "A" ? -1 : 1)
        camera.translation = revolution.sum(camera.translation, revolution.scalar(scale, norm))
    } else if (key == "1") {
        setDefaultPerspective()
        camera.followCake = false
    } else if (key == "2") {
        setDefaultPerspective()
        camera.translation = [0,-4,-4]
        camera.followCake = false 
    } else if (key == "3") {
        setDefaultPerspective()
        camera.translation = [0,-4,-12]
        camera.followCake = false
    } else if (key == "4") {
        setOrthographic("x")
    } else if (key == "5") {
        setOrthographic("y")                      
    } else if (key == "6") {
        setOrthographic("z")
    } else if (key == "7") {
        setDefaultPerspective()
        camera.followCake = true
    }
})