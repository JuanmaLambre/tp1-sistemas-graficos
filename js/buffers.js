function setupWebGLBuffers(obj, trans = mat4.create()) { 
    let posBuffer = obj.getPositionBuffer(trans);
    if (posBuffer.length > 0) {
        obj.webgl_position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.webgl_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(posBuffer), gl.STATIC_DRAW);

        obj.webgl_color_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.webgl_color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.getColorBuffer()), gl.STATIC_DRAW);   

        obj.webgl_index_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.webgl_index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj.getIndexBuffer()), gl.STATIC_DRAW);
        
        obj.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.webgl_normal_buffer);
        let nTrans = mat4.create()
        mat4.transpose(nTrans, mat4.invert(nTrans, trans))
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.getNormalBuffer(nTrans)), gl.STATIC_DRAW);

        //obj.webgl_texture_buffer = gl.createBuffer();
        //gl.bindBuffer(gl.ARRAY_BUFFER, obj.webgl_texture_buffer);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.getTextureBuffer()), gl.STATIC_DRAW);
    }   

    for (var i = 0; i < obj.children.length; i++) {
        let newTrans = obj.transformation.matrix()
        mat4.mul(newTrans, trans, newTrans)
        setupWebGLBuffers(obj.children[i], newTrans);
    }
}

function drawVertexGrid(obj) {
    if (obj.webgl_position_buffer) {
        var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexPositionAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.webgl_position_buffer);
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        if (obj.hasTexture()) {
            let textureCoordAttribute = gl.getAttribLocation(glProgram, "aVertexTexture")
            gl.enableVertexAttribArray(textureCoordAttribute)
            gl.bindBuffer(gl.ARRAY_BUFFER, obj.webgl_texture_buffer);
            gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
        }

        var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
        gl.enableVertexAttribArray(vertexColorAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.webgl_color_buffer);
        gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

        var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
        gl.enableVertexAttribArray(vertexNormalAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.webgl_normal_buffer);
        gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.webgl_index_buffer);

        var indexBuf = obj.getIndexBuffer()
        gl.drawElements(gl.TRIANGLE_STRIP, indexBuf.length, gl.UNSIGNED_SHORT, 0);
    }

    for (var i = 0; i < obj.children.length; i++) {
        drawVertexGrid(obj.children[i]);
    }
}

function setCamaraBuffers() {
    let u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
    gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
    let u_model_view_matrix = gl.getUniformLocation(glProgram, "uMVMatrix");
    gl.uniformMatrix4fv(u_model_view_matrix, false, mvMatrix);
    let u_mvmat_ti = gl.getUniformLocation(glProgram, "uMVMatrix_TI")
    let mvmat_ti = mat4.create() 
    mat4.transpose(mvmat_ti, mat4.invert(mvmat_ti, mvMatrix))
    gl.uniformMatrix4fv(u_mvmat_ti, false, mvmat_ti)
    
    let phi = -camera.alpha - Math.PI/2, theta = Math.PI/2 - camera.rho
    let cameraPos = revolution.polarToCart(camera.radius, phi, theta)
    var u_camera_pos = gl.getUniformLocation(glProgram, "vCamera")
    gl.uniform3fv(u_camera_pos, cameraPos)
}

function setLightBuffers() {
    for (let i = 0; i < lights.length; ++i) {
        let unifL = gl.getUniformLocation(glProgram, "L" + (i+1))
        gl.uniform3fv(unifL, lights[i].position)
        let unifI = gl.getUniformLocation(glProgram, "I" + (i+1))
        gl.uniform3fv(unifI, lights[i].color)
        let unifIe = gl.getUniformLocation(glProgram, "Ie" + (i+1))
        gl.uniform3fv(unifIe, lights[i].spectral)
    }
}

function setUniformLocations() {
    let glTexture = gl.createTexture()
    let img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = function() {
        glTexture = gl.createTexture();
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, glTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    img.src = "maps/crema.jpg"

    let samplerUniform = gl.getUniformLocation(glProgram, "flavor");
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glTexture);
    gl.uniform1i(samplerUniform, 0);
}