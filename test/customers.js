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
        // console.log('---> what', customerID)
    }
    return customerID
    // console.log(customerID)
}

export const getCustomerId = (customerInput) => {
    // console.log('argument', customerInput)
    if(customerInput.includes('customer')) {
        const customerId = customerInput.slice(8)
        // console.log('customerId: ',customerId)
        const justId = parseInt(customerId, 10)
        // console.log('just ID:', justId)
        const userName = findCustomer(justId)
        // console.log('userName: ', userName)
        return userName
    }
}

export const getCustomer = (customer) => {
    const personId = getCustomer(customer)
    console.log('--->', personId)
    if(!personId) {
        return null;
    };
    let userLogin = {
            username: `customer${personId.id}`,
            password: `overlook2021`
    }
    console.log(userLogin)
}
