import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';

import './styles/theme.css';
import './styles/global.css';
import { CountDown } from './components/CountDown';
import { Input } from './components/Input';
import { Cycles } from './components/Cycles';
import { Button } from './components/Button';
import { PlayCircleIcon } from 'lucide-react';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <form className='form'>
          <div className='formRow'>
            <Input
              type='text'
              id='meuInput'
              placeholder='Defina sua tarefa...'
              labelText='Tarefa'
            />
          </div>
          <div className='formRow'>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className='formRow'>
            <Cycles />
          </div>
          <div className='formRow'>
            <Button icon={<PlayCircleIcon />} color='green' />
          </div>
        </form>
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  );
}
export default App;
