// This is the entry point of the application for handling video files.
// It initializes the application and sets up necessary configurations or imports.

import { VideoHandler } from './handlers/videoHandler.js';
import path from 'path';


const videoHandler = new VideoHandler();

// Example with proper file object
const videoFile = {
  name: 'last_vegas_1997.mp4',
  path: path.resolve('src/dump/las_vegas_1997.mp4')
};
const fileNames = await videoHandler.readDirectory('./src/dump');
console.log("🚀 ~ fileNames:", fileNames);
videoHandler.makeDirectory(fileNames);
// videoHandler.splitVideo(videoFile, '00:00:00', '00:00:30', './output/split_clip.mp4');