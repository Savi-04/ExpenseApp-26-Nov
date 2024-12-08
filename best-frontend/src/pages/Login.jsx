import  { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    //setting up state login credential state variable

    const handleChange = (e) => {
        const { name, value } = e.target;

        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!(email && password)) {
            return handleError('both Email and Password is required')
        }
        try {
            const url = `${APIUrl}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            
            
            const { success, message, authorisation , name } = result;
            if (success) {


                handleSuccess(message);
                localStorage.setItem('token', authorisation);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    
                    navigate('/home');
                    console.log("navigate to /home is successful")
 
                }, 1000)
            } else  {
                handleError(message);

                return
            }
            
        } catch (err) {
            handleError(err);
        }
    }
//body of Login component
    return (
        <div className={styles.container}>
           <div className={styles.parition}>
            <div className={styles.left}>
                <h1>Welcome to the Expense Tracker</h1>
                <p>Take Control of Your Finances, One Expense at a Time.</p>
            </div>
            <div className={styles.right}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleLogin}>
                <div className={styles.field}>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
               <div className={styles.btn}>
               <button type='submit'>Login</button>
               </div>
               <div className={styles.span}>
               <span >Don&apos;t have an account ? 
                     <Link className={styles.signUp} to="/signup">   Signup</Link>
                </span>
               </div>
            </form>
            <ToastContainer />  

            </div>
           </div>
        </div>
    )
}

export default Login