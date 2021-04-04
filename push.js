var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAMKO3EMWXLjNx4KOM-aHvAbTO_ljW-JfJMpq85RhrG5i4S8LVvlNA6dZDKEOree4RAj-HQR9l-kWMLgXzd-lvc",
   "privateKey": "xLNsARoPvUStT86OB85KS0i_4e4JGsS5WuF24jRX6mM"
};
 
 
webPush.setVapidDetails(
   'mailto:mahib.arib@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cVn4mZIjGdI:APA91bHfnWnpR2k003W9Xq0sQglnzRrsXf2TTQt0MBuuRThSssryaA-HiQ-wHKwI2S6Gg4SADHbf_D6c2aGDw8x8qU08POG8_RoxeYLLLB4VDI2Rfxm8IRxP73g7WvYH_qldCu0PO6hk",
   "keys": {
       "p256dh": "BP/6zSALX3fXTZjtykELFA3PISwbJjitZMHYGUHjBf0tQIwHD3HdOIK5KoDjR3Vd3OaegCBagPl0iTVvU44xfow=",
       "auth": "FQraRLjOtCrUUO7rubjM7w=="
   }
};
var payload = 'Selamat datang di EPL APP';
 
var options = {
   gcmAPIKey: '1065716901849',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
