import {Sphere} from '../../Vendors/ogl/src/extras/Sphere';
import {Program} from '../../Vendors/ogl/src/core/Program';
import {Transform} from '../../Vendors/ogl/src/core/Transform';
import {Mesh} from '../../Vendors/ogl/src/core/Mesh';
import {RenderTarget} from '../../Vendors/ogl/src/core/RenderTarget';

const vertex = require('./shader/normal.vert');
const fragment = require('./shader/normal.frag');

export default class SphereNormal {

    constructor(gl) {

        this.gl = gl;

        this.scene = new Transform();

        this.texture = new RenderTarget(this.gl, {
            width: 512.0,
            height: 512.0,
            depth: false,
            depthTexture: false
        });

        const geometry = new Sphere(this.gl, {
            radius: 0.6,
            widthSegments: 64.0,
            heightSegments: 32.0
        });

        const program = new Program(this.gl, {
            vertex,
            fragment,
            depthTest: false,
            depthWrite: false
        });

        const normalSphere = new Mesh(this.gl, {
            geometry,
            program,
            frustumCulled: false
        });

        normalSphere.setParent(this.scene);

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.renderer.render({scene: this.scene, target: this.texture});
        // this.gl.clearColor(0.7, 0.7, 0.7, 1.0);
    }

    get Texture() {
        return this.texture.texture;
    }

}