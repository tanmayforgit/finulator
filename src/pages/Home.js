import Welcome from '../components/Welcome';
import { Fragment } from 'react';
import PresentFinancialSituation from "components/Users/PresentFinancialSituation";

const Home = () => {
  return (
    <Fragment>
      <Welcome/>
      <PresentFinancialSituation />
    </Fragment>
  );
}

export default Home