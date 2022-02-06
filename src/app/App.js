import { useState } from "react";
import AppRouter from './routes';
import GlobalContext from './context/GlobalContext';



function App() {
  const [user, setUser] = useState({});



  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      <AppRouter />
    </GlobalContext.Provider>
  );
}

export default App;
