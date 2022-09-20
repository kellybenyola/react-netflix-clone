import { Link } from "react-router-dom"
import './FooterIcon.scss'


const FooterIcon = ({href, children}) =>{

    return(
        <Link className='socialIcon' to={href}>{children}</Link>
    )
}

export default FooterIcon