package com.Bop_Dop.Doctors;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.aspectj.weaver.ast.And;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.StreamingHttpOutputMessage;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Bop_Dop.Appointment.Appointment_entity;
import com.Bop_Dop.Appointment.Appointment_repository;
import com.Bop_Dop.Appointment.Approve_appointment_model;
import com.Bop_Dop.Handlers.Handler_controller;
import com.Bop_Dop.Handlers.Handlers_repository;
import com.Bop_Dop.Live_OPD.Live_opd_repository;
import com.Bop_Dop.Patients.Patients_repository;

import javax.mail.Multipart;
import java.util.Properties;
import javax.mail.MessagingException;
import com.sun.mail.smtp.SMTPTransport;
import javax.mail.internet.MimeMultipart;
import javax.activation.DataHandler;
import javax.activation.FileDataSource;
//import javax.jws.soap.SOAPBinding.Style;
import javax.mail.internet.MimeBodyPart;
import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.Authenticator;
import javax.mail.Session;

@RestController
@RequestMapping("/doctor")
@CrossOrigin("*")
public class Doctors_rest_controller 
{
	@Autowired
	Doctors_repository doctors_repository;
	
	@Autowired
	Patients_repository patients_repository; 
	
	@Autowired
	Live_opd_repository live_opd_repository;
	
	@Autowired
	Appointment_repository appointment_repository;
	
	@Autowired
	Handlers_repository handlers_repository;
	
	private static final String SMTP_SERVER = "smtp.gmail.com";
    private static final String PASSWORD = "Bopdop!123";
    private static final String EMAIL_FROM = "BopDopServices@gmail.com";

    	/* Doctor Requesting Email */
     static void sendMail(String doc_name) 
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
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse("rohithelpful2020@gmail.com,bopdopapp@gmail.com", false));
			msg.setSubject("Doctor's Request for Registration");
			MimeBodyPart p1 = new MimeBodyPart();
			p1.setText("Hi Admin, Doctor "+doc_name+" wants your approval for getting register at BopDop. Admin, please check the details of the doctor at "
					+ "below given link.");

			MimeBodyPart p2 = new MimeBodyPart();
			p2.setContent("Click this link <a href='http://bopdop.in/'>BopDop</a>", "text/html");  // need to change Home page here before host
			
			MimeBodyPart p4=new MimeBodyPart();
			p4.setContent("<br><br><br>Regards,<br><b>BOPDOP Requests,</b>", "text/html");
			
			
			Multipart mp = new MimeMultipart();
			mp.addBodyPart(p1);
			mp.addBodyPart(p2);
			msg.setContent(mp);
//			msg.setContent("<h1>sending html mail check</h1>","text/html" );
			
			System.out.println("mp = " + mp + " email = " + EMAIL_FROM + " pswrd= " + PASSWORD);// cmnts
			SMTPTransport t = (SMTPTransport) session.getTransport("smtp");
			t.connect("smtp.gmail.com", EMAIL_FROM, PASSWORD);
			System.out.println("email = " + EMAIL_FROM + " pas : " + PASSWORD); // cmnts
			t.sendMessage(msg, msg.getAllRecipients());
			System.out.println("Response: " + t.getLastServerResponse()); // cmnts
			t.close();
			
		} catch (MessagingException e) {
			e.printStackTrace();
		}

	}
			/* Generate OTP */
	static char[] OTP() 
    { 
        System.out.println("Generating OTP using random() : "); 
  
        // Using numeric values 
        String numbers = "0123456789"; 
  
        // Using random method 
        Random rndm_method = new Random(); 
  
        char[] otp = new char[4]; 
  
        for (int i = 0; i < 4; i++) 
        { 
            // Use of charAt() method : to get character value 
            // Use of nextInt() as it is scanning the value as int 
            otp[i] = 
             numbers.charAt(rndm_method.nextInt(numbers.length())); 
        } 
        System.out.println(otp);
        return otp; 
    } 

		/* Verifying Mobile Number Existence */
	@GetMapping("/num_check")
	public String numCheck(@RequestParam("doctor_name")String doc_name,@RequestParam("mob_number")String mob_num)
	{
		int name=doctors_repository.docByNameExist(doc_name).size();
		int mob=doctors_repository.docByMobExist(mob_num).size();
		String ptient_name=patients_repository.numb_existence(mob_num);
		if (name!=0)
		{
			return"Name Exist";
		}
		else if (mob!=0)
		{
			return"Mob Exist";
		}
		else if(ptient_name!=null)
		{
			return "patient";
		}
		else
		{
			String tp=String.valueOf(OTP());
			
			System.out.println("OPT IS : "+tp);
			
			return"Successfull"+" opt:"+tp;	
		}
	}
	/* Doctor Signing Up */
	@PostMapping("/doc_signup")
	public String doc_signup(@RequestParam("doctor_name")String doc_name,@RequestParam("mob_number")String mob_num,@RequestParam("password")String password)
	{
		
			int res=doctors_repository.insert_doc(doc_name, mob_num, password);
			if (res!=0)
			{
				return"Successfull";	
			}
			return"UnSuccessfull";
	}
	
	@PostMapping("/verify")
	public String verify(@RequestParam("mob_num")String mob_num,@RequestParam("password")String password)
	{
		String result=null;
		if (mob_num!=null && password!=null) 
		{
			result=doctors_repository.verify(mob_num, password);
			if (result!=null) 
			{
				return "ok";
			}
			return null;
		}
		return result;
	}
	
	/* Doctor Initially adding his Details in this Applied date will update automatically */
	@PostMapping("/add_doc_detail")
	public String update_doc(@RequestBody Doctors_entity doctors)
	{
		List<Doctors_entity>doc_exist=doctors_repository.docByMobExist(doctors.getMob_number());
		int size=doc_exist.size();
		System.out.println("name of doc exist : "+size+" alt number : "+doctors.getAlt_contact_num());
		
		if (size!=0) 
		{
			Date date=new Date();
			SimpleDateFormat fmt=new SimpleDateFormat("yyyy-MM-dd");
			System.out.println(fmt.format(date));
			
			int result=doctors_repository.update_doc(doctors.getDegree(),doctors.getRegistration_number(),doctors.getSpecialisation(), doctors.getClinic_location(),
													 doctors.getState(),doctors.getCity(),doctors.getOpd_timing(),doctors.getAlt_contact_num(),doctors.getEmial(),
													 doctors.getExperience(),doctors.getNo_of_handlers(),doctors.getClinic_name(),doctors.getMob_number(),fmt.format(date),"self");
				
				sendMail(doc_exist.get(0).getDoctor_name());
				live_opd_repository.insert_live(0, doctors.getMob_number());// adding data in Live opd table
			if (result!=0) 
			{
				return "Successfull";
				/* need to add email for admin approval */
			}
			else
			{
				return "UnSuccessfull";
			}
		}
		return "UnSuccessfull";
	}
	/* Updating Doctor profile  */
	@PostMapping("/update_profile")
	public String update_doc_profile(@RequestBody Doctors_entity doctors)
	{
		int size=doctors_repository.docByMobExist(doctors.getMob_number()).size();
		System.out.println("name of doc exist : "+size+" alt number : "+doctors.getAlt_contact_num());
		
		int result=doctors_repository.update_doc(doctors.getDegree(),doctors.getRegistration_number(),doctors.getSpecialisation(), doctors.getClinic_location(),doctors.getState(),
												 doctors.getCity(),doctors.getAlt_contact_num(),doctors.getEmial(),doctors.getExperience(),
												 doctors.getNo_of_handlers(),doctors.getClinic_name(),doctors.getMob_number());
		if (result!=0) 
		{
			return "Successfull";
		}
		else
		{
			return "UnSuccessfull";
		}
	}
	
	/* Doctor login */
	@PostMapping("/doc_login")
	public String login(@RequestParam("mob_num")String mob_num,@RequestParam("password")String password)
	{
		System.out.println("mob : "+mob_num+" paas : "+password );
		List<Doctors_entity> data=doctors_repository.dlogin(mob_num, password);
		
		System.out.println("size : "+data.size()+" we get from back end ");
		
			if (data.size()!=0)
			{
				if (data.get(0).getDegree()==null)
				{
					System.out.println("degree is null");
					System.out.println("degree - "+data.get(0).getDegree()+", doc_name - "+data.get(0).getDoctor_name());
					return "{\"degree\":"+null+",\"name\":\""+data.get(0).getDoctor_name()+"\"}";
				}
				else 
				{
					System.out.println("degree - "+data.get(0).getDegree()+", doc_name - "+data.get(0).getDoctor_name());
					return "{\"degree\":\""+data.get(0).getDegree()+"\",\"name\":\""+data.get(0).getDoctor_name()+"\"}";
				}
			}
		
		System.out.println("sb kuj null");
			return "{\"age\":"+null+",\"name\":"+null+"}";
	}
	
	@PostMapping("/doc_status")
	public String doc_status(@RequestParam("mob_num")String mob_num)
	{
		return doctors_repository.doc_status(mob_num); 
	}
	
	/* Viewing Doctor Profile */
	@GetMapping("/doctor_profile")
	public List<Doctor_profile_model>profile(@RequestParam("mob_num")String mob_num)
	{
		List<Doctor_profile_model>dpm_list=new ArrayList<Doctor_profile_model>();
		List<Doctors_entity>doc=doctors_repository.doc_profile(mob_num);
		if (doc.size()!=0)
		{
			for (Doctors_entity de : doc) 
			{
				Doctor_profile_model dpm=new Doctor_profile_model();
				dpm.setCity(de.getCity());
				dpm.setClinic_address(de.getClinic_location());
				dpm.setClinic_name(de.getClinic_name());
				dpm.setDoctor_name(de.getDoctor_name());
				dpm.setEmail(de.getEmial());
				dpm.setExperience(de.getExperience());
				dpm.setPhone_numb(de.getAlt_contact_num());
				dpm.setQualification(de.getDegree());
				dpm.setSpecialisation(de.getSpecialisation());
				dpm.setState(de.getState());
				dpm.setNumber_of_handlers(de.getNo_of_handlers());
				dpm.setReg_number(de.getRegistration_number());
				dpm.setTiming(de.getOpd_timing());
				
				dpm_list.add(dpm);
			}
			return dpm_list;
		}
		return null;
	}
	
	/* All patients List */
	@PostMapping("/all_patients_list")
	public List<Approve_appointment_model>all(@RequestParam("mob_num")String mob_num)
	{
		List<Appointment_entity>pt_list=appointment_repository.pts_list_per_doc(mob_num);
		System.out.println("for mob num "+mob_num+" size = "+pt_list.size()+" ");
		if (pt_list.size()!=0) 
		{
			List<Approve_appointment_model>pt_data=new ArrayList<Approve_appointment_model>();
			
			for (Appointment_entity ae: pt_list) 
			{
				Approve_appointment_model apm=new Approve_appointment_model();
				apm.setApt_date(ae.getDate());
				apm.setContact(ae.getPt_dt().getMob_number());
				apm.setGender(ae.getPt_dt().getGender());
				apm.setPatient_name(ae.getPt_dt().getPatient_name());
				apm.setSlot(ae.getTime());
				Calendar cal=Calendar.getInstance();
				int current_year=cal.get(Calendar.YEAR);
				String []dat=ae.getPt_dt().getAge().split("-");
				int pt_year=Integer.parseInt(dat[0]);
				int age=current_year-pt_year;
				apm.setAge(age);
				
				apm.setStatus(ae.getStatus());
				pt_data.add(apm);
			}
		return pt_data;
		}
		return null;
	}
	
	
	/* List of today's all patients  */
	@PostMapping("/all_today_patients")
	public List<Approve_appointment_model>today_all(@RequestParam("mob_num")String mob_num)
	{
		List<Appointment_entity>pt_list=appointment_repository.today_pts_data(mob_num);
		System.out.println("for mob num "+mob_num+" size = "+pt_list.size()+" ");
		if (pt_list.size()!=0) 
		{
			List<Approve_appointment_model>pt_data=new ArrayList<Approve_appointment_model>();
			
			for (Appointment_entity ae: pt_list) 
			{
				Approve_appointment_model apm=new Approve_appointment_model();
				apm.setApt_date(ae.getDate());
				apm.setContact(ae.getPt_dt().getMob_number());
				apm.setGender(ae.getPt_dt().getGender());
				apm.setPatient_name(ae.getPt_dt().getPatient_name());
				apm.setSlot(ae.getTime());
				Calendar cal=Calendar.getInstance();
				int current_year=cal.get(Calendar.YEAR);
				String []dat=ae.getPt_dt().getAge().split("-");
				int pt_year=Integer.parseInt(dat[0]);
				int age=current_year-pt_year;
				apm.setAge(age);
				
				apm.setStatus(ae.getStatus());
				pt_data.add(apm);
			}
		return pt_data;
		}
		return null;
	}
	
	/* Count of wanted Handlers by doctor */
	@GetMapping("/handler_count")
	public String handler_count(@RequestParam("mob_num")String mob_num)
	{
		List<Doctors_entity> data =doctors_repository.doc_profile(mob_num);
		if (data.size()!=0)
		{
			return "{\"count\":\""+data.get(0).getNo_of_handlers()+"\"}";
		}
		return "{\"count\":"+null+"}";
	}
	
	/* Getting count of patients as per Doctor */
	@GetMapping("/dashboard")
	public String dash(@RequestParam("mob_num")String mob_num)
	{
		int today_total_patients=appointment_repository.today_pts_data(mob_num).size();
		int total_active_handlers=handlers_repository.findHandlersByDoctor(mob_num).size();//
		int today_not_complete_pt=appointment_repository.today_unattended_pts(mob_num).size();
		int total_reg_pt=appointment_repository.pts_list_per_doc(mob_num).size();
		
		return today_total_patients+":"+total_active_handlers+":"+today_not_complete_pt+":"+total_reg_pt;
	}
	
	/* Deleting handler  */
	@PostMapping("/delete_handler")
	public String delete(@RequestParam("id")String id)
	{
		int result= handlers_repository.delete_handler(Long.parseLong(id));

		if (result!=0)
		{
			return "Deleted";
		}
		return "Not Deleted";
	}
	
	/* Number of handlers doctor want */
	@PostMapping("/handlers_number")
	public String numb_handlers(@RequestParam("mob_num")String mob_num)
	{
		System.out.println("doc name is : "+mob_num);
		int wanted_handlers=doctors_repository.handlers_exist(mob_num);
		return String.valueOf(wanted_handlers);
	}
	
	@PostMapping("/change_password")
	public String changePassword(@RequestParam("mob_num")String mob_num,@RequestParam("old_pass")String old_pass,@RequestParam("new_pass")String new_pass)
	{
		int result=doctors_repository.changePassword(new_pass, mob_num, old_pass);
		if (result!=0)
		{
		return "pass";	
		}
		return "fail";
	}
	
	@PostMapping("/forget_password")
	public String check_number(@RequestParam("mob_num")String mob)
	{
		int size=doctors_repository.docByMobExist(mob).size();
		if (size!=0) 
		{
			String otp=String.valueOf(OTP());
			System.out.println("forget password otp "+otp);
			return otp;
		}
		return null;
	}
	
	@PostMapping("/forget2_password")
	public String forgetPassword(@RequestParam("mob_num")String mob,@RequestParam("new_pass")String new_pass)
	{
		int result=doctors_repository.forget_password(new_pass, mob);
		if (result!=0)
		{
			return "pass";	
		}
		return "fail";
	}
	
	/* Deleting Doctor */
	@PostMapping("/delete")
	public String delete_doc(@RequestParam("mob_num") String mob_num)
	{
		int result=doctors_repository.delete_doctor_by_itself(mob_num);
		if (result!=0)
		{
			return "successfull";
		}
		return "unsuccessfull";
	}

	@GetMapping("/opdTiming")
	public String getOpdTiming(@RequestParam("mob_number") String mob_num)
	{
		List<String> opdTiming=doctors_repository.getOptTiming(mob_num);
		String opd="";
		if(opdTiming.size()>0){
			opd=opdTiming.get(0);
		}

		return opd;
	}
}