import axios from 'axios'
const base = "http://localhost:8080"


export async function getData(path) {
    try {   
        const res = await axios.get(base + path)

        return res
    } catch(e) {
        console.log(e);А
    }
}


export async function postData(path, data) {
    try {   
        const res = await axios.post(base + path, data)

        if(res.status === 201) {
            return res
        }
        throw new Error(res.status)
    } catch(e) {
        console.log(e);
    }
}