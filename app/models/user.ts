export class User{
    uuid: string;
    username: string;
    password: string;
    name: string;
    token: string;
    last_login: number;
    permissions: any;

    parseJson(json){
        this.uuid = json.uuid;
        this.username = json.username;
        this.password = json.password;
        this.name = json.name;
        this.token = json.token;
        this.last_login = json.last_login;
        this.permissions = json.permissions;
    }
}
