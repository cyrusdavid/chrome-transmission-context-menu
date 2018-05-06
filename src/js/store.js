import {
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

const initialState = {
    host: 'http://localhost',
    port: 9091,
    endpoint: '/transmission/rpc',
    username: '',
    password: '',
    sessionId: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                ...action.options,
            }

        case 'UPDATE':
            return {
                ...state,
                [action.field]: action.value,
            }

        case 'SET_SESSION':
            return {
                ...state,
                sessionId: action.sessionId,
            }

        default:
            return state
    }
}

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export {
    store as
    default
}
