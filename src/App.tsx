import { Route, Routes } from 'react-router-dom';
import { Layout, ProtectedRoute } from './components';
import { Home, Login } from './pages';

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
      </Routes>
    </Layout>
  );
}

export default App;
