import ky from 'ky';

import { config } from './';

export const fienta = ky.extend({
  prefixUrl: config.fientaUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Authorization", `Bearer ${config.fientaToken}`);
      },
    ],
  },
});
