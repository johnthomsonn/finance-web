exports.isSignedIn = () => {
  const loggedCookie = document.cookie[0]
  console.log(loggedCookie)
  if(loggedCookie)
    return false
  return false
}

exports.validateUsername = username => {
return username.match(/[@<>'";,:\\]/gi)
}

exports.validateEmail = email => {
  return email.test(/^\w+@\w+\.\w+$/gi)
}
