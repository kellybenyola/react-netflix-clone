
import styles from './Button.module.css'

const Button = ({onClick, isDisabled, children, onMouseEnter, onMouseOut, btnStyles, style}) =>{
    const {button} = styles;
    return(
        <button
        onClick={onClick}
        className={`${button} ${btnStyles}`}
        disabled={isDisabled}
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
        style={style}
      >
       {children}
      </button>
    )
}

export default Button