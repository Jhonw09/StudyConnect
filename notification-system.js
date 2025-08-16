// ===========================
//   SISTEMA DE NOTIFICAÇÕES
// ===========================

class NotificationSystem {
    constructor() {
        this.permission = 'default';
        this.notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        this.init();
    }

    async init() {
        await this.requestPermission();
        this.createNotificationCenter();
        this.scheduleNotifications();
        this.setupServiceWorker();
    }

    async requestPermission() {
        if ('Notification' in window) {
            this.permission = await Notification.requestPermission();
        }
    }

    createNotificationCenter() {
        const notificationHTML = `
            <div class="notification-center" id="notificationCenter">
                <button class="notification-toggle" id="notificationToggle">
                    <i class="fas fa-bell"></i>
                    <span class="notification-badge" id="notificationBadge">0</span>
                </button>
                <div class="notification-dropdown" id="notificationDropdown">
                    <div class="notification-header">
                        <h3>Notificações</h3>
                        <button id="clearNotifications">Limpar</button>
                    </div>
                    <div class="notification-list" id="notificationList"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', notificationHTML);
        this.setupEventListeners();
        this.updateNotificationList();
    }

    setupEventListeners() {
        const toggle = document.getElementById('notificationToggle');
        const dropdown = document.getElementById('notificationDropdown');
        const clear = document.getElementById('clearNotifications');

        toggle?.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });

        clear?.addEventListener('click', () => {
            this.clearAllNotifications();
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-center')) {
                dropdown.classList.remove('show');
            }
        });
    }

    showNotification(title, body, type = 'info', action = null) {
        const notification = {
            id: Date.now(),
            title,
            body,
            type,
            action,
            timestamp: new Date().toISOString(),
            read: false
        };

        this.notifications.unshift(notification);
        this.notifications = this.notifications.slice(0, 50); // Manter apenas 50
        localStorage.setItem('notifications', JSON.stringify(this.notifications));

        // Notificação do navegador
        if (this.permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: notification.id
            });
        }

        // Notificação in-app
        this.showInAppNotification(notification);
        this.updateNotificationList();
    }

    showInAppNotification(notification) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${notification.type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getIcon(notification.type)}"></i>
                <div>
                    <strong>${notification.title}</strong>
                    <p>${notification.body}</p>
                </div>
                <button class="toast-close">&times;</button>
            </div>
        `;

        document.body.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 5000);

        // Manual close
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        });
    }

    updateNotificationList() {
        const list = document.getElementById('notificationList');
        const badge = document.getElementById('notificationBadge');
        
        if (!list || !badge) return;

        const unreadCount = this.notifications.filter(n => !n.read).length;
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'block' : 'none';

        list.innerHTML = this.notifications.length === 0 
            ? '<div class="no-notifications">Nenhuma notificação</div>'
            : this.notifications.map(notification => `
                <div class="notification-item ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
                    <i class="fas fa-${this.getIcon(notification.type)}"></i>
                    <div class="notification-content">
                        <strong>${notification.title}</strong>
                        <p>${notification.body}</p>
                        <small>${this.formatTime(notification.timestamp)}</small>
                    </div>
                    <button class="mark-read" title="Marcar como lida">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            `).join('');

        // Event listeners para marcar como lida
        list.querySelectorAll('.mark-read').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.closest('.notification-item').dataset.id);
                this.markAsRead(id);
            });
        });
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            localStorage.setItem('notifications', JSON.stringify(this.notifications));
            this.updateNotificationList();
        }
    }

    clearAllNotifications() {
        this.notifications = [];
        localStorage.removeItem('notifications');
        this.updateNotificationList();
    }

    scheduleNotifications() {
        // Lembrete de estudo diário
        this.scheduleDaily('20:00', () => {
            this.showNotification(
                '📚 Hora de estudar!',
                'Que tal continuar seus estudos hoje?',
                'reminder'
            );
        });

        // Notificação de conquista simulada
        setTimeout(() => {
            this.showNotification(
                '🏆 Conquista desbloqueada!',
                'Você completou 5 lições esta semana!',
                'achievement'
            );
        }, 10000);
    }

    scheduleDaily(time, callback) {
        const [hours, minutes] = time.split(':').map(Number);
        const now = new Date();
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);

        if (scheduledTime <= now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        const timeUntil = scheduledTime.getTime() - now.getTime();
        setTimeout(() => {
            callback();
            setInterval(callback, 24 * 60 * 60 * 1000); // Repetir diariamente
        }, timeUntil);
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(console.error);
        }
    }

    getIcon(type) {
        const icons = {
            info: 'info-circle',
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle',
            reminder: 'clock',
            achievement: 'trophy',
            course: 'graduation-cap'
        };
        return icons[type] || 'bell';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Agora';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m atrás`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
        return date.toLocaleDateString();
    }
}

// CSS para notificações
const notificationStyles = `
<style>
.notification-center {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.notification-toggle {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
    position: relative;
}

.notification-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff6b6b;
    color: white;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.notification-dropdown {
    position: absolute;
    top: 70px;
    right: 0;
    width: 350px;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    max-height: 400px;
    overflow: hidden;
}

.notification-dropdown.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.notification-header {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification-header h3 {
    color: white;
    margin: 0;
    font-size: 1.1rem;
}

.notification-header button {
    background: #43e97b;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.3s ease;
}

.notification-header button:hover {
    background: #38f9d7;
}

.notification-list {
    max-height: 300px;
    overflow-y: auto;
}

.notification-item {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.notification-item:hover {
    background: rgba(255, 255, 255, 0.05);
}

.notification-item.unread {
    background: rgba(67, 233, 123, 0.1);
    border-left: 3px solid #43e97b;
}

.notification-item i {
    color: #43e97b;
    font-size: 1.2rem;
    margin-top: 0.2rem;
}

.notification-content {
    flex: 1;
    color: white;
}

.notification-content strong {
    display: block;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
}

.notification-content p {
    margin: 0 0 0.5rem 0;
    font-size: 0.8rem;
    opacity: 0.8;
    line-height: 1.4;
}

.notification-content small {
    font-size: 0.7rem;
    opacity: 0.6;
}

.mark-read {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 3px;
    transition: all 0.3s ease;
}

.mark-read:hover {
    color: #43e97b;
    background: rgba(67, 233, 123, 0.1);
}

.no-notifications {
    padding: 2rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
}

.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1001;
    animation: slideInUp 0.3s ease;
    max-width: 350px;
}

.toast-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    color: white;
}

.toast-content i {
    color: #43e97b;
    font-size: 1.2rem;
    margin-top: 0.2rem;
}

.toast-content strong {
    display: block;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
}

.toast-content p {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.8;
    line-height: 1.4;
}

.toast-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    margin-left: auto;
}

.toast-close:hover {
    color: white;
}

.toast.fade-out {
    animation: slideOutDown 0.3s ease forwards;
}

@keyframes slideInUp {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideOutDown {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(100%);
        opacity: 0;
    }
}

@media (max-width: 768px) {
    .notification-dropdown {
        width: 300px;
        right: -10px;
    }
    
    .toast {
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

// Inicializar sistema de notificações
window.notificationSystem = new NotificationSystem();