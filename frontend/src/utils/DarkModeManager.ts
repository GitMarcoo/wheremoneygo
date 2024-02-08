import { ref } from "vue"

export class DarkModeManager {
    inDarkMode = ref<boolean>(false)

    constructor(){
        this.inDarkMode.value = this.#getDarkmodeFromLocaleStorage()
    }

    #getDarkmodeFromLocaleStorage(): boolean {
        const darkModeBrowserStorage = window.localStorage.getItem('darkmode')
        
        if(darkModeBrowserStorage === '1') {
            this.setToDarkMode()
            return true
        }

        return false
    }

    toggleDarkMode():void {
        if(this.inDarkMode.value){
            this.unSetDarkMode()
            return
        } 
        this.setToDarkMode()
    }

    private setToDarkMode(): void {
        window.localStorage.setItem('darkmode', '1')
        document.documentElement.classList.add('dark');
        this.inDarkMode.value = true;
    }

    private unSetDarkMode(): void {
        window.localStorage.setItem('darkmode', '0')
        document.documentElement.classList.remove('dark')
        this.inDarkMode.value = false;
    }


    
}