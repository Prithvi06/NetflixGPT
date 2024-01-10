import { signOut } from "firebase/auth";
import { auth } from "../Utils/fireBase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../Utils/constants";
import { toggleGptSearch } from "../Utils/gptSlice";
import { changeLanguage } from "../Utils/configSlice";


const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
               const {uid, email, displayName, photoURL} = user;
               dispatch(addUser({uid:uid, email: email, displayName: displayName, photoURL: photoURL}));
               navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
          });
        //   Unsubscribe when component unmount;
          return () => unsubscribe();
    }, []);

    const handleGptSearch = () => {
        // Toggle GPT search button
        dispatch(toggleGptSearch());
    ;}

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
            <img 
                src={LOGO}
                width="180px"
                alt="logo"
            />
            {user && <div className="flex p-2 items-center">
                {showGptSearch && (
                    <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
                        {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                    </select>
                )}
                <button className="py-2 px-4 mx-4 my-2 bg-purple-800 rounded-lg text-white" onClick={handleGptSearch}> {showGptSearch ? "Homepage" : "GPT Search"}</button>
                <img className="w-10 h-10 rounded-md" src={user?.photoURL} alt="user-icon" />
                <button className="font-bold text-white p-2" onClick={handleSignOut}>(Sign Out)</button>
            </div>}
        </div>
    )
};

export default Header