package com.Bop_Dop.Admin;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.Random;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.openxmlformats.schemas.drawingml.x2006.main.CTRegularTextRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinitionHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Bop_Dop.Appointment.Appointment_repository;
import com.Bop_Dop.Doctors.Doctors_entity;
import com.Bop_Dop.Doctors.Doctors_repository;
import com.Bop_Dop.Live_OPD.Live_opd_repository;
import com.Bop_Dop.Patients.Patients_entity;
import com.Bop_Dop.Patients.Patients_repository;
import com.sun.mail.smtp.SMTPTransport;

import net.bytebuddy.asm.Advice.OffsetMapping.ForOrigin.Renderer.ForReturnTypeName;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class Admin_controller 
{
	@Autowired
	Admin_repository admin_repository;
	
	@Autowired
	Live_opd_repository live_opd_repository;
	
	@Autowired
	Doctors_repository doctors_repository;
	
	@Autowired
	Patients_repository patients_repository;
	
	@Autowired
	Appointment_repository appointment_repository;
	
	private static final String SMTP_SERVER = "smtp.gmail.com";
    private static final String PASSWORD = "Bopdop!123";
    private static final String EMAIL_FROM = "BopDopServices@gmail.com";

    /*Admin registering doctor by himself */
     static void sendMail_registration(String doc_name,String mob_num,String paswrd,String doc_email) 
	{
		Properties prop = System.getProperties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.port", "587");
		prop.put("mail.smtp.starttls.enable", "true");
		prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");

		Session session = Session.getInstance(prop, (Authenticator) null);
		Message msg = new MimeMessage(session);
		
		try {
			msg.setFrom(new InternetAddress(EMAIL_FROM));
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse("rohithelpful2020@gmail.com,"+doc_email, false));
			msg.setSubject("Registration at BOPDOP");
			MimeBodyPart p1 = new MimeBodyPart();
			p1.setText("Hi, Doctor "+doc_name+" you got registered at BopDop by Admin. Please refer the below given link for login and use the below given login Id and Password.");
			MimeBodyPart p2 = new MimeBodyPart();

			p2.setContent("<h3>Login Id : <h4>"+mob_num+"</h4></h3>"+"<h3>Password : <h4>"+paswrd+"</h4></h3>","text/html");
			
			MimeBodyPart p3 = new MimeBodyPart();
			p3.setContent("Welcome to <a href='http://bopdop.in/'>BopDop</a>", "text/html");  // need to change Home page here before host
			
			MimeBodyPart p4=new MimeBodyPart();
			p4.setContent("<br><br><br>Regards,<br><b>Admin BOPDOP,</b>", "text/html");
			
			Multipart mp = new MimeMultipart();
			mp.addBodyPart(p1);
			mp.addBodyPart(p2);
			mp.addBodyPart(p3);
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
     
     /* Admin approving doctor  */
     static void sendMail_approval(String doc_name,String doc_email) 
 	{
    	 Date date1=new Date();
			SimpleDateFormat fmt1=new SimpleDateFormat("yyyy-MM-dd");
    	 
 		Properties prop = System.getProperties();
 		prop.put("mail.smtp.host", "smtp.gmail.com");
 		prop.put("mail.smtp.auth", "true");
 		prop.put("mail.smtp.port", "587");
 		prop.put("mail.smtp.starttls.enable", "true");
 		prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");

 		Session session = Session.getInstance(prop, (Authenticator) null);
 		Message msg = new MimeMessage(session);
 		System.out.println("sending approval !");
 		try {
 			msg.setFrom(new InternetAddress(EMAIL_FROM));
 			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(doc_email, false));
 			msg.setSubject("Request Approval at BOPDOP");
 			MimeBodyPart p1 = new MimeBodyPart();
 			p1.setText("Hello,");
 			
 			MimeBodyPart p2 = new MimeBodyPart();
 			p2.setContent("<br><br> Dr. <b>"+doc_name+"</b>, We feel happy to inform you that your request for using BOPDOP has been approved on "+fmt1.format(date1) +" by admin. Please use your mobile number and "
 					+ "password for <a href='http://bopdop.in/'>login</a>. Wish you a great day ahead.","text/html");
 			
 			MimeBodyPart p3 = new MimeBodyPart();
 			p3.setContent("<br><br> Welcome to <a href='http://bopdop.in/'>BopDop</a>", "text/html");  // need to change Home page here before host
 			
 			MimeBodyPart p4 = new MimeBodyPart();
 			p4.setContent("<br><br><br> Regards, <br>Admin Bopdop,","text/html");
 			
 			Multipart mp = new MimeMultipart();
 			mp.addBodyPart(p1);
 			mp.addBodyPart(p2);
 			mp.addBodyPart(p3);
 			mp.addBodyPart(p4);
 			
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
	
     /* Admin canceling doctor request */
     static void sendMail_cancelation(String doc_name,String doc_email) 
  	{
    	 Date date1=new Date();
			SimpleDateFormat fmt1=new SimpleDateFormat("yyyy-MM-dd");
    	 
  		Properties prop = System.getProperties();
  		prop.put("mail.smtp.host", "smtp.gmail.com");
  		prop.put("mail.smtp.auth", "true");
  		prop.put("mail.smtp.port", "587");
  		prop.put("mail.smtp.starttls.enable", "true");
  		prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");

  		Session session = Session.getInstance(prop, (Authenticator) null);
  		Message msg = new MimeMessage(session);
  		System.out.println("sending decline !");
  		try {
  			msg.setFrom(new InternetAddress(EMAIL_FROM));
  			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(doc_email, false));
  			msg.setSubject("Request Cancelation at BOPDOP");
  			MimeBodyPart p1 = new MimeBodyPart();
  			p1.setText("Hello,");
  			
  			MimeBodyPart p2 = new MimeBodyPart();
  			p2.setContent("<br><br> Dr. <b>"+doc_name+"</b>, We feel sorry to inform you that your request for using BOPDOP has been declined on "+fmt1.format(date1) +" by amdin. If you want to know the reason of "
  					+ "decline please write email to Admin at bopdopapp@gmail.com.","text/html");
  			
//  			MimeBodyPart p3 = new MimeBodyPart();
//  			p3.setContent("<br><br> Welcome to <a href='http://bopdop.in/'>BopDop</a>", "text/html");  // need to change Home page here before host
  			
  			MimeBodyPart p4 = new MimeBodyPart();
  			p4.setContent("<br><br><br> Regards, <br>Admin Bopdop,","text/html");
  			
  			Multipart mp = new MimeMultipart();
  			mp.addBodyPart(p1);
  			mp.addBodyPart(p2);
//  			mp.addBodyPart(p3);
  			mp.addBodyPart(p4);
  			
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
    
     /* Genreting password autometicaly */
	static char[] generatePassword() 
	{
	      String capitalCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	      String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
	      String specialCharacters = "!@#$";
	      String numbers = "1234567890";
	      String combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;
	      Random random = new Random();
	      char[] password = new char[8];

	      password[0] = lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length()));
	      password[1] = capitalCaseLetters.charAt(random.nextInt(capitalCaseLetters.length()));
	      password[2] = specialCharacters.charAt(random.nextInt(specialCharacters.length()));
	      password[3] = numbers.charAt(random.nextInt(numbers.length()));
	   
	      for(int i = 4; i< 8 ; i++) 
	      {
	         password[i] = combinedChars.charAt(random.nextInt(combinedChars.length()));
	      }
	      return password;
	}
	
	
	@PostMapping("/insert")
	public String insert(@RequestParam("u_name")String u_name,@RequestParam("password")String password)
	{
		if (u_name!=null && password!=null) 
		{
			int result=admin_repository.create_admin(u_name, password);
			if (result!=0) 
			{
				return "Successfull";
			}
		}
		return "UnSuccessfull";
	}
	
	/* Admin login  */
	@PostMapping("/admin_login")
	public String login(@RequestParam("u_name")String u_name,@RequestParam("password")String password)
	{
		if (u_name!=null && password!=null) 
		{
			int result=admin_repository.login(u_name, password).size();
			if (result!=0) 
			{
				return "admin";
			}
			return "not_found";
		}
		return "fill_details";
	}
	
	/* Get list of Working doctors */
	@GetMapping("/working_doctors")
	public List<Working_doc_model>doctors()
	{
		List<Doctors_entity>doc_list=doctors_repository.doc_list();
		System.out.println("size is : "+doc_list.size());
		
		if (doc_list.size()!=0) 
		{
			List<Working_doc_model>doctorList=new ArrayList<>();
			for (Doctors_entity de : doc_list) 
			{
				Working_doc_model dm=new Working_doc_model();
				
				dm.setApplied_date(de.getApplied_date());
				dm.setDegree(de.getDegree());
				dm.setDoctor_name(de.getDoctor_name());
				dm.setSpecialisation(de.getSpecialisation());
				dm.setDoctor_id(de.getDoctor_id());
				int total_patients=appointment_repository.ptsByDocID(de.getDoctor_id()).size();
				dm.setPatients_seen((String.valueOf(total_patients)));
				
				doctorList.add(dm);
				System.out.println(de.getDoctor_name());
			}
			return doctorList;
		}
		return null;
	}
	
	/* Get list of deleted doctors */
	@GetMapping("/delete_doctors")
	public List<Working_doc_model>delete_doctors()
	{
		List<Doctors_entity>doc_list=doctors_repository.delete_doc_list();
		System.out.println("size is : "+doc_list.size());
		
		if (doc_list.size()!=0) 
		{
			List<Working_doc_model>doctorList=new ArrayList<>();
			for (Doctors_entity de : doc_list) 
			{
				Working_doc_model dm=new Working_doc_model();
				
				dm.setApplied_date(de.getApplied_date());
				dm.setDegree(de.getDegree());
				dm.setDoctor_name(de.getDoctor_name());
				dm.setSpecialisation(de.getSpecialisation());
				dm.setDoctor_id(de.getDoctor_id());
				int total_patients=appointment_repository.ptsByDocID(de.getDoctor_id()).size();
				dm.setPatients_seen((String.valueOf(total_patients)));
				
				doctorList.add(dm);
				System.out.println(de.getDoctor_name());
			}
			return doctorList;
		}
		return null;
	}
	
	
	/* Adding doctor by ADMIN */
	@PostMapping("/add_doctor")
	public String admin_adding_doc(@RequestBody Doctors_entity doctors)
	{
		int size=doctors_repository.docByMobExist(doctors.getMob_number()).size();
		System.out.println("name of doc exist : "+size+" alt number : "+doctors.getAlt_contact_num());
		if (size==0) 
		{
			String pasword=String.valueOf(generatePassword());
			Date date1=new Date();
			SimpleDateFormat fmt1=new SimpleDateFormat("yyyy-MM-dd");
			System.out.println("in if"+fmt1.format(date1));
			
			int result=doctors_repository.adminAddDoc(doctors.getDegree(),doctors.getRegistration_number(),doctors.getSpecialisation(),doctors.getClinic_location(),doctors.getState(),
									doctors.getCity(),doctors.getDoctor_name(),doctors.getOpd_timing(),doctors.getAlt_contact_num(),doctors.getEmial(),doctors.getExperience(),
									doctors.getNo_of_handlers(),doctors.getClinic_name(),doctors.getMob_number(), fmt1.format(date1), "admin", pasword,"working", fmt1.format(date1));
			live_opd_repository.insert_live(0, doctors.getMob_number()); // adding entry in Live OPD DB
			sendMail_registration(doctors.getDoctor_name(),doctors.getMob_number(),pasword,doctors.getEmial());
			if (result!=0) 
			{
				return "Successfull "+pasword;
			}
			else
			{
				return "UnSuccessfull";
			}
		}
		return "Doctor_exist";
	}
	
	/* Requesting Doctors List */
	@GetMapping("/on_hold_doctors")
	public List<Doc_model_list>onHold()
	{
		List<Doctors_entity>data=doctors_repository.onHoldDoctors();
		
		List<Doc_model_list>show_data=new ArrayList<>();
		System.out.println("in on hold method and size is : "+data.size());
		if (data.size()!=0)
		{
			for (Doctors_entity list : data) 
			{
				Doc_model_list dml=new Doc_model_list();
				dml.setApplied_date(list.getApplied_date());
				dml.setDegree(list.getDegree());
				dml.setDoctor_id(list.getDoctor_id());
				dml.setDoctor_name(list.getDoctor_name());
				dml.setRegistration_number(list.getRegistration_number());
				dml.setSpecialisation(list.getSpecialisation());
				
				show_data.add(dml);
			}
			return show_data;
		}
		return null;
	}
	
	/* Getting specific doctor data */
	@GetMapping("/get_doctor_data")
	public Doctors_model doc_data(@RequestParam("doc_id")String doc_id)
	{
		System.out.println("specific doctor data method & doc id is : "+doc_id);
		List<Doctors_entity>data=doctors_repository.doc_details(Integer.parseInt(doc_id));
		if (data.size()!=0)
		{
			Doctors_model dModel=new Doctors_model();
			dModel.setAlt_contact_num(data.get(0).getAlt_contact_num());
			dModel.setApplied_date(data.get(0).getApplied_date());
			dModel.setApproved_date(data.get(0).getApproved_date());
			dModel.setCity(data.get(0).getCity());
			dModel.setClinic_location(data.get(0).getClinic_location());
			dModel.setClinic_name(data.get(0).getClinic_name());
			dModel.setDegree(data.get(0).getDegree());
			dModel.setDoctor_name(data.get(0).getDoctor_name());
			dModel.setEmial(data.get(0).getEmial());
			dModel.setExperience(data.get(0).getExperience());
			dModel.setNo_of_handlers(data.get(0).getNo_of_handlers());
			dModel.setMob_number(data.get(0).getMob_number());
			
			int total_patients=appointment_repository.ptsByDocID(data.get(0).getDoctor_id()).size();
			dModel.setNumberOfPatients(String.valueOf(total_patients));
			
			dModel.setOpd_timing(data.get(0).getOpd_timing());
			dModel.setRegistration_number(data.get(0).getRegistration_number());
			dModel.setSpecialisation(data.get(0).getSpecialisation());
			dModel.setState(data.get(0).getState());
			dModel.setStatus(data.get(0).getStatus());
			dModel.setDoctor_id(data.get(0).getDoctor_id());
			
			return dModel;
		}
		
		return null;
	}
	
	/* Count of Working Doctors and Total Patients */
	@GetMapping("/counts")
	public String count()
	{
		int doc_count=doctors_repository.doc_list().size();
		int pt_count=patients_repository.allPatients().size();
		System.out.println("doc count : "+doc_count+" pt count : "+pt_count);
		return "{\"doc_count\":\""+doc_count+"\",\"pt_count\":\""+pt_count+"\"}";
	}
	
	/* All deleted patients data */
	@GetMapping("/delete_patients")
	public List<Patients_model>delet_patients()
	{
		List<Patients_entity>allPatients=patients_repository.all_delete_Patients();
		if (allPatients.size()!=0)
		{
			List<Patients_model>ptModel=new ArrayList<>();
			for (Patients_entity pe :allPatients)
			{
				Patients_model entity=new Patients_model();
				entity.setAddress(pe.getAddress());
				entity.setCity(pe.getCity());
				
				Calendar cal=Calendar.getInstance();
				int current_year=cal.get(Calendar.YEAR);
				String []dat=pe.getAge().split("-");
				int pt_year=Integer.parseInt(dat[0]);
				
				int age=current_year-pt_year;
				entity.setAge(String.valueOf(age));
				
				entity.setGender(pe.getGender());
				entity.setMob_number(pe.getMob_number());
				entity.setPatient_name(pe.getPatient_name());
				entity.setState(pe.getState());
				entity.setPatient_id(pe.getPatient_id());
				
				System.out.println("apt count for "+pe.getPatient_name()+" is : "+appointment_repository.appt_count(pe.getPatient_id()));
				entity.setVisits(String.valueOf(appointment_repository.appt_count(pe.getPatient_id())));
				
				ptModel.add(entity);
			}
			return ptModel;
		}
		return null;
	}
	
	/* All patients data */
	@GetMapping("/patients")
	public List<Patients_model>patients()
	{
		List<Patients_entity>allPatients=patients_repository.allPatients();
		if (allPatients.size()!=0)
		{
			List<Patients_model>ptModel=new ArrayList<>();
			for (Patients_entity pe :allPatients)
			{
				Patients_model entity=new Patients_model();
				entity.setAddress(pe.getAddress());
				entity.setCity(pe.getCity());
				entity.setGender(pe.getGender());
				entity.setMob_number(pe.getMob_number());
				
				Calendar cal=Calendar.getInstance();
				int current_year=cal.get(Calendar.YEAR);
				String []dat=pe.getAge().split("-");
				int pt_year=Integer.parseInt(dat[0]);
				
				int age=current_year-pt_year;
				
				entity.setAge(String.valueOf(age));
				entity.setPatient_name(pe.getPatient_name());
				entity.setState(pe.getState());
				entity.setPatient_id(pe.getPatient_id());
				System.out.println("apt count for "+pe.getPatient_name()+" is : "+appointment_repository.appt_count(pe.getPatient_id()));
				entity.setVisits(String.valueOf(appointment_repository.appt_count(pe.getPatient_id())));
				
				ptModel.add(entity);
			}
			return ptModel;
		}
		return null;
	}
	
	
	/* Deleting patient Account */
	@PostMapping("/patient_delete")
	public String delete(@RequestParam("pt_id")String pt_id)
	{
		System.out.println("in pt delete ! ");
		if (pt_id!=null) 
		{
			int res=patients_repository.admin_delete_account(Long.parseLong(pt_id));
			if (res!=0) 
			{
				return "successful";
			}
			return "unsuccessfull";
		}
		return "unsuccessfull";
	}
	
	
	/* Reactivate patient Account */
	@PostMapping("/patient_reactivate")
	public String reActivate_pt(@RequestParam("pt_id")String pt_id)
	{
		System.out.println("in pt delete ! ");
		if (pt_id!=null) 
		{
			int res=patients_repository.admin_reActive_account(Long.parseLong(pt_id));
			if (res!=0) 
			{
				return "successful";
			}
			return "unsuccessfull";
		}
		return "unsuccessfull";
	}
	
	
	/* Deleting Doctor */
	@GetMapping("/delete_doc")
	public String delete_doc(@RequestParam("doc_id") String doc_id)
	{
		int result=doctors_repository.delete_doctor(Integer.parseInt(doc_id));
		if (result!=0)
		{
			return "Successfull";
		}
		return "UnSuccessfull";
	}
	
	/* Deleting Doctor */
	@GetMapping("/reactive_doc")
	public String reActive_doc(@RequestParam("doc_id") String doc_id)
	{
		int result=doctors_repository.reActive_doctor(Integer.parseInt(doc_id));
		if (result!=0)
		{
			return "Successfull";
		}
		return "UnSuccessfull";
	}
	
	/* Approval for Doctor Request */
	@GetMapping("/accept")
	public String accept(@RequestParam("doc_id") String doc_id)
	{
		System.out.println("doc id : "+doc_id);
		int result=doctors_repository.accept_doctor(Integer.parseInt(doc_id));
		
		if (result!=0)
		{
			List<Doctors_entity>doc_data=doctors_repository.doc_details(Integer.parseInt(doc_id));
			String name=doc_data.get(0).getDoctor_name();
			String email=doc_data.get(0).getEmial();
			System.out.println("name : "+name+" email : "+email );
			sendMail_approval(name, email);
			return "Successfull";
		}
		return "Unsuccessfull";
	}
	
	/* Decline for Doctor Request */
	@GetMapping("/decline")
	public String decline(@RequestParam("doc_id") String doc_id)
	{
		int result=doctors_repository.canceling_doctor(Integer.parseInt(doc_id));
		System.out.println("in decline doc id : "+doc_id);
		if (result!=0)
		{
			List<Doctors_entity>doc_data=doctors_repository.doc_details(Integer.parseInt(doc_id));
			String name=doc_data.get(0).getDoctor_name();
			String email=doc_data.get(0).getEmial();
			System.out.println("name : "+name+" email : "+email );
			sendMail_cancelation(name, email);
			return "Successfull";
		}
		return "Unsuccessfull";
	}
}