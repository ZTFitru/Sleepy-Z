// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css'
import apiCalls from './apiCalls.js'
import { getApi } from './apiCalls.js'

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
import { findCustomer, getCustomerId, getCustomer } from '../test/customers.js'
import { getRoomData, availableRooms } from '../test/rooms.js'
import { roomBooked } from '../test/bookings.js'
import rooms from '../test/data/roomsSample.js'


console.log('This is the JavaScript entry file - your code begins here.');



const thumbnails = document.querySelectorAll('.thumbnail');
const loginBtn = document.querySelector('.login-btn');
const homePage = document.querySelector('.dash-board');
const userInput = document.querySelector('.input-field');
const searchBtn = document.getElementById('searchBtn');
const searchResult = document.querySelector('.search-result');

let userLoginPage = 
`<div class="login-form">
<h1 class='login-title'>LOGIN</h1>
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
        console.log('event:', event);
        event.preventDefault();
        let customerUserName = userNameInput.value;
        let customerDetails = getCustomerId(customerUserName);
        console.log('customer details ->', customerDetails);
        let customerPassword = passwordInput.value;
        if(!customerDetails || !customerPassword) {
            alert('Please enter a valid USERNAME and/or PASSWORD.');
        }
        else if(customerUserName === `customer${customerDetails.id}` && customerPassword === 'overlook2021') {
            console.log('please tell me:', customerUserName);
            userLoginPage = '';
            const loggedInCustomer = roomBooked(customerDetails);
            const bookDateList = loggedInCustomer.reduce((acc, element) => {
                acc.push(element.date);
                return acc;
            }, []);
            const roomTypeList = loggedInCustomer.reduce((acc, element) => {
                acc.push(element.roomNumber);
                return acc;
            }, []);
            console.log('after logged in: ', loggedInCustomer);
            console.log(displayDashboard);
            homePage.innerHTML = `
            <h2>Welcome, ${customerDetails.name}<h2>
            <div class='display-box'>
                <p class='display-roomNum'>Room Number: ${roomTypeList}</p>
                <p class='display-roomTypes'></p>
                <p class='display-bedSize'></p>
                <p class='display-date'>Dates Booked: ${bookDateList}</p>
                <p class='display-costPerNight'></p>
            </div>
            `;
        }
    }
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', submitInput);
}
loginBtn.addEventListener('click', changeToLoginPage);


const searchForRoom = () => {
    const checkInDate = document.getElementById('checkInDate').value;
    const roomType = document.getElementById('roomType').value;
    if(!checkInDate) {
        alert('Please select a date')
        return;
    };
    let userRoom = getRoomData(roomType);
    const yourAvailableRooms = availableRooms(checkInDate, userRoom);
    console.log('yourava', yourAvailableRooms);
    displayDashboard(yourAvailableRooms);
};
searchBtn.addEventListener('click', searchForRoom);

const displayDashboard = () => {
    const customerSelection = document.getElementById('displayDashboard');
    const roomType = document.getElementById('filteredRooms');
    
    customerSelection.classList.remove('hidden');
    roomType.innerHTML = rooms.map(room => `
        <div class='room-display'>
            <p>Room Number: ${room.roomNumber}</p>
            <p>Room Type: ${room.roomType}</p>
            <p>Bed Size: ${room.bedSize}</p>
            <p>Price: ${room.costPerNight}</p>
        </div>`);
};
