import axios from "axios";

export async function getLocation() {
    const { data: { state } } = await axios.get("https://geolocation-db.com/json/")
    return state
}