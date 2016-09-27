export class Brand{
    uuid: string;
    name: string;
    status: number;

    parseJson(json){
        this.uuid = json.uuid;
        this.name = json.name;
        this.status = json.status;
    }

    parseForm(form){
        this.name = form['name'].value;
        this.status = form['status'].value;
    }
}
