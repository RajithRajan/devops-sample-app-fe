
export class User {
    constructor(public _id: string, public user_email: string, public user_name: string, public loggedIn: boolean, public password: string) {
    }
}