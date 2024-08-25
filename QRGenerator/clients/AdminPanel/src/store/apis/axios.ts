import axios from 'axios';


    const client = axios.create({
        baseURL: `${import.meta.env.VITE_ENV_SERVER_URL}`,
        timeout: 1000,
        headers: { 'Content-Type': 'application/json' },
    })
    client.defaults.timeout = 5000; // Set timeout to 5 seconds



 

export default client;