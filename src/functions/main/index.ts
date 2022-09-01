import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      schedule: {
        name: 'fresh-random',
        rate: ['cron(0 3 ? * MON *)'],
      },
    },
  ],
};
