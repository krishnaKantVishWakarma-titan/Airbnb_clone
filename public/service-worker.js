/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

// importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// importScripts(
//   "/precache-manifest.b942d7745b31a295cf065bf6f25cf514.js"
// );

// workbox.clientsClaim();

// /**
//  * The workboxSW.precacheAndRoute() method efficiently caches and responds to
//  * requests for URLs in the manifest.
//  * See https://goo.gl/S9QRab
//  */
// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// workbox.routing.registerNavigationRoute("/index.html", {
  
//   blacklist: [/^\/_/,/\/[^/]+\.[^/]+$/],
// });
self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('New notification', data);
  const options = {
    body: data.body,
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options),
    self.addEventListener('notificationclick', function (event) {
      // event.notification.close()

      var notificationURL = 'http://13.233.154.141/NewTraveller?id=${data.roomDetails.user}&uname=${data.roomDetails.user_name}&room=${data.roomDetails.room}&pic=${data.roomDetails.user_pic}';

      event.notification.close();


    // Example: Open window after 3 seconds.
    // (doing so is a terrible user experience by the way, because
    //  the user is left wondering what happens for 3 seconds.)
    var promise = new Promise(function(resolve) {
        setTimeout(resolve, 3000);
    }).then(function() {
        // return the promise returned by openWindow, just in case.
        // Opening any origin only works in Chrome 43+.
        return clients.openWindow(notificationURL);
    });

    // Now wait for the promise to keep the permission alive.
    event.waitUntil(promise);
      
      // windowClient.focus(`http://13.233.154.141/NewTraveller?id=${data.roomDetails.user}&uname=${data.roomDetails.user_name}&room=${data.roomDetails.room}&pic=${data.roomDetails.user_pic}`)

      //  http://13.233.154.141/NewTraveller?id=${data.roomDetails.user}&uname=${data.roomDetails.user_name}&room=${data.roomDetails.room}&pic=${data.roomDetails.user_pic}
    })
  )
})

// http://localhost:3000/NewTraveller?id=3&uname=kk&room=2nc3&pic=https://checkin-images-upload.s3.ap-south-1.amazonaws.com/fd86011c-1791-4454-ab61-56e89022c9f6IMG_20190314_121121.jpg