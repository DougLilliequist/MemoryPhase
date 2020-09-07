precision highp float;

uniform sampler2D _CurrentFrame;
uniform sampler2D _PrevFrame;
uniform sampler2D _PrevFlow;

uniform vec2 _Resolution;
uniform vec2 _TexelSize;
uniform float _Scale;
uniform float _Tiny;
uniform float _Threshold;
uniform float _Fade;
uniform float _OffsetScale;

varying vec2 vUV;

// #define TINY 0.001
// #define THRESHOLD 0.05
// #define THRESHOLD 0.02

#define TINY 1.0
#define THRESHOLD 10.0

#define OFFSETSCALE 2.0


//HEAVILY INSPIRED FROM FOLLOWING SHADER: https://github.com/moostrik/ofxFlowTools/blob/master/src/core/opticalflow/ftOpticalFlowShader.h
//By: Matthias Oostrik https://github.com/moostrik

void main() {

    vec2 uv = vec2(1.0 - vUV.x, vUV.y);

    vec2 offsetX = vec2(_TexelSize.x, 0.0) * _OffsetScale;
    vec2 offsetY = vec2(0.0, _TexelSize.y) * _OffsetScale;

    //derivative X
    float dX = texture2D(_PrevFrame, uv + offsetX).x - texture2D(_PrevFrame, uv - offsetX).x;
    dX += texture2D(_CurrentFrame, uv + offsetY).x - texture2D(_CurrentFrame, uv - offsetY).x;

    //derivative y
    float dY = texture2D(_PrevFrame, uv + vec2(0.0, _TexelSize.y)).x - texture2D(_PrevFrame, uv - vec2(0.0, _TexelSize.y)).x;
    dY += texture2D(_CurrentFrame, uv + vec2(0.0, _TexelSize.y)).x - texture2D(_CurrentFrame, uv - vec2(0.0, _TexelSize.y)).x;

    //gradient magnitude
    float mag = sqrt((dX * dX) + (dY * dY) + _Tiny);

    //brightness difference
    float dT = texture2D(_CurrentFrame, uv).x - texture2D(_PrevFrame, uv).x;

    float vX = (dX / mag) * dT;
    float vY = (dY / mag) * dT;

    vec2 flow = vec2(vX, vY * -1.0);

    flow *= _Scale; 

    float oldLen = sqrt((flow.x * flow.x) + (flow.y * flow.y) + 0.00001);
    float newLen = max(oldLen - _Threshold, 0.0);
    flow = (newLen * flow)/oldLen;

    vec3 prevFlow = texture2D(_PrevFlow, vUV).xyz;
    // vec3 forward = cross(vec3(flow.x, 0.0, 0.0), vec3(0.0, flow.y, 0.0));
    // vec3 outPut = mix(vec3(flow, forward.z), prevFlow, _Fade);
    // vec3 outPut = mix(vec3(flow, flow.y - flow.x), prevFlow, _Fade);
    vec3 outPut = mix(vec3(flow, flow.y - flow.x), prevFlow, _Fade);
    
    gl_FragColor = vec4(outPut, 1.0);

}