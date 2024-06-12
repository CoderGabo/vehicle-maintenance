import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers'; // Importa el LocalizationProvider de x-date-pickers
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3'; // Importa el adaptador de fecha de Material-UI

import { Viagio_App } from './Viagio_App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Viagio_App />
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>,
)
