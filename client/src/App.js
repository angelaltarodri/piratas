import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodosPiratas from './components/TodosPiratas'
import NuevoPirata from './components/NuevoPirata'
import Pirata from './components/Pirata'
import Error from './components/Error'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <TodosPiratas/> }/>
          <Route path="/pirates" exact render={() => <TodosPiratas/> }/>
          <Route path="/pirate/new" render={() => <NuevoPirata/> }/>
          <Route path="/pirate/:id" render={() => <Pirata/>}/>
          <Route path="/error" render={() => <Error/>}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
