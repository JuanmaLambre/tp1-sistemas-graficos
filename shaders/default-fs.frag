varying highp vec4 vColor;
varying highp vec4 vNormal;

highp vec3 ilum;
highp vec3 norm;
highp vec3 col;

void main(void) {
    ilum = vec3(-1.0,1.0,1.0);
    norm = vec3(vNormal);
    col = vec3(vColor);
    // gl_FragColor es una variable "built-in" de GLSL que es usada para 
    // almacenar el color resultante del fragmento.
    // cos(alpha) * vColor, alpha: ilum & vNormal
    gl_FragColor = vec4((max(dot(ilum, norm),0.0)/(length(norm)*length(ilum))) * col, 1.0);
}