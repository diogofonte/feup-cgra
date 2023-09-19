#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

varying float altimetryZ;

uniform sampler2D terrainMap;
uniform sampler2D terrainTex;
uniform sampler2D altimetryMap;

void main() {
  vec4 color = texture2D(terrainTex, vTextureCoord);
  
  vec4 filter2 = texture2D(altimetryMap, vec2(0,altimetryZ));
  
  vec4 finalColor = mix(filter2, color, 0.7);  

  gl_FragColor =  finalColor;
}
