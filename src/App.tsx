import { Route, Routes } from 'react-router-dom';
import PageShopper from './components/Pages/PageShopper';
import PageShopList from './components/Pages/PageShopList';
import PageShopItem from './components/Pages/PageShopItem';
import PageAdmin from './components/Pages/PageAdmin';
import PagePrefs from './components/Pages/PagePrefs';
import NavbarComp from './components/bootstrapComp/NavbarComp';
import { LoginContext } from './LoginContext';
import { getLoginInfoFromJWT, retrieveJWT } from './JWTManager';
import React from 'react';

function App() {
  const [loginInfo, setLoginInfo] = React.useState(getLoginInfoFromJWT(retrieveJWT()));
  return (
    <div>
      <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
        <NavbarComp />
        <Routes>
          <Route path="*" element={<PageShopper />} />
          <Route path="/shopper" element={<PageShopper />} />
          <Route path="/shoplist/:shoplistID" element={<PageShopList />} />
          <Route path="/shopitem/:shopitemID" element={<PageShopItem />} />
          <Route path="/admin" element={<PageAdmin />} />
          <Route path="/prefs" element={<PagePrefs />} />
        </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
