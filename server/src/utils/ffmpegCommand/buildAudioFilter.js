// src/utils/commands/handleAudio.js

/**
 * Builds audio filter string based on the provided audio configuration.
 * @param {Object} audioConfig - Audio configuration.
 * @returns {Object} Audio filters and inputs.
 */
function buildAudioFilters(audioConfig) {
    const audioFilters = [];
    const audioInputs = [];

    if (audioConfig.muteSound) {
        audioFilters.push('anull');
    }

    if (audioConfig.addSound) {
        const { filePath, startAt, volume = 1 } = audioConfig.addSound;
        audioInputs.push({
            input: filePath,
            filter: `volume=${volume},adelay=${startAt * 1000}|${
                startAt * 1000
            }`,
        });
    }

    if (audioConfig.adjustVolume) {
        audioFilters.push(`volume=${audioConfig.adjustVolume}`);
    }

    if (audioConfig.fadeInOut) {
        const { fadeIn, fadeOut, duration = 3 } = audioConfig.fadeInOut;
        if (fadeIn) {
            audioFilters.push(`afade=t=in:st=0:d=${duration}`);
        }
        if (fadeOut) {
            // Placeholder for audio fade out
            audioFilters.push(`afade=t=out:st=0:d=${duration}`); // Adjust st accordingly
        }
    }

    return { audioFilters: audioFilters.join(','), audioInputs };
}

module.exports = buildAudioFilters;
