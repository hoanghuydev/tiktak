// src/utils/commands/handleTextOverlays.js

/**
 * Builds text overlay filters based on the provided text configurations.
 * @param {Array} textConfigs - Array of text overlay configurations.
 * @param {Function} colorToHex - Function to convert color names to hex.
 * @param {Function} alignment - Function to map position to alignment.
 * @returns {string} Combined text overlay filters.
 */
function buildTextOverlays(textConfigs, colorToHex, alignmentFunc) {
    const textFilters = [];

    textConfigs.forEach((textConfig, index) => {
        const {
            content,
            position,
            fontSize = 24,
            color = 'white',
            fontStyle = 'normal',
            opacity = 1,
            animation,
            duration,
        } = textConfig;

        // Construct drawtext filter
        const drawtext = `drawtext=text='${content}':x=${
            position.split(':')[0]
        }:y=${
            position.split(':')[1]
        }:fontsize=${fontSize}:fontcolor=${color}@${opacity}:font='Arial'`;

        textFilters.push(drawtext);

        // Handle Text Animations (Simplified)
        if (animation) {
            switch (animation) {
                case 'fadeIn':
                    textFilters.push(`fade=t=in:st=0:d=1`);
                    break;
                case 'fadeOut':
                    // Requires knowing video duration
                    break;
                case 'slideIn':
                    // Requires keyframe animations
                    break;
                case 'slideOut':
                    // Requires keyframe animations
                    break;
            }
        }

        // Handle Duration if needed
        // Implement duration logic if necessary
    });

    return textFilters.join(',');
}

module.exports = buildTextOverlays;
