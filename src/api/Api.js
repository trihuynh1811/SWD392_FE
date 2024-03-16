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
    },

    GetAllArtwork: () => {
        return api.get('get-all-artworks')
    },

    GetAllArtworkByUserId: (id) => {
        return api.get(`get-artworks/user/${id}`)
    },

    GetArtworkById: (id) => {
        return api.get(`get-artwork/${id}`)
    },

    UpdateArtworkById: (id, data, token) => {
        return api.put(`update-artwork/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                crossDomain: true,
                'Content-Type': 'application/json',
            }
        })

    },

    GetAllArtworkType: () => {
        return api.get('get-all-artwork-types')
    }


}
