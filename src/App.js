import { BrowserRouter } from 'react-router-dom'
import Routs from './routs/routs'
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