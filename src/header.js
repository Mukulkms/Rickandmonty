import logoImage from './logo.17a7b2f2883b56b71238.jpg';
import { Link } from 'react-router-dom';
const Header = () =>{
  return(
    <div className="navbar">
            <div className="header">
            <Link to={"/"}><img src={logoImage} alt="" className="logo" /></Link>
            </div>
            <div className="button-grp">
                <div className="grp">
                    <button><Link to="/Charpage">CHARACTERS</Link></button>
                    <button> <Link to="/Episodespage">EPISODES</Link></button>
                </div>
                <div className="login">
                    <button><Link to={"/"}>LOGIN</Link> </button>
                </div>
            </div>
        </div>
  )
}

export default Header;
