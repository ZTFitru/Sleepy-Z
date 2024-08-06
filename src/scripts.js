// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css'
import { getApi,customers,userList, getRoomApi, rooms, getBookings, bookings, roomFigures, reservations, postBookings } from './apiCalls.js'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
//-------------------------------- IMAGES -------------------------------
import './images/turing-logo.png'
import './images/image-1.png'
import './images/image-2.png'
import './images/image-3.png'
import './images/image-4.png'
import './images/image-5.png'
import './images/SleepyZ-logo.png'
import './images/hotel-background.jpg'
import { findCustomer, getCustomerId } from '../test/customers.js'
import { getRoomData, availableRooms, removedBookedRoom } from '../test/rooms.js'
import { roomBooked } from '../test/bookings.js'

console.log('This is the JavaScript entry file - your code begins here.');

const submitBtn = document.querySelector('.submit-btn');
const userNameInput = document.querySelector('.user-name');
const passwordInput = document.querySelector('.password');
const homePage = document.querySelector('.dash-board');
const searchBtn = document.getElementById('searchBtn');  
const checkInView = document.querySelector('.check-in-box');
const symboleTag = document.getElementById('symbole');
const symbol = symboleTag.innerHTML = `&#x203A;`
let customerDetails;
let customerUserName;
let avaliableRoomHandler;
let globalRoomType;

Promise.all([getApi]).then((values) => { userList(values) });
Promise.all([getRoomApi]).then((values) => {roomFigures(values)})
Promise.all([getBookings]).then((values) => {reservations(values)})

const submitInput = (event) => {
    event.preventDefault();

    const userNameInput = document.querySelector('.user-name');
    const passwordInput = document.querySelector('.password');
    customerUserName = userNameInput.value;
    customerDetails = getCustomerId(customerUserName, customers);
    let customerPassword = passwordInput.value;

    if (!customerDetails || !customerPassword) {
        alert('Please enter a valid USERNAME and/or PASSWORD.');
    } else if (customerUserName === `customer${customerDetails.id}` && customerPassword === 'overlook2021') {
        const loggedInCustomer = roomBooked(customerDetails, bookings);
        const totalSpentOnRooms = customerTotalSpent(customerDetails);
        const findRoomType = getRoomDetails(customerDetails);
        const roomDetailsHTML = generateRoomHtml(loggedInCustomer, findRoomType);

        homePage.innerHTML = `
        <h1>Welcome, ${customerDetails.name}</h1>
        <div class='display-box customer-box'>
            <div class='room-container'>
                ${roomDetailsHTML}
            </div>
            <p class='display-costPerNight'>${symbol} Total Spent: $${totalSpentOnRooms}</p>
        </div>
        `;
        const checkInView = document.querySelector('.check-in-box');
        checkInView.classList.remove('hidden');
    } else {
        alert('Invalid credentials.');
    };
};
submitBtn.addEventListener('click', submitInput);

const generateRoomHtml = (loggedInCustomer, findRoomType) => {
    let roomDetailsHTML = '';
    const allRoomTypes = findRoomType.reduce((acc, room) => {
        room.forEach((type) => {
            acc.push(type);
        })
        return acc;
    }, []);
    loggedInCustomer.forEach((room, index) => {
        const roomType = allRoomTypes[index].roomType;
        const bedSize = allRoomTypes[index].bedSize;
        const bidetData = allRoomTypes[index].bidet;
        const dateBooked = room.date;
        const roomNumber = room.roomNumber;
        const roomCost = allRoomTypes[index].costPerNight

        roomDetailsHTML += `
        <div class='room-details' tabindex='0' aria-labelledby='room-${index}'>
            <p id='room-${index}' class='room-number'>${symbol} Room Number: ${roomNumber}</p>
            <p class='room-type'>Room Type: ${roomType}</p>
            <p class='room-type'>Has a Bidet: ${bidetData}</p>
            <p class='bed-size'>Bed Size: ${bedSize}</p>
            <p class='date-booked'>Date Booked: ${dateBooked}</p>
            <p id='room-${index}' class='per-night'>${symbol}Cost Per Night: $${roomCost}</p>
        </div>
        `;
    });
    return roomDetailsHTML;
};

const customerTotalSpent = (customer) => {
    const customerBooking = roomBooked(customer, bookings);
    const totalCost = customerBooking.reduce((total, booked) => {
        const hotelRoom = rooms[0].rooms.find(room => room.number === booked.roomNumber);
        if(hotelRoom) {
            total += hotelRoom.costPerNight;
        }
        return total;
    }, 0);
    return totalCost.toFixed(2);
};
    
