import img128 from '../img/icon-128.png'
import '../img/icon-48.png'
import '../img/icon-16.png'

import {
    request
} from './client'
import store from './store'
import {
    fetchOptions
} from './actions';

chrome.contextMenus.create({
    title: 'Download with Transmission',
    contexts: ['link', 'selection'],
    onclick: (info) => {
        const args = {
            filename: info.linkUrl || info.selectionText
        }
        const notificationID = 'transmission-context-menu'
        const notificationOptions = {
            title: 'Transmission Context Menu',
            type: 'basic',
            iconUrl: img128,
        }

        chrome.notifications.clear(notificationID)

        store
            .dispatch(fetchOptions())
            .then(() => request('torrent-add', args))
            .then(() => {
                chrome.notifications.create(notificationID, {
                    ...notificationOptions,
                    message: 'Torrent successfully added.',
                })
            }, (error) => {
                chrome.notifications.create(notificationID, {
                    ...notificationOptions,
                    message: error.toString()
                })
            })
    }
})
