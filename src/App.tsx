import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { context } from './components/AppProvider';
import MyLayout from './components/MyLayout';

function App() {
  const { routes } = useContext(context);

  return (
    <MyLayout>
      <Routes>
        {routes.map((item: any) => (
          <Route
            key={item.key}
            path={item.key?.replace('/admin/', '')}
            element={item.element}
          />
        ))}
      </Routes>
    </MyLayout>
  );
}

export default App;
