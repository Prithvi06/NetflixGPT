import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Utils/fireBase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { BG_URL, USER_AVATAR } from "../Utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if(message) return; 

        if(isSignInForm) {
            // Sign-In
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            // Sign-Up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                      }).then(() => {
                        // Profile updated!
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({uid:uid, email: email, displayName: displayName, photoURL: photoURL}));
                        
                      }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message);
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
            }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img 
                    src={BG_URL}
                    alt="bg-imag"
                />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute text-white bg-black right-0 left-0 mx-auto p-12 my-36 bg-opacity-80">
                <h1 className="font-bold text-3xl py-4 m-2">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                    <input ref={name} type="text" placeholder="Full Name" className="p-3 m-2 w-full bg-gray-700 rounded-md"/>
                )}
                <input ref={email} type="text" placeholder="Email Address" className="p-3 m-2 w-full bg-gray-700 rounded-md"/>
                <input ref={password} type="password" placeholder="Password" className="p-3 m-2 w-full bg-gray-700 rounded-md"/>
                <p className="font-bold text-red-500 px-2">{errorMessage}</p>
                <button className="p-2  mx-2 my-4 bg-red-700 w-full rounded-md" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registerd? Sign In Now"}
                </p>
            </form>
        </div>
    )
};

export default Login