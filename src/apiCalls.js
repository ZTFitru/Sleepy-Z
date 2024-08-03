const customersAPI = 'http://localhost:3001/api/v1/customers'
const roomsAPI = 'http://localhost:3001/api/v1/rooms'
const bookingAPI = 'http://localhost:3001/api/v1/bookings'
let userList;
let roomFigures;
let reservations;

const getApi = fetch(customersAPI)
.then(response => response.json())

const users = (response)=>{
    userList=response[0]
}


const fetchData = () => {
    return Promise.all([
        fetch(customersAPI).then(response => response.json()),
        fetch(roomsAPI).then(response => response.json()),
        fetch(bookingAPI).then(response => response.json())
    ])
    .then(([customers, rooms, bookings]) => {
        return {
            customers,
            rooms,
            bookings
        };
    })
    .catch(err => console.error('ERROR:', err));
};


//Post
/*

const postBookings = (booking ) => {
    fetch(bookingAPI, {
        method: 'POST',
        body: JSON.stringify({
            userID: booking.UserID,
            date: booking.date,
            roomNumber: booking.roomNumber
        }),
        headers: {
            'Content-Type': 'application/json'
        };
    });
        .then.(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log('ERROR:', err));

    fetch(customersAPI)
        .then(response => response.json())
        .then(data => console.log(data));
    console.log('it posted');
};


 */

const postBookings = (booking) => {
    fetch(bookingAPI, {
        method: 'POST',
        body: JSON.stringify({
            userID: booking.userID,
            date: booking.date,
            roomNumber: booking.roomNumber
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
    users,
    fetchData,
    postBookings
}