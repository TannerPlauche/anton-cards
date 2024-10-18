import axios from "axios";
const iconFinderKey = 'OWtfsjR3RUe7wxxRutXB9vsVM1eFGr9DPZmTDl9qDPLoqM8OFhrDGmKkdxeyVm87';
const iconFinderClientId = 'qQ62Rr5Yf23ZT8Ot68NNafoeZBwvpCC2zoXThQmnpDWYIrjbw1McsnRggvYcGm3T';
const searchUrl = `https://api.iconfinder.com/v4/icons/search`;

async function search(term) {
    const res = await axios.get(`${searchUrl}`, {
        params: {
            query: term,
            count: 20,
        },
        headers: {
            Authorization: `Bearer ${iconFinderKey}`
        }
    });
    console.log(res.data);
}

search('mom');
