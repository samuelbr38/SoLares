
const form = document.getElementById('criar-conta');
const checkbox = document.getElementById('termos');
const errorMessage = document.getElementById('error-message');


form.addEventListener('submit', (e) => {

  if (!checkbox.checked) {
   
    errorMessage.textContent = 'Você precisa aceitar os termos e condições';
    e.preventDefault(); 
  } else {
   
    errorMessage.textContent = '';
  }
});