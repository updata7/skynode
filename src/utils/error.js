
export const HTTP_STATUS = {
    SUC: 200,
    InvalidParam: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500,
    
  }
  
  export const CODES = {
    NOT_FOUND: '',
    INVALID_PARAMS: '',
    INTERNAL_SERVER_ERROR: '',
  
    TOKEN_EXPIRED: '',
    TOKEN_INVALID: '',

    USER_NOT_EXISTS: '',
    DATA_UNIQUENESS_CONFLICT: ''
  }
  
  for (const key in CODES) {
    CODES[key] = key
  }
  
  export function assert (condition, status, errorCode, details) {
    if (condition) {
      const detailMsg = typeof details === 'object' ? JSON.stringify(details || {}) : details
      const err = new Error(detailMsg)
      err.errorCode = errorCode
      err.name = 'AssertError'
      err.status = status
      Error.captureStackTrace(err, assert)
      throw err
    }
  }
  