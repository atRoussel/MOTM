package io.takima.demo;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
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
import java.io.File;
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
        sendStaticMail();
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
        helper.setTo("athenaisroussel@gmail.com");
        helper.setSubject("Mood Of The Month");
      /* helper.setText("" +
                "<html>" +
                "<body style='background-color:red'>" +
                "<div class='card'>"+
                "<div style='margin-left:100px;margin-top:30px;height:400px;width:800px'><h1 style='color:black;'>Mood Of The Month !</h1>" +
                "<h3>Réponds au sondage et donne ton avis sur le mois qui vient de s'écouler !</h3> \n " +
                "<h3>Clique vite sur ce lien : http://localhost:4200/</h3>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>", true);*/

        helper.setText("<html>"+
"<body style='background-color: aliceblue; padding-top: 20px; padding-bottom:30px'>"+
"<div class='card' style=' text-align:center; width:75%; margin-top:30px; margin-left:12%; padding-top:20px; padding-bottom:10px; background-color: white; border-radius:5px'>"+
"<div class='card-body'>"+
"<h1 class='card-title' style='color:black; margin-bottom:30px; margin-top:10px'>Mood Of The Month !</h1>"+
 "<p class='card-text' style='text-align:center; color: black'>Réponds au sondage et donne ton avis sur le mois qui vient de s'écouler !</p>"+ " " +
                "<a style='margin-bottom:30px' href='#' class='card-link'>http://localhost:4200/</a>"+
"</div>"+
"</div>"+
"</body>"+
"</html>", true);

                javaMailSender.send(mimeMessage);

    }

}
