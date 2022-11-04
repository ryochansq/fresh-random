import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  environment: {
    CONSUMER_KEY: '${env:CONSUMER_KEY}',
    CONSUMER_SECRET: '${env:CONSUMER_SECRET}',
    ACCESS_TOKEN_KEY: '${env:ACCESS_TOKEN_KEY}',
    ACCESS_TOKEN_SECRET: '${env:ACCESS_TOKEN_SECRET}',
  },
  events: [
    {
      schedule: {
        name: 'fresh-random',
        rate: ['cron(0 3 ? * MON *)'],
      },
    },
  ],
};
