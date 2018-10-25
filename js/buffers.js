function setupWebGLBuffers(obj, trans = mat4.create()) { 
    let posBuffer = obj.getPositionBuffer(trans);
    if (posBuffer) {
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
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.getNormalBuffer()), gl.STATIC_DRAW);   
    }

    if (obj.children) {
        for (var i = 0; i < obj.children.length; i++) {
            var newTrans = mat4.create()
            mat4.multiply(newTrans, trans, obj.getTransformation())
            setupWebGLBuffers(obj.children[i], newTrans);
        }
    }
}

function drawVertexGrid(obj) {
    if (obj.webgl_position_buffer) {
        var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexPositionAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.webgl_position_buffer);
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

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