class LessonsManager {
    constructor() {
        this.courseId = this.getCourseIdFromUrl();
        this.lessons = this.loadLessons();
        this.currentEditingLesson = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCourseInfo();
        this.renderLessons();
    }

    getCourseIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('courseId')) || 1;
    }

    loadCourseInfo() {
        const courses = JSON.parse(localStorage.getItem('professorCourses') || '[]');
        const course = courses.find(c => c.id === this.courseId);
        
        if (course) {
            document.getElementById('courseTitle').textContent = `Aulas - ${course.title}`;
        }
    }

    loadLessons() {
        const savedLessons = localStorage.getItem(`courseLessons_${this.courseId}`);
        if (savedLessons) {
            return JSON.parse(savedLessons);
        }
        
        // Aulas de exemplo
        const defaultLessons = [
            {
                id: 1,
                title: 'Introdução ao Curso',
                description: 'Apresentação do curso e objetivos de aprendizagem',
                duration: 15,
                order: 1,
                status: 'published',
                videoUrl: '',
                materials: [],
                views: 45,
                students: 32,
                created: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Conceitos Básicos',
                description: 'Fundamentos essenciais para o aprendizado',
                duration: 25,
                order: 2,
                status: 'published',
                videoUrl: '',
                materials: [],
                views: 38,
                students: 28,
                created: new Date().toISOString()
            }
        ];
        
        this.saveLessons(defaultLessons);
        return defaultLessons;
    }

    setupEventListeners() {
        // Botão adicionar aula
        document.getElementById('addLessonBtn').addEventListener('click', () => {
            this.openLessonModal();
        });

        // Modal controls
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Cancel button
        document.getElementById('cancelLesson').addEventListener('click', () => {
            document.getElementById('lessonModal').style.display = 'none';
        });

        // Form submission
        document.getElementById('lessonForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveLesson();
        });

        // File upload handlers
        this.setupFileUpload();

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    setupFileUpload() {
        const videoInput = document.getElementById('lessonVideo');
        const materialsInput = document.getElementById('lessonMaterials');
        const preview = document.getElementById('videoPreview');

        // Video upload
        videoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleVideoUpload(file, preview);
            }
        });

        // Materials upload
        materialsInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleMaterialsUpload(files);
        });

        // Drag and drop
        const uploadArea = videoInput.closest('.file-upload');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('dragover');
            }, false);
        });

        uploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                videoInput.files = files;
                this.handleVideoUpload(files[0], preview);
            }
        }, false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleVideoUpload(file, preview) {
        if (!file.type.startsWith('video/')) {
            this.showNotification('Por favor, selecione um arquivo de vídeo válido', 'error');
            return;
        }

        const maxSize = 500 * 1024 * 1024; // 500MB
        if (file.size > maxSize) {
            this.showNotification('O arquivo é muito grande. Máximo: 500MB', 'error');
            return;
        }

        // Show preview
        preview.innerHTML = `
            <div class="preview-item">
                <div class="preview-icon">
                    <i class="fas fa-video"></i>
                </div>
                <div class="preview-info">
                    <div class="preview-name">${file.name}</div>
                    <div class="preview-size">${this.formatFileSize(file.size)}</div>
                </div>
            </div>
            <div class="upload-progress">
                <div class="upload-progress-bar" style="width: 100%"></div>
            </div>
        `;
        preview.classList.add('show');

        // Simulate upload progress
        this.simulateUploadProgress(preview);
    }

    handleMaterialsUpload(files) {
        const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
        const validFiles = files.filter(file => {
            const extension = '.' + file.name.split('.').pop().toLowerCase();
            return allowedTypes.includes(extension);
        });

        if (validFiles.length !== files.length) {
            this.showNotification('Alguns arquivos foram ignorados. Tipos permitidos: PDF, DOC, DOCX, PPT, PPTX', 'warning');
        }

        // Store files for later processing
        this.uploadedMaterials = validFiles;
    }

    simulateUploadProgress(preview) {
        const progressBar = preview.querySelector('.upload-progress-bar');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    preview.querySelector('.upload-progress').style.display = 'none';
                }, 500);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    renderLessons() {
        const lessonsList = document.getElementById('lessonsList');
        
        if (this.lessons.length === 0) {
            lessonsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-play-circle"></i>
                    <h3>Nenhuma aula criada ainda</h3>
                    <p>Clique em "Nova Aula" para começar a criar conteúdo</p>
                </div>
            `;
            return;
        }

        // Sort lessons by order
        const sortedLessons = [...this.lessons].sort((a, b) => a.order - b.order);
        
        lessonsList.innerHTML = sortedLessons.map(lesson => `
            <div class="lesson-item" data-lesson-id="${lesson.id}">
                <div class="lesson-order">${lesson.order}</div>
                <div class="lesson-info">
                    <h3 class="lesson-title">${lesson.title}</h3>
                    <p class="lesson-description">${lesson.description}</p>
                    <div class="lesson-meta">
                        <span><i class="fas fa-clock"></i> ${lesson.duration} min</span>
                        <span><i class="fas fa-eye"></i> ${lesson.views} visualizações</span>
                        <span><i class="fas fa-users"></i> ${lesson.students} alunos</span>
                        <span class="lesson-status status-${lesson.status}">${this.getStatusText(lesson.status)}</span>
                    </div>
                </div>
                <div class="lesson-actions">
                    <button class="btn-icon btn-view" onclick="lessonsManager.viewLesson(${lesson.id})" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-edit" onclick="lessonsManager.editLesson(${lesson.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="lessonsManager.deleteLesson(${lesson.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    getStatusText(status) {
        const statusMap = {
            'published': 'Publicada',
            'draft': 'Rascunho',
            'archived': 'Arquivada'
        };
        return statusMap[status] || status;
    }

    openLessonModal(lessonId = null) {
        const modal = document.getElementById('lessonModal');
        const title = document.getElementById('lessonModalTitle');
        
        if (lessonId) {
            const lesson = this.lessons.find(l => l.id === lessonId);
            title.textContent = 'Editar Aula';
            this.fillLessonForm(lesson);
            this.currentEditingLesson = lessonId;
        } else {
            title.textContent = 'Nova Aula';
            document.getElementById('lessonForm').reset();
            document.getElementById('videoPreview').classList.remove('show');
            this.currentEditingLesson = null;
            
            // Set next order number
            const maxOrder = Math.max(...this.lessons.map(l => l.order), 0);
            document.getElementById('lessonOrder').value = maxOrder + 1;
        }
        
        modal.style.display = 'block';
    }

    fillLessonForm(lesson) {
        document.getElementById('lessonTitle').value = lesson.title;
        document.getElementById('lessonDescription').value = lesson.description;
        document.getElementById('lessonDuration').value = lesson.duration;
        document.getElementById('lessonOrder').value = lesson.order;
        document.getElementById('lessonStatus').value = lesson.status;
        
        // Show video preview if exists
        if (lesson.videoUrl) {
            const preview = document.getElementById('videoPreview');
            preview.innerHTML = `
                <div class="preview-item">
                    <div class="preview-icon">
                        <i class="fas fa-video"></i>
                    </div>
                    <div class="preview-info">
                        <div class="preview-name">Vídeo atual</div>
                        <div class="preview-size">Arquivo existente</div>
                    </div>
                </div>
            `;
            preview.classList.add('show');
        }
    }

    saveLesson() {
        const title = document.getElementById('lessonTitle').value.trim();
        const description = document.getElementById('lessonDescription').value.trim();
        const duration = parseInt(document.getElementById('lessonDuration').value);
        const order = parseInt(document.getElementById('lessonOrder').value);
        const status = document.getElementById('lessonStatus').value;
        const videoFile = document.getElementById('lessonVideo').files[0];

        if (!title || !duration || !order) {
            this.showNotification('Preencha todos os campos obrigatórios', 'error');
            return;
        }

        // Check if order is already used (except for current lesson)
        const existingLesson = this.lessons.find(l => 
            l.order === order && l.id !== this.currentEditingLesson
        );
        
        if (existingLesson) {
            this.showNotification('Esta ordem já está sendo usada por outra aula', 'error');
            return;
        }

        if (this.currentEditingLesson) {
            // Update existing lesson
            const lessonIndex = this.lessons.findIndex(l => l.id === this.currentEditingLesson);
            if (lessonIndex !== -1) {
                this.lessons[lessonIndex] = {
                    ...this.lessons[lessonIndex],
                    title,
                    description,
                    duration,
                    order,
                    status,
                    videoUrl: videoFile ? URL.createObjectURL(videoFile) : this.lessons[lessonIndex].videoUrl,
                    materials: this.uploadedMaterials || this.lessons[lessonIndex].materials,
                    updated: new Date().toISOString()
                };
            }
            this.showNotification('Aula atualizada com sucesso!', 'success');
        } else {
            // Create new lesson
            const newLesson = {
                id: Date.now(),
                title,
                description,
                duration,
                order,
                status,
                videoUrl: videoFile ? URL.createObjectURL(videoFile) : '',
                materials: this.uploadedMaterials || [],
                views: 0,
                students: 0,
                created: new Date().toISOString()
            };
            
            this.lessons.push(newLesson);
            this.showNotification('Aula criada com sucesso!', 'success');
        }

        this.saveLessons(this.lessons);
        this.renderLessons();
        document.getElementById('lessonModal').style.display = 'none';
        this.uploadedMaterials = null;
    }

    editLesson(lessonId) {
        this.openLessonModal(lessonId);
    }

    deleteLesson(lessonId) {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        if (confirm(`Tem certeza que deseja excluir a aula "${lesson.title}"?`)) {
            this.lessons = this.lessons.filter(l => l.id !== lessonId);
            this.saveLessons(this.lessons);
            this.renderLessons();
            this.showNotification('Aula excluída com sucesso!', 'success');
        }
    }

    viewLesson(lessonId) {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        const modal = document.getElementById('viewLessonModal');
        
        document.getElementById('viewLessonTitle').textContent = lesson.title;
        document.getElementById('viewLessonDescription').textContent = lesson.description;
        document.getElementById('viewLessonDuration').textContent = lesson.duration;
        document.getElementById('viewLessonViews').textContent = lesson.views;
        document.getElementById('viewLessonStudents').textContent = lesson.students;

        const videoPlayer = document.getElementById('lessonVideoPlayer');
        if (lesson.videoUrl) {
            videoPlayer.src = lesson.videoUrl;
            videoPlayer.style.display = 'block';
        } else {
            videoPlayer.style.display = 'none';
        }

        modal.style.display = 'block';
    }

    saveLessons(lessons) {
        localStorage.setItem(`courseLessons_${this.courseId}`, JSON.stringify(lessons));
        
        // Update course lesson count
        const courses = JSON.parse(localStorage.getItem('professorCourses') || '[]');
        const courseIndex = courses.findIndex(c => c.id === this.courseId);
        if (courseIndex !== -1) {
            courses[courseIndex].lessons = lessons.length;
            localStorage.setItem('professorCourses', JSON.stringify(courses));
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            ${message}
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196f3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// Initialize lessons manager
let lessonsManager;
document.addEventListener('DOMContentLoaded', () => {
    lessonsManager = new LessonsManager();
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);