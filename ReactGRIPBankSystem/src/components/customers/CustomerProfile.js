import React ,{ useEffect,useState } from 'react';
import { useParams ,useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './CustomerProfile.css';


    
const CustomerProfile = () =>{

    const { error, sendRequest, clearError } = useHttpClient();
    const customerId = useParams().id;
    const [isLoading , setIsLoading] = useState(false);
    //const [error , setError] = useState();
    const [loadedCustomers , setloadedCustomers] = useState();
    const [loadedCustomer , setloadedCustomer] = useState();

    useEffect(()=>{
        const sendRequest = async () =>{
            setIsLoading(true);
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customers/${customerId}/others`);
                const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customers/${customerId}`);
                const responseData = await response.json();
                const responseData2 = await response2.json();


                if (!response.ok ){
                    throw new Error(responseData.message);
                }
                if( !response2.ok){
                    throw new Error(responseData2.message);
                }
                
                setloadedCustomers(responseData.Customers);
                setloadedCustomer(responseData2.customer);
                setIsLoading(false);

            }catch(err){
                //setError(err.message);
            }
            setIsLoading(false);

        };
        sendRequest();
    },[]);

    // const errorHnadler = () =>{
    //     setError(null);

    // };


    //////////////////////////////////////////

    const [showModal , setShowModal] = useState (false);
    const openTransferMoneyHandler = () => setShowModal(true);
    const closeTransferMoneyHandler = () => setShowModal(false);

    const [dropDownvalue, setdropdownValue] = React.useState();
    const [amountValue, setAmountValue] = React.useState();

    const history = useHistory();
    const TransactionSubmitHandler = async event => {
        event.preventDefault();
        console.log(amountValue);
        console.log(dropDownvalue);
        try{
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/transactions/add`,
                'POST',
                JSON.stringify({
                  to: dropDownvalue,
                  from: loadedCustomer.username,
                  amount:amountValue ,
                }),
                { 'Content-Type': 'application/json' }
              );  
              history.push('/transactions');

        }catch(err){
            //setError(err.message);
        }

    };
    
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedCustomer &&
                <div className='customer-profile'>
                <Card className='customer-profile__content'>
                    <div className='customer-profile__image'>
                        <img src={loadedCustomer.profilePic} alt='profile'/>
                    </div>
                    <div className='customer-profile__info'>
                        <h4> Email: {loadedCustomer.email}</h4>
                        <h4>{loadedCustomer.name}</h4>
                        <h4>{loadedCustomer.balance}{'$'}</h4>
                    </div>
                    <div className='customer-profile__actions'>
                        <Button  onClick={openTransferMoneyHandler}>TRANSFER MONEY</Button>
                    </div>
                </Card>
            </div>
            }


            {!isLoading && loadedCustomers && loadedCustomer && 
            <Modal 
                className="customer-profile__modal"
                show={showModal} 
                onCancel={closeTransferMoneyHandler} 
                header={"Transferer: " + loadedCustomer.name} 
                contentClass="customer-profile__modal-content"
                footerClass ="customer-profile__modal-actions" 
                footer = {<Button onClick = {closeTransferMoneyHandler}> Close </Button>}
                >
                    <div className='modal-form-div'>
                        <select
                        value={dropDownvalue}
                        onChange={event => setdropdownValue(event.currentTarget.value)}
                        >
                            <option hidden>Select Recipient</option>
                            {loadedCustomers.map(customer => (
                            <option key={customer.username} value={customer.username}>
                                {customer.username}
                            </option>
                            ))}
                        </select>
                        <input  value = {amountValue} type='text' placeholder='enter amount' onChange={event => setAmountValue(event.currentTarget.value)} required />
                        <Button onClick = { TransactionSubmitHandler }>Confirm Transfer </Button>
                    </div> 
                </Modal> 
            }
            
        </React.Fragment>
        );
}
export default CustomerProfile;