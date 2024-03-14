import Axios from "axios";

const api = Axios.create({
    baseURL: "https://localhost:44394/"
})

export const UserApi = {
    Login: (data) => {
        return api.post('login', data, {
            headers: {
                crossDomain: true,
                'Content-Type': 'application/json'
            }
        })
    },

    Register: (data) => {
        return api.post('register', data, {
            headers: {
                crossDomain: true,
                'Content-Type': 'application/json'
            }
        })
    }
}

export const ArtworkApi = {
    CreateArtwork: (token, data) => {
        return api.post('add-artwork', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                crossDomain: true,
                'Content-Type': 'multipart/form-data',
            }
        })
    }


}
