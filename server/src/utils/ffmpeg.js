import { alignment, colorToHex } from './ffmpegCommand/helper';

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const fs = require('fs');
const path = require('path');
class FfmpegUtil {
    async captureVideo(videoPath, res) {
        return new Promise(async (resolve, reject) => {
            const outputPath = path.join(
                __dirname,
                '..',
                'output',
                `frame.jpg`
            );
            if (!fs.existsSync(path.dirname(outputPath))) {
                fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            }
            await ffmpeg(videoPath)
                .on('end', () => {
                    console.log('Captured image from video');
                    fs.readFile(outputPath, (err, data) => {
                        if (err) {
                            console.log('Error reading the image file:', err);
                            return res
                                .status(500)
                                .send('Error reading the image file');
                        }
                        fs.unlink(outputPath, (err) => {
                            if (err) {
                                console.log(
                                    'Error deleting the output image file:',
                                    err
                                );
                                return res
                                    .status(500)
                                    .send('Error reading the image file');
                            }
                        });
                        const bufferImage = data;
                        resolve(bufferImage);
                    });
                })
                .on('error', (err) => {
                    console.log('Error processing video:', err);
                    return res.status(500).send('Error processing video');
                })
                .screenshots({
                    count: 1,
                    folder: path.dirname(outputPath),
                    filename: path.basename(outputPath),
                });
        });
    }
    async buildCommand(inputPath, outputPath, config) {
        return new Promise((resolve, reject) => {
            // First, get video duration using ffprobe
            ffprobe(inputPath, (err, metadata) => {
                if (err) {
                    console.error('Error fetching video metadata:', err);
                    return reject(err);
                }

                const videoDuration = metadata.format.duration;

                // Build ffmpeg configuration
                const ffmpegConfig = buildFfmpegConfig(
                    config,
                    colorToHex,
                    alignment,
                    videoDuration
                );

                let command = ffmpeg(inputPath);

                // Handle Cutting
                if (config.cutVideo) {
                    command = command
                        .setStartTime(config.cutVideo.start)
                        .setDuration(
                            config.cutVideo.end - config.cutVideo.start
                        );
                }

                // Handle Merging
                if (config.mergeWith) {
                    // Assuming mergeWith is another video to concatenate
                    // For concatenation, use the concat demuxer or filter
                    command = ffmpeg()
                        .input(inputPath)
                        .input(config.mergeWith.filePath)
                        .on('error', (err) => reject(err))
                        .on('end', () => resolve())
                        .mergeToFile(outputPath, path.dirname(outputPath));
                    return;
                }

                // Handle Additional Inputs (e.g., audio additions)
                if (ffmpegConfig.additionalInputs.length > 0) {
                    ffmpegConfig.additionalInputs.forEach((input) => {
                        command = command
                            .input(input.input)
                            .audioFilters(input.filter);
                    });
                }

                // Apply video filters
                if (ffmpegConfig.videoFilters) {
                    command = command.videoFilters(ffmpegConfig.videoFilters);
                }

                // Apply audio filters
                if (ffmpegConfig.audioFilters) {
                    command = command.audioFilters(ffmpegConfig.audioFilters);
                }

                // Handle Aspect Ratio
                if (config.aspectRatio) {
                    command = command.size(config.aspectRatio);
                }

                // Handle Output Format
                if (config.exportType) {
                    command = command.format(config.exportType);
                }

                // Set Output Path
                command = command.output(outputPath);

                // Execute Command
                command
                    .on('start', (cmdLine) => {
                        console.log('Spawned Ffmpeg with command: ' + cmdLine);
                    })
                    .on('progress', (progress) => {
                        console.log(`Processing: ${progress.percent}% done`);
                    })
                    .on('error', (err, stdout, stderr) => {
                        console.error('Error processing video:', err.message);
                        console.error('ffmpeg stderr:', stderr);
                        reject(err);
                    })
                    .on('end', () => {
                        console.log('Video processing finished successfully');
                        resolve();
                    })
                    .run();
            });
        });
    }

    /**
     * Converts color names to hexadecimal format.
     * @param colorName Name of the color (e.g., "white", "black").
     * @returns Hexadecimal color string without the '#' symbol.
     */
    colorToHex(colorName) {
        return colorToHex(colorName);
    }

    /**
     * Maps position keywords to subtitle alignment values.
     * @param position Position keyword ('bottom', 'top', 'center').
     * @returns Alignment number as per ASS subtitle format.
     */
    alignment(position) {
        return alignment(position);
    }
}
export default new FfmpegUtil();
