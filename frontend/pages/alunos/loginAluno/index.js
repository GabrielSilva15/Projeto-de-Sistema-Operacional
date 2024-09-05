document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById('loading_screen').style.display = 'none';
    }, 2000);
    document.getElementById('login_button').addEventListener('click', function() {
        document.getElementById('loading_screen').style.display = 'none';
    });
});