package com.Bop_Dop.Appointment;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Bop_Dop.Live_OPD.Live_opd_repository;

@RestController
@RequestMapping("/appointment")
@CrossOrigin("*")
public class Appointment_controller 
{

	@Autowired
	Appointment_repository appointment_repository;
	
	@Autowired
	Live_opd_repository live_opd_repository;
	
	/* Taking appointment */
	@PostMapping("/take_apt")
	public String take_apt(@RequestParam("date")String date,@RequestParam("time")String time,@RequestParam("patient_name")String patient_name,
							@RequestParam("mob_numb")String mob_numb,@RequestParam("doc_id")int doc_id)
	{
		int apt_exist=appointment_repository.check_apt(mob_numb, String.valueOf(doc_id)).size();
		System.out.println("doc id = "+doc_id+" pt mpb is : "+mob_numb);
		if (apt_exist==0)
		{
			int result=appointment_repository.add_appointment(date, time, mob_numb, patient_name, doc_id);
			if (result!=0) 
			{
				return"Successfull";		
			}
			return"Unsuccessfull";
		}
		return "Exist";
	}
	
	/* Doctor get list of awaiting appointments */
	@PostMapping("/awaiting_appointments")
	public List<Awaiting_appointment_model>awaiting(@RequestParam("mob_num")String mob)
	{
		List<Awaiting_appointment_model>apm=new ArrayList<Awaiting_appointment_model>();
		System.out.println("mob number is : "+mob);
		
		List <Appointment_entity>await_data=appointment_repository.await_list(mob);
		System.out.println("size of waiting appointments : "+await_data.size());
		if (await_data.size()!=0)
		{
			for (Appointment_entity ae : await_data) 
			{
				Calendar cal=Calendar.getInstance();
				int current_year=cal.get(Calendar.YEAR);
				String []dat=ae.getPt_dt().getAge().split("-");
				int pt_year=Integer.parseInt(dat[0]);
				
				Awaiting_appointment_model awaiting=new Awaiting_appointment_model();
				awaiting.setApt_date(ae.getDate());
				awaiting.setApt_id(ae.getApt_id());
				awaiting.setSlot(ae.getTime());
				awaiting.setPatient_name(ae.getPt_dt().getPatient_name());
				awaiting.setContact(ae.getPt_dt().getMob_number());
				awaiting.setGender(ae.getPt_dt().getGender());
				int age=current_year-pt_year;

				awaiting.setAge(age);
				apm.add(awaiting);
			}
		}
		if (apm.size()!=0) 
		{
			System.out.println("in apm and have data in it "+apm.size());
			return apm;
		}
			return null;
	}
	
	
	/* Changing Appointment Status to Expire after every 30 Minutes */
	@Scheduled(cron="0 0 22 * * ?")
	public void expire_appointment()
	{
		    int res=appointment_repository.expire_appointment();
		    System.out.println("expire result : "+res);
	}
	
	
	/* Handler or Doctor will update status as Cancel */
	@PostMapping("/apt_status_cancel")
	public String status_update(@RequestParam("apt_id")long apt_id,@RequestParam("reason")String reson_token)
	{
		int result=appointment_repository.accpt_appointment("cancel", reson_token, apt_id);
		if (result!=0)
		{
			return"Successfull "+reson_token;
		} 
		else 
		{
			return "Unsuccessfull";
		}
	}
	
	/* Handler or Doctor will update status as Cancel */
	@PostMapping("/patient_cancel")
	public String pt_cancel_apt(@RequestParam("apt_id")long apt_id)
	{
		int result=appointment_repository.accpt_appointment("cancel", "By patient", apt_id);
		if (result!=0)
		{
			return"successfull";
		} 
		else 
		{
			return "unsuccessfull";
		}
	}
	
	/* Handler or Doctor will update status as Cancel */
	@PostMapping("/apt_status_approve")
	public String status_approve(@RequestParam("apt_id")long apt_id,@RequestParam("token")String reson_token)
	{
		int result=appointment_repository.accpt_appointment("approve", reson_token, apt_id);
		if (result!=0)
		{
			return"Successfull "+reson_token;
		} 
		else 
		{
			return "Unsuccessfull";
		}
	}
	
