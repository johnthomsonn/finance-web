exports.isSignedIn = () => {
  const loggedCookie = getCookie("localToken")
  console.log(loggedCookie)
  if(loggedCookie)
    return true
  return false
}
