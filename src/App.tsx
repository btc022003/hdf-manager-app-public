import { Routes, Route } from 'react-router-dom';
import MyLayout from './components/MyLayout';
import ArticleCategories from './pages/articles/categories';
import ArticleList from './pages/articles/list';
import Dashboard from './pages/dashboard';
import MedicineCategories from './pages/medicine/categories';
import MedicineList from './pages/medicine/list';
import Users from './pages/user';

function App() {
  return (
    <MyLayout>
      <Routes>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='users' element={<Users />} />
        <Route path='articles/list' element={<ArticleList />} />
        <Route path='articles/categories' element={<ArticleCategories />} />
        <Route path='medicine/list' element={<MedicineList />} />
        <Route path='medicine/categories' element={<MedicineCategories />} />
      </Routes>
    </MyLayout>
  );
}

export default App;
