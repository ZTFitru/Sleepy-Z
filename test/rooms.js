
export const getRoomData = (roomType, rooms) => {
    const roomInfo = rooms[0].rooms.filter((room) => {
        if(room.roomType === roomType) {
            return room;
        };
    });
    return roomInfo;
};

export const availableRooms = (roomNumber, checkInDate, rooms, bookings) => {
    const room = rooms[0].rooms.find(room => room.number === roomNumber);
    if (room) {
        const checkIn = new Date(checkInDate);
        const isAvailable = !bookings[0].bookings.some(booking => {
            const bookingDate = new Date(booking.date);
            return booking.roomNumber === roomNumber && bookingDate.toDateString() === checkIn.toDateString();
        });
        return isAvailable;
    };
    return false;
};

export const removedBookedRoom = (roomNumber, rooms) => {
    return rooms[0].rooms.filter(room => room.number !== roomNumber);
};