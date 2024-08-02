import customers from "./data/customerSample";

// export const findCustomer = (customerId, customerName) => {
//     const client = customers.find((customer) => {
//         if(customer.id === customerId && customer.name === customerName) {
//             return customer;
//         };
//     })
//     return client.id;
//     // console.log(client.id)
// };

export const findCustomer = (customer) => {
    const customerID = customers.find(person => person.id === customer)
    if(!customerID) {
        return null;
    }
    return customerID
    // console.log(customerID)
}

export const getCustomer = (customer) => {
    const personId = getCustomer(customer)
    if(!personId) {
        return null;
    };
    let userLogin = {
            username: `customer${customer.id}`,
            password: `overlook2021`
    }
    console.log(userLogin)
}
