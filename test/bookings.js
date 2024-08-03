import { findCustomer } from "./customers";
import bookings from "./data/bookingsSample";
import customers from "./data/customerSample";
import rooms from "./data/roomsSample";


export const roomBooked = (clientId) => {
    const myRooms = bookings.filter((booked) => {
        if(booked.userID === clientId.id) {
            return booked;
        };
    });
    return myRooms;
};

