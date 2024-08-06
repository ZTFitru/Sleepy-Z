const customersAPI = 'http://localhost:3001/api/v1/customers'
const roomsAPI = 'http://localhost:3001/api/v1/rooms'
const bookingAPI = 'http://localhost:3001/api/v1/bookings'
const customers = [];
const rooms = [];
const bookings = [];

const getApi = fetch(customersAPI)
.then(response => response.json());

const getRoomApi = fetch(roomsAPI)
.then(response => response.json());

const getBookings = fetch(bookingAPI)
.then(response => response.json());

const userList = (response) => {
    customers.push(response[0]);
};

const roomFigures = (response) => {
    rooms.push(response[0]);
};

const reservations = (response) => {
    bookings.push(response[0]);
};

const postBookings = (customerId, checkInDate, roomNumber) => {
    fetch(bookingAPI, {
        method: 'POST',
        body: JSON.stringify({
            userID: customerId.id,
            date: checkInDate,
            roomNumber: roomNumber
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log('ERROR:', err));
};


export {
    getApi,
    userList,
    roomFigures,
    reservations,
    customers,
    rooms,
    bookings,
    getRoomApi,
    getBookings,
    postBookings
}