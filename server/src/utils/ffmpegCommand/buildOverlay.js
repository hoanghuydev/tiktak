// src/utils/commands/handleOverlays.js

/**
 * Builds overlay filters based on the provided overlay configurations.
 * @param {Array} overlayConfigs - Array of overlay configurations.
 * @returns {Array} Complex filter array for overlays.
 */
function buildOverlays(overlayConfigs) {
    const overlayFilters = [];

    overlayConfigs.forEach((overlayConfig, index) => {
        const {
            imagePath,
            position,
            opacity = 1,
            scale = 1,
            rotation = 0,
        } = overlayConfig;

        // Example: overlay at specified x:y position with opacity
        // To handle opacity, use the 'format' and 'colorchannelmixer' filters
        const overlayFilter = `
            [0:v][${index + 1}:v] overlay=${position.split(':')[0]}:${
            position.split(':')[1]
        }:format=auto
        `;

        overlayFilters.push(overlayFilter.trim());
    });

    return overlayFilters;
}

module.exports = buildOverlays;
