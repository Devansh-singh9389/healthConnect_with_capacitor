import { registerPlugin } from '@capacitor/core';

import type { HealthconnectPlugin } from './definitions';

const Healthconnect = registerPlugin<HealthconnectPlugin>('Healthconnect', {
  web: () => import('./web').then((m) => new m.HealthconnectWeb()),
});

export * from './definitions';
export { Healthconnect };
export * from './healthConnectUtils';

