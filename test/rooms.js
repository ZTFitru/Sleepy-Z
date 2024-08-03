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

export const availableRooms = (roomNumber, checkInDate) => {
    const room = rooms.find(room => room.number === roomNumber);
    if (room) {
        const isAvailable = !bookings.some(booking => {
            return booking.roomNumber === roomNumber &&
                   new Date(checkInDate) >= new Date(booking.checkInDate)
        });
        return isAvailable;
    }
    return false;
};

export const displayRoomData = (checkInDate, roomType) => {
    const matchingRooms = getRoomData(roomType);
    const availableRoomsData = matchingRooms.filter(room => 
        availableRooms(room.number, checkInDate)
    );
    return availableRoomsData;
};