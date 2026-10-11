document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplica imediatamente o tema salvo nas preferências ao abrir o site
    storage.applyTheme();

    // 2. Controla o evento de clique do botão de alternar tema
    const toggleThemeBtn = document.querySelector('#toggle-theme');

    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', () => {
            const currentTheme = storage.getTheme();
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            storage.setTheme(nextTheme);
        });
    }
    // Adicione este bloco dentro do document.addEventListener('DOMContentLoaded', ...) no seu app.js
    const formulario = document.querySelector('form');

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Impede o recarregamento padrão da página

            // Cria uma mensagem de feedback visível na tela
            const feedback = document.createElement('div');
            feedback.style.backgroundColor = '#2f9e44';
            feedback.style.color = '#ffffff';
            feedback.style.padding = '15px';
            feedback.style.borderRadius = '6px';
            feedback.style.marginTop = '20px';
            feedback.style.fontWeight = 'bold';
            feedback.style.textAlign = 'center';
            feedback.innerText = '✉️ Formulário enviado com sucesso! Obrigado pelo contato.';

            // Adiciona o feedback abaixo do botão de enviar
            formulario.appendChild(feedback);

            // Limpa os campos do formulário
            formulario.reset();

            // Remove a mensagem de sucesso após 5 segundos
            setTimeout(() => {
                feedback.remove();
            }, 5000);
        });
    }
});
