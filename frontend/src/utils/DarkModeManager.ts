export class DarkModeManager {
    #inDarkMode: boolean

    constructor(){
        this.#inDarkMode = this.#getDarkmodeFromLocaleStorage()
    }

    #getDarkmodeFromLocaleStorage(): boolean {
        const darkModeBrowserStorage = window.localStorage.getItem('darkmode')
        
        if(darkModeBrowserStorage === '1') {
            this.#setToDarkMode()
            return true
        }

        return false
    }

    toggleDarkMode():void {
        if(this.#inDarkMode){
            this.#unSetDarkMode()
            return
        } 
        this.#setToDarkMode()
    }

    #setToDarkMode(): void {
        window.localStorage.setItem('darkmode', '1')
        document.documentElement.classList.add('dark');
        this.#inDarkMode = true;
    }

    #unSetDarkMode(): void {
        window.localStorage.setItem('darkmode', '0')
        document.documentElement.classList.remove('dark')
        this.#inDarkMode = false;
    }
}