import React from 'react'

const User = props => {

  return (<>
    {props.match.params.user}
  </>)
}

export default User;
