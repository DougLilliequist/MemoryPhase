import OpticalFlowParticles from './index.js';
import * as dat from 'dat.gui';

class App {

    constructor() {

        window.gui = new dat.GUI()
        console.log('◕‿◕');
        console.log('douglas@adventureclub.io');
        console.log('douglas.lilliequist@gmail.com');
        console.log('twitter: @DougLilliequist');
        const opticalflowParticles = new OpticalFlowParticles();
        
    }

}

window.onload = () => new App();