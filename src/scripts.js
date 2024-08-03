// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css'
import { getApi,customers,userList, getRoomApi, rooms, getBookings, bookings, roomFigures, reservations } from './apiCalls.js'

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
import { getRoomData, availableRooms, displayRoomData } from '../test/rooms.js'
import { roomBooked } from '../test/bookings.js'
// import rooms from '../test/data/roomsSample.js'
// import bookings from '../test/data/bookingsSample.js'

console.log('This is the JavaScript entry file - your code begins here.');



const thumbnails = document.querySelectorAll('.thumbnail');
const loginBtn = document.querySelector('.login-btn');
const homePage = document.querySelector('.dash-board');
const userInput = document.querySelector('.input-field');
const searchBtn = document.getElementById('searchBtn');
Promise.all([getApi]).then((values) => { userList(values) });
Promise.all([getRoomApi]).then((values) => {roomFigures(values)})
Promise.all([getBookings]).then((values) => {reservations(values)})


let userLoginPage = 
`<div class="login-form">
<h1>LOGIN</h1>
<form action="">
<div class="input-field"><input class='user-name' id='userName' type="text" required>
<label for="userName">USERNAME</label></div>
<div class="input-field"><input class='password' id='userPassword' type="text" required>
<label for="userPassword">PASSWORD</label></div>
<button class='submit-btn' type="submit">LOG IN</button></form></div>`;




const loginPageView = document.querySelector('.login-container');
loginBtn.classList.remove('hidden');
const changeToLoginPage = (e) => {
    if(e.target) {
        loginBtn.classList.add('hidden');
        homePage.innerHTML = userLoginPage;
    }

    const userNameInput = document.querySelector('.user-name');
    const passwordInput = document.querySelector('.password');
    
    const submitInput = (event) => {
       
        event.preventDefault();
        let customerUserName = userNameInput.value;
        let customerDetails = getCustomerId(customerUserName, customers);
        console.log(customerDetails)
        let customerPassword = passwordInput.value;
        if(!customerDetails || !customerPassword) {
            alert('Please enter a valid USERNAME and/or PASSWORD.');
        }
        else if(customerUserName === `customer${customerDetails.id}` && customerPassword === 'overlook2021') {
            userLoginPage = '';
            const loggedInCustomer = roomBooked(customerDetails, bookings);
            const totalSpentOnRooms = customerTotalSpent(customerDetails)
            // const loggedInCustomerId = findCustomer(customerDetails, customers)
            const iHopeThisWorks = getRoomDetails(customerDetails)

            console.log(iHopeThisWorks)
            const bookDateList = loggedInCustomer.map(room => room.date).join(', ');
            const roomTypeList = loggedInCustomer.map(type => type.roomNumber).join(', ');
            homePage.innerHTML = `
            <h2>Welcome, ${customerDetails.name}<h2>
            <div class='display-box'>
                <p class='display-roomNum'>Room Number: ${roomTypeList}</p>
                <p class='display-roomTypes'>Room Type: ${iHopeThisWorks.id}</p> 
                <p class='display-bedSize'></p>
                <p class='display-date'>Dates Booked: ${bookDateList}</p>
                <p class='display-costPerNight'>Total Spent: $${totalSpentOnRooms}</p>
            </div>
            `;
        }
    }
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', submitInput);
}
loginBtn.addEventListener('click', changeToLoginPage);

const customerTotalSpent = (customer) => {
    const customerBooking = roomBooked(customer, bookings);
    const totalCost = customerBooking.reduce((total, booked) => {
        console.log(customerBooking)
        const hotelRoom = rooms.find(room => room.number === booked.roomNumber);
        if(hotelRoom) {
            total += hotelRoom.costPerNight;
        }
        return total;
    }, 0);
    return totalCost.toFixed(2);
};

const getRoomDetails = (customer) => {
    const roomInfo = bookings.reduce((acc, room) => {
        if(room.userID === customer.id) {
            acc.push(room)
        }
        console.log(acc)
        return acc
    }, [])
    const roomDetail = roomInfo.reduce((acc, room) => {
        if(room.Number === bookings.roomNumber) {
            acc.push(room)
        }
        return acc
    }, [])
    return roomDetail
}


const searchForRoom = () => {
    const checkInDate = document.getElementById('checkInDate').value;
    const roomType = document.getElementById('roomType').value;
    if (!checkInDate) {
        alert('Please select a date');
        return;
    }

    console.log(rooms)
    const roomsByType = getRoomData(roomType, rooms);
    const convenientRooms = roomsByType.filter(room =>
        availableRooms(room.number, checkInDate, rooms)
    );
    console.log('Available rooms:', convenientRooms);
    if (convenientRooms.length === 0) {
        alert('Sorry for the inconvenience, but please adjust your room search criteria.');
    } else {
        displayDashboard(convenientRooms);
    }
};
searchBtn.addEventListener('click', searchForRoom);

const displayDashboard = (convenientRooms) => {
    const customerSelection = document.getElementById('displayDashboard');
    const roomType = document.getElementById('filteredRooms');

    customerSelection.classList.remove('hidden');
    roomType.innerHTML = '';
    roomType.innerHTML = convenientRooms.map(room => `
            <div class="room-display" id='roomID${room.number}'>
                <h3 id='roomName${room.number}'>Room Number: ${room.number}</h3>
                <p>Room Type: ${room.roomType}</p>
                <p>Bed Size: ${room.bedSize}</p>
                <p>Price per Night: $${room.costPerNight}</p>
                <button class='book-roomBtn' id='bookRoomBtn${room.number}'>Book Room</button>
            </div>
    `).join('');

    const bookRoomBtn = document.querySelectorAll('.book-roomBtn');
    bookRoomBtn.forEach(button => {
        button.addEventListener('click', bookingARoom)
    });
};

const bookingARoom = (event) => {
    const clickedBtn = event.target.id.replace('bookRoomBtn', '');
    const roomNumber = parseInt(clickedBtn, 10);
    const checkInDate = document.getElementById('checkInDate').value;

    if (availableRooms(roomNumber, checkInDate, rooms)) {   
      
         
        bookings.push({
            id: bookings.length + 1,
            userID,
            checkInDate,
            roomNumber
        });
        removedBookedRoom()
        updateAvailableRooms(); 
        searchForRoom();
        alert(`Room ${roomNumber} has been successfully booked.`);
    } else {
        alert(`Room ${roomNumber} is not available.`);
    };

    
};

const updateAvailableRooms = () => {
    const bookedRoomNums = bookings.map(booking => booking.roomNumber);
    const availableRoomLists = rooms.filter(room => !bookedRoomNums.includes(room.number));

    displayDashboard(availableRoomLists);
};

const roomRemoved = () => {
    removedBookedRoom(roomNum, rooms);
    const updatedRoomList = displayRoomData(checkInDate, roomType, rooms);

};