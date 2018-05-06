import superagent from 'superagent'
import store from './store'
import {
    updateSessionId
} from './actions'

const request = (method, args) => {
    const options = store.getState()
    const url = `${options.host}:${options.port}${options.endpoint}`
    const headers = {
        'Content-Type': 'application/json',
        'X-Transmission-Session-Id': options.sessionId,
    }

    return new Promise((resolve, reject) => {
        superagent
            .post(url)
            .set(headers)
            .send({
                method,
                arguments: args
            })
            .auth(options.username, options.password)
            .ok(res => 409 === res.status || 200 === res.status)
            .end((err, response) => {
                if (err) return reject(err)

                if (409 === response.status) {
                    return store
                        .dispatch(updateSessionId(response.headers['x-transmission-session-id']))
                        .then(() => request(method, args))
                        .then(resolve, reject)
                }

                if ('success' === response.body.result) {
                    resolve(response.body)
                } else {
                    reject(response.body.result)
                }
            })
    })
}

export {
    request
}
