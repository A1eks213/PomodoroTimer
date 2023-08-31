import { Header } from './Header';
import { Content } from './Content';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { StartPage } from './Content/StartPage';
import { StatisticPage } from './Content/StatisticPage';
import { Provider } from 'react-redux';
import  { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from './store/store';
export const store = createStore(rootReducer, composeWithDevTools()) 
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Header />
    <Content>
      <Routes>
        <Route path={'/'}  element={ <Navigate to={'/pomodoro'}/> }/>
        <Route path={'/auth'}  element={ <Navigate to={'/pomodoro'}/> }/>
        <Route path={'/pomodoro'} element={ <StartPage/> }/>
        <Route path={'/statistic'} element={ <StatisticPage/> }/>
      </Routes>
    </Content>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
