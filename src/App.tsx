import { Route, Routes } from 'react-router-dom';
import { Layout, ProtectedRoute } from './components';
import { Home, Login, NotFound } from './pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
