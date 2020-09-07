precision highp float;

uniform sampler2D _InputImg;
uniform vec2 _TexelSize;
uniform float _Direction;

varying vec2 vUv;

void main() {

    float sobel = 0.0;

    if(_Direction === 0) {

        sobel += texture2D(_InputImg, uv + vec2(-_TexelSize.x, -_TexelSize.y)) * -1.0;
        sobel += texture2D(_InputImg, uv + vec2(-_TexelSize.x, 0.0)) * -2.0;
        sobel += texture2D(_InputImg, uv + vec2(-_TexelSize.x, _TexelSize.y)) * -1.0;

        sobel += texture2D(_InputImg, uv + vec2(_TexelSize.x, -_TexelSize.y)) * 1.0;
        sobel += texture2D(_InputImg, uv + vec2(_TexelSize.x, 0.0)) * 2.0;
        sobel += texture2D(_InputImg, uv + vec2(_TexelSize.x, _TexelSize.y)) * 1.0;

    } else {

        sobel += texture2D(_InputImg, uv + vec2(-_TexelSize.x, _TexelSize.y)) * -1.0;
        sobel += texture2D(_InputImg, uv + vec2(0.0, _TexelSize.y)) * -2.0;
        sobel += texture2D(_InputImg, uv + vec2(_TexelSize.x, _TexelSize.y)) * -1.0;

        sobel += texture2D(_InputImg, uv + vec2(_TexelSize.x, -_TexelSize.y)) * 1.0;
        sobel += texture2D(_InputImg, uv + vec2(0.0, -_TexelSize.y)) * 2.0;
        sobel += texture2D(_InputImg, uv + vec2(_TexelSize.x, _TexelSize.y)) * 1.0;

    }

    gl_FragColor = sobel;

}
