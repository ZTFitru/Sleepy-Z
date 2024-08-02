const customersAPI = 'http://localhost:3001/api/v1/customers'
const roomsAPI = 'http://localhost:3001/api/v1/rooms'
const bookingAPI = 'http://localhost:3001/api/v1/bookings'

const getApi = fetch(customersAPI).then(response => response.json()).then(data => console.log(data)).catch(err => console.log('errorrr:', err))



export {
    getApi
}