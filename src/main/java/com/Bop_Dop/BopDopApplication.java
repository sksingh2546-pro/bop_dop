package com.Bop_Dop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BopDopApplication {

	public static void main(String[] args) {
		SpringApplication.run(BopDopApplication.class, args);
	}

}
