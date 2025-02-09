import { Route, Routes } from 'react-router-dom';
import { Layout, ProtectedRoute } from './components';
import { Feed, Home, Login, NotFound, Profile, Search } from './pages';
import { FullPost } from './pages/FullPost/FullPost';

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
        <Route
          path='/:id'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/p/:id'
          element={
            <ProtectedRoute>
              <FullPost />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
