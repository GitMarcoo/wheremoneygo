import User from "@/models/User";
import { Ref, ref, watchEffect } from "vue";
import decodeToken from "@/utils/JwtDecoder";

/** Class representing a session service.
 * It manages the session of the user. 
 * It saves the token in the browser storage.
 * It retrieves the token from the browser storage.
 * @param {string} resourcesUrl 
 * @param {string} browserStorageItemName
 * @param {User} user is a ref for the user
 * @returns {SessionSbService} the instance of the class
 */
export default class SessionSbService {
    BROWSER_STORAGE_ITEM_NAME;
    RESOURCES_URL;
    user: Ref<User | null>;

    constructor(resourcesUrl: string, browserStorageItemName: any) {
      this.RESOURCES_URL = resourcesUrl;
      this.BROWSER_STORAGE_ITEM_NAME = browserStorageItemName;
      this.getTokenFromBrowserStorage();
      this.user = ref<User | null>(null);
    }


    /**
     *  It sends a request to the server to sign up the user.
     * @param {String} email 
     * @param {String} password 
     * @returns {Promise<User>} the user signed up
     */
    async asyncSignUp(email: string, password: string) /*: Promise<User>*/ {
        const response = await fetch(`${this.RESOURCES_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
            credentials: 'include'
        })
        if (response.ok) {
            return true
        } else {
            console.error(response);
            const status = response.status;
            return { status };
        }
    }

    async asyncSignIn(email: string, password: string) /*: Promise<User>*/ {
        const response = await fetch(`${this.RESOURCES_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
            credentials: 'include'
        })
        if (response.ok) {
            const user = await response.json();
            const authHeader = response.headers.get('Authorization') as string;
            const token = authHeader.split(' ')[1];
            const decodedToken = decodeToken(token);
            const newUser = new User(Number(decodedToken.sub), user.firstName, null, null, decodedToken.roles);
            this.saveToken(response.headers.get('Authorization') as string,
            newUser);
            this.user.value = newUser;
            return { user, response };
        } else {
            console.log(response);
            const status = response.status;
            return { user: null, status};
        }
    }
    /**
     * On signout it removes the token from the browser storage.
     * It removes the user from the browser storage.
     * It sets the user to null.
     */
    signOut() {
        sessionStorage.removeItem(this.BROWSER_STORAGE_ITEM_NAME);
        sessionStorage.removeItem('user');
        this.user.value = null
    }

    /**
     * It saves the token in the browser storage.
     * @param {String} token jwt Token 
     * @param {Object} user  
     */
    saveToken(token: string, user: object | null) {
        sessionStorage.setItem(this.BROWSER_STORAGE_ITEM_NAME, token);
        if(user !== null) sessionStorage.setItem('user', JSON.stringify(user));
    }
    /**
     * It retrieves the token from the browser storage.
     * @returns {String} the token
     */
    getTokenFromBrowserStorage() {
      return sessionStorage.getItem(this.BROWSER_STORAGE_ITEM_NAME);
    }
    /**
     * It retrieves the user from the browser storage.
     * @returns {Object} the user
     */
    getUserFromBrowserStorage() {
      return JSON.parse(sessionStorage.getItem('user') as string);
    }

}
