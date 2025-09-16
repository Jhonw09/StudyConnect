const http = require('http');

function testAPI() {
    console.log('🧪 Testando API...\n');
    
    const options = {
        hostname: 'localhost',
        port: 3002,
        path: '/api/test',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                console.log('✅ API funcionando!');
                console.log('📡 Resposta:', response);
                console.log('\n🎉 Tudo OK! Você pode usar o site normalmente.');
            } catch (error) {
                console.log('❌ Erro ao processar resposta:', error.message);
            }
        });
    });

    req.on('error', (error) => {
        console.log('❌ API não está rodando!');
        console.log('💡 Execute: node api/server-sqlite.js');
        console.log('🔧 Ou use: start-sqlite.bat');
    });

    req.setTimeout(5000, () => {
        console.log('⏰ Timeout - API não respondeu');
        req.destroy();
    });

    req.end();
}

testAPI();