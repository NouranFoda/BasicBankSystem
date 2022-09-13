import React from 'react';

import Button from '../shared/components/FormElements/Button';
import './Home.css'


    
const Home = () =>{
    return (
        <div className='banner'>
            <div className='home-content'>
                <h1>EGY BANK</h1>
                <p>We satisfy all your banking needs. 
                <br />You can do all your banking transactions through internet and mobile banking services
                <br /> ANYTIME ANYWHERE! </p>
                <div>
                    <Button inverse to="/customers">View Customers</Button>
                    <Button  inverse to="/transactions">Transactions</Button>
                </div>
            </div>
        </div>

    );  
}
export default Home;