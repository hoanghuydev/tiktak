// src/utils/effects.js

/**
 * Builds video effect filter string based on the provided effect configuration.
 * @param {Object} config - Effect configuration.
 * @returns {string} Combined video effects.
 */
function buildVideoEffects(config) {
    const effects = [];

    if (config.slowMotion) {
        const { speed } = config.slowMotion;
        effects.push(`setpts=${1 / speed}*PTS`);
    }

    if (config.reverse) {
        effects.push('reverse');
    }

    if (config.zoom) {
        const { level, duration } = config.zoom;
        // Example zoom effect: using zoompan
        effects.push(`zoompan=z='min(${level},zoom+0.001)':d=1`);
    }

    if (config.fade) {
        const { type, start, duration } = config.fade;
        effects.push(`fade=t=${type}:st=${start}:d=${duration}`);
    }

    if (config.blur) {
        const { radius, power } = config.blur;
        effects.push(`boxblur=${radius}:${power}`);
    }

    if (config.vignette) {
        const { angle, intensity } = config.vignette;
        effects.push(`vignette=PI/${angle}:${intensity}`);
    }

    if (config.colorEffect) {
        switch (config.colorEffect) {
            case 'grayscale':
                effects.push('hue=s=0');
                break;
            case 'sepia':
                effects.push(
                    'colorchannelmixer=rr=0.393:rg=0.769:rb=0.189:gr=0.349:gg=0.686:gb=0.168:br=0.272:bg=0.534:bb=0.131'
                );
                break;
            // Add more color effects as needed
        }
    }

    return effects.join(',');
}

module.exports = {
    buildVideoEffects,
};
