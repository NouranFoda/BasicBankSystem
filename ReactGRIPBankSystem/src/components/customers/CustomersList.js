import React from 'react';

import CustomerItem from './CustomerItem';
import Card from '../../shared/components/UIElements/Card'
import './CustomersList.css';

const CustomersList = props =>{
    console.log(props.items.length);

    if (props.items.length === 0){
        return(
        <div className = "center">
            <Card>
                <h2> No Customers Found.</h2>
            </Card>
        </div>
        );
    }

    return (
        <ul className= "users-list">
            {props.items.map(customer =>(
                <CustomerItem key={customer["_id"]} 
                id={customer["_id"]} 
                image={customer.profilePic}
                name={customer.name} 
                balance={customer.balance}
                email={customer.email} />
            ))}
        </ul>
    );

    
};
export default CustomersList;