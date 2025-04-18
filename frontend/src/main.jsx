import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store , persistor} from './redux/store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import TaskContextProvider from './context/TaskContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* for redux state */}
    <PersistGate loading={null} persistor={persistor}>
      <TaskContextProvider>  {/* for context state */}
        <App />
      </TaskContextProvider>
    </PersistGate>
  </Provider>,
)
