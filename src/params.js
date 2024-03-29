export const params = {

    // blur: {
    //     ITERATIONS: 5
    // },

    // opticalFlow: {
    //     TINY: 1.0,
    //     THRESHOLD: 1.0,
    //     FADE: 0.6,
    //     OFFSETSCALE: 1.5
    // }

    // blur: {
    //     ITERATIONS: 8
    // },

    // opticalFlow: {
    //     TINY: 1.0,
    //     THRESHOLD: 0.0,
    //     FADE: 0.6,
    //     OFFSETSCALE: 2.5
    // }

    //cleanest so far
    blur: {
        ITERATIONS: 4
    },

    opticalFlow: {
        TINY: 0.001,
        // THRESHOLD: 0.53, //used 0.09 originally...
        THRESHOLD: 0.6, //used 0.09 originally...
        FADE: 0.0,
        OFFSETSCALE: 3.5
    },

    simulation: {

        velocity: {
            // FORCE: 0.0010,
            FORCE: 0.8,
            INERTIA: 0.87
        }
        
    },
    shadow: {
        // BIAS: 0.001
        SIZE: 1024.0 * 1.0,
        BIAS: 0.001
    }

}