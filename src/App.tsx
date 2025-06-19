import { Route, Routes } from 'react-router'
import './App.css'
import { Header } from './components/Header/Header'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import { lazy } from 'react'
import { withLazy } from './hoc/withLazy'

const CartPage = lazy(() => import('./pages/Cart/Cart'));
const PizzaPage = lazy(() => import('./pages/PizzaPage/PizzaPage'));
const CartLazy = withLazy(CartPage);
const PizzaLazy = withLazy(PizzaPage);

const App = () => {

    return (
        <div className='flex flex-col min-h-full overflow-hidden'>
            <div className='container'>
                <div className='min-h-263 flex flex-col bg-white !pr-[clamp(15px,0.481px+4.537vw,64px)] !pl-[clamp(15px,-4.852px+6.204vw,82px)] !mx-2 !rounded-md  md:!mx-4 md:!rounded-2xl'>
                    <Header />
                    <main className='!min-h-full !flex-grow-1 !flex-shrink-1 !flex-basis-full '>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/cart' element={<CartLazy />} />
                            <Route path='/items/:pizzaId' element={<PizzaLazy />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default App
