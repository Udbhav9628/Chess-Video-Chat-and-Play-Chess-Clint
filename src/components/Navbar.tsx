import '../style.css'
const Logo = require('../img/logo.png')
const searchIcon = require('../img/search.png')

const Navbar = () => {
    return (
        <div className='navbarStyle'>
            <div className='navContainer'>
                <div className='navLinks'>
                    <div>
                        <img id='Logo' src={Logo} alt='Logo' />
                    </div>
                    <ul className='List'>
                        <li className='ListItem'>Home</li>
                        <li className='ListItem'>About</li>
                        <li className='ListItem'>Works</li>
                        <li className='ListItem'>Contact</li>
                    </ul>
                </div>
                <div className='navIcons'>
                    <img id='navSearchbar' src={searchIcon} alt='Search' />
                    <button className='hireButton'>Hire Now</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar