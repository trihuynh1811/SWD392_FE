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
        return api.get('User/get-creators')
    },

    ViewAccountDetail: (id) => {
        return api.get(`User/view-account-detail/${id}`)
    },

    UpdateAccountDetail: (token, data, id) => {
        return api.put(`User/update-account/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                crossDomain: true,
                'Content-Type': 'multipart/form-data',
            }
        })
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

    GetAllArtworkByType: (typeId) => {
        return api.get(`Artwork/get-all-artworks/type/${typeId}`)
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
    GetAllArtworkByName: (artworkName) => {
        return api.get(`Artwork/search-by-name/${artworkName}`)
    }

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

export const ReservationApi = {
    MakeReservation: (token, data) => {
        return api.post('Reservation/make-reservation', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                crossDomain: true,
                'Content-Type': 'application/json'
            }
        })
    }
}

export const TagApi = {
    GetAllTags: () => {
        return api.get('Tag/get-all-tags')
    }
}

export const PackageApi = {
    GetPackage: (id) => {
        return api.get(`Package/get-package/${id}`)
    }
}