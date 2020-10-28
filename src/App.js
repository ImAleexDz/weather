import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
  //state del formulario 
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const { ciudad, pais } = busqueda;

  //UseEffect para detectar los cambios
  useEffect(() => {
    const consultarApi = async () => {
      if(consultar) {
        const appid = '8cdc7103aae645083664b78c69b65ec0';
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`

        const respuesta = await fetch(URL);
        const resultado = await respuesta.json()

        setResultado(resultado);
        setConsultar(false);

        //Detecta si hubo resultados concretos en la consulta
        if(resultado.cod === "400") {
          setError(true)
        } else {
          setError(false)
        }
      }
      
    }
    consultarApi();
  }, [consultar]);

  //Carga condicional de componentes

  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultados"/>
  } else {
    componente = <Clima resultado={resultado}/>
  }

  return (
    <Fragment>
      <Header 
        titulo='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form 
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
