exports.isSignedIn = () => {
  const loggedCookie = document.cookie[0]
  console.log(loggedCookie)
  if(loggedCookie)
    return true
  return false
}
