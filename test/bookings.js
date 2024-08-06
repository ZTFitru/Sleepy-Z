
export const roomBooked = (clientId, bookings) => {
    const myRooms = bookings[0].bookings.filter((booked) => {
        if(booked.userID === clientId.id) {
            return booked;
        };
    });
    return myRooms;
};

