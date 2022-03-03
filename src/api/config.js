export const APISettings = {
    token: '',
    headers: new Headers({
        'Accept': 'application/json'
    }),
    postHeaders: new Headers({
    }),
    baseURL: 'http://localhost:8080/image',
    getImageURL: function(image) {return this.baseURL + '/' + image}
}