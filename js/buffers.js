function setCamaraBuffers() {
    let uPMatrix = gl.getUniformLocation(glProgram, "uPMatrix");
    gl.uniformMatrix4fv(uPMatrix, false, pMatrix);

    let uVMatrix = gl.getUniformLocation(glProgram, "uVMatrix")
    gl.uniformMatrix4fv(uVMatrix, false, vMatrix)

    let phi = -camera.alpha - Math.PI/2, theta = Math.PI/2 - camera.rho
    let cameraPos = revolution.polarToCart(camera.radius, phi, theta)
    var vCamera = gl.getUniformLocation(glProgram, "vCamera")
    gl.uniform3fv(vCamera, cameraPos)
}

function setLightBuffers() {
    for (let i = 0; i < lights.length; ++i) {
        let unifL = gl.getUniformLocation(glProgram, "L["+i+"]")
        gl.uniform3fv(unifL, lights[i].position)
        let unifI = gl.getUniformLocation(glProgram, "I["+i+"]")
        gl.uniform3fv(unifI, lights[i].color)
        let unifIe = gl.getUniformLocation(glProgram, "Ie["+i+"]")
        gl.uniform3fv(unifIe, lights[i].spectral)
    }
}

function setGlobalUniforms() {
    setCamaraBuffers()
    setLightBuffers()

    let uTime = gl.getUniformLocation(glProgram, "uTime")
    gl.uniform1f(uTime, time)

    let randomvec = gl.getUniformLocation(glProgram, "randomvec")
    gl.uniform3fv(randomvec, [Math.random(), Math.random(), Math.random()])
}