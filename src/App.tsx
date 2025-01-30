import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { Login } from './pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
