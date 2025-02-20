import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import util from 'util';
import _ from 'lodash';

const readdir = util.promisify(fs.readdir);

export class VideoHandler {

  //Read Video Files in Dump Directory
  async readDirectory(directoryPath) {
    console.log(`Reading Directory: ${directoryPath}`);
    
    const fileNames = [];

    try {
      const files = await readdir(directoryPath);
      files.forEach(file => {
        console.log(`Found file: ${file}`);
        fileNames.push(file);
      });
    } catch (err) {
      console.error('Error reading directory:', err);
    }
    console.log("🚀 ~ VideoHandler ~ fs.readdir ~ files:", fileNames);
    return fileNames
  }

  makeDirectory(fileNames) {
    fileNames.forEach(fileName => {
      // Ensure the output directory exists
      if (!fs.existsSync(`output/${fileName}`)) {
        console.log(`Making Directory for: ${fileName}`);
        const temp = _.replace(fileName, '.mp4', '');
        fs.mkdirSync(`output/${temp}`, { recursive: true });
      }
      else {
        console.log(`Directory already exists for: ${fileName}`);
      }
    });
  }

  splitVideo(file, startTime, duration, outputPath) {
    console.log(`Splitting video: ${file.name} from ${startTime} for ${duration} seconds`);
    
    // Ensure the output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    ffmpeg(file.path)
      .setStartTime(startTime)
      .setDuration(duration)
      .output(outputPath)
      .on('end', () => {
        console.log('Splitting finished!');
      })
      .on('error', (err) => {
        console.error('Error splitting video:', err);
      })
      .run();
  }
}