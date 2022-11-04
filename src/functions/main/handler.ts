import * as fs from 'fs';
import { middyfy } from '@libs/lambda';
import _ from 'lodash';
import { Student, students } from 'src/students/list';

const imageFileDir = `${process.cwd()}/src/students/images`;

const concatImages = (students: Student[]): any => {
  const imagePaths = students.map((name) => `${imageFileDir}/${name}.jpg`);
};

const tweetImage = (image: any): string => {
  return '';
};

const tweetText = (students: Student[], mediaId: string): void => {};

const main = async () => {
  const fourStudents = _.shuffle(students).slice(0, 4);
  console.info(...fourStudents);
  const image = concatImages(fourStudents);
  const mediaId = tweetImage(image);
  tweetText(fourStudents, mediaId);
};

export const handler = middyfy(main);
