import * as fs from 'fs';
import { middyfy } from '@libs/lambda';

const getAllStudents = (): string[] => {
  const path = process.cwd();
  const filenames = fs.readdirSync(`${path}`);
  console.log({ path, filenames });
  const hoge = require('../../assets/中元すず香.jpg');
  console.info(hoge);
  return [];
};

const select4Students = (allStudents: string[]): string[] => {
  return [];
};

const concatImages = (students: string[]): any => {};

const tweetImage = (image: any): string => {
  return '';
};

const tweetText = (students: string[], imageId: string): void => {};

const main = async () => {
  const allStudents = getAllStudents();
  const students = select4Students(allStudents);
  const image = concatImages(students);
  const imageId = tweetImage(image);
  tweetText(students, imageId);
};

export const handler = middyfy(main);
