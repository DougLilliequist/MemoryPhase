precision highp float;

uniform sampler2D _Video;
uniform sampler2D _Output;
uniform vec2 _Resolution;

varying vec2 vUV;

void main() {

    vec2 cameraUV = vec2(1.0 - vUV.x, vUV.y);
    cameraUV -= 0.5;
    float aspect = (_Resolution.x / _Resolution.y) / (640.0 / 480.0);
    cameraUV.y /= aspect;
    cameraUV += 0.5;

    vec3 flow = texture2D(_Output, vec2(1.0 - cameraUV.x, cameraUV.y)).xyz;

    gl_FragColor = vec4(flow, 1.0);

}