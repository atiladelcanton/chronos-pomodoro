import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { FormTask } from '../../components/FormTask';
import { MainTemplate } from '../../templates/MainTemplate';

export function Home() {
  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <FormTask />
      </Container>
    </MainTemplate>
  );
}
