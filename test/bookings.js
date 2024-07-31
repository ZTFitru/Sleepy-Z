import bookings from "./data/bookingsSample";
import customers from "./data/customerSample";
import rooms from "./data/roomsSample";

//room bookings i have made (past or upcoming)
export const roomBooked = (clientId) => {
    const myRooms = bookings.filter((booked) => {
        if(booked.userID === clientId) {
            return booked;
        };
    });
    return myRooms;
};

