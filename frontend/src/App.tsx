import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from './theme/theme'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home />} />
      <Route path='/1' element={<Home />} />
      <Route path='/2' element={<Home />} />
      <Route path='/3' element={<Home />} />
      <Route path='/4' element={<Home />} />
    </Route>
  )
)

const App = () => {
  const theme = createMuiTheme()
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App;