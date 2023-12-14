import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { RecipeDetail } from "./pages/RecipeDetail"
import { createGlobalStyle } from "styled-components";

function App() {

  const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html,
    body,
    :root {
      font-family: 'Montserrat', sans-serif;
      scroll-behavior: smooth;
    }
    
    button,
    a {
      font-family: 'Montserrat', sans-serif;
      cursor: pointer;
    }

    img{
      user-select: none;
    }

    ::-webkit-scrollbar {
    display: none;
  }
  `;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Route>
    )
  )

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  )
}

export default App
