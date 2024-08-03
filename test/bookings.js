import { findCustomer } from "./customers";
import bookings from "./data/bookingsSample";
import customers from "./data/customerSample";
import rooms from "./data/roomsSample";

//room bookings i have made (past or upcoming)
export const roomBooked = (clientId) => {
    // console.log('argument', clientId.id)
    // const loggedInId = findCustomer(clientId)
    // console.log('after find', loggedInId)
    const myRooms = bookings.filter((booked) => {
        if(booked.userID === clientId.id) {
            return booked;
        };
    });
    return myRooms;
    // console.log('----->', myRooms)
};

