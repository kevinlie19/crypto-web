import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ViewportContext from '../context/ViewportContext';
import Home from './Home';

const RootRoutes = () => {
  return (
    <BrowserRouter>
      <ViewportContext>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ViewportContext>
    </BrowserRouter>
  );
};

export default RootRoutes;
