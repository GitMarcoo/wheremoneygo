export default class User {
    id: number;
    email: string | null;
    firstName: string ;
    lastName: string | null;

    
    constructor(id: number, firstName: string, email: string | null, lastName: string | null) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    static copyConstructor(input: {id: number, firstName: string, email: string | null, lastName: string | null}): User {
        return new User(input.id, input.firstName, input.email, input.lastName);
    }

    getUsername(): string | null{
        return this.firstName;
    }
}