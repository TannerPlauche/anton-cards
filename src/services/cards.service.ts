import axios from "axios";
import MongoService from "./mongo.service";

export default class CardsService {

    static async getAll() {
        const results = await MongoService.getAll(MongoService.collection.users, {});
        // console.log('results: ', results);
        return results;
    }

};

