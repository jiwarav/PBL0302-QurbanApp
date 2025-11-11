import HomeImg from '../assets/home_page.webp'
import './Home.css';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <img src={HomeImg} alt="Home" style={{
                width: 400, 
                height: 'auto'
                }} />

            <p>Ini adalah web Qurban!</p>
            
        </div>
    )
}