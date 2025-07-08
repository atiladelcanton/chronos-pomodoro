import { PlayCircleIcon } from 'lucide-react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';

export function FormTask() {
  return (
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
  );
}
