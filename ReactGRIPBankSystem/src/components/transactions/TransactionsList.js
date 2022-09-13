import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import { Link } from 'react-router-dom';
import TransactionItem from './TransactionItem';
import './TransactionsList.css';

const TransactionsList = props =>{
    console.log(props.items.length);
    if (props.items.length === 0){
        return (
            <div className='transaction-list center'>
                <Card>
                    <h2> No transactions found</h2>
                    <Link to= "/customers"> Start Transferring Money </Link>   
                </Card>
            </div>
        );
    }
    return (
        <ul className='transaction-list'>
            {props.items.map(transaction => (
            <TransactionItem 
            key={transaction.id}
            id = {transaction.id}
            from = {transaction.from}
            to = {transaction.to}
            amount = {transaction.amount}/>
            ))}
        </ul>
    );
}
export default TransactionsList;