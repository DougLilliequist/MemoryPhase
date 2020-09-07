precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform vec2 _Resolution;

varying vec2 vUV;

void main() {

    vec3 pos = position;
    pos.xy *= 0.5;
    pos.x /= _Resolution.x / _Resolution.y;

    pos.x -= 0.8;
    pos.y += 0.75;


    // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_Position = vec4(pos, 1.0);

    vUV = uv;

}