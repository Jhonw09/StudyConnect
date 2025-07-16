// Modais funcionais para o perfil
function showProgressModal() {
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-chart-line"></i> Meu Progresso</h3>
                <button class="modal-close" id="closeProgressModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p><strong>Cursos Concluídos:</strong> 12</p>
                <p><strong>Tempo de Estudo:</strong> 48 horas</p>
                <p><strong>Sequência Atual:</strong> 15 dias</p>
                <p><strong>Certificados:</strong> 8</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('#closeProgressModal').onclick = closeModal;
    modal.onclick = (e) => e.target === modal && closeModal();
}

function showCertificatesModal() {
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-certificate"></i> Meus Certificados</h3>
                <button class="modal-close" id="closeCertificatesModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
                    <h4>JavaScript Avançado</h4>
                    <p>Concluído em 15/12/2024</p>
                    <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Download</button>
                </div>
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
                    <h4>React Fundamentals</h4>
                    <p>Concluído em 10/12/2024</p>
                    <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Download</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('#closeCertificatesModal').onclick = closeModal;
    modal.onclick = (e) => e.target === modal && closeModal();
}

function showFavoritesModal() {
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-heart"></i> Meus Favoritos</h3>
                <button class="modal-close" id="closeFavoritesModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
                    <h4>Front-End Moderno</h4>
                    <p>HTML5, CSS3, JavaScript</p>
                    <small>Salvo em 20/12/2024</small>
                    <br><button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem; margin-top: 0.5rem;">Acessar</button>
                </div>
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
                    <h4>Back-End Avançado</h4>
                    <p>Node.js, MongoDB</p>
                    <small>Salvo em 18/12/2024</small>
                    <br><button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem; margin-top: 0.5rem;">Acessar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('#closeFavoritesModal').onclick = closeModal;
    modal.onclick = (e) => e.target === modal && closeModal();
}