import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PokemonDetails from '../pages/PokemonDetails';
import PokemonList from '../pages/PokemonList';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PokemonList />,
    },
    {
      path: "/pokemon/:id",
      element: <PokemonDetails />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
