import { API_KEY, DATABASE } from "../constants";
import axios from "axios";

export default class MongoService {
    // static connection: mongoose.Mongoose;

    static collection = {
        users: 'users',
    }

    static async getAll(collection: any, filter: Object) {
        var data = JSON.stringify({
            "collection": collection,
            "database": DATABASE,
            "dataSource": "speech-cards",
            filter: {},
        });

        // var config = {
        //     method: 'post',
        //     url: ,
        //     headers: ,
        //     data: data
        // };

        return axios.post(
            'https://us-east-2.aws.data.mongodb-api.com/app/data-jnemspb/endpoint/data/v1/action/find',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': '*',
                    'api-key': API_KEY,
                }
            })
            .then(function (response) {
                return response.data.documents;
            })
            .catch(function (error) {
                console.log('ERROR', error);
            });

    }


}