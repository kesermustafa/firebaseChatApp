import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from "../firebase/index.js";
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import Messages from "../components/Messages.jsx";
import EmojiPicker from 'emoji-picker-react';


const ChatPage = ({ room, setRoom }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const lastMsg = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsOpen(false);

        if (!text.trim()) {
            return;
        }

        const messagesCol = collection(db, 'messages');

        await addDoc(messagesCol, {
            room: room,
            text: text,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL,
            },
            createdAt: serverTimestamp(),
        });

        setText(''); // Mesaj gönderildikten sonra input'u temizle
    };

    useEffect(() => {
        const messagesColl = collection(db, 'messages');
        const q = query(messagesColl, where('room', '==', room), orderBy('createdAt', 'asc'));

        const unsub = onSnapshot(q, (snapshot) => {
            let tempMsg = [];
            snapshot.docs.forEach((doc) => {
                tempMsg.push(doc.data());
            });

            setMessages(tempMsg);
            lastMsg.current.scrollIntoView({ behavior: 'smooth' });
        });

        return () => {
            unsub();
        };
    }, [room]);

    useEffect(() => {
        if (messages.length > 0) {
            lastMsg.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);


    const handleClick = () => {
        setRoom(null);
        localStorage.removeItem('chatRoom');
    }

    return (
        <div className="chat-page">
            <header>
                <p>{auth?.currentUser?.displayName}</p>
                <p style={{ textTransform: 'capitalize', color: 'orange', fontWeight: 'bold' }}>{room}</p>
                <button onClick={handleClick}>Farkli Oda</button>

            </header>

            <main>
                {messages.length > 0 ? (
                    messages.map((data, index) => <Messages key={index} data={data} />)
                ) : (
                    <p className="warn">Ilk mesaji siz yazin :)</p>
                )}

                <div ref={lastMsg} />
            </main>

            <form onSubmit={handleSubmit} className="message-form">
                <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="mesajinizi yaziniz" />
                <div className="emoji">
                    <EmojiPicker
                        onEmojiClick={(e) => setText(text + e.emoji)}
                        open={isOpen}
                        skinTonePickerLocation="PREVIEW"
                    />
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>
                        😃
                    </button>
                </div>
                <button type="submit">Gonder</button>
            </form>
        </div>
    );
};

export default ChatPage;