	/* Getting list of approved Appointments */
	@PostMapping("/approved_appointments")
	public List<Approve_appointment_model>approved_apt(@RequestParam("mob_num")String mob_num)
	{
		List<Approve_appointment_model>approve_list=new ArrayList<Approve_appointment_model>();
		System.out.println("mob num is : "+mob_num);
		List<Appointment_entity>res=appointment_repository.approved_list(mob_num);
		System.out.println("size is : "+res.size());
		if (res.size()!=0)
		{
			for (Appointment_entity approve : res) 
			{
				System.out.println("age is : "+approve.getPt_dt().getAge()+" mob : "+approve.getPt_dt().getMob_number()+" name : "+approve.getPt_dt().getPatient_name());
				Calendar cal=Calendar.getInstance();
				int current_year=cal.get(Calendar.YEAR);
				String []dat=approve.getPt_dt().getAge().split("-");
				int pt_year=Integer.parseInt(dat[0]);
				
				int age=current_year-pt_year;
				
				Approve_appointment_model apm=new Approve_appointment_model();
				apm.setApt_date(approve.getDate());
				apm.setApt_id(approve.getApt_id());
				apm.setContact(approve.getPt_dt().getMob_number());
				apm.setGender(approve.getPt_dt().getGender());
				apm.setPatient_name(approve.getPt_dt().getPatient_name());
				apm.setSlot(approve.getTime());
				apm.setToken_no_reason(approve.getReason_token_no());
				apm.setAge(age);
				approve_list.add(apm);
			}
		}
		if (approve_list.size()!=0) 
		{
			return approve_list;
		}
		return null;
	}
	
	/* Appointment Status done  */
	@PostMapping("/done_appointment")
	public String update(@RequestParam("apt_id")String apt_idd)
	{
		long apt_id=Long.parseLong(apt_idd);
		int result=appointment_repository.done_visit(apt_id);
		if (result!=0)
		{
			return "Done";
		}
		return "Error ";
	}
	
	/* Done Patients list as per doctor */
	@PostMapping("/visited_patients_data")
	public List<Approve_appointment_model>done_apt(@RequestParam("mob_num")String mob_num)
	{
		List<Approve_appointment_model>approve_list=new ArrayList<Approve_appointment_model>();
		List<Appointment_entity>res=appointment_repository.done_list(mob_num);
		if (res.size()!=0)
		{
			for (Appointment_entity approve : res) 
			{
				Calendar cal=Calendar.getInstance();
				int current_year=cal.get(Calendar.YEAR);
				String []dat=approve.getPt_dt().getAge().split("-");
				int pt_year=Integer.parseInt(dat[0]);
				
				int age=current_year-pt_year;
				System.out.println("age is : "+age);
				Approve_appointment_model apm=new Approve_appointment_model();
				apm.setApt_date(approve.getDate());
				apm.setContact(approve.getPt_dt().getMob_number());
				apm.setGender(approve.getPt_dt().getGender());
				apm.setPatient_name(approve.getPt_dt().getPatient_name());
				apm.setSlot(approve.getTime());
				apm.setToken_no_reason(approve.getReason_token_no());
				apm.setAge(age);
				approve_list.add(apm);
			}
		}
		if (approve_list.size()!=0) 
		{
			return approve_list;
		}
		return null;
	}

