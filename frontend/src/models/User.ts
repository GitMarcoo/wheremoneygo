export default class User {
    id: number;
    username: string;
    
    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }

    static copyConstructor(input: any): User {
        return new User(input.id, input.username);
    }

    getName(): string {
        return this.username;
    }
}