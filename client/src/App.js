import {Routes, Route} from 'react-router-dom'

import Home from './components/home'
import Navigation from './components/navigation'
import About from './components/about'
import Signin from './components/sign-in-form/sign-in-form.component'

import Signup from './components/sign-up-form/sign-up-form.component'
function App() {
  return (
      <Routes>
        <Route path='/' element = {<Navigation/>}>
              <Route index element = {<Home />} />
              <Route path='about' element = {<About/>} />
              <Route path='signin' element = {<Signin/>} />
              <Route path='signup' element = {<Signup/>} />
        </Route>
      </Routes>
     
  );
}

export default App;
