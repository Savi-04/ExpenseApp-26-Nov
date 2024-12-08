import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import styles from './SignUp.module.css'
import { APIUrl, handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `${APIUrl}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className={styles.container}>
                   <div className={styles.parition}>
                   <div className={styles.left}>
                <h1>Welcome to the Expense Tracker</h1>
                <p>Take Control of Your Finances, One Expense at a Time.</p>
            </div>
            <div className={styles.right}>
            <h1>Signup</h1>
            <form className={styles.form} onSubmit={handleSignup}>
                <div className={styles.field}>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <div className={styles.btn}>
                <button type='submit'>Signup</button>

                </div>

                <div className={styles.span}>
                <span>Already have an account ? 
                    <Link className={styles.signUp} to="/login">Login</Link>
                </span>
                </div>

                
            </form>
            <ToastContainer />
</div>
                   </div>

            
        </div>
    )
}

export default Signup