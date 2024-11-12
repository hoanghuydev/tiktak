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
            let command = ffmpeg(inputPath);

            // Handle Cutting
            if (config.cutVideo) {
                command = command
                    .setStartTime(config.cutVideo.start)
                    .setDuration(config.cutVideo.end - config.cutVideo.start);
            }

            // Handle Merging
            if (config.mergeWith) {
                // For simplicity, assuming mergeWith is another video to concatenate
                // Advanced merging (e.g., side by side) requires more complex filtergraphs
                command = ffmpeg()
                    .input(inputPath)
                    .input(config.mergeWith.filePath)
                    .on('error', (err) => reject(err))
                    .on('end', () => resolve())
                    .mergeToFile(outputPath, path.dirname(outputPath));
                return;
            }

            // Handle Filters
            if (config.filter) {
                const filters = [];

                if (config.filter.eq) {
                    const {
                        brightness = 0,
                        contrast = 1,
                        saturation = 1,
                        gamma = 1,
                    } = config.filter.eq;
                    filters.push(
                        `eq=brightness=${brightness}:contrast=${contrast}:saturation=${saturation}:gamma=${gamma}`
                    );
                }

                if (config.filter.hue) {
                    const { saturation = 1 } = config.filter.hue;
                    filters.push(`hue=s=${saturation}`);
                }

                if (config.filter.unsharp) {
                    const {
                        luma_msize_x = 5,
                        luma_msize_y = 5,
                        luma_amount = 1,
                    } = config.filter.unsharp;
                    filters.push(
                        `unsharp=luma_msize_x=${luma_msize_x}:luma_msize_y=${luma_msize_y}:luma_amount=${luma_amount}`
                    );
                }

                if (config.filter.boxblur) {
                    const { luma_radius = 2, luma_power = 1 } =
                        config.filter.boxblur;
                    filters.push(
                        `boxblur=luma_radius=${luma_radius}:luma_power=${luma_power}`
                    );
                }

                if (config.filter.colorchannelmixer) {
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
                    } = config.filter.colorchannelmixer;
                    filters.push(
                        `colorchannelmixer=rr=${rr}:rg=${rg}:rb=${rb}:gr=${gr}:gg=${gg}:gb=${gb}:br=${br}:bg=${bg}:bb=${bb}`
                    );
                }

                if (config.filter.crop) {
                    const {
                        out_w = 640,
                        out_h = 480,
                        x = 0,
                        y = 0,
                    } = config.filter.crop;
                    filters.push(`crop=${out_w}:${out_h}:${x}:${y}`);
                }

                if (config.filter.rotate) {
                    const { angle = '0' } = config.filter.rotate;
                    filters.push(`rotate=${angle}`);
                }

                if (config.filter.fade) {
                    const {
                        type = 'in',
                        start_time = 0,
                        duration = 3,
                    } = config.filter.fade;
                    if (type === 'in') {
                        filters.push(
                            `fade=t=in:st=${start_time}:d=${duration}`
                        );
                    } else {
                        filters.push(
                            `fade=t=out:st=${start_time}:d=${duration}`
                        );
                    }
                }

                if (config.filter.colorEffect) {
                    switch (config.filter.colorEffect) {
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
                    }
                }

                if (filters.length > 0) {
                    command = command.videoFilters(filters.join(','));
                }
            }

            // Handle Effects
            if (config.effect) {
                const effects = [];

                if (config.effect.slowMotion) {
                    const { speed } = config.effect.slowMotion;
                    effects.push(`setpts=${1 / speed}*PTS`);
                }

                if (config.effect.reverse) {
                    effects.push('reverse');
                }

                if (config.effect.zoom) {
                    const { level, duration } = config.effect.zoom;
                    // Example zoom effect: using zoompan
                    effects.push(`zoompan=z='min(${level},zoom+0.001)':d=1`);
                }

                if (config.effect.fade) {
                    const { type, start, duration } = config.effect.fade;
                    effects.push(`fade=t=${type}:st=${start}:d=${duration}`);
                }

                if (config.effect.blur) {
                    const { radius, power } = config.effect.blur;
                    effects.push(`boxblur=${radius}:${power}`);
                }

                if (config.effect.vignette) {
                    const { angle, intensity } = config.effect.vignette;
                    effects.push(`vignette=PI/${angle}:${intensity}`);
                }

                if (config.effect.colorEffect) {
                    switch (config.effect.colorEffect) {
                        case 'grayscale':
                            effects.push('hue=s=0');
                            break;
                        case 'sepia':
                            effects.push(
                                'colorchannelmixer=rr=0.393:rg=0.769:rb=0.189:gr=0.349:gg=0.686:gb=0.168:br=0.272:bg=0.534:bb=0.131'
                            );
                            break;
                    }
                }

                if (effects.length > 0) {
                    command = command.videoFilters(effects.join(','));
                }
            }

            // Handle Aspect Ratio
            if (config.aspectRatio) {
                command = command.size(config.aspectRatio);
            }

            // Handle Transitions (Simplified Example)
            if (config.transition) {
                // Transitions between multiple input videos would require more complex handling
                // Here, we demonstrate a fade transition for a single video
                const { type, duration, direction, easing } = config.transition;
                switch (type) {
                    case 'fade':
                        command = command.videoFilters(
                            `fade=t=in:st=0:d=${duration},fade=t=out:st=${
                                command.ffprobeData.format.duration - duration
                            }:d=${duration}`
                        );
                        break;
                    case 'slide':
                        // Slide transitions require defining keyframes or using overlay with moving position
                        // This is a placeholder
                        break;
                    case 'wipe':
                        // Wipe transitions also require complex filtergraphs
                        // This is a placeholder
                        break;
                    case 'zoom':
                        // Zoom transitions can be handled with zoompan or other filters
                        // This is a placeholder
                        break;
                }
            }

            // Handle Text Overlays
            if (config.text && config.text.length > 0) {
                config.text.forEach((textConfig, index) => {
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

                    // Calculate opacity in filter
                    const drawtext = `drawtext=text='${content}':x=${
                        position.split(':')[0]
                    }:y=${
                        position.split(':')[1]
                    }:fontsize=${fontSize}:fontcolor=${color}@${opacity}:font='Arial'`;

                    command = command.videoFilters(drawtext);

                    // Handle Text Animations (Simplified)
                    if (animation) {
                        switch (animation) {
                            case 'fadeIn':
                                command =
                                    command.videoFilters(`fade=t=in:st=0:d=1`);
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

                    // Handle Duration
                    if (duration) {
                        // Implement duration logic if necessary
                    }
                });
            }

            // Handle Overlays
            if (config.overlay && config.overlay.length > 0) {
                config.overlay.forEach((overlayConfig, index) => {
                    const {
                        imagePath,
                        position,
                        opacity = 1,
                        scale = 1,
                        rotation = 0,
                    } = overlayConfig;

                    const overlayFilter = `movie=${imagePath}[overlay${index}];[in][overlay${index}] overlay=${
                        position.split(':')[0]
                    }:${
                        position.split(':')[1]
                    }:format=auto,format=yuv420p[out]`;

                    command = command.complexFilter([overlayFilter]);
                });
            }

            // Handle Subtitles
            if (config.subtitle) {
                const {
                    filePath,
                    fontSize = 24,
                    color = 'white',
                    backgroundColor,
                    position = 'bottom',
                } = config.subtitle;
                const subtitleFilter = `subtitles=${filePath}:force_style='Fontsize=${fontSize},PrimaryColour=&H${colorToHex(
                    color
                )}&,BackColour=&H${colorToHex(
                    backgroundColor || '000000'
                )}&,Alignment=${alignment(position)}'`;
                command = command.videoFilters(subtitleFilter);
            }

            // Handle Audio
            if (config.audio) {
                if (config.audio.muteSound) {
                    command = command.noAudio();
                }

                if (config.audio.addSound) {
                    const {
                        filePath,
                        startAt,
                        volume = 1,
                    } = config.audio.addSound;
                    command = command
                        .input(filePath)
                        .audioFilters(`volume=${volume}`)
                        .audioFilter(
                            `adelay=${startAt * 1000}|${startAt * 1000}`
                        );
                }

                if (config.audio.adjustVolume) {
                    command = command.audioFilters(
                        `volume=${config.audio.adjustVolume}`
                    );
                }

                if (config.audio.fadeInOut) {
                    const {
                        fadeIn,
                        fadeOut,
                        duration = 3,
                    } = config.audio.fadeInOut;
                    if (fadeIn) {
                        command = command.audioFilters(
                            `afade=t=in:st=0:d=${duration}`
                        );
                    }
                    if (fadeOut) {
                        // Requires knowing audio duration
                        // Placeholder for fade out
                    }
                }
            }

            // Handle Zoom (Post-processing)
            if (config.effect && config.effect.zoom) {
                const { level, duration } = config.effect.zoom;
                command = command.videoFilters(`zoompan=z='zoom+0.001':d=1`);
            }

            // Set Aspect Ratio
            if (config.aspectRatio) {
                command = command.aspect(config.aspectRatio);
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
    }

    /**
     * Converts color names to hexadecimal format.
     * @param colorName Name of the color (e.g., "white", "black").
     * @returns Hexadecimal color string without the '#' symbol.
     */
    colorToHex(colorName) {
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
     * @param position Position keyword ('bottom', 'top', 'center').
     * @returns Alignment number as per ASS subtitle format.
     */
    alignment(position) {
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
}
export default new FfmpegUtil();
