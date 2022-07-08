import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
const TodosPiratas = () => {
    
    const [piratas, setpiratas] = useState([])

    useEffect(() =>{
        axios.get("http://localhost:8000/api/piratas")
            .then(res=>{
                setpiratas(res.data)
            })
            .catch(err=>{
                console.error(err)
            })
    },[])

    const borrarPirata = (idPirata) => {
        axios.delete("http://localhost:8000/api/piratas/" + idPirata) 
            .then(res=>{
                //Actualizo lista filter
                let nuevaListPiratas = piratas.filter(pirata=>pirata._id !== idPirata)
                setpiratas(nuevaListPiratas)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Tripulación Pirata</h1>
            <Link className="btn btn-success" to="/pirate/new">Añadir Pirata</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        piratas.map((pirata, index) => (
                            <tr key={index}>
                                <td>{pirata.nombre}</td>
                                <td><img alt="" style={{width:"150px"}} src={pirata.imagen}/></td>
                                <td>
                                    <Link className="btn btn-info" to={`/pirate/${pirata._id}`}>View Pirate</Link>
                                    <button className="btn btn-danger" onClick={()=>borrarPirata(pirata._id)}>Camina por la borda</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TodosPiratas