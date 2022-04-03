const axios = require('axios');

export default axios.create({
    baseURL: "http://localhost:9000"
})
