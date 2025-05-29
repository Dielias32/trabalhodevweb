document.getElementById('LoginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const msgErro = document.getElementById('msgErro');

    if(usuario === 'root' && senha === 'root') {
        localStorage.setItem('logado', 'true');
        window.location.href = 'agendamentos.html';
    }else {
        msgErro.style.display = 'block'
    }

});