// src/utils/commands/buildCommand.js

const buildVideoFilters = require('./handleFilters');
const buildVideoEffects = require('./handleEffects');
const buildAudioFilters = require('./handleAudio');
const buildTextOverlays = require('./handleTextOverlays');
const buildOverlays = require('./handleOverlays');
const buildSubtitles = require('./handleSubtitles');
const buildTransitions = require('./handleTransitions');

/**
 * Builds the complete set of filters and configurations for ffmpeg command.
 * @param {Object} config - Configuration object.
 * @param {Function} colorToHex - Helper function to convert color names to hex.
 * @param {Function} alignmentFunc - Helper function to map position to alignment.
 * @param {number} videoDuration - Duration of the video in seconds.
 * @returns {Object} { videoFilters, audioFilters, additionalInputs }
 */
function buildFfmpegConfig(config, colorToHex, alignmentFunc, videoDuration) {
    let videoFilters = [];
    let additionalInputs = [];

    // Handle Filters
    if (config.filter) {
        const filters = buildVideoFilters(config.filter);
        if (filters) videoFilters.push(filters);
    }

    // Handle Effects
    if (config.effect) {
        const effects = buildVideoEffects(config.effect);
        if (effects) videoFilters.push(effects);
    }

    // Handle Transitions
    if (config.transition) {
        const transition = buildTransitions(config.transition, videoDuration);
        if (transition) videoFilters.push(transition);
    }

    // Handle Text Overlays
    if (config.text && config.text.length > 0) {
        const textFilters = buildTextOverlays(
            config.text,
            colorToHex,
            alignmentFunc
        );
        if (textFilters) videoFilters.push(textFilters);
    }

    // Handle Subtitles
    if (config.subtitle) {
        const subtitleFilter = buildSubtitles(
            config.subtitle,
            colorToHex,
            alignmentFunc
        );
        if (subtitleFilter) videoFilters.push(subtitleFilter);
    }

    // Handle Overlays
    if (config.overlay && config.overlay.length > 0) {
        const overlayFilters = buildOverlays(config.overlay);
        if (overlayFilters.length > 0)
            videoFilters = videoFilters.concat(overlayFilters);
        // Add overlay inputs if necessary
    }

    // Handle Audio
    let audioFilters = '';
    if (config.audio) {
        const { audioFilters: af, audioInputs } = buildAudioFilters(
            config.audio
        );
        if (af) audioFilters += af;
        if (audioInputs.length > 0) {
            additionalInputs = additionalInputs.concat(audioInputs);
        }
    }

    return {
        videoFilters: videoFilters.join(','),
        audioFilters,
        additionalInputs,
    };
}

module.exports = buildFfmpegConfig;
