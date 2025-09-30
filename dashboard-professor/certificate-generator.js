class CertificateGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.setupCanvas();
        this.bindEvents();
    }

    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1200;
        this.canvas.height = 800;
        this.ctx = this.canvas.getContext('2d');
    }

    bindEvents() {
        // Event listener para gerar certificado será adicionado pelo dashboard
    }

    async generateCertificate(studentName, courseName, completionDate, professorName) {
        return new Promise((resolve) => {
            const ctx = this.ctx;
            const canvas = this.canvas;

            // Limpar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#1a1a2e');
            gradient.addColorStop(0.5, '#16213e');
            gradient.addColorStop(1, '#0f3460');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Border
            ctx.strokeStyle = '#64b5f6';
            ctx.lineWidth = 8;
            ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

            // Inner border
            ctx.strokeStyle = '#42a5f5';
            ctx.lineWidth = 2;
            ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

            // Title
            ctx.fillStyle = '#64b5f6';
            ctx.font = 'bold 60px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('CERTIFICADO', canvas.width / 2, 150);

            // Subtitle
            ctx.fillStyle = '#ffffff';
            ctx.font = '32px Arial';
            ctx.fillText('DE CONCLUSÃO', canvas.width / 2, 200);

            // Main text
            ctx.font = '28px Arial';
            ctx.fillText('Certificamos que', canvas.width / 2, 280);

            // Student name
            ctx.fillStyle = '#64b5f6';
            ctx.font = 'bold 48px Arial';
            ctx.fillText(studentName, canvas.width / 2, 350);

            // Course completion text
            ctx.fillStyle = '#ffffff';
            ctx.font = '28px Arial';
            ctx.fillText('concluiu com êxito o curso', canvas.width / 2, 420);

            // Course name
            ctx.fillStyle = '#64b5f6';
            ctx.font = 'bold 36px Arial';
            ctx.fillText(courseName, canvas.width / 2, 480);

            // Date
            ctx.fillStyle = '#ffffff';
            ctx.font = '24px Arial';
            const formattedDate = new Date(completionDate).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            ctx.fillText(`em ${formattedDate}`, canvas.width / 2, 540);

            // StudyConnect+ logo text
            ctx.fillStyle = '#64b5f6';
            ctx.font = 'bold 32px Arial';
            ctx.fillText('StudyConnect+', canvas.width / 2, 620);

            // Professor signature
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px Arial';
            ctx.fillText('Professor(a):', canvas.width / 2 - 100, 700);
            ctx.fillStyle = '#64b5f6';
            ctx.font = 'bold 24px Arial';
            ctx.fillText(professorName, canvas.width / 2 + 50, 700);

            // Certificate code
            const certificateCode = this.generateCertificateCode();
            ctx.fillStyle = '#888888';
            ctx.font = '16px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(`Código: ${certificateCode}`, canvas.width - 80, canvas.height - 80);

            // Decorative elements
            this.addDecorativeElements(ctx, canvas);

            resolve({
                canvas: canvas,
                dataUrl: canvas.toDataURL('image/png'),
                code: certificateCode
            });
        });
    }

    addDecorativeElements(ctx, canvas) {
        // Left decoration
        ctx.fillStyle = 'rgba(100, 181, 246, 0.3)';
        ctx.beginPath();
        ctx.arc(150, 400, 80, 0, 2 * Math.PI);
        ctx.fill();

        // Right decoration
        ctx.beginPath();
        ctx.arc(canvas.width - 150, 400, 80, 0, 2 * Math.PI);
        ctx.fill();

        // Top decoration
        ctx.fillStyle = 'rgba(66, 165, 245, 0.2)';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(200 + i * 200, 100, 20, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Bottom decoration
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(200 + i * 200, canvas.height - 100, 20, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    generateCertificateCode() {
        const prefix = 'SC';
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}-${year}-${random}`;
    }

    downloadCertificate(canvas, studentName, courseName) {
        const link = document.createElement('a');
        link.download = `certificado-${studentName.replace(/\s+/g, '-')}-${courseName.replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    async generateAndDownload(studentName, courseName, completionDate, professorName) {
        try {
            const result = await this.generateCertificate(studentName, courseName, completionDate, professorName);
            this.downloadCertificate(result.canvas, studentName, courseName);
            return result.code;
        } catch (error) {
            console.error('Erro ao gerar certificado:', error);
            throw error;
        }
    }
}

// Export for use in dashboard
window.CertificateGenerator = CertificateGenerator;