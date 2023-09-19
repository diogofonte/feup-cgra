#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerWaterTex;
uniform sampler2D uSamplerWaterMap;
uniform float timeFactor;

void main() {

    vec2 movementCoords = mod(vTextureCoord + timeFactor*0.05, 1.0);

    vec4 color = texture2D(uSamplerWaterTex, movementCoords);
    vec4 filter = texture2D(uSamplerWaterMap, movementCoords);

    color.b -= color.b * filter.b * 0.3;
    color.r -= color.r * filter.b * 0.3;
    color.g -= color.g * filter.b * 0.3;

    gl_FragColor = color;
}