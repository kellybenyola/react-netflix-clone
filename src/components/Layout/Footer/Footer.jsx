import { Link } from 'react-router-dom'
import './Footer.scss'
import FooterIcon from './FooterIcon/FooterIcon'
import {FaFacebookF, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
import tmdbLogo from '../../../Images/tmdb_logo_long.svg'
const Footer = () =>{
    const year = new Date().getFullYear()
    return(
        <div className='footerContainer'>
            <section className='footerSocialsSection'>
                <FooterIcon href=''><FaFacebookF /></FooterIcon>
                <FooterIcon href=''><FaInstagram /></FooterIcon>
                <FooterIcon href=''><FaTwitter /></FooterIcon>
                <FooterIcon href=''><FaYoutube /></FooterIcon>
            </section>

            <section className='footerLinksSection'>
                <div className='footerLinksCol'>
                    <span className='footerLink'>Audio Description</span>
                    <span className='footerLink'>Investor Relations</span>
                    <span className='footerLink'>Legal Notices</span>
                </div>
                <div className='footerLinksCol'>
                    <span className='footerLink'>Help Center</span>
                    <span className='footerLink'>Jobs</span>
                    <span className='footerLink'>Cookie Prefences</span>
                </div>
                <div className='footerLinksCol'>
                    <span className='footerLink'>Gift Cards</span>
                    <span className='footerLink'>Terms of Use</span>
                    <span className='footerLink'>Coperate Information</span>
                </div>
                <div className='footerLinksCol'>
                    <span className='footerLink'>Media Center</span>
                    <span className='footerLink'>Privacy</span>
                    <span className='footerLink'>Contact Us</span>
                </div>
            </section>

            <section className='footerSection'>
                <div className='footerBox'>
                    <Link className='detailsLink' to='/about'>Site Details</Link>
                </div>
            </section>
            <section className='footerCopyRightSection'>
                <div>
                    <span>Code Ⓒ Kelly Benyola {year}</span>
                </div>
                <div className='tmdb'>
                    <img src={tmdbLogo} alt='TDMB Logo' />
                    
                    <span>The content of this website is dynamically powered by TMDB.</span>
                </div>
            </section>
        </div>
    )
}

export default Footer