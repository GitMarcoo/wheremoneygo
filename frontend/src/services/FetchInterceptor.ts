import fetchIntercept from 'fetch-intercept';
import SessionSbService from './SessionSbService';
import { Router } from 'vue-router';

/**
 * This class intercepts all fetch requests and responses.
 * It adds the Authorization header to all requests.
 * It redirects to the sign-in page if the response status is 401.
 * @param {SessionSbService} session
 * @param {Router} router 
 * @param {unregister} unregister
 * @returns {FetchInterceptor} the instance of the class
 * 
 */

export class FetchInterceptor {
    static theInstance = null;
    session;
    router;
    unregister;
    constructor(session: SessionSbService, router: Router) {
      this.session = session;
      this.router = router;

      if (FetchInterceptor.theInstance === null) {
        FetchInterceptor.theInstance = null;
      }
      this.unregister = fetchIntercept.register(this)
    }

    /**
     * All fetch requests are intercepted by this method.
     * It adds the Authorization header to all requests.
     * @param {String} url the url of the request
     * @param {Object} options  the options of the request
     * @returns the url and the options of the request 
     */
    request(url: string, options: object){
        let token = null;
        if (FetchInterceptor.theInstance !== null) {
          token = (FetchInterceptor.theInstance as FetchInterceptor).session.getTokenFromBrowserStorage();
        }

        if (token === null) {
          return [url, options];
        } else if (options === null) {
          return [url, { headers: { 'Authorization': token } }];
        } else {
          const newOptions: any = { ...options };
          newOptions.headers = {
            ...newOptions.headers,
            'Authorization': token
          }
          return [url, newOptions];
        }
    }
    // requestError(error){}
    /**
     * This method intercepts all fetch responses.
     * It redirects to the sign-in page if the response status is 401.
     * @param {*} response the response of the request
     * @returns the response of the request 
     */
    response(response: any){
      if (response.status === 401) {
        if (FetchInterceptor.theInstance !== null) {
          (FetchInterceptor.theInstance as FetchInterceptor).router.push('/sign-out');
        }
      }
      return response;
    }
    // responseError(error){}
}