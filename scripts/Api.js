class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`
                User info fetch failed...
                Error: ${res.status} ${res.statusText}
            `);
        })
        .catch(err => {
            console.log(err);
        });
    }

    _getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`
                Initial cards fetch failed...
                Error: ${res.status} ${res.statusText}
            `);
        })
        .catch(err => {
            console.log(err);
        });
    }

    getInitialData() {
        return Promise.all([this._getUserInfo(), this._getInitialCards()])
        .then(([userData, cardsData]) => {
            return { user: userData, initialCards: cardsData };
        })
        .catch(err => {
            console.log(err);
        });
    }

    updateUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about })
        })
        .catch(err => {
            console.log(err);
        });
    }

    addCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link })
        })
        .catch(err => {
            console.log(`
                    Card creation failed...
                    Error: ${err.status} ${err.statusText}
            `);
        });
    }
        .catch(err => {
            console.log(err);
        });
    }
}

const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "b100bf75-a46c-483c-9b28-27beb1ac7303",
        "Content-Type": "application/json"
    }
});

export default api;