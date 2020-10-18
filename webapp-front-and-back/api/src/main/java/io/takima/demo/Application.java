package io.takima.demo;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

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
    public void run(String... args) throws Exception {
        System.out.println("Sending Email...");
        //sendStaticMail();
        System.out.println("Done");
    }
    void sendEmail() {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("moodofthemonth.epf@gmail.com");
        msg.setTo("athenais.roussel@epfedu.fr");

        msg.setSubject("Testing from Spring Boot");
        msg.setText("C'est bon ca marche les emails \n Clique sur le lien woula http://localhost:4200/");

        javaMailSender.send(msg);

    }

    public void sendStaticMail() throws Exception {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom("moodofthemonth.epf@gmail.com");
        helper.setTo("shadd412@gmail.com");
        helper.setSubject("Mood Of The Month");
        helper.setText("<html><body style='background-color:red;background: linear-gradient(#e66465, #9198e5);'><div style='margin-left:100px;margin-top:30px;height:400px;width:800px'><h1 style='color:black;'>Mood Of The Month !</h1><h3>Réponds au sondage et donne ton avis sur le mois qui vient de s'écouler !</h3> \n <h3>Clique vite sur ce lien : http://localhost:4200/</h3></div></body></html>", true);

        javaMailSender.send(mimeMessage);

    }

}
