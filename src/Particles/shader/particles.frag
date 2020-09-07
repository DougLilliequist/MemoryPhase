precision highp float;

uniform sampler2D _Normal;
uniform sampler2D tShadow;

uniform vec2 _Resolution;
uniform float _ShadowMapTexelSize;
uniform float _ShadowWeight;
uniform float _Bias;
uniform mat3 normalMatrix;

varying vec2 vUv;
varying vec4 vShadowCoord;
varying vec3 vNormal;
varying float vLife;

#define LIGHT vec3(0.0, 3.0, 0.0)
#define BIAS 0.001


float unpackRGBA (vec4 v) {
    return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
}

vec2 hash22(in vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);

}

float softShadow(in vec3 shadowCoord) {

    float shadow = 0.0;
    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x < 1; x++) {

            //if particle is outside the shadowmap, then it's for sure not being occluded
            if(shadowCoord.x < 0.0 || shadowCoord.x > 1.0) return 1.0;
            if(shadowCoord.y < 0.0 || shadowCoord.y > 1.0) return 1.0;
            if(shadowCoord.z < 0.0 || shadowCoord.z > 1.0) return 1.0;

            vec2 hash = hash22(shadowCoord.xy * 1000.0) - 0.5;
            vec2 offset = (vec2(float(x), float(y)) + hash) * _ShadowMapTexelSize;

            float sampledShadow = unpackRGBA(texture2D(tShadow, shadowCoord.xy + offset));
            shadow += step(shadowCoord.z - _Bias, sampledShadow);

        }
    }

    return shadow * _ShadowWeight;

}

void main() {

    
    vec3 normal = texture2D(_Normal, vUv).xyz;
    if(dot(normal, normal) <= 0.0) discard;
    normal = normal * 2.0 - 1.0;
    normal = normalMatrix * normal;

    float light = max(0.0, dot(normal, LIGHT));

    vec3 shadowCoord = vShadowCoord.xyz / vShadowCoord.w;
    shadowCoord = shadowCoord * 0.5 + 0.5;

    float shadow = softShadow(shadowCoord.xyz);
    vec3 col = vec3(0.3, 0.74, 0.8) + (light * 0.2);
    col *= mix(0.2, 1.0, shadow);
    
    gl_FragColor = vec4(col, 1.0);

}