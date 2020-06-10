// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig:  {
    apiKey: 'AIzaSyD9hnrf2YmkNWUFLx3v7k2lCMi38juq5gE',
    authDomain: 'event-spacer.firebaseapp.com',
    databaseURL: 'https://event-spacer.firebaseio.com',
    projectId: 'event-spacer',
    storageBucket: 'event-spacer.appspot.com',
    messagingSenderId: '364947208173',
    appId: '1:364947208173:web:312a1c811b727ab45b99e4'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
