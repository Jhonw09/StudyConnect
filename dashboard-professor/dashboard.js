// Dashboard Professor - JavaScript
class ProfessorDashboard {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.courses = this.loadCourses();
        this.students = this.loadStudents();
        this.certificates = this.loadCertificates();
        this.analytics = this.loadAnalytics();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserProfile();
        this.updateStats();
        this.initCharts();
        this.loadSections();
        this.updateCurrentDate();
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentProfessor')) || {
            id: 1,
            name: 'Professor Silva',
            email: 'professor@studyconnect.com',
            disciplina: 'Matemática',
            avatar: '../images/profa.jpg'
        };
    }

    loadCourses() {
        const savedCourses = localStorage.getItem('professorCourses');
        if (savedCourses) {
            return JSON.parse(savedCourses);
        }
        
        const defaultCourses = [
            {
                id: 1,
                title: 'Matemática Básica',
                description: 'Curso completo de matemática para iniciantes',
                category: 'Matemática',
                thumbnail: '../images/capa-matematicawebp.webp',
                students: 45,
                lessons: 12,
                views: 234,
                rating: 4.8,
                created: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Álgebra Avançada',
                description: 'Conceitos avançados de álgebra',
                category: 'Matemática',
                thumbnail: '../images/capa-matematicawebp.webp',
                students: 28,
                lessons: 8,
                views: 156,
                rating: 4.9,
                created: new Date().toISOString()
            }
        ];
        
        this.saveCourses(defaultCourses);
        return defaultCourses;
    }

    loadStudents() {
        const savedStudents = localStorage.getItem('professorStudents');
        if (savedStudents) {
            return JSON.parse(savedStudents);
        }
        
        const defaultStudents = [
            {
                id: 1,
                name: 'Ana Silva',
                email: 'ana@email.com',
                course: 'Matemática Básica',
                progress: 75,
                lastAccess: '2024-01-15',
                enrolled: '2024-01-01'
            },
            {
                id: 2,
                name: 'João Santos',
                email: 'joao@email.com',
                course: 'Álgebra Avançada',
                progress: 60,
                lastAccess: '2024-01-14',
                enrolled: '2024-01-05'
            },
            {
                id: 3,
                name: 'Maria Costa',
                email: 'maria@email.com',
                course: 'Matemática Básica',
                progress: 90,
                lastAccess: '2024-01-16',
                enrolled: '2024-01-02'
            }
        ];
        
        this.saveStudents(defaultStudents);
        return defaultStudents;
    }

    loadCertificates() {
        const savedCertificates = localStorage.getItem('professorCertificates');
        if (savedCertificates) {
            return JSON.parse(savedCertificates);
        }
        
        const defaultCertificates = [
            {
                id: 1,
                studentName: 'Maria Costa',
                courseName: 'Matemática Básica',
                completionDate: '2024-01-16',
                certificateCode: 'CERT-001-2024'
            }
        ];
        
        this.saveCertificates(defaultCertificates);
        return defaultCertificates;
    }

    loadAnalytics() {
        return {
            views: [12, 19, 15, 25, 22, 30, 28],
            completions: [5, 8, 6, 12, 10, 15, 13],
            engagement: [65, 70, 68, 75, 72, 80, 78]
        };
    }

    setupEventListeners() {
        // Menu navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                if (item.classList.contains('logout')) {
                    this.logout();
                    return;
                }
                
                const section = item.dataset.section;
                if (section) {
                    this.showSection(section);
                    this.updateActiveMenu(item);
                }
            });
        });

        // Modal controls
        this.setupModalControls();
        
        // Form submissions
        this.setupFormSubmissions();
        
        // Search functionality
        this.setupSearch();
    }

    setupModalControls() {
        // Course modal
        document.getElementById('newCourseBtn').addEventListener('click', () => {
            this.openCourseModal();
        });
        
        document.getElementById('addCourseBtn').addEventListener('click', () => {
            this.openCourseModal();
        });
        
        // Custom select functionality
        this.setupCustomSelect();

        // Close modals
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Cancel buttons
        document.getElementById('cancelCourse').addEventListener('click', () => {
            document.getElementById('courseModal').style.display = 'none';
        });

        document.getElementById('cancelLesson').addEventListener('click', () => {
            document.getElementById('lessonModal').style.display = 'none';
        });
        
        document.getElementById('cancelCertificate').addEventListener('click', () => {
            document.getElementById('generateCertificateModal').style.display = 'none';
        });
        
        // Generate certificate button
        document.getElementById('generateCertificateBtn').addEventListener('click', () => {
            this.openGenerateCertificateModal();
        });
    }

    setupFormSubmissions() {
        // Course form
        document.getElementById('courseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCourse();
        });

        // Lesson form
        document.getElementById('lessonForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveLesson();
        });
        
        // Generate certificate form
        document.getElementById('generateCertificateForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateNewCertificate();
        });
    }

    setupSearch() {
        document.getElementById('studentSearch').addEventListener('input', (e) => {
            this.filterStudents(e.target.value);
        });
    }

    loadUserProfile() {
        document.getElementById('professorName').textContent = this.currentUser.name;
        document.getElementById('profileName').textContent = this.currentUser.name;
        document.getElementById('profileEmail').textContent = this.currentUser.email;
        document.getElementById('profileDisciplina').textContent = this.currentUser.disciplina;
        
        if (this.currentUser.avatar) {
            document.getElementById('profilePic').src = this.currentUser.avatar;
            document.querySelector('.profile-avatar').src = this.currentUser.avatar;
        }
    }

    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('currentDate').textContent = 
            now.toLocaleDateString('pt-BR', options);
    }

    updateStats() {
        const totalCourses = this.courses.length;
        const totalStudents = this.students.length;
        const totalViews = this.courses.reduce((sum, course) => sum + course.views, 0);
        const totalCertificates = this.certificates.length;

        document.getElementById('totalCourses').textContent = totalCourses;
        document.getElementById('totalStudents').textContent = totalStudents;
        document.getElementById('totalViews').textContent = totalViews;
        document.getElementById('totalCertificates').textContent = totalCertificates;

        // Profile stats
        document.getElementById('profileCourses').textContent = totalCourses;
        document.getElementById('profileStudents').textContent = totalStudents;
    }

    initCharts() {
        this.createViewsChart();
        this.createCompletionChart();
        this.createEngagementChart();
        this.createPerformanceChart();
    }

    createViewsChart() {
        const ctx = document.getElementById('viewsChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Visualizações',
                    data: this.analytics.views,
                    borderColor: '#64b5f6',
                    backgroundColor: 'rgba(100, 181, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#fff' }
                    }
                },
                scales: {
                    x: { ticks: { color: '#fff' } },
                    y: { ticks: { color: '#fff' } }
                }
            }
        });
    }

    createCompletionChart() {
        const ctx = document.getElementById('completionChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.courses.map(course => course.title),
                datasets: [{
                    data: this.courses.map(course => course.students),
                    backgroundColor: [
                        '#64b5f6',
                        '#42a5f5',
                        '#2196f3',
                        '#1976d2'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#fff' }
                    }
                }
            }
        });
    }

    createEngagementChart() {
        const ctx = document.getElementById('engagementChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Engajamento (%)',
                    data: this.analytics.engagement,
                    backgroundColor: 'rgba(100, 181, 246, 0.8)',
                    borderColor: '#64b5f6',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#fff' }
                    }
                },
                scales: {
                    x: { ticks: { color: '#fff' } },
                    y: { 
                        ticks: { color: '#fff' },
                        max: 100
                    }
                }
            }
        });
    }

    createPerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.courses.map(course => course.title),
                datasets: [{
                    label: 'Performance',
                    data: this.courses.map(course => course.rating * 20),
                    backgroundColor: 'rgba(100, 181, 246, 0.2)',
                    borderColor: '#64b5f6',
                    pointBackgroundColor: '#64b5f6'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#fff' }
                    }
                },
                scales: {
                    r: {
                        ticks: { color: '#fff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        document.getElementById(`${sectionName}-section`).classList.add('active');

        // Load section-specific content
        switch(sectionName) {
            case 'courses':
                this.loadCoursesSection();
                break;
            case 'students':
                this.loadStudentsSection();
                break;
            case 'certificates':
                this.loadCertificatesSection();
                break;
        }
    }

    updateActiveMenu(activeItem) {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        activeItem.classList.add('active');
    }

    loadCoursesSection() {
        const coursesGrid = document.getElementById('coursesGrid');
        coursesGrid.innerHTML = '';

        this.courses.forEach(course => {
            const courseCard = this.createCourseCard(course);
            coursesGrid.appendChild(courseCard);
        });
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <img src="${course.thumbnail}" alt="${course.title}" class="course-thumbnail">
            <div class="course-info">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-stats">
                    <span><i class="fas fa-users"></i> ${course.students} alunos</span>
                    <span><i class="fas fa-play"></i> ${course.lessons} aulas</span>
                    <span><i class="fas fa-star"></i> ${course.rating}</span>
                </div>
                <div class="course-actions">
                    <button class="btn-small btn-edit" onclick="dashboard.editCourse(${course.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-small btn-lessons" onclick="dashboard.manageLessons(${course.id})">
                        <i class="fas fa-play"></i> Aulas
                    </button>
                    <button class="btn-small btn-delete" onclick="dashboard.deleteCourse(${course.id})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    loadStudentsSection() {
        const tableBody = document.getElementById('studentsTableBody');
        tableBody.innerHTML = '';

        this.students.forEach(student => {
            const row = this.createStudentRow(student);
            tableBody.appendChild(row);
        });
    }

    createStudentRow(student) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${student.progress}%"></div>
                </div>
                ${student.progress}%
            </td>
            <td>${new Date(student.lastAccess).toLocaleDateString('pt-BR')}</td>
            <td>
                <button class="btn-small btn-edit" onclick="dashboard.viewStudent(${student.id})">
                    <i class="fas fa-eye"></i> Ver
                </button>
            </td>
        `;
        return row;
    }

    loadCertificatesSection() {
        const certificatesGrid = document.getElementById('certificatesGrid');
        certificatesGrid.innerHTML = '';

        this.certificates.forEach(certificate => {
            const certificateCard = this.createCertificateCard(certificate);
            certificatesGrid.appendChild(certificateCard);
        });
    }

    createCertificateCard(certificate) {
        const card = document.createElement('div');
        card.className = 'certificate-card';
        card.innerHTML = `
            <div class="certificate-icon">
                <i class="fas fa-certificate"></i>
            </div>
            <h3>${certificate.studentName}</h3>
            <p>${certificate.courseName}</p>
            <p>Concluído em: ${new Date(certificate.completionDate).toLocaleDateString('pt-BR')}</p>
            <p>Código: ${certificate.certificateCode}</p>
            <button class="btn-primary" onclick="dashboard.downloadCertificate('${certificate.id}')">
                <i class="fas fa-download"></i> Baixar
            </button>
        `;
        return card;
    }

    openCourseModal(courseId = null) {
        const modal = document.getElementById('courseModal');
        const title = document.getElementById('courseModalTitle');
        
        if (courseId) {
            const course = this.courses.find(c => c.id === courseId);
            title.textContent = 'Editar Curso';
            this.fillCourseForm(course);
        } else {
            title.textContent = 'Novo Curso';
            document.getElementById('courseForm').reset();
            
            // Reset custom select
            const categorySelected = document.getElementById('categorySelected');
            if (categorySelected) {
                categorySelected.textContent = 'Selecione uma categoria';
            }
        }
        
        modal.style.display = 'block';
    }

    fillCourseForm(course) {
        document.getElementById('courseTitle').value = course.title;
        document.getElementById('courseDescription').value = course.description;
        document.getElementById('courseCategory').value = course.category;
        
        // Update custom select display
        const categorySelected = document.getElementById('categorySelected');
        if (categorySelected && course.category) {
            categorySelected.textContent = course.category;
        }
    }

    saveCourse() {
        const title = document.getElementById('courseTitle').value;
        const description = document.getElementById('courseDescription').value;
        const category = document.getElementById('courseCategory').value;
        const thumbnailFile = document.getElementById('courseThumbnail').files[0];
        
        const course = {
            id: Date.now(),
            title,
            description,
            category,
            thumbnail: thumbnailFile ? URL.createObjectURL(thumbnailFile) : '../images/capa-matematicawebp.webp',
            students: 0,
            lessons: 0,
            views: 0,
            rating: 5.0,
            created: new Date().toISOString()
        };

        this.courses.push(course);
        this.saveCourses(this.courses);
        this.updateStats();
        this.loadCoursesSection();
        
        document.getElementById('courseModal').style.display = 'none';
        this.showNotification('Curso criado com sucesso!', 'success');
    }

    editCourse(courseId) {
        this.openCourseModal(courseId);
    }

    deleteCourse(courseId) {
        if (confirm('Tem certeza que deseja excluir este curso?')) {
            this.courses = this.courses.filter(course => course.id !== courseId);
            this.saveCourses(this.courses);
            this.updateStats();
            this.loadCoursesSection();
            this.showNotification('Curso excluído com sucesso!', 'success');
        }
    }

    manageLessons(courseId) {
        window.location.href = `lessons-manager.html?courseId=${courseId}`;
    }

    viewStudent(studentId) {
        const student = this.students.find(s => s.id === studentId);
        alert(`Detalhes do aluno: ${student.name}\n\nFuncionalidade em desenvolvimento...`);
    }

    filterStudents(searchTerm) {
        const rows = document.querySelectorAll('#studentsTableBody tr');
        rows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const email = row.cells[1].textContent.toLowerCase();
            const course = row.cells[2].textContent.toLowerCase();
            
            if (name.includes(searchTerm.toLowerCase()) || 
                email.includes(searchTerm.toLowerCase()) || 
                course.includes(searchTerm.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    async downloadCertificate(certificateId) {
        const certificate = this.certificates.find(c => c.id == certificateId);
        if (!certificate) return;
        
        try {
            if (!this.certificateGenerator) {
                this.certificateGenerator = new CertificateGenerator();
            }
            
            await this.certificateGenerator.generateAndDownload(
                certificate.studentName,
                certificate.courseName,
                certificate.completionDate,
                this.currentUser.name
            );
            
            this.showNotification('Certificado baixado com sucesso!', 'success');
        } catch (error) {
            this.showNotification('Erro ao gerar certificado', 'error');
        }
    }

    logout() {
        if (confirm('Tem certeza que deseja sair?')) {
            localStorage.removeItem('currentProfessor');
            window.location.href = '../cursos/Login/LoginProfessores.html';
        }
    }

    saveCourses(courses) {
        localStorage.setItem('professorCourses', JSON.stringify(courses));
    }

    saveStudents(students) {
        localStorage.setItem('professorStudents', JSON.stringify(students));
    }

    saveCertificates(certificates) {
        localStorage.setItem('professorCertificates', JSON.stringify(certificates));
    }

    openGenerateCertificateModal() {
        const modal = document.getElementById('generateCertificateModal');
        
        // Populate students dropdown
        const studentSelect = document.getElementById('certStudentName');
        studentSelect.innerHTML = '<option value="">Selecione um aluno</option>';
        this.students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.name;
            option.textContent = `${student.name} (${student.course})`;
            studentSelect.appendChild(option);
        });
        
        // Populate courses dropdown
        const courseSelect = document.getElementById('certCourseName');
        courseSelect.innerHTML = '<option value="">Selecione um curso</option>';
        this.courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.title;
            option.textContent = course.title;
            courseSelect.appendChild(option);
        });
        
        // Set today's date as default
        document.getElementById('certCompletionDate').value = new Date().toISOString().split('T')[0];
        
        modal.style.display = 'block';
    }
    
    async generateNewCertificate() {
        const studentName = document.getElementById('certStudentName').value;
        const courseName = document.getElementById('certCourseName').value;
        const completionDate = document.getElementById('certCompletionDate').value;
        
        if (!studentName || !courseName || !completionDate) {
            this.showNotification('Preencha todos os campos', 'error');
            return;
        }
        
        try {
            if (!this.certificateGenerator) {
                this.certificateGenerator = new CertificateGenerator();
            }
            
            const certificateCode = await this.certificateGenerator.generateAndDownload(
                studentName,
                courseName,
                completionDate,
                this.currentUser.name
            );
            
            // Save certificate record
            const newCertificate = {
                id: Date.now(),
                studentName,
                courseName,
                completionDate,
                certificateCode,
                generated: new Date().toISOString()
            };
            
            this.certificates.push(newCertificate);
            this.saveCertificates(this.certificates);
            this.updateStats();
            this.loadCertificatesSection();
            
            document.getElementById('generateCertificateModal').style.display = 'none';
            this.showNotification('Certificado gerado e baixado com sucesso!', 'success');
            
        } catch (error) {
            this.showNotification('Erro ao gerar certificado', 'error');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
            ${message}
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : '#2196f3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setupCustomSelect() {
        const selected = document.getElementById('categorySelected');
        const options = document.getElementById('categoryOptions');
        const hiddenInput = document.getElementById('courseCategory');
        
        if (!selected || !options || !hiddenInput) return;
        
        selected.addEventListener('click', () => {
            options.classList.toggle('select-hide');
            selected.classList.toggle('select-arrow-active');
        });
        
        options.querySelectorAll('div').forEach(option => {
            option.addEventListener('click', () => {
                const value = option.getAttribute('data-value');
                selected.textContent = value;
                hiddenInput.value = value;
                options.classList.add('select-hide');
                selected.classList.remove('select-arrow-active');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.custom-select')) {
                options.classList.add('select-hide');
                selected.classList.remove('select-arrow-active');
            }
        });
    }

    loadSections() {
        // Load initial data for all sections
        this.loadCoursesSection();
        this.loadStudentsSection();
        this.loadCertificatesSection();
    }
}

// Initialize dashboard when page loads
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new ProfessorDashboard();
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