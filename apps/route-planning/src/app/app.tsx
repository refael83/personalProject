// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import Home from './page/Home';


export function App() {
  return (
    <div>
      <Home />
      <h1 className='text-green-700 '>
      Hello world!
    </h1>
    </div>
  );
}

export default App;
