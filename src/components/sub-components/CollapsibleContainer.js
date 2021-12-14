import '../../styles/CollapsibleContainer.css'


const CollapsibleContainer = ({children, isVisible}) => {

    return <div className={`CollapsibleContainer`}>{isVisible ? children : null}</div>

}

export default CollapsibleContainer