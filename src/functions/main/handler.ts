import { createCanvas, loadImage } from '@napi-rs/canvas';
import _ from 'lodash';
import Twitter from 'twitter';
import { middyfy } from '@libs/lambda';
import { Student, allStudents } from 'src/students/list';

const imageFileDir = `${process.cwd()}/src/students/images`;

const twitterClient = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const selectFourStudents = (students: Student[]) =>
  _.shuffle(students)
    .slice(0, 4)
    .sort((a, b) => (a.id !== b.id ? (a.id < b.id ? -1 : 1) : 0));

const createText = (students: Student[]) => {
  const studentsStr = students.reduce(
    (prev, { name }) => `${prev}　${name}\n`,
    ''
  );
  return `今週 登校するのは\n　\n${studentsStr}　\nと予想します\n#さくら学院 #FRESHマンデー`;
};

const concatImages = async (students: Student[]) => {
  const images = await Promise.all(
    students.map(
      async (student) => await loadImage(`${imageFileDir}/${student.name}.jpg`)
    )
  );
  const width = images.reduce((prev, image) => prev + image.width, 0);
  const height = Math.max(...images.map((image) => image.height));
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  let x = 0;
  images.forEach((image) => {
    ctx.drawImage(image, x, 0);
    x += image.width;
  });
  return canvas.toBuffer('image/png');
};

const tweet = (text: string, image: Buffer) => {
  twitterClient.post('media/upload', { media: image }, (error, media) => {
    if (error) console.error(error);
    const status = {
      status: text,
      media_ids: media.media_id_string,
    };
    twitterClient.post('statuses/update', status, (error, tweet) => {
      if (error) console.error(error);
      console.info({ tweet });
    });
  });
};

const main = async () => {
  const fourStudents = selectFourStudents(allStudents);
  const text = createText(fourStudents);
  const image = await concatImages(fourStudents);
  tweet(text, image);
};

export const handler = middyfy(main);
