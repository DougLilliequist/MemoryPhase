import {Mesh} from '../../Vendors/ogl/src/core/Mesh';
import {Program} from '../../Vendors/ogl/src/core/Program';
import {Plane} from '../../Vendors/ogl/src/extras/Plane';
import {Geometry} from '../../Vendors/ogl/src/core/Geometry';
import {Shadow} from '../../Vendors/ogl/src/extras/Shadow';

import Simulator from './simulation/index.js';
import { Camera } from '../../Vendors/ogl/src/core/Camera';
import { Vec2 } from '../../Vendors/ogl/src/math/Vec2';
import { params } from '../params';

const vertex = require('./shader/particles.vert');
const fragment = require('./shader/particles.frag');

const shadowVertex = require('./shader/particlesShadow.vert');
const shadowFragment = require('./shader/particlesShadow.frag');

export default class Particles extends Mesh {

    constructor(gl, {camera, normal}) {

        super(gl);

        this.gl = gl;

        this.camera = camera;

        this.countX = 256;
        this.countY = this.countX;

        this.initSimulator();
        this.initGeometry();
        this.initProgram({normal});
        this.initShadowPass({normal});

    }

    initSimulator() {

        this.simulator = new Simulator(this.gl, {width: this.countX, height: this.countY, camera: this.camera});

    }

    initGeometry() {

        const scale = 0.003;
        const refGeometry = new Plane(this.gl, {width: 1.0, height: 1.0});
        const {position, normal, uv, index} = refGeometry.attributes;
        
        const localPositionData = position.data;
        const normalData = normal.data;
        const uvData = uv.data;
        const indexData = index.data;
        
        this.geometry = new Geometry(this.gl, {

            position: {
                size: 3,
                data: localPositionData
            },
            worldPosition: {
                instanced: 1,
                size: 2,
                data: this.simulator.position.coords
            },
            uv: {
                size: 2,
                data: uvData
            },
            normal: {
                size: 3,
                data: normalData
            },
            index: {
                data: indexData
            }

        });

    }

    initProgram({normal}) {

        const shadowParams = gui.addFolder("shadow");
        shadowParams.add(params.shadow, "BIAS", 0.0, 0.1, 0.0001).listen();
        
        const uniforms = {

            _Position: this.simulator.Position,
            _Velocity: this.simulator.Velocity,
            _Color: this.simulator.Color,
            _Resolution: {
                value: new Vec2(this.gl.renderer.width, this.gl.renderer.height)
            },
            _ShadowMapTexelSize: {
                value: 1.0 / 1024.0
            },
            _ShadowWeight: {
                value: 1.0 / 9.0
            },
            _Bias: {
                value: params.shadow.BIAS
            },
            _Normal: {
                value: normal
            }

        }

        this.program = new Program(this.gl, {
            vertex,
            fragment,
            uniforms,
            cullFace: this.gl.BACK,
            transparent: false
        });

    }

    initShadowPass({normal}) {

        this.shadowCamera = new Camera(this.gl, {
            near: 0.1,
            far: 5.0,
            left: -0.75,
            right: 0.75,
            top: 0.75,
            bottom: -0.75
        });

        // this.shadowCamera.position.set(0.0, 5.0, 5.0);
        this.shadowCamera.position.set(0.0, 3.0, 0.0);
        this.shadowCamera.lookAt([0.0, 0.0, 0.0]);

        this.shadowPass = new Shadow(this.gl, {light: this.shadowCamera});

        this.shadowPass.add({mesh: this, vertex: shadowVertex, fragment: shadowFragment});

    }

    update({scene, opticalFlow, t}) {

        const worldMatrix = this.worldMatrix;

        this.simulator.update({opticalFlow, worldMatrix, t});

        this.depthProgram.uniforms._Position = this.simulator.Position;
        this.depthProgram.uniforms._Velocity = this.simulator.Velocity;
        
        this.shadowPass.render({scene});

        this.program.uniforms._Position = this.simulator.Position;
        this.program.uniforms._Velocity = this.simulator.Velocity;

        this.program.uniforms._Bias.value = params.shadow.BIAS;

    }

}