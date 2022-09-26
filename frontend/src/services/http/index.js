let requestParams = {
  success: false,
  data : null,
  error: null
};

/**
 *
 * @param {string} url
 */
const get = async(url = '') => {    
  requestParams = {
    method : "GET"
  };
  return await request( url, requestParams );;
}

/**
 *
 * @param {string} url
 * @param {?Object} body
 */
 const post = async(url = '', body = {}) => {    
  requestParams = {
    method : "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(body)
  };
  return await request( url, requestParams );
}

/**
 *
 * @param {string} url
 * @param {?Object} body
 */
 const put = async(url = '', body = {}) => {    
  requestParams = {
    method : "PUT",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(body)
  };
  return await request( url, requestParams );
}

/**
 *
 * @param {!Object} headers
 * @param {string} method
 * @param {string} url
 * @param {?Object} data
 */
async function request( url, requestParams ) {
  let apiResponse = {};
  apiResponse = await fetch( url,requestParams)
    .then( response => response.json())
    .then( data => {
      apiResponse.success = true;
      apiResponse.data = data;
      return apiResponse;
    })
    .catch(( error ) => {
      apiResponse.success = false;
      apiResponse.error = error;
      return apiResponse;
    });
  return apiResponse;
};

const HTTP = {
  get,
  put,
  post
}

export default HTTP;