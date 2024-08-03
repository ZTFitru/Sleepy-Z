import customers from "./data/customerSample";

export const findCustomer = (customer) => {
    const customerID = customers.find(person => person.id === customer)
    if(!customerID) {
        return null;
    }
    return customerID;
}

export const getCustomerId = (customerInput) => {
    if(customerInput.includes('customer')) {
        const customerId = customerInput.slice(8);
        const justId = parseInt(customerId, 10);
        const userName = findCustomer(justId);
        return userName;
    }
}

