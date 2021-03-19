import { BrowserRouter } from 'react-router-dom'
import Routs from './routs/routs'
//import   Main  from './study/mail' <Main /> 
//import {Todo} from './component/client' <Todo/>
//import Login from './component/login/login' <Login/> 
//import {UserProfile} from './component/funcLoginINprofile/funcLoginINprofile'
import MainHome from './component/Home/MainHome'

function App() {
  return (
    <BrowserRouter>
      <Routs>
        <MainHome />
      </Routs>
    </BrowserRouter>
  );
}

export default App;