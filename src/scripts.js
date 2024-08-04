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
import { getRoomData, availableRooms, displayRoomData, removedBookedRoom } from '../test/rooms.js'
import { roomBooked } from '../test/bookings.js'
// import rooms from '../test/data/roomsSample.js'
// import bookings from '../test/data/bookingsSample.js'

console.log('This is the JavaScript entry file - your code begins here.');


const submitBtn = document.querySelector('.submit-btn');
const userNameInput = document.querySelector('.user-name');
const passwordInput = document.querySelector('.password');
const homePage = document.querySelector('.dash-board');
const searchBtn = document.getElementById('searchBtn');  //<-test new
const checkInView = document.querySelector('.check-in-box')

let customerDetails;
let customerUserName;


Promise.all([getApi]).then((values) => { userList(values) });
Promise.all([getRoomApi]).then((values) => {roomFigures(values)})
Promise.all([getBookings]).then((values) => {reservations(values)})



const submitInput = (event) => {
    event.preventDefault();

    const userNameInput = document.querySelector('.user-name');
    const passwordInput = document.querySelector('.password');
    customerUserName = userNameInput.value
    customerDetails = getCustomerId(customerUserName, customers);
    console.log('after the getCustomerId function ---->',customerDetails)
    let customerPassword = passwordInput.value;

    if (!customerDetails || !customerPassword) {
        alert('Please enter a valid USERNAME and/or PASSWORD.');
    } else if (customerUserName === `customer${customerDetails.id}` && customerPassword === 'overlook2021') {
        const loggedInCustomer = roomBooked(customerDetails, bookings);
        const totalSpentOnRooms = customerTotalSpent(customerDetails);
        const findRoomType = getRoomDetails(customerDetails);
        const bookDateList = loggedInCustomer.map(room => room.date).join(', ');
        const roomNums = loggedInCustomer.map(type => type.roomNumber).join(', ');
        const allRoomTypes = findRoomType.reduce((acc, room) => {
            room.forEach((type) => {
                acc.push(type);
            })
            return acc;
        }, []);
        const newRoomType = allRoomTypes.map(room => room.roomType).join(', ');


        
        homePage.innerHTML = `
        <h2>Welcome, ${customerDetails.name}</h2>
        <div class='display-box'>
            <p class='display-roomNum'>Room Number: ${roomNums}</p>
            <p class='display-roomTypes'>Room Type: ${newRoomType}</p> 
            <p class='display-bedSize'></p>
            <p class='display-date'>Dates Booked: ${bookDateList}</p>
            <p class='display-costPerNight'>Total Spent: $${totalSpentOnRooms}</p>
        </div>
        `;

        const checkInView = document.querySelector('.check-in-box');
        checkInView.classList.remove('hidden');
    } else {
        alert('Invalid credentials.');
    }
}

submitBtn.addEventListener('click', submitInput);


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
}

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
}

const searchForRoom = () => {
    const checkInView = document.querySelector('.check-in-box');
    checkInView.classList.remove('hidden');
    const checkInDate = document.getElementById('checkInDate').value;
    const roomType = document.getElementById('roomType').value;

    if (!checkInDate) {
        alert('Please select a date');
        return;
    }

    const roomsByType = getRoomData(roomType, rooms);
    const convenientRooms = roomsByType.filter(room =>
        availableRooms(room.number, checkInDate, rooms)
    );

    if (convenientRooms.length === 0) {
        alert('Sorry for the inconvenience, but please adjust your room search criteria.');
    } else {
        displayDashboard(convenientRooms);
    }
};
document.getElementById('searchBtn').addEventListener('click', searchForRoom);
    
searchBtn.addEventListener('click', searchForRoom);
    
const displayDashboard = (convenientRooms) => {
    const customerSelection = document.getElementById('displayDashboard');
    const roomType = document.getElementById('filteredRooms');
    

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
    const checkInDateFinal = checkInDate.split('-').join('/');

    const [month, day, year] = checkInDateFinal;
    // const checkInDateFormated = `${year}/${month}/${day}`
    // console.log('after', checkInDateFormated)
    if (availableRooms(roomNumber, checkInDate, rooms)) {   
        let customerId = getCustomerId(customerUserName, customers)
            
        bookings.push({
            id: bookings.length + 1,
            userID: customerId,
            checkInDate: checkInDate,
            roomNumber: roomNumber
        });
        postBookings(customerId.id, checkInDateFinal, roomNumber)
        
        const newArray = removedBookedRoom(roomNumber, rooms)
        rooms[0].rooms.splice(0, rooms[0].rooms.length, ...newArray);
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