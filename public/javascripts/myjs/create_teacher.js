let emails = [];
let email_flag = false;

$('#confirm_password').keyup(function(e) {
  if ($('#password').val() === $('#confirm_password').val()) {
    $('#mybox').html("<h4 style = 'color : green'>Password Matched..</h4>");
  } else {
    $('#mybox').html("<h4 style = 'color : red'>Password Not Matched..</h4>");
  }
});

$('#form').submit(function(e) {
  if ($('#password').val() === $('#confirm_password').val() && email_flag) {
  } else {
    if ($('#password').val() !== $('#confirm_password').val()) {
      alert('Password And Confirm Password Do Not Match');
    } else if (!email_flag) {
      alert('Email Not Available');
    }
    e.preventDefault();
  }
});

// $(document).ready(function() {
//   $.getJSON('/teacher/allemailRest', function(data) {
//     emails = data;
//     console.log(data);
//   });
// });

$('#email').focus(function() {
  $.getJSON('/teacher/allemailRest', function(data) {
    emails = data;
    console.log(data);
  });
});

$('#email').keyup(function(e) {
  let email = $('#email').val();
  let list = emails.filter(item => {
    return item.email === email;
  });
  if (list.length !== 0) {
    email_flag = false;
    $('#emailbox').html("<h6 style = 'color : red'>Email Not Available</h6>");
  } else {
    email_flag = true;
    $('#emailbox').html("<h6 style = 'color : green'>Email  Available</h6>");
  }
});
