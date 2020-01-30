function checkPassword() {
  let password = document.getElementById('password');
  let confirm_password = document.getElementById('confirm_password');
  let mybox = document.getElementById('mybox');
  if (password.value === confirm_password.value) {
    mybox.innerHTML = "<h4 style = 'color : green'>Password Matched..</h4>";
  } else {
    mybox.innerHTML = "<h4 style = 'color : red'>Password Not Matched..</h4>";
  }
}
