import { BrowserRouter, Route, } from 'react-router-dom'
import './App.css';
import Billboard from './component/billboard/Billboard';
import Compact from './component/compact/Compact';
import Home from './component/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route path='/Compact' component={Compact} />
      <Route path='/Billboard' component={Billboard} />
    </BrowserRouter>
  );
}

export default App;
