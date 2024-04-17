import React from 'react';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Ditto from './Ditto';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
        <Route path="/"         element={<Navigate to="/Ditto"/>}/>
          <Route path="/Ditto/*" element={<Ditto/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;