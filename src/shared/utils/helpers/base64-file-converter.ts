import { Readable } from 'stream';
import * as fs from 'fs';

export const convertBase64ToFile = async (
  base64String: string,
  path: string,
  fileName: string
): Promise<boolean> => {
  try {
    const fileBuffer = Buffer.from(base64String, 'base64');
    const stream = new Readable();
    stream.push(fileBuffer);
    stream.push(null);
    stream.pipe(fs.createWriteStream(`${path}/${fileName}`));
    await new Promise((resolve, reject) => {
      stream.on('end', () => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
      stream.on('error', (error) => {
        reject(error);
      });
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
