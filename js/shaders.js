var SHADERS = {
    fragment: {},
    vertex: {}
}

function getShader(gl, id) {
    var shaderScript, src, currentChild, shader;

    shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    src = "";
    currentChild = shaderScript.firstChild;
    while(currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            src += currentChild.textContent;
        }
        currentChild = currentChild.nextSibling;
    }

    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, src);

    gl.compileShader(shader);  
      
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
      alert("An error occurred compiling the shaders: " + 
            gl.getShaderInfoLog(shader));  
      return null;  
    }
      
    return shader;
}

function initShaders() {
    // Obtenemos los shaders ya compilados
    SHADERS.fragment.default = getShader(gl, "shader-fs");
    SHADERS.vertex.default = getShader(gl, "shader-vs");

    // Creamos un programa de shaders de WebGL.
    glProgram = gl.createProgram();

    // Asociamos cada shader compilado al programa.
    gl.attachShader(glProgram, SHADERS.vertex.default);
    gl.attachShader(glProgram, SHADERS.fragment.default);

    // Linkeamos los shaders para generar el programa ejecutable.
    gl.linkProgram(glProgram);

    // Chequeamos y reportamos si hubo alg�n error.
    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program: " + 
            gl.getProgramInfoLog(glProgram));
        return null;
    }

    // Le decimos a WebGL que de aqu� en adelante use el programa generado.
    gl.useProgram(glProgram);
}
