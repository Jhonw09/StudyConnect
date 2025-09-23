package com.Study.StudyConnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudyConnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudyConnectApplication.class, args);
		System.out.println("\n🚀 StudyConnect API iniciada!");
		System.out.println("📍 URL: http://localhost:8080/api");
		System.out.println("📊 Endpoints disponíveis:");
		System.out.println("   GET /cursos - Listar cursos");
		System.out.println("   GET /professores - Listar professores");
		System.out.println("   POST /contatos - Enviar contato");
		System.out.println("   GET /stats - Estatísticas\n");
	}

}
