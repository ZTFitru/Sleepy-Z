import chai from 'chai';
import customers from './data/customerSample';
import bookings from './data/bookingsSample';
import rooms from './data/roomsSample'
import { findCustomer, getCustomer, getCustomerId } from './customers';
import { roomBooked } from './bookings.js'
import { getRoomData, availableRooms, displayRoomData } from './rooms.js';

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
    let customerData = findCustomer(1);
    expect(customerData).to.deep.equal({ id: 1, name: 'Leatha Ullrich' });
  });
});

describe('Get customer Id', function() {
  it('Should be a function', function() {
    expect(getCustomerId).to.be.a('function')
  });

  it('Should splice numbers to match customer', function() {
    const customerInput = 'customer3'
    const customerInfo = getCustomerId(customerInput)
    expect(customerInfo).to.deep.equal({id: 3, name: 'Kelvin Schiller'})
  });
});

describe('Bookings', function () {
  it('Should be a function', function () {
    expect(roomBooked).to.be.a('function');
  });

  it('Should return bookings I have made', function() {
    const personOne = 3;
    const personData = findCustomer(personOne)
    const personOnesRooms = [
      {id: '5fwrgu4i7k55hl6t5', userID: 3, date: '2022/01/24', roomNumber: 2},
      {id: '5fwrgu4i7k55hl6t7', userID: 3, date: '2022/02/16', roomNumber: 4}
    ];
    const foundRoom = roomBooked(personData);
    expect(foundRoom).to.deep.equal(personOnesRooms);
  });
});

describe('Rooms', function() {
  it('Should be a function', function() {
    expect(getRoomData).to.be.a('function');
  });

  it('Should return room type', function() {
    let userRoom = 'suite';
    let roomData = getRoomData(userRoom);
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

  it('Should check if room is available', function() {
    const roomNum = 2;
    const checkInDay = '2022/01/25'
    const customerInfo = availableRooms(roomNum, checkInDay)
    expect(customerInfo).to.deep.equal(true)
  })

  it('Should display room data', function() {
    const myRoom = 'suite';
    const moveInDate = '2022/01/25'
    const readyRooms = displayRoomData(moveInDate, myRoom)
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

