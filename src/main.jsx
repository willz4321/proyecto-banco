import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { AppRouter } from './router/AppRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} > 
       <BrowserRouter>
          <AppRouter />
       </BrowserRouter>
    </Provider>

  </React.StrictMode>
)
