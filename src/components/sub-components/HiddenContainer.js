import '../../styles/HiddenContainer.css'


const HiddenContainer = ({children, isVisible}) => {

    return <div className={`HiddenContainer`}>{isVisible ? children : null}</div>

}

export default HiddenContainer