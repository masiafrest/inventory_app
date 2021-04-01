import {useState} from 'react'

import ShowCategorias from './components/ShowCategorias'
import AddCategorias from './components/AddCategoria'



export default function Categoria(){
 const [pageState, setPageState] = useState('get')
console.log(pageState)
return pageState === 'get' ? <ShowCategorias setPageState={setPageState}/>
: <AddCategorias setPageState={setPageState}/> 
}