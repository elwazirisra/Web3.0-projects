//import { Navbar, Footer, Services, Transactions, Welcome, Loader} from '/Users/israelwazir/Desktop/web3-website/client/src/components'
import { NavBar, Welcome, Footer, Transactions, Loader } from './components';

function App() {
  return (
   <>

  <div  className="min-h-screen">
    <div className="gradient-bg-welcome">
  
      <NavBar />
      <Welcome />
    </div>

    <Transactions />
    
    <Footer />
 
 
    </div>
  </>
  
  )
}

export default App;
