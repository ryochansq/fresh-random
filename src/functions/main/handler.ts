import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const main = async (event) => {
  return formatJSONResponse({
    message: `ほげhoge`,
    event,
  });
};

export const handler = middyfy(main);
