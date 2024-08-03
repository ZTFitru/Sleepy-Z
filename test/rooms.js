import { findCustomer } from "./customers";
import bookings from "./data/bookingsSample";
import customers from "./data/customerSample";


export const getRoomData = (roomType, rooms) => {
    const roomInfo = rooms[0].rooms.filter((room) => {
        if(room.roomType === roomType) {
            return room;
        };
    });
    return roomInfo;
};

export const availableRooms = (roomNumber, checkInDate, rooms) => {
    const room = rooms[0].rooms.find(room => room.number === roomNumber);
    if (room) {
        const isAvailable = !bookings.some(booking => {
            return booking.roomNumber === roomNumber &&
                   new Date(checkInDate) >= new Date(booking.checkInDate)
        });
        return isAvailable;
    }
    return false;
};

export const displayRoomData = (checkInDate, roomType, rooms) => {
    const matchingRooms = getRoomData(roomType, rooms);
    const availableRoomsData = matchingRooms.filter(room => 
        availableRooms(room.number, checkInDate, rooms)
    );
    return availableRoomsData;
};

export const removedBookedRoom = (roomNum, rooms) => {
    const removedRoom = rooms[0].rooms.filter(room => room.number !== roomNum);
    return removedRoom
};