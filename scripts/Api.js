class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(){
    fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  getInitialCards() {
    // ...
  }

  // otros métodos para trabajar con la API
}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "b100bf75-a46c-483c-9b28-27beb1ac7303",
    "Content-Type": "application/json"
  }
});

export default api;