const updateOption = ({
    field,
    value
}) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            value = value || initialState[field]
            chrome.storage.sync.set({
                [field]: value
            }, () => {
                dispatch({
                    type: 'UPDATE',
                    field,
                    value
                })
                resolve()
            })
        })
    }
}

const updateSessionId = sessionId => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({
                sessionId
            }, () => {
                dispatch({
                    type: 'SET_SESSION',
                    sessionId,
                })
                resolve(sessionId)
            })
        })
    }
}

const fetchOptions = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(null, options => {
                dispatch({
                    type: 'INIT',
                    options,
                })
                resolve(getState())
            })
        })
    }
}

export {
    updateOption,
    updateSessionId,
    fetchOptions
}
