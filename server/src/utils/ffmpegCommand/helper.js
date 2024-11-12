/**
 * Converts color names to hexadecimal format.
 * @param {string} colorName - Name of the color (e.g., "white", "black").
 * @returns {string} Hexadecimal color string without the '#' symbol.
 */
function colorToHex(colorName) {
    const colors = {
        white: 'FFFFFF',
        black: '000000',
        red: 'FF0000',
        green: '00FF00',
        blue: '0000FF',
        // Add more colors as needed
    };
    return colors[colorName.toLowerCase()] || 'FFFFFF';
}

/**
 * Maps position keywords to subtitle alignment values.
 * @param {string} position - Position keyword ('bottom', 'top', 'center').
 * @returns {number} Alignment number as per ASS subtitle format.
 */
function alignment(position) {
    switch (position) {
        case 'bottom':
            return 2;
        case 'top':
            return 8;
        case 'center':
            return 5;
        default:
            return 2;
    }
}

module.exports = {
    colorToHex,
    alignment,
};