const getRoomDetails = (customer) => {
    const roomInfo = bookings[0].bookings.reduce((acc, room) => {
        if(room.userID === customer.id) {
            acc.push(room);
        };
        return acc;
    }, []);
    return getRoomInfo(roomInfo);
};

const getRoomInfo = (roomInfo) => {
    const roomTypeData = roomInfo.reduce((acc, hotelRoom) => {
        const filteredList = rooms[0].rooms.filter((room) => {
            if(room.number === hotelRoom.roomNumber) {
                return room;
            }
        });
        acc.push(filteredList);
        return acc;
    }, []);
    return roomTypeData;
};

const searchForRoom = () => {
    const checkInView = document.querySelector('.check-in-box');
    checkInView.classList.remove('hidden');
    const checkInDate = document.getElementById('checkInDate').value;
    const roomType = document.getElementById('roomType').value;
    globalRoomType = roomType
    const checkInDateFinal = checkInDate.split('-').join('/');

    if (!checkInDate) {
        alert('Please select a date!');
        return;
    }
    const roomsByType = getRoomData(roomType, rooms);
    const bookedRoomsOnDate = bookings[0].bookings.filter(booking =>
        booking.date === checkInDateFinal
    ).map(booking => booking.roomNumber);
    
    const availableRoomsList = roomsByType.filter(room =>
        !bookedRoomsOnDate.includes(room.number) && availableRooms(room.number, checkInDateFinal, rooms, bookings)
    );

    displayDashboard(availableRoomsList);
    
};
document.getElementById('searchBtn').addEventListener('click', searchForRoom);
searchBtn.addEventListener('click', searchForRoom);
    
const displayDashboard = (convenientRooms) => {
    const customerSelection = document.getElementById('displayDashboard');
    const roomType = document.getElementById('filteredRooms');
    roomType.innerHTML = '';

    if(avaliableRoomHandler){
        avaliableRoomHandler = false;
        roomType.innerHTML = convenientRooms.map(room => `
            <div class="room-display" id='roomID${room.number}'>
                <h3 id='roomName${room.number}'>Room Number: ${room.number}</h3>
                <p>Room Type: ${room.roomType}</p>
                <p>Bed Size: ${room.bedSize}</p>
                <p>Price per Night: $${room.costPerNight}</p>
                <button class='book-roomBtn' id='bookRoomBtn${room.number}'>Book Room</button>
            </div>
        `).join('');
    } else{
    roomType.innerHTML = convenientRooms.map(room => `
        <div class="room-display" id='roomID${room.number}'>
            <h3 id='roomName${room.number}'>Room Number: ${room.number}</h3>
            <p>Room Type: ${room.roomType}</p>
            <p>Bed Size: ${room.bedSize}</p>
            <p>Price per Night: $${room.costPerNight}</p>
            <button class='book-roomBtn' id='bookRoomBtn${room.number}'>Book Room</button>
        </div>
    `).join('');
    };
    const bookRoomBtn = document.querySelectorAll('.book-roomBtn');
    bookRoomBtn.forEach(button => {
        button.addEventListener('click', bookingARoom)
    });
};

const bookingARoom = (event) => {
    const clickedBtn = event.target.id.replace('bookRoomBtn', '');
    const roomNumber = parseInt(clickedBtn, 10);
    const checkInDate = document.getElementById('checkInDate').value;
    const checkInDateFinal = checkInDate.split('-').join('/');

    if (availableRooms(roomNumber, checkInDateFinal, rooms, bookings)) {
        let customerId = getCustomerId(customerUserName, customers);
        bookings[0].bookings.push({
            id: bookings[0].bookings.length + 1,
            userID: customerId.id,
            date: checkInDateFinal,
            roomNumber: roomNumber
        });
        postBookings(customerId, checkInDateFinal, roomNumber);
        updateAvailableRooms(roomNumber, checkInDateFinal);
        alert(`Room ${roomNumber} has been successfully booked.`);
    } else {
        alert(`We are sorry, but room ${roomNumber} is not available.`);
    };
};

const updateAvailableRooms = (roomNumber, checkInDateFinal) => {
    const newArray = removedBookedRoom(roomNumber, rooms)
    rooms[0].rooms.splice(0, rooms[0].rooms.length, ...newArray);
    const roomsByTypeList = getRoomData(globalRoomType, rooms);
    const convenientRoomsList = roomsByTypeList.filter(room =>
        availableRooms(room.number, checkInDateFinal, rooms, bookings)
    ); 
    avaliableRoomHandler = true;
    displayDashboard(convenientRoomsList);
};
