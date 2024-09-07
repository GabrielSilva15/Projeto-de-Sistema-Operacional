// Adicionando um evento que mostra a tela de loading, enquanto espera o conteúdo principal carregar totalmente
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById('loading_screen').style.display = 'none';
    }, 2000);
    document.getElementById('login_button').addEventListener('click', function() {
        document.getElementById('loading_screen').style.display = 'none';
    });
});