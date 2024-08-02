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


console.log('This is the JavaScript entry file - your code begins here.');



const thumbnails = document.querySelectorAll('.thumbnail');
const loginBtn = document.querySelector('.login-btn');
const homePage = document.querySelector('.dash-board');
const userInput = document.querySelector('.input-field');
const searchBtn = document.getElementById('searchBtn');
const searchResult = document.querySelector('.search-result')

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

const changeToLoginPage = (e) => {
    if(e.target) {
        homePage.innerHTML = userLoginPage;
    }
    const userNameInput = document.querySelector('.user-name');
    const passwordInput = document.querySelector('.password');
    const displayDashboard = document.getElementById('displayDashboard');
    const submitInput = (event) => {
        console.log('event:', event)
        event.preventDefault();
        let customerUserName = userNameInput.value;
        let customerDetails = getCustomerId(customerUserName)
        let customerPassword = passwordInput.value;
        // let clientInput = getCustomer(customerUserName);
        let userPasswordInput = 'overlook2021';
        if(!customerDetails || !customerPassword) {
            alert('Please enter a valid USERNAME and/or PASSWORD.')
        }
        if(customerDetails === `customer${customerDetails.id}` && customerPassword === userPasswordInput) {
            console.log('please tell me:', customerDetails)
            // userLoginPage = '';
            displayDashboard.innerHTML = `<h2>Welcome, customer<h2>
            <p>Room Number: ${room.number}</p>
            <p>Room Type: ${room.roomType}</p>
            <p>Bed Size: ${room.bedSize}</p>
            <p>Cost per Night: ${room.costPerNight}</p>`
        }
    }
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', submitInput);
}
loginBtn.addEventListener('click', changeToLoginPage);

const searchForRoom = () => {
    //checkInDate -> date selected
    const checkInDate = document.getElementById('checkInDate').value
    console.log('check in date:', checkInDate)
    //roomType -> prints room type selected
    const roomType = document.getElementById('roomType').value
    console.log('room TYPE:',roomType)
    if(!checkInDate) {
        alert('Please select a date')
        return;
    };
    //userRoom -> array of room type selected
    let userRoom = getRoomData(roomType)
    console.log('userroom:', userRoom)
    //yourAvailableRooms -> UNNDIFINED
    const yourAvailableRooms = availableRooms(checkInDate, userRoom)
    console.log('yourava', yourAvailableRooms)
    displayDashboard(yourAvailableRooms)
};
searchBtn.addEventListener('click', searchForRoom);

const displayDashboard = (rooms) => {
    const customerSelection = document.getElementById('displayDashboard')
    const roomType = document.getElementById('filteredRooms')
    
    customerSelection.classList.remove('hidden')

    roomType.innerHTML = ''

}