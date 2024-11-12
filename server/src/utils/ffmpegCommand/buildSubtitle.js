// src/utils/commands/handleSubtitles.js

/**
 * Builds subtitle filters based on the provided subtitle configuration.
 * @param {Object} subtitleConfig - Subtitle configuration.
 * @param {Function} colorToHex - Function to convert color names to hex.
 * @param {Function} alignment - Function to map position to alignment.
 * @returns {string} Subtitle filter string.
 */
function buildSubtitles(subtitleConfig, colorToHex, alignmentFunc) {
    const {
        filePath,
        fontSize = 24,
        color = 'white',
        backgroundColor,
        position = 'bottom',
    } = subtitleConfig;

    const subtitleFilter = `subtitles=${filePath}:force_style='Fontsize=${fontSize},PrimaryColour=&H${colorToHex(
        color
    )}&,BackColour=&H${colorToHex(
        backgroundColor || '000000'
    )}&,Alignment=${alignmentFunc(position)}'`;

    return subtitleFilter;
}

module.exports = buildSubtitles;
