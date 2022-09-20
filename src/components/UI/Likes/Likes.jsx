import styles from './Likes.module.css'


const InfoBox = ({hovered}) =>{
    return(
        <div className={styles.infoBox}>
                        <section className={styles.linksBox}>
                        <div>
                            <div className={styles.play}> <Link to=''><BsFillPlayFill /></Link> </div>
                            <div className={styles.circle}><Link to=''><BsPlusLg /></Link></div>
                            <div className={styles.circle}><Link to=''><BsHandThumbsUp /></Link></div>
                        </div>
                         <div>
                         <div className={styles.circle}><Link to=''><BsChevronDown /></Link> </div>
                         </div>   
                        </section>
    </div> 

    )
}

export default InfoBox