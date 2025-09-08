import { Route, Routes } from "react-router-dom"
import CreateBook from "./pages/CreateBook"
import ShowBook from "./pages/ShowBook"
import EditBook from "./pages/EditBook"
import DeleteBook from "./pages/DeleteBook"
import Home from "./pages/Home"




function App() {

  return (
    <Routes >
      <Route path="/" element= {<Home/>}/>
      <Route path="/createbook" element= {<CreateBook/>}/>
      <Route path="/showbook/:id" element= {<ShowBook/>}/>
      <Route path="/editbook/:id" element= {<EditBook/>}/>
      <Route path="/deletebook/:id" element= {<DeleteBook/>}/>
    </Routes>
  )
}

export default App
