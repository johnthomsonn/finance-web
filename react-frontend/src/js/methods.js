exports.isSignedIn = () => {

  const allCookies = document.cookie.split(';');
  let isLogged = undefined;
  allCookies.forEach(cookieStr => {
    const cookies = cookieStr.split('=');
    if(cookies[0] == "localToken")
      isLogged = cookies[1];
  })

  if(isLogged !== undefined)
    return isLogged
  return false
}

exports.validateUsername = username => {
return username.match(/[@<>'";,:\\]/gi)
}

exports.validateEmail = email => {
  return /^\w+@\w+\.\w+(\.\w+)?$/gi.test(email)
}
