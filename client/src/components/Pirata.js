import React, {useState, useEffect} from "react";
import axios from "axios";
import{useHistory, useParams, Link}from "react-router-dom";

const Pirata = () => {
    const {id} = useParams()
    
    const [nombre,setnombre] = useState("")

    const [imagen, setimagen] = useState("")

    const [tesoros, settesoros] = useState("")
    const [frase, setfrase] = useState("")
    const [posicion, setposicion] = useState("capitan")
    const [existecapitan, setexistecapitan] = useState(false)

    const [patapalo, setpatapalo] = useState(false)
    const [parcheojo, setparcheojo] = useState(false)
    const [garfio, setgarfio] = useState(false)

    const [errors,seterrors] = useState({});
    const history = useHistory();

    useEffect(() =>{
        axios.get("http://localhost:8000/api/piratas")
        .then(res=>{
            const piratas = res.data
            const capitan = piratas.find(pirata=> pirata.posicion == "capitan")
            if(capitan){
                setexistecapitan(true)
            }
        })
        .catch(err=>{
            console.error(err)
        })
        axios.get("http://localhost:8000/api/piratas/" + id)
            .then(res => {
                setnombre(res.data.nombre)
                setimagen(res.data.imagen)
                settesoros(res.data.tesoros)
                setfrase(res.data.frase)
                setposicion(res.data.posicion)
                if(res.data.posicion == "capitan"){
                    setexistecapitan(false)
                }
                setpatapalo(res.data.patapalo)
                setparcheojo(res.data.parcheojo)
                setgarfio(res.data.garfio)

            })
            .catch(err => {
                history.push("/error")
            })
    },[id, history])
    
    const actualizarPirata = (e) => {
        e.preventDefault()

        if(existecapitan && posicion == "capitan"){
            seterrors({
                posicion: {
                    message: "Ya existe un capitán."
                }
            })
        } else {
            axios.put("http://localhost:8000/api/piratas/" + id, {
                nombre,
                imagen,
                tesoros, 
                frase,
                posicion,
                patapalo,
                parcheojo,
                garfio
            })
                .then(res => history.push("/"))
                .catch(err=> seterrors(err.response.data.errors))
        }
    }

    return (
        <div>
            <h1>Pirata {nombre} </h1>
            <form onSubmit={actualizarPirata}>
                <img alt="" style={{width:"150px"}} src={imagen}/>
                <h3> {frase}</h3>
                <div className="card">
                    <h3>Acerca de: </h3> 
                    <div>Tesoros : {tesoros}</div>
                    <div>Posicion: {posicion}</div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="patapalo" name="patapalo" checked={patapalo} onChange={(e)=>setpatapalo(e.target.checked)} style={{display:"none"}} />
                        <div className="btn btn-info">Pata de palo</div> : {" "}
                        <label className={ patapalo ? "btn btn-success" : "btn btn-danger"} htmlFor="patapalo">{ patapalo ? "SI" : "NO"}</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="parcheojo" name="parcheojo" checked={parcheojo} onChange={(e)=>setparcheojo(e.target.checked)} style={{display:"none"}} />
                        <div className="btn btn-info">Parche en el ojo</div> : {" "}
                        <label className={ parcheojo ? "btn btn-success" : "btn btn-danger"} htmlFor="parcheojo">{ parcheojo ? "SI" : "NO"}</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="garfio" name="garfio" checked={garfio} onChange={(e)=>setgarfio(e.target.checked)} style={{display:"none"}} />
                        <div className="btn btn-info">Garfio en la mano</div> : {" "}
                        <label className={ garfio ? "btn btn-success" : "btn btn-danger"} htmlFor="garfio">{ garfio ? "SI" : "NO"}</label>
                    </div>
                </div>
                <input type="submit"value="Guardar"className="btn btn-success"/>
            </form>
            <Link to="/" className="btn btn-primary">Inicio</Link>
        </div>
    )
}

export default Pirata