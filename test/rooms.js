import { findCustomer } from "./customers";
import bookings from "./data/bookingsSample";
import customers from "./data/customerSample";
import rooms from "./data/roomsSample";

export const getRoomData = (roomType) => {
    const roomInfo = rooms.filter((room) => {
        if(room.roomType === roomType) {
            return room;
        };
    });
    return roomInfo;
};
//should add a way to calculate total spent in this one
export const availableRooms = (roomNumber, checkInDate) => {
    const openRooms = rooms.find((room) => {
        if(room.number  === roomNumber) {
            return room;
        };
    });
    return openRooms && !bookings.some((booking) => {
        return booking.roomNumber === roomNumber && new Date(checkInDate) >= new Date(booking.checkInDate)
    });
};

export const displayRoomData = (checkingDate, roomType) => {
    const matchingRooms = rooms.reduce((acc, room) => {
        if(room.roomType === roomType) {

        };
    });
};
