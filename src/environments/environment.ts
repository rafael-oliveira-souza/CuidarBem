// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { environment as prod } from "./environment.prod";

const serverBackend = "http://localhost:3300";

export const environment = {
  production: false,
  apiCrescerBemServer: prod.apiCrescerBemServer,
  apiServer: prod.serverBackend,
  secretKey: prod.secretKey,
  mercadoPago: prod.mercadoPago,
  mercadoPagoToken: prod.mercadoPagoToken,
  whatsapp: prod.whatsapp,
  pix: prod.pix,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
