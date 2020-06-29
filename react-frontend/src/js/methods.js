exports.isSignedIn = () => {
  const loggedCookie = document.cookie[0]
  if(loggedCookie)
    return true
  return false
}

exports.validateUsername = username => {
return username.match(/[@<>'";,:\\]/gi)
}
