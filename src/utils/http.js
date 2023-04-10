
import requstPromise from 'request-promise'
import { removeUndefinedKey } from 'utils/tools'

requstPromise.debug = false

export default class Http {
  static get (url, headers = {}, qs = {}, logRequest, logResult) {
    for (let [key, value] of Object.entries(qs)) {
      if (Array.isArray(value) || typeof value === 'object') {
        qs[key] = JSON.stringify(value)
      } else {
        qs[key] = value
      }
    }
    return requestReturnJson({ url, method: 'GET', headers, qs }, logRequest, logResult)
  }

  static post (url, headers, logRequest, logResult) {
    return requestReturnJson({ url, method: 'POST', headers }, logRequest, logResult)
  }

  static postForm (url, form, headers, logRequest, logResult) {
    return requestReturnJson({
      url, method: 'POST', headers, form
    }, logRequest, logResult)
  }

  static postJson (url, body, headers, logRequest, logResult) {
    return requestReturnJson({ url, method: 'POST', headers, body }, logRequest, logResult)
  }

  static putJson (url, body, logRequest, logResult) {
    return requestReturnJson({ url, method: 'PUT', body }, logRequest, logResult)
  }

  static deleteJson (url, qs, logRequest, logResult) {
    return requestReturnJson({ url, method: 'DELETE', qs }, logRequest, logResult)
  }
}

async function requestReturnJson (options, logRequest, logResult) {
  try {
    let {
      url, method, headers, qs, form, body
    } = options
    if (form) {
      headers = { ...headers, 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    let requestOptions = {
      method, uri: url, headers, qs, form, body, json: true
    }
    requestOptions = removeUndefinedKey(requestOptions)
    console.log('requestOptions..', JSON.stringify(requestOptions))
    let result = await requstPromise(requestOptions)
    if (logResult) {
      consoleLog('requestReturnJson result', JSON.stringify(result))
    }
    // console.log('requestReturnJson..', JSON.stringify(result))
    return result
  } catch (err) {
    if (logResult) {
      consoleLog('requestReturnJson err', JSON.stringify(err.error))
    }
    return { err: err.error }
  }
}