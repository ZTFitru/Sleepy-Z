// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
//-------------------------------- IMAGES -------------------------------
import './images/turing-logo.png'
import './images/image-1.png'
import './images/image-2.png'
import './images/image-3.png'
import './images/image-4.png'
import './images/image-5.png'
import './images/SleepyZ-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

const thumbnails = document.querySelectorAll('.thumbnail');
const loginBtn = document.querySelector('.login-btn')
const homePage = document.querySelector('.gallery-container')

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        changeImage(thumbnail.src);
    });
});

const changeImage = (imageSrc) => {
    document.getElementById('currentImage').src = imageSrc;
};

const loginPageView = document.querySelector('.login-container')

const changeToLoginPage = (e) => {
    if(e.target) {
        homePage.innerHTML = 
        `<div class="login-form">
            <h1>LOGIN</h1>
            <form action="">
            <div class="input-field">
                <input type="text" required>
                <label for="">USERNAME</label>
            </div>
            <div class="input-field">
                <input type="text" required>
                <label for="">PASSWORD</label>
            </div>
            <button type="submit">LOG IN</button>
        </form>
        </div>`
    }
}

loginBtn.addEventListener('click', changeToLoginPage)