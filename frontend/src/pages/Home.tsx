import { useNavigate } from 'react-router-dom';
import '../styles/Home.less';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="Home">
            <div className="Home__title">
                <span className="Home__title-name">Aleksandr</span>
                <span className="Home__title-ampersand" onClick={() => navigate('/admin/auth')}>
                    &
                </span>
                <span className="Home__title-name">Olga</span>
            </div>

            <div className="Home__date">
                <span>11|07|2026</span>
            </div>
        </div>
    );
};

export default Home;
