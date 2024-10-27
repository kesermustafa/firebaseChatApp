import {signInWithPopup} from 'firebase/auth'
import {auth, provider} from "../firebase/index.js";

const LoginPage = ({setIsAuth, setUser}) => {

    const handleClick = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            setIsAuth(true)
            setUser(response.user)
            localStorage.setItem('token', JSON.stringify(response.user.refreshToken));
        } catch (error) {
            console.error("Google ile giriş hatası:", error.message);
        }
    }

    return (
        <div className="container">
            <div className="login">
                <div>
                    <img  src="./chatLogo.png" alt=""/>
                    <h2>Chat Odasi</h2>
                </div>
                <p>Devam etmek icin giris yapiniz</p>

                <button onClick={handleClick}>
                    <img width={30} src="/google.png" alt="google logo"/>
                    Google ile Gir
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
