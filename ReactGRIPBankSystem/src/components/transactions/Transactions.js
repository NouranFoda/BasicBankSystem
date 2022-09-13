import React ,{ useState , useEffect }from 'react';
import TransactionsList from './TransactionsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Transactions = () =>{

    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();
    const [loadedTransactions , setLoadedTransactions] = useState();

    useEffect(()=>{
        const sendRequest = async () =>{
            setIsLoading(true);
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions`);
                const responseData = await response.json();

                if (!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedTransactions(responseData.Transactions);
                setIsLoading(false);

            }catch(err){
                setError(err.message);
            }
            setIsLoading(false);

        };
        sendRequest();
    },[]);

    const clearError = () =>{
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
        {!isLoading && loadedTransactions && <TransactionsList items={loadedTransactions} />}
        </React.Fragment>
    );
}
export default Transactions;