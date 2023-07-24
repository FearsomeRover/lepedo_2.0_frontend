import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SummaryPage from "./components/pages/SummaryPage";
import ListPage from "./components/pages/ListPage";
import Root from "./components/pages/Root";
import NewUser from "./components/pages/newUser";

const router = createBrowserRouter([
  {path: '/', element:<Root/>, children:[
    {path: '/', element: <SummaryPage/>},
    {path: '/list', element:<ListPage/>}
  ]},
  {path:'/forms', element:<NewUser/>}
])

function App(){
  return <RouterProvider router={router}/>
}

export default App;
