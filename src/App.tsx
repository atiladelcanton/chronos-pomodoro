import './styles/theme.css';
import './styles/global.css';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './routers/MainRouers';
import { SpeedInsights } from '@vercel/speed-insights/react';
function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
        <SpeedInsights />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
export default App;
