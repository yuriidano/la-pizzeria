import { Route, Routes } from 'react-router'
import './App.css'
import { Header } from './components/Header/Header'
import Home from './pages/Home'


 const App = () => {

     return (
         <div className='flex flex-col min-h-full overflow-hidden'>
             <div className='container'>
                <Header />
                 <main className='flex-grow-1 flex-shrink-1 flex-basis-full'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                    </Routes>
                 </main>
             </div>
         </div>
     )
 }

export default App
