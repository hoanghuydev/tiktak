/**
 * Builds video filter string based on the provided filter configuration.
 * @param {Object} config - Filter configuration.
 * @returns {string} Combined video filters.
 */
function buildVideoFilters(config) {
    const filters = [];

    if (config.eq) {
        const {
            brightness = 0,
            contrast = 1,
            saturation = 1,
            gamma = 1,
        } = config.eq;
        filters.push(
            `eq=brightness=${brightness}:contrast=${contrast}:saturation=${saturation}:gamma=${gamma}`
        );
    }

    if (config.hue) {
        const { saturation = 1 } = config.hue;
        filters.push(`hue=s=${saturation}`);
    }

    if (config.unsharp) {
        const {
            luma_msize_x = 5,
            luma_msize_y = 5,
            luma_amount = 1,
        } = config.unsharp;
        filters.push(
            `unsharp=luma_msize_x=${luma_msize_x}:luma_msize_y=${luma_msize_y}:luma_amount=${luma_amount}`
        );
    }

    if (config.boxblur) {
        const { luma_radius = 2, luma_power = 1 } = config.boxblur;
        filters.push(
            `boxblur=luma_radius=${luma_radius}:luma_power=${luma_power}`
        );
    }

    if (config.colorchannelmixer) {
        const {
            rr = 0.393,
            rg = 0.769,
            rb = 0.189,
            gr = 0.349,
            gg = 0.686,
            gb = 0.168,
            br = 0.272,
            bg = 0.534,
            bb = 0.131,
        } = config.colorchannelmixer;
        filters.push(
            `colorchannelmixer=rr=${rr}:rg=${rg}:rb=${rb}:gr=${gr}:gg=${gg}:gb=${gb}:br=${br}:bg=${bg}:bb=${bb}`
        );
    }

    if (config.crop) {
        const { out_w = 640, out_h = 480, x = 0, y = 0 } = config.crop;
        filters.push(`crop=${out_w}:${out_h}:${x}:${y}`);
    }

    if (config.rotate) {
        const { angle = '0' } = config.rotate;
        filters.push(`rotate=${angle}`);
    }

    if (config.fade) {
        const { type = 'in', start_time = 0, duration = 3 } = config.fade;
        if (type === 'in') {
            filters.push(`fade=t=in:st=${start_time}:d=${duration}`);
        } else {
            filters.push(`fade=t=out:st=${start_time}:d=${duration}`);
        }
    }

    if (config.colorEffect) {
        switch (config.colorEffect) {
            case 'grayscale':
                filters.push('hue=s=0');
                break;
            case 'sepia':
                filters.push(
                    'colorchannelmixer=rr=0.393:rg=0.769:rb=0.189:gr=0.349:gg=0.686:gb=0.168:br=0.272:bg=0.534:bb=0.131'
                );
                break;
            case 'negative':
                filters.push('negate');
                break;
            case 'vintage':
                filters.push('curves=vintage');
                break;
            // Add more color effects as needed
        }
    }

    return filters.join(',');
}

module.exports = {
    buildVideoFilters,
};
