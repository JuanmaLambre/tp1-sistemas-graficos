class Drawing {

    static get TEXTURE_MODE() {
        return {
            "STRECH": 0,
            "REPEAT": 1
        }
    }

    draw(trans = mat4.create()) {
        if (this.webgl_position_buffer) {
            var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
            gl.enableVertexAttribArray(vertexPositionAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
            gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

            let textureCoordAttribute = null
            let uHasTexture = gl.getUniformLocation(glProgram, "uHasTexture")
            gl.uniform1i(uHasTexture, this.hasTexture())
            if (this.hasTexture()) {
                textureCoordAttribute = gl.getAttribLocation(glProgram, "aVertexTexture")
                gl.enableVertexAttribArray(textureCoordAttribute)
                gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer);
                gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

                let uTextureMode = gl.getUniformLocation(glProgram, "uTextureMode")
                gl.uniform1i(uTextureMode, this.textureMode)

                let uSampler = gl.getUniformLocation(glProgram, "uSampler");
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
                gl.uniform1i(uSampler, 0);
            }

            let uHasReflection = gl.getUniformLocation(glProgram, "uHasReflection")
            gl.uniform1i(uHasReflection, this.hasReflection())
            if (this.hasReflection()) {
                if (!textureCoordAttribute) {
                    let textureCoordAttribute = gl.getAttribLocation(glProgram, "aVertexTexture")
                    gl.enableVertexAttribArray(textureCoordAttribute)
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer);
                    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                }

                let uReflectionIndex = gl.getUniformLocation(glProgram, "uReflectionIndex")
                gl.uniform1f(uReflectionIndex, this.getReflectionIndex())

                let uReflectionSampler = gl.getUniformLocation(glProgram, "uReflectionSampler");
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, this.glReflection);
                gl.uniform1i(uReflectionSampler, 1);
            }

            var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
            gl.enableVertexAttribArray(vertexColorAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

            var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
            gl.enableVertexAttribArray(vertexNormalAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
            gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

            let uMMatrix = gl.getUniformLocation(glProgram, "uMMatrix");
            let thisMatrix = mat4.create()
            mat4.mul(thisMatrix, trans, this.transformation.matrix())
            gl.uniformMatrix4fv(uMMatrix, false, thisMatrix);

            let nTrans = mat4.create()
            mat4.transpose(nTrans, mat4.invert(nTrans, thisMatrix))
            let uNMatrix = gl.getUniformLocation(glProgram, "uNMatrix");
            gl.uniformMatrix4fv(uNMatrix, false, nTrans);

            let uGlossiness = gl.getUniformLocation(glProgram, "uGlossiness")
            gl.uniform1f(uGlossiness, this.getGlossiness())

            var indexBuf = this.getIndexBuffer()
            gl.drawElements(this.getDrawMode(), indexBuf.length, gl.UNSIGNED_SHORT, 0);
        }
    }

    setupWebGLBuffers() { 
        let posBuffer = this.getPositionBuffer();
        if (posBuffer.length > 0) {
            this.webgl_position_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(posBuffer), gl.STATIC_DRAW);

            this.webgl_color_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getColorBuffer()), gl.STATIC_DRAW);   

            this.webgl_index_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.getIndexBuffer()), gl.STATIC_DRAW);
            
            this.webgl_normal_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getNormalBuffer()), gl.STATIC_DRAW);

            if (this.texture) {
                this.webgl_texture_buffer = gl.createBuffer()
                gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer)
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getTextureBuffer()), gl.STATIC_DRAW)
            }
        }
    }

}