import React from 'react'

const Page404 = props => {

  return (<>
    <div className=" jumbotron alert-danger" style={{display : "flex", justifyContent:"center", fontSize : "1.75rem", border : "2px solid #a8423d"}}>
      {` ${props.location.pathname.substr(1)} Page cannot be found`}
    </div>
  </>)
}

export default Page404
