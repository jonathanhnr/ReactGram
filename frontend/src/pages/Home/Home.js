import './Home.css';
import Container from '../../components/Container';
import NavBar from '../../components/NavBar';
import { useSelector } from 'react-redux';
const Home = () => {
  const { user, loading } = useSelector(state => state.user);
  console.log()
  return (
    <div className={"container"}>
      <NavBar/>
      <Container />
    </div>
  );
};
export default Home;
