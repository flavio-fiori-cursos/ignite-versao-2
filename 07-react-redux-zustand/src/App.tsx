import { store } from './store'
import { Player } from './pages/Player'

import './styles/global.css'

import { Provider as ReduxProvider } from 'react-redux'

function App() {
  return (
    <ReduxProvider store={store}>
      <Player />
    </ReduxProvider>
  )
}

export default App
