// Selecione o formulário e o checkbox
const form = document.getElementById('criar-conta');
const checkbox = document.getElementById('termos');
const errorMessage = document.getElementById('error-message');

// Adicione um evento de submit ao formulário
form.addEventListener('submit', (e) => {
  // Verifique se o checkbox está marcado
  if (!checkbox.checked) {
    // Se não estiver marcado, exiba a mensagem de erro
    errorMessage.textContent = 'Você precisa aceitar os termos e condições';
    e.preventDefault(); // Impedir o envio do formulário
  } else {
    // Se estiver marcado, limpe a mensagem de erro
    errorMessage.textContent = '';
  }
});