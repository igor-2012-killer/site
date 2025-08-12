import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');
    const [fadeOut, setFadeOut] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('accessGranted') === 'true') {
            router.push('/main');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (answer.trim().toLowerCase() === 'барсик') {
            localStorage.setItem('accessGranted', 'true');
            setFadeOut(true);
            setTimeout(() => {
                router.push('/main');
            }, 500);
        } else {
            setError('❌ Неправильный ответ, попробуй еще!');
        }
    };

    return (
        <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ''}`}>
            <div className={styles.card}>
                <h1 className={styles.title}>❓ Ответь на вопрос</h1>
                <p className={styles.subtitle}>Как звали моего кота?</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Твой ответ"
                        className={styles.input}
                    />
                    <button
                        type="submit"
                        className={styles.button}
                    >
                        Отправить
                    </button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}
