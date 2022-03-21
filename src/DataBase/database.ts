import { connect } from 'mongoose';


export default class DataBase {

    db: any;

    constructor() {
        this.connectEstablisd();
    }

    async connectEstablisd(): Promise<void> {
        this.db = await connect("mongodb://mongodb_container:27017/Pannonbioolaj",
            {
                authSource: "admin",
                user: "root",
                pass: "rootpassword"
            });
        /*
    this.db = await connect("mongodb://localhost:27018/Pannonbioolaj",
        {
            authSource: "admin",
            user: "root",
            pass: "rootpassword"
        });*/
    }

}
