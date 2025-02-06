import { Route, Routes } from 'react-router-dom';
import { Layout, ProtectedRoute } from './components';
import { Feed, Home, Login, NotFound, Search } from './pages';

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
        <Route
          path='/feed'
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path='/search'
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
