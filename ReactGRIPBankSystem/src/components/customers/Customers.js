import React, { useEffect ,useState } from 'react';
import CustomersList  from '../customers/CustomersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
const Customers = () =>{

    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();
    const [loadedCustomers , setloadedCustomers] = useState();



    useEffect(()=>{
        const sendRequest = async () =>{
            setIsLoading(true);
            try{
                console.log(process.env.REACT_APP_BACKEND_URL);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customers`);
                const responseData = await response.json();

                if (!response.ok){
                    throw new Error(responseData.message);
                }
                //console.log(responseData[Customers]);
                setloadedCustomers(responseData.Customers);
                setIsLoading(false);

            }catch(err){
                setError(err.message);
            }
            setIsLoading(false);

        };
        sendRequest();
    },[]);

    const clearError = () => {
        setError(null);
      };
    
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
             {isLoading && (
                <div className="center">
                   <LoadingSpinner />
                </div>
            )}

            {!isLoading && loadedCustomers && <CustomersList items={loadedCustomers} />}
        </React.Fragment>
    );
}
export default Customers;