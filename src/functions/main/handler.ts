import * as fs from 'fs';
import sharp from 'sharp';
import { middyfy } from '@libs/lambda';

// https://www.nxworld.net/js-array-shuffle.html
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getAllStudents = (): string[] => {
  const path = process.cwd();
  const fileNames = fs.readdirSync(`${path}/src/images`);
  return fileNames.map((name) => name.slice(0, -4)); // 末尾「.jpg」の４文字分を削っている
};

const selectFourStudents = (allStudents: string[]): string[] => {
  const shuffled = shuffle(allStudents);
  return shuffled.slice(0, 4);
};

const concatImages = (students: string[]): any => {};

const tweetImage = (image: any): string => {
  return '';
};

const tweetText = (students: string[], mediaId: string): void => {};

const main = async () => {
  const allStudents = getAllStudents();
  const fourStudents = selectFourStudents(allStudents);
  console.info(fourStudents);
  const image = concatImages(fourStudents);
  const mediaId = tweetImage(image);
  tweetText(fourStudents, mediaId);
};

export const handler = middyfy(main);
