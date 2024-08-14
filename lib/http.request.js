import axios from "axios";
const base = import.meta.env.VITE_BASE_URL
const fixer = import.meta.env.VITE_FIXER_URL

export async function getData(path) {
  try {
    const res = await axios.get(base + path);

    return res;
  } catch (e) {
    console.log(e);
  }
}
export async function getData_Fixer(path) {
  try {
    const res = await axios.get(fixer + path, {
      headers: {
        apikey: import.meta.env.VITE_APIKEY
      }
    });

    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function postData(path, data) {
  try {
    const res = await axios.post(base + path, data);

    if (res.status === 201) {
      return res;
    }
    throw new Error(res.status);
  } catch (e) {
    console.log(e);
  }
}

export async function patchData(path, data) {
  try {
    const res = await axios.patch(base + path, data);

    return res;
  } catch (e) {
    console.log(e);
  }
}
