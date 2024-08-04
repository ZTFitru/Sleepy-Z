import chai from 'chai';
import customers from './data/customerSample';
import bookings from './data/bookingsSample';
import rooms from './data/roomsSample'
import { findCustomer, getCustomer, getCustomerId } from './customers';
import { roomBooked } from './bookings.js'
import { getRoomData, availableRooms, displayRoomData, removeBoodedRoom, removedBookedRoom } from './rooms.js';


const expect = chai.expect;

describe('See if the tests are running', function () {
  it('should return true', function () {
    expect(true).to.equal(true);
  });
});

describe('Find customer', function () {
  it('should be a function', function () {
    expect(findCustomer).to.be.a('function');
  });

  it('Should return customer', function () {
    const myInput = 1;
    const newData = {customers: [{customers:customers}]};
    let customerData = findCustomer(myInput, newData.customers);
    expect(customerData).to.deep.equal({ id: 1, name: 'Leatha Ullrich' });
  });
});

describe('Get customer Id', function () {
  it('Should be a function', function () {
    expect(getCustomerId).to.be.a('function');
  });

  it('Should splice numbers to match customer', function () {
    const customerInput = 'customer3';
    const newData = {customers: [{customers: customers}]};
    const customerInfo = getCustomerId(customerInput, newData.customers);
    expect(customerInfo).to.deep.equal({ id: 3, name: 'Kelvin Schiller' });
  });
});

describe('Bookings', function () {
  it('Should be a function', function () {
    expect(roomBooked).to.be.a('function');
  });

  it('Should return bookings I have made', function () {
    const myInput = 3;
    const newData = {customers: [{customers:customers}]};
    const bookingData = {bookings: [{bookings: bookings}]};
    const personData = findCustomer(myInput, newData.customers);
    const personOnesRooms = [
      { id: '5fwrgu4i7k55hl6t5', userID: 3, date: '2022/01/24', roomNumber: 2 },
      { id: '5fwrgu4i7k55hl6t7', userID: 3, date: '2022/02/16', roomNumber: 4 }
    ];
    const foundRoom = roomBooked(personData, bookingData.bookings);
    expect(foundRoom).to.deep.equal(personOnesRooms);
  });
});

describe('Rooms', function () {
  it('Should be a function', function () {
    expect(getRoomData).to.be.a('function');
  });

  it('Should return room type', function () {
    let userRoom = 'suite';
    const roomsData = {rooms: [{rooms:rooms}]};
    let roomData = getRoomData(userRoom, roomsData.rooms);
    expect(roomData).to.deep.equal([
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      }
    ]);
  });

  it('Should check if room is available', function () {
    const roomNum = 2;
    const checkInDay = '2022/01/25';
    const roomsData = {rooms: [{rooms:rooms}]};
    const customerInfo = availableRooms(roomNum, checkInDay, roomsData.rooms);
    expect(customerInfo).to.deep.equal(true);
  });

  it('Should display room data', function () {
    const myRoom = 'suite';
    const moveInDate = '2022/01/25';
    const roomsData = {rooms: [{rooms:rooms}]};
    const readyRooms = displayRoomData(moveInDate, myRoom, roomsData.rooms);
    expect(readyRooms).to.deep.equal([
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      }
    ]);
  });
});

