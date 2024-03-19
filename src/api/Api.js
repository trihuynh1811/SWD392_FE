import Axios from "axios";

const api = Axios.create({
    baseURL: "https://localhost:44394/api/"
})

export const UserApi = {
    Login: (data) => {
        return api.post('User/login', data, {
            headers: {
                crossDomain: true,
                'Content-Type': 'application/json'
            }
        })
    },

    Register: (data) => {
        return api.post('User/register', data, {
            headers: {
                crossDomain: true,
                'Content-Type': 'application/json'
            }
        })
    },

    GetAllCreator: () => {
        return api.get('get-creators')
    }
}

export const ArtworkApi = {
    CreateArtwork: (token, data) => {
        return api.post('Artwork/add-artwork', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                crossDomain: true,
                'Content-Type': 'multipart/form-data',
            }
        })
    },

    GetAllArtwork: () => {
        return api.get('Artwork/get-all-artworks')
    },

    GetAllArtworkByUserId: (id) => {
        return api.get(`Artwork/get-artworks/user/${id}`)
    },

    GetArtworkById: (id) => {
        return api.get(`Artwork/get-artwork/${id}`)
    },

    UpdateArtworkById: (id, data, token) => {
        return api.put(`Artwork/update-artwork/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                crossDomain: true,
                'Content-Type': 'application/json',
            }
        })

    },

    GetAllArtworkType: () => {
        return api.get('ArtworkType/get-all-artwork-types')
    },

}

export const SubscriptionApi = {
    BuySubscription: (token, data) => {
        return api.post('SubPayment/buy-new-subscription', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                crossDomain: true,
                'Content-Type': 'application/json'
            }
        })
    }
}