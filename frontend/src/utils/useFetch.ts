import { ref } from 'vue'

/**
 * This function is used to fetch data from the API you give it the object if you want to send data to the API else just url
 * When you call the function it will return the data, isPending and error and function load.
 * Load doesn't fire when calling this function you have to do that in your component
 * This is to keep track of isPending and error in your component
 * @param {String} url the endpoint your trying to fetch from for now has to add server ip and port manually
 * @param {Object} object you want to send to backend
 * @param {String} method GET is default, but you can change it to POST, PUT, DELETE
 * @returns {data, isPending, error, load} you need to make a const and destructure the return value
 * @author Marco de Boer
 */
export function useFetch (url: string, object: any, method = 'GET', params: any = null) {
  const data = ref<any>([])
  const isPending = ref<boolean>(true)
  const error = ref<any>(null)
  const abortController = new AbortController()
  const isAborted = ref<boolean>(false)

  const abort = () => {
    abortController.abort()
    isAborted.value = true
  }

  // Detect if the object is FormData and adjust headers accordingly
  const isFormData = object instanceof FormData
  const headers = isFormData ? {} : { 'Content-Type': 'application/json' }

  const fetchOptions: any = {
    method: method,
    headers: headers,
    signal: abortController.signal
  }
  if (method !== 'GET' && object) {
    fetchOptions.body = isFormData ? object : JSON.stringify(object)
  }

  /**
     * This function load makes the call to the endpoint
     * @param {String} newUrl if you want to make a new call to a different endpoint that returns the same type of data, should then only be used if you want to get different id for example
     */
  const load = async (newUrl = url) => {
    isAborted.value = false
    isPending.value = true

    if (method === 'GET' && params) {
      const queryParams = new URLSearchParams(params).toString()
      newUrl = newUrl + '?' + queryParams
    }

    try {
      const response = await fetch(newUrl, fetchOptions)

      if(response.status === 404) {
        return null
      }

      if (!response.ok) {
        throw Error(await response.text())
      }
      if (response.status !== 204) {
        try{
          data.value = isFormData ? await response.text() : await response.json()
        } catch (err) {
          data.value = null
        }
      } else {
        data.value = null // or some appropriate handling for no content
      }
      error.value = null
    } catch (err: any) {
      if (err.message === 'Failed to fetch') {
        error.value = 'Oops! Our servers are taking a break. We are working on getting them back up. Please try again later'
      } else if (err.name !== 'AbortError') {
        error.value = err.message
      }
    } finally {
      isPending.value = false
    }
  }
  return { data, isPending, error, load, abort, isAborted }
}

export default useFetch
