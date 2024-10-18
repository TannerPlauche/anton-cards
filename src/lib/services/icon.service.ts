import axios from "axios";

export default class IconService {
    static iconFinderKey = 'OWtfsjR3RUe7wxxRutXB9vsVM1eFGr9DPZmTDl9qDPLoqM8OFhrDGmKkdxeyVm87';
    static iconFinderClientId = 'qQ62Rr5Yf23ZT8Ot68NNafoeZBwvpCC2zoXThQmnpDWYIrjbw1McsnRggvYcGm3T';
    static searchUrl = `https://api.iconfinder.com/v4/icons/search`;

    static async search(term: string) {
        const params = {
            query: term,
            count: 75,
        };
        // console.log('params', params);
        const headers = {
            Authorization: `Bearer ${this.iconFinderKey}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
        }

        const res = await axios.get(`${this.searchUrl}`, {
            params,
            headers
        });
        // console.log(res.data);
        return res.data;

    }

}
