exports.isSignedIn = () => {

  const allCookies = document.cookie.split(";");
  let isLogged = undefined;
  allCookies.forEach(cookieStr => {
    const cookies = cookieStr.split("=");
    if (cookies[0] == "localToken")
      isLogged = cookies[1];
  })

  if (isLogged !== undefined)
    return isLogged
  return false
}

exports.validateUsername = username => {
  return username.match(/[@<>'";,:\\]/gi)
}

exports.validateEmail = email => {
  return /^\w+@\w+\.\w+(\.\w+)?$/gi.test(email)
}

exports.signOut = (next) => {
  if (typeof window !== undefined) {
    window.sessionStorage.removeItem("user")
    window.sessionStorage.removeItem("balance")
    next();
    return fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signout`, {
      credentials: "include",
      mode: "cors"
    })
      .catch(err => console.log(err))
  }
}
