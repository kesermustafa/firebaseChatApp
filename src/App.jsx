import { auth, provider } from "./firebase";
import {useState} from "react";
import { signInWithPopup } from "firebase/auth";
import './App.css'

function App() {

    const [user, setUser] = useState(null);
    const [userPhoto, setUserPhoto] = useState(null);

    const handleClick = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            setUser(response.user);
            setUserPhoto(response.user.photoURL.replace('=s96-c', '=s300-c'));
        } catch (error) {
            console.error("Google ile giriş hatası:", error);
        }
    };

    const userImage = userPhoto ? userPhoto : "./public/profileImage.webp"

    return (
        <>
            <div>
                {user ? (
                    <div className="App">

                        <img
                            src={userImage}
                            alt="User Profile"
                            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                            onError={() => console.log("Resim yüklenemedi")}
                        />
                        <h3>{user.displayName}</h3>
                        <h5>{user.email}</h5>
                    </div>
                ) : (
                    <button onClick={handleClick}>Google ile giriş yap</button>
                )}
            </div>
        </>
    );
}

export default App;
