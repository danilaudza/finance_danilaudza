import { Routes, Route } from "react-router-dom";
import MainScreen from './Screen/MainScreen';
import NotFound from './Screen/NotFound';

function App() {

  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainScreen />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
