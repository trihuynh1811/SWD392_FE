import Axios from "axios";

const api = Axios.create({
    baseURL: "https://localhost:7147/",
    headers: {
        crossDomain: true, // Set crossDomain to true
        headers: {
            'Content-Type': 'application/json'
        }
    }
})

const UserApi = {
    Login: (email, password) => {
        let logindto = {
            Email: email,
            Password: password
        }

        return api.post('login', logindto)
    },

    Register: (email, firstname, lastname, phoneNumber, password, username, address) => {
        let registerdto = {
            Email: email,
            FullName: `${firstname}_${lastname}`,
            Password: password,
            Phone: phoneNumber,
            Address: address,
            Username: username
        }

        return api.post('register', registerdto)
    }
}

export default UserApi;