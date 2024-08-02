import chai from 'chai';
import customers from './data/customerSample';
import bookings from './data/bookingsSample';
import rooms from './data/roomsSample'
import { findCustomer, getCustomer } from './customers';
import { roomBooked } from './bookings.js'
import { getRoomData, availableRooms } from './rooms.js';

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

describe('Get Customer', function() {
  it('should be a function', function () {
    expect(getCustomer).to.be.a('function');
  });

  it.skip('Should return if customer can log in with an id or not', function() {
    const customerId = 1;
    const personId = getCustomer(customerId)
    const customerLogin = getCustomer(personId)
    expect(customerLogin).to.deep.equal({
      username: 'customer1',
      password: 'overlook2021'
    })

  });
});

describe('Bookings', function () {
  it('Should be a function', function () {
    expect(roomBooked).to.be.a('function');
  });

  it('Should return bookings I have made', function() {
    const personOne = 3;
    const personOnesRooms = [
      {id: '5fwrgu4i7k55hl6t5', userID: 3, date: '2022/01/24', roomNumber: 2},
      {id: '5fwrgu4i7k55hl6t7', userID: 3, date: '2022/02/16', roomNumber: 4}
    ];
    const foundRoom = roomBooked(personOne);
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
        constPerNight: 477.38
      }
    ]);
  });

  it('Should return only available rooms for that date', function() {
    const myRoom = 'single room'
    const roomData = getRoomData(myRoom)
  })
});

