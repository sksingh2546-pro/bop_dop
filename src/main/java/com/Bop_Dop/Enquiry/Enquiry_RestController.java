package com.Bop_Dop.Enquiry;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sun.mail.smtp.SMTPTransport;

@RestController
@RequestMapping("/enquiry")
@CrossOrigin("*")
public class Enquiry_RestController 
{

    private static final String PASSWORD = "Bopdop!123";
    private static final String EMAIL_FROM = "BopDopServices@gmail.com";

     static void enquiryEmail(String mob_num,String name,String message) 
	{
		Properties prop = System.getProperties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.port", "587");
		prop.put("mail.smtp.starttls.enable", "true");
		prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");
	
		System.out.println("in email method !");
		
		Session session = Session.getInstance(prop, (Authenticator) null);
		Message msg = new MimeMessage(session);
		
		try {
			msg.setFrom(new InternetAddress(EMAIL_FROM));
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse("rohithelpful2020@gmail.com, bopdopapp@gmail.com", false));
			msg.setSubject("ENQUIRY");
			MimeBodyPart p1 = new MimeBodyPart();
			p1.setContent("<b>Enquiry Message From <u>"+ name +"</u> Contact Number is : <u>"+mob_num+"</u></b> <br><br>" ,"text/html");
			
			MimeBodyPart p2 = new MimeBodyPart();

			p2.setText(message);
			
//			MimeBodyPart p3 = new MimeBodyPart();
//			p3.setContent("Welcome to <a href='http://bopdop.in/'>BopDop</a>", "text/html");  // need to change Home page here before host
			
//			MimeBodyPart p4=new MimeBodyPart();
//			p4.setContent("<br><br><br>Regards,<br><b>Admin BOPDOP,</b>", "text/html");
			
			Multipart mp = new MimeMultipart();
			mp.addBodyPart(p1);
			mp.addBodyPart(p2);
//			mp.addBodyPart(p3);
			msg.setContent(mp);
			System.out.println("mp = " + mp + " email = " + EMAIL_FROM + " pswrd= " + PASSWORD);// cmnts
			SMTPTransport t = (SMTPTransport) session.getTransport("smtp");
			t.connect("smtp.gmail.com", EMAIL_FROM, PASSWORD);
			System.out.println("email = " + EMAIL_FROM + " pas : " + PASSWORD); // cmnts
			t.sendMessage(msg, msg.getAllRecipients());
			System.out.println("Response: " + t.getLastServerResponse()); // cmnts
			t.close();
		} 
		catch (MessagingException e) 
		{
			e.printStackTrace();
		}
	}
	

	@PostMapping("/send")
	public String enquiry(@RequestParam("mob_num")String mob_num,@RequestParam("msg")String msg,@RequestParam("name")String name)
	{
		System.out.println("in method ");
		enquiryEmail(mob_num, name, msg);
		return null;
	}
}
