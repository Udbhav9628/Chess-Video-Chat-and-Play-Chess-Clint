import '../style.css'
import { useHistory } from 'react-router-dom';
const line = require('../img/line.png')

const Entry = () => {

    const history = useHistory();

    return (
        <div className='container'>
            <div className='heroContainer'>
                <div className="mainContent">
                    <div id="mainContentLeft">
                        <h1 id='h1Hero' style={{
                            textAlign: 'center'
                        }}>TeleChess</h1>
                        <div id='LineImg'>
                            <img src={line} alt="Line" height={'5px'} />
                            <h2 style={{
                                color: "#da4ea2",
                                fontSize: '1.4rem',
                                textAlign: 'center'
                            }}>Checkmate Across Screens</h2>
                        </div>
                        <p style={{
                            fontSize: '1.4rem',
                            color: "lightgray",
                            textAlign: 'center'
                        }}>Play Chess Face-to-Face Online with Friends!</p>
                        <button onClick={() => history.push('/PlayChess')} className='playButton'>Play Now</button>
                    </div>
                    <div id="mainContentRight">
                        <img id='Modal' src={'https://cdn3d.iconscout.com/3d/premium/thumb/chess-5524959-4617609.png'} alt="3d Modal" width={'400px'} height={'400px'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Entry