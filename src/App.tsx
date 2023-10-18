import Entry from './components/Entry';
import ChessPage from './components/ChessPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Entry} />
        <Route path="/PlayChess" component={ChessPage} />
      </Switch>
    </Router>
  )
}

export default App