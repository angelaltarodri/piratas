import React,{useState, useEffect} from "react";
import axios from"axios";
import{Link, useHistory} from "react-router-dom";

const NuevoPirata = () => {
    const [nombre,setnombre] = useState("")

    const [imagen, setimagen] = useState("")

    const [tesoros, settesoros] = useState("")
    const [frase, setfrase] = useState("")
    const [posicion, setposicion] = useState("capitan")
    const [existecapitan, setexistecapitan] = useState(false)

    const [patapalo, setpatapalo] = useState(false)
    const [parcheojo, setparcheojo] = useState(false)
    const [garfio, setgarfio] = useState(false)

    const [errors, seterrors] = useState({});
    const history = useHistory();

    const guardarPirata = (e) => { 
        e.preventDefault();
        if(existecapitan && posicion == "capitan"){
            seterrors({
                posicion: {
                    message: "Ya existe un capitán."
                }
            })
        } else {
            axios.post("http://localhost:8000/api/piratas", {
                nombre,
                imagen,
                tesoros, 
                frase,
                posicion,
                patapalo,
                parcheojo,
                garfio
            })
                .then(res => {
                    history.push("/pirates")
                })
                .catch(err => {
                    console.log(posicion)
                    seterrors(err.response.data.errors)
                });
        }
    }

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
    },[])

    return(
        <div>
            <h1>Nuevo Pirata</h1>
            <form onSubmit={guardarPirata}>
                <div className="form-group">
                    <label htmlFor="nombre"> Nombre: </label>
                    <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e)=>setnombre(e.target.value)} className="form-control"/>
                    {errors.nombre ? <span className="text-danger"> {errors.nombre.message} </span> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="imagen">URL Imagen : </label>
                    <input type="text" id="imagen" name="imagen" value={imagen} onChange={(e)=>setimagen(e.target.value)} className="form-control"/>
                    {errors.imagen ? <span className="text-danger"> {errors.imagen.message} </span> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="tesoros"> tesoros: </label>
                    <input type="number" min="0" id="tesoros" name="tesoros" value={tesoros} onChange={(e)=>settesoros(e.target.value)} className="form-control"/>
                    {errors.tesoros ? <span className="text-danger"> {errors.tesoros.message} </span> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="frase"> Frase: </label>
                    <input type="text" id="frase" name="frase" value={frase} onChange={(e)=>setfrase(e.target.value)} className="form-control"/>
                    {errors.frase ? <span className="text-danger"> {errors.frase.message} </span> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="posicion"> Posicion en la tripulación: </label>
                    <select id="posicion" value={posicion} onChange={(e)=>setposicion(e.target.value)} className="form-select form-select-lg mb-3">
                        <option value="capitan">Capitán</option>
                        <option value="primeroficial">Primer Oficial</option>
                        <option value="cuartomaestro">Cuarto Maestro</option>
                        <option value="contramaestre">Contramaestre</option>
                        <option value="grumete">Grumete</option>
                    </select>
                    {errors.posicion ? <span className="text-danger"> {errors.posicion.message} </span> : null}
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="patapalo" name="patapalo" checked={patapalo} onChange={(e)=>setpatapalo(e.target.checked)} />
                    <label className="form-check-label" htmlFor="patapalo">Pata de palo</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="parcheojo" name="parcheojo" checked={parcheojo} onChange={(e)=>setparcheojo(e.target.checked)} />
                    <label className="form-check-label" htmlFor="parcheojo">Parche en el ojo</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="garfio" name="garfio" checked={garfio} onChange={(e)=>setgarfio(e.target.checked)} />
                    <label className="form-check-label" htmlFor="garfio">Garfio en mano</label>
                </div>

                <input type="submit"value="Guardar"className="btn btn-success"/>
            </form>
            <Link to="/" className="btn btn-primary">Inicio</Link>
        </div>
    )
}

export default NuevoPirata