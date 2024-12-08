import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';
import styles from "./Home.module.css"
import UserImage from "../assets/profile.png"

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);   //this holds the current state of updated transactions
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses])



    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;
            const headers = {
                headers: {
                    'Authorisation': localStorage.getItem('token')
                },
                method: "DELETE"
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                method: "GET",                     //made this change forgot to mention request type
                headers: {
                    'Authorisation': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }



    const addTransaction = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            
            const headers = {
                headers: {
                    'Authorisation': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }


    const updateTransaction = async (data, id) => {

        const valuesToUpdate = (({ text, amount }) => ({ text, amount }))(data);
       
        try {

            
            const url = `${APIUrl}/expenses/${id}`;
            const options = {
                method: "PUT",
                headers: {
                    'Authorisation': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valuesToUpdate)
            };
            const response = await fetch(url, options);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }



    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <div>
            <div className={styles.users}>
                <div className={styles.userDetail}>
                <div className={styles.userImage}>
                    <img src={UserImage}></img>
                </div>
                <div>
                <h1>Welcome {loggedInUser}</h1>
                </div>
                </div>
                <button className={styles.logOut} onClick={handleLogout}>Logout</button>
            </div>
            <ExpenseDetails
                incomeAmt={incomeAmt}
                expenseAmt={expenseAmt}
            />

            <div className={styles.expenseForm}>
            <ExpenseForm
                addTransaction={addTransaction} />

            <ExpenseTable
                expenses={expenses}
                deleteExpens={deleteExpens}
                updateTransaction={updateTransaction}
            />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home