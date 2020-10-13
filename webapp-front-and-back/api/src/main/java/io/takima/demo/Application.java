package io.takima.demo;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;

@EnableJpaRepositories
@SpringBootConfiguration
@SpringBootApplication
public class Application implements CommandLineRunner {

    @Autowired
    private JavaMailSender javaMailSender;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) {
        System.out.println("Sending Email...");
        sendEmail();
        System.out.println("Done");
    }
    void sendEmail() {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("moodofthemonth.epf@gmail.com");
        msg.setTo("athenais.roussel@epfedu.fr");

        msg.setSubject("Testing from Spring Boot");
        msg.setText("C'est bon ca marche les emails \n Des bisous tout partout");

        javaMailSender.send(msg);

    }

}
