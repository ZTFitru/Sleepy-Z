import customers from "./data/customerSample";


export const findCustomer = (customerId, customerName) => {
    const client = customers.find((customer) => {
        if(customer.id === customerId && customer.name === customerName) {
            return customer;
        };
    })
    return client;
};

