import React from 'react'
import {Link} from 'react-router-dom'

import './Home.css'

//todo:
// render links based on signed in or not
// change signout link to styled button

const Home = props => {

  return (<>



    <header>
    <h1>Finance Tracker</h1>
    <h6> Keeping track of your money</h6>
    </header>

    <section id="about">
      <p>
        Finance tracker allows you to create your own private profile where you can then add each financial transaction
        and categorise them which allows you to see exactly where your money is going each month.
      </p>
    </section>

    <section id="ex">
      <p>Examples could go here</p>
    </section>


    <footer>
      <p>
        © John Thomson
      </p>
    </footer>
  </>)
}
export default Home
