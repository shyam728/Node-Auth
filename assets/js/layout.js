const passwordInput = document.getElementById('password-input');
const showPasswordIcon = document.getElementById('show-password-icon');
const hidePasswordIcon = document.getElementById('hide-password-icon');

showPasswordIcon.addEventListener('click', function () {
  passwordInput.type = 'text';
  showPasswordIcon.style.display = 'none';
  hidePasswordIcon.style.display = 'inline';
});

hidePasswordIcon.addEventListener('click', function () {
  passwordInput.type = 'password';
  hidePasswordIcon.style.display = 'none';
  showPasswordIcon.style.display = 'inline';
});
