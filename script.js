document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const modals = document.querySelectorAll('dialog.modal-atividade');
    const openButtons = document.querySelectorAll('[data-modal]');
    const cards = document.querySelectorAll('.card');
    const closeButtons = document.querySelectorAll('.fechar, .fechar-modal');

    // Função para pegar qual modal foi aberto
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            console.log(modalId)
            if (modal) {
                modal.showModal();
                overlay?.classList.add('active');
            }
        })
    })

    // Função para abrir modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
            overlay?.classList.add('active');
        }
    }

    // Função para fechar modal
    function closeModal(modal) {
        if (modal && modal.open) {
        modal.close();
        overlay?.classList.remove('active');
        }
    }

    // Selecionar a atividade automaticamente
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');

            if (modalId === 'modalInscricao') {
                const parentModal = button.closest('dialog');
                const atividadeInput = document.getElementById('atividade');

                if (parentModal && parentModal.id) {
                    const atividadeMap = {
                        modalCorrida: 'corrida',
                        modalDanca: 'danca',
                        modalMeditacao: 'meditacao'
                    };

                    const atividadeValue = atividadeMap[parentModal.id];
                    if (atividadeValue) {
                        atividadeInput.value = atividadeValue;
                    }
                }
            }
            openModal(modalId);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        closeModal(modal);
        });
    });

    // Fechar modal ao clicar fora
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            closeModal(modal);
        }
        });
    });

    // Scroll suave para "Quero saber mais"
    const scrollButton = document.querySelector('.btn-principal[href="#atividades"]');
    if (scrollButton) {
        scrollButton.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#atividades');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        });
    }
});
