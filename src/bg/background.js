;(function () {
  'use strict';
  /*globals chrome:false*/

  var settings = new window.Store('settings', {
      // defaults
      port: 52259,
      endpoint: '/transmission/rpc'
    }),
    store = settings.toObject(),
    sessionId = '';

  chrome.contextMenus.create({
    title: 'Download with Transmission',
    contexts: ['link'],
    onclick: function sendTorrent(e) {
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          method: 'torrent-add',
          arguments: {
            filename: e.linkUrl
          }
        }),
        dataType: 'json',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-Transmission-Session-Id', sessionId);
          if (store.hasOwnProperty('username') &&
              store.hasOwnProperty('password'))
            xhr.setRequestHeader(
              'Authorization',
              'Basic ' + btoa(store.username + ':' + store.password)
            );
        },
        url: store.host + ':' + store.port + store.endpoint,
        error: function(err) {
          if (err.status === 409) {
            sessionId = err.getResponseHeader('X-Transmission-Session-Id');
            sendTorrent(e);
          } else {
            console.log(err);
            chrome.notifications.create('error', {
              title: 'Transmission Context Menu',
              type: 'basic',
              iconUrl: 'icons/icon128.png',
              message: 'Error: ' + err.statusText
            }, function() {});
          }
        },
        success: function(res) {
          chrome.notifications.create('success', {
            title: 'Transmission Context Menu',
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            message: 'Torrent ' +
                     (res.result === 'success' ?
                      'sucessfully added.' :
                      'failed to be added.')
          }, function() {});
        }
      });
    }
  });
}());
