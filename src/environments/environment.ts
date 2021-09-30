// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDGI7Pv0_1CePDRcL8Lp-CDO9Qh_ATyeZc",
    authDomain: "doctordata-2d06b.firebaseapp.com",
    projectId: "doctordata-2d06b",
    storageBucket: "doctordata-2d06b.appspot.com",
    messagingSenderId: "661404189322",
    appId: "1:661404189322:web:6c0bbf6ef30fd42cf4a373",
    measurementId: "G-XQFR7J8EB9",
  },
  agora: {
    appId: 'b75a830a11a84a0bbb812fc81aa60860'
  }
};

/* /* ENDPOINTS DESARROLLO */
/* export const API_ENDPOINT = "https://dappapache02.eastus.cloudapp.azure.com/middleware2/api/v2/";
export const API_NOTAS = "https://dappapache02.eastus.cloudapp.azure.com/middleware2/api/v2/mama/";
export const API_IMAGES = "https://dappapache02.eastus.cloudapp.azure.com/middleware2/img/professionals/"; */


export const API_IMAGES = "https://api.aviva.pe/middleware2/img/professionals/";
export const API_ENDPOINT = "https://api.aviva.pe/middleware2/api/v2/";
export const API_NOTAS = "https://api.aviva.pe/middleware2/api/v2/mama";


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
