import chai from 'chai';
import customers from './data/customerSample';
import bookings from './data/bookingsSample';
import rooms from './data/roomsSample'
import { findCustomer } from './customers';
import { roomBooked } from './bookings.js'

const expect = chai.expect;

describe('See if the tests are running', function () {
  it('should return true', function () {
    expect(true).to.equal(true);
  });
});

describe('Customer', function () {
  it('should be a function', function () {
    expect(findCustomer).to.be.a('function');
  });

  it('Should return customer', function () {
    let customerData = findCustomer(1, 'Leatha Ullrich');
    expect(customerData).to.deep.equal({id: 1, name: 'Leatha Ullrich'});
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
    ]
    const foundRoom = roomBooked(personOne);
    expect(foundRoom).to.deep.equal(personOnesRooms);
  });
});