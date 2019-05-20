// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD04OZ8yUpz6QHD3Dg3BtK-FZO7YXsaa1A",
    authDomain: "handshake-d.firebaseapp.com",
    databaseURL: "https://handshake-d.firebaseio.com",
    projectId: "handshake-d",
    storageBucket: "handshake-d.appspot.com",
    messagingSenderId: "1042946851752"
  },
  googleClientID: "1042946851752-rksjjcojgpn605hm8keoj25n5dhf6dht.apps.googleusercontent.com",
  nodeUrl: "http://localhost:3000"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
