export const serviceWorkerNotSupported = 'Your browser does not support serviceWorker!!!';
export const serviceWorkerServerFile = 'sw.js';

export default class SW {
  public static sw: ServiceWorkerContainer;

  public static setServiceWorker() {
    if (!SW.sw) {
      SW.sw = navigator.serviceWorker;
      if (SW.sw) {
        addEventListener('load', () => {
          SW.sw.register(serviceWorkerServerFile)
          .then(() => {
            console.log('ServiceWorker registered succesfully!');
          })
          .catch((error) => console.log('ServiceWorker register error:', error));
        });
      } else {
        console.log(serviceWorkerNotSupported);
      }
    }
  }
}

// (() => {
//   const serviceWorker = window.navigator.serviceWorker;
//   if (serviceWorker) {
//     serviceWorker.register('sw.js')
//     .then((registration) => {
//       console.log('serviceWorker registration success', registration);
//       let sw;
//       if (registration.installing) {
//         sw = registration.installing;
//         console.log('serviceWorker state: ', 'installing');
//       } else if (registration.waiting) {
//         sw = registration.installing;
//         console.log('serviceWorker state: ', 'waiting');
//       } else if (registration.active) {
//         sw = registration.active;
//         console.log('serviceWorker state: ', 'active');
//       }
//
//       if (sw) {
//         console.log('sw state: ', sw.state);
//         sw.addEventListener('statechange', (e) => {
//           console.log('statechange', e.target.state);
//         });
//       }
//     })
//     .catch((error) => {
//       console.log('serviceWorker failed to register', error);
//     });
//     window.addEventListener('message', (message) => {
//       console.log('message here serviceWorker:', message);
//     }, false);
//   } else {
//     console.log('Your browser does not support serviceWorker!!!');
//   }
// })();
