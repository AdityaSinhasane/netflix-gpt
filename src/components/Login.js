import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {

  const [isSignInForm,setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage] = useState(null);
  
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);



  const handleButtonClick = () =>{
    // Validate the form data ::
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message = checkValidData(email.current.value,password.current.value);
    setErrorMessage(message );

    if(message) return;

    //Create a new user => Sign In /Sign Up Logic.
    if(!isSignInForm){
      //Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName:name.current.value, photoURL:USER_AVATAR,
        }).then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      
    
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }
    else{
      //Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);  
      });
    }
  };
  
  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/47c2bc92-5a2a-4f33-8f91-4314e9e62ef1/web/IN-en-20240916-TRIFECTA-perspective_72df5d07-cf3f-4530-9afd-8f1d92d7f1a8_large.jpg" alt="Logo"/>
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-xl bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>}
        <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
        <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"}</p>
      </form> 
    </div>
  )     
};

export default Login;