	/* Get latest appointment details here */
	@PostMapping("/latest_apt")
	public String latest_apt(@RequestParam("mob_num")String mob_num) throws ParseException
	{
		System.out.println("in latest apt enter ");
		long apt_id=appointment_repository.get_apt_id(mob_num);
		if (apt_id!=0) 
		{
			List<Appointment_entity>data=appointment_repository.getLatestAptData(apt_id);
			System.out.println("apt id we get : "+apt_id+" and size of the data is : "+data.size());
			
			String dat=data.get(0).getDate();
			String tym[] = data.get(0).getTime().split("p");
			String token=data.get(0).getReason_token_no();
			String status=data.get(0).getStatus();
			String doc_name=data.get(0).getDoc_id().getDoctor_name();
			String clinic_name=data.get(0).getDoc_id().getClinic_name();
			String location=data.get(0).getDoc_id().getClinic_location();
			
			int live=live_opd_repository.opd_num(data.get(0).getDoc_id().getDoctor_id());

			System.out.println("time is "+data.get(0).getTime()+" tym[1] : "+tym.length);	
			if (tym.length>1)
			{
				if (tym[1].equalsIgnoreCase("m"))
				{
					String ty[]=tym[0].split(":");
					
					int tym1=Integer.parseInt(ty[0])+12;
					tym[0]=String.valueOf(tym1)+":"+ty[1];
				}
			}
			
			String myDate = dat+" "+tym[0];
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			Date date = sdf.parse(myDate); 	 // Converting String date to Date
			System.out.println("date is : "+date);
			long millis = date.getTime();
			Date cur=new Date();   // Get current date
			long cur_millis = cur.getTime();
			
			long dif = millis - cur_millis;
			
			long seconds = dif / 1000;
			long minutes = seconds / 60;
			long hours = minutes / 60;
			long days = hours / 24;
			String time = days + ":" + hours % 24 + ":" + minutes % 60 + ":" + seconds % 60; 

			String result="{\"token\":"+token+",\"time\":\""+data.get(0).getTime()+",\"date\":\""+dat+",\"doc_name\":\""+doc_name+",\"clinic\":\""+clinic_name+",\"location\":\""+location+",\"live\":\""+live+",\"doc_id\":\""+data.get(0).getDoc_id().getDoctor_id()+"\"}";	
			
			System.out.println("cur date "+cur_millis+" miles are "+ millis+" difference is "+dif+" dif time is : "+time+" date : "+dat+" time : "+data.get(0).getTime());
			System.out.println("in latest apt exit ");
			if (dif>0L) 
			{
				if (status.equals("await")) 
				{
					System.out.println("in await !");
//					return "await";
					return "{\"token\":\""+"await"+"\",\"time\":\""+data.get(0).getTime()+"\",\"date\":\""+dat+"\",\"doc_name\":\""+doc_name+"\",\"clinic\":\""
					+clinic_name+"\",\"location\":\""+location+"\",\"live\":\""+live+"\",\"doc_id\":\""+data.get(0).getDoc_id().getDoctor_id()+"\"}";
					
				}
				else if (status.equals("approve"))
				{
					System.out.println("in token "+token+" time : "+time+" "+doc_name);
					return "{\"token\":\""+token+"\",\"time\":\""+data.get(0).getTime()+"\",\"date\":\""+dat+"\",\"doc_name\":\""+doc_name+"\",\"clinic\":\""
							+clinic_name+"\",\"location\":\""+location+"\",\"live\":\""+live+"\",\"doc_id\":\""+data.get(0).getDoc_id().getDoctor_id()+"\"}";	
				}
			}
		}
		
		return null;
	}
	
	
	/* Get latest appointment details here */
	@PostMapping("/particular_apt")
	public String particular_apt(@RequestParam("apt_id")String apt_id) throws ParseException
	{
		System.out.println("in perticular apt enter ");
		System.out.println("in perticular apt id wre get : "+apt_id);
		List<Appointment_entity>data=appointment_repository.getLatestAptData(Long.parseLong(apt_id));
		System.out.println("apt id we get : "+apt_id+" and size of the data is : "+data.size()+"time is : "+data.get(0).getTime());
		
		String dat=data.get(0).getDate();
		String tym[] = data.get(0).getTime().split("p");
		String token=data.get(0).getReason_token_no();
		String status=data.get(0).getStatus();
		String doc_name=data.get(0).getDoc_id().getDoctor_name();
		String clinic_name=data.get(0).getDoc_id().getClinic_name();
		String location=data.get(0).getDoc_id().getClinic_location();
		
		int live=live_opd_repository.opd_num(data.get(0).getDoc_id().getDoctor_id());

		System.out.println("time is "+data.get(0).getTime());		
		if (tym[1].equalsIgnoreCase("m"))
		{
			String ty[]=tym[0].split(":");
			
			int tym1=Integer.parseInt(ty[0])+12;
			tym[0]=String.valueOf(tym1)+":"+ty[1];
		}
		String myDate = dat+" "+tym[0];
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date date = sdf.parse(myDate); 	 // Converting String date to Date
		System.out.println("date is : "+date);
		long millis = date.getTime();
		Date cur=new Date();   // Get current date
		long cur_millis = cur.getTime();
		
		long dif = millis - cur_millis;
		
		long seconds = dif / 1000;
		long minutes = seconds / 60;
		long hours = minutes / 60;
		long days = hours / 24;
		String time = days + ":" + hours % 24 + ":" + minutes % 60 + ":" + seconds % 60; 
		System.out.println("in perticular apt enter ");
		System.out.println("cur date "+cur_millis+" miles are "+ millis+" difference is "+dif+" dif time is : "+time+" date : "+dat+" time : "+data.get(0).getTime());
		if (dif>0L) 
		{
			if (status.equals("await")) 
			{
				System.out.println("in await !");
//				return "await";
				return "{\"token\":\""+"await"+"\",\"time\":\""+data.get(0).getTime()+"\",\"date\":\""+dat+"\",\"doc_name\":\""+doc_name+"\",\"clinic\":\""
				+clinic_name+"\",\"location\":\""+location+"\",\"live\":\""+live+"\",\"doc_id\":\""+data.get(0).getDoc_id().getDoctor_id()+"\"}";
			}
			else if (status.equals("approve"))
			{
				System.out.println("in token "+token+" time : "+time+" "+doc_name);
				
				return "{\"token\":\""+token+"\",\"time\":\""+data.get(0).getTime()+"\",\"date\":\""+dat+"\",\"doc_name\":\""+doc_name+"\",\"clinic\":\""
				+clinic_name+"\",\"location\":\""+location+"\",\"live\":\""+live+"\",\"doc_id\":\""+data.get(0).getDoc_id().getDoctor_id()+"\"}";
				
			}
		}
		return null;
	}
	
}