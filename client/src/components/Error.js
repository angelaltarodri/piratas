import {Link} from 'react-router-dom'

const Error = () => {
    return (
        <div>
            <h4>No encontramos el pirata, intenta darlo de alta.</h4>
            <Link to="/pirate/new" className="btn btn-success">Crea un nuevo pirata</Link>
        </div>
    )
}

export default Error