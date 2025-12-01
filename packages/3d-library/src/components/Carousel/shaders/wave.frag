precision mediump float;
  
varying vec2 vUv;

uniform float uTime;
uniform float uOpacity;
uniform sampler2D uTexture;
uniform vec3 uBackgroundColor;

void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    vec3 backgroundMixer = mix(uBackgroundColor, texture.rgb, uOpacity);
    gl_FragColor = vec4(backgroundMixer, 1.0); 
}