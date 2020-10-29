package io.takima.demo;

import io.takima.demo.user.UserDAO;
import org.apache.tomcat.util.buf.StringUtils;
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
import java.beans.Statement;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
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
        List<String> usersEmails = get("http://localhost:8080/users");
        TimerTask repeatedTask = new TimerTask() {
            public void run() {
                usersEmails.forEach(email-> {
                    try {
                        //sendStaticMail(email);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });
            }
        };
        Timer timer = new Timer("Timer");

        long delay = 1000L;
        long period = 1000L * 60 * 60 * 24 * 30; // 1000L = 1 seconde
        timer.scheduleAtFixedRate(repeatedTask, delay, period);
        System.out.println("Done");
    }

    public List<String> get(String url) throws IOException{

        String source ="";
        URL oracle = new URL(url);
        URLConnection yc = oracle.openConnection();
        BufferedReader in = new BufferedReader(
                new InputStreamReader(
                        yc.getInputStream()));
        String inputLine;

        while ((inputLine = in.readLine()) != null)
            source +=inputLine;
        in.close();
        String[] filter = source.split("mail\":\"");
        String[] spliter;
        List<String> emailsList = new ArrayList<String>();;
        for (int i = 1; i < filter.length; i++) {
            spliter = filter[i].split("\",\"date\"");
            emailsList.add(spliter[0]);
        }
        return emailsList;
    }

    public void sendStaticMail(String email) throws Exception {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom("moodofthemonth.epf@gmail.com");
        helper.setTo(email);
        helper.setSubject("Mood Of The Month");
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
