import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SnippetGenerator from './components/SnippetGenerator';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <SnippetGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
