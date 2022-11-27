import { Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"
import {Logo,FormRow,BigSidebar,SmallSidebar,Navbar} from '../../components'


function SharedLayout() {
  return <Wrapper>

    <main className="dashboard">

      <SmallSidebar/>
      <BigSidebar/>

      <div>
        <Navbar></Navbar>
        <div className="dashboard-page">
          <Outlet/>
        </div>
      </div>








    </main>


   </Wrapper>
}

export default SharedLayout