import Role from "./Role";

export default class User {
    id: number;
    email: string | null;
    firstName: string ;
    lastName: string | null;
    roles: Role[] | Role;

    
    constructor(id: number, firstName: string, email: string | null, lastName: string | null, roles: Role[] | Role) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
    }

    static copyConstructor(input: {id: number, firstName: string, email: string | null,
         lastName: string | null, roles: Role[] | Role}): User {
        return new User(input.id, input.firstName, input.email, input.lastName, input.roles);
    }

    getUsername(): string | null{
        return this.firstName;
    }
}