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

const concatImages = (students: string[]): any => {
  (async () => {
    const imagePaths = students.map((student) => `${student}.jpg`);
    const imageAttrs = [];

    // 連結する画像の情報取得
    const promises = [];
    const imagePromise = (path) =>
      new Promise(async (resolve) => {
        const image = await sharp(path);
        let width = 0,
          height = 0;
        await image
          .metadata()
          .then((meta) => ([width, height] = [meta.width, meta.height]));
        const buf = await image.toBuffer();
        resolve({ width, height, buf });
      });
    imagePaths.forEach((path) => promises.push(imagePromise(path)));
    await Promise.all(promises).then((values) => {
      values.forEach((value) => imageAttrs.push(value));
    });

    // outputする画像の設定
    const outputImgWidth = imageAttrs.reduce((acc, cur) => acc + cur.width, 0);
    const outputImgHeight = Math.max(...imageAttrs.map((v) => v.height));
    let totalLeft = 0;
    const compositeParams = imageAttrs.map((image) => {
      const left = totalLeft;
      totalLeft += image.width;
      return {
        input: image.buf,
        gravity: 'northwest',
        left: left,
        top: 0,
      };
    });

    // 連結処理
    sharp({
      create: {
        width: outputImgWidth,
        height: outputImgHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      },
    })
      .composite(compositeParams)
      .toFile('output.png');
  })();
};

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
