import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './TransactionItem.css';

const TransactionItem = props =>{
    return (
    <li className='transaction-item'>
        <Card className='transaction-item__content'>
            <div className='transaction-item__info'>
                <Card className='transaction-item__single-info'>
                    <h4> <u >Transferer </u> {props.from}</h4>
                </Card>
                <Card className='transaction-item__single-info'>
                    <h4> <u >Recipient </u> {props.to}</h4>
                </Card>
                <Card className='transaction-item__single-info'>
                    <h4> <u >Transfer amount  </u> {props.amount}</h4>
                </Card>
            </div>
        </Card>
    </li>
    );
}
export default TransactionItem;