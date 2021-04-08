import axios from "axios";

export default axios.create({
    baseURL: "http://dealok",
    headers: {
        "Content-type": "application/json"
    }
});
