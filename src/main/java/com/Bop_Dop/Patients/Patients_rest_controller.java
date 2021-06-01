package com.Bop_Dop.Patients;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import javax.print.Doc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Bop_Dop.Appointment.Appointment_entity;
import com.Bop_Dop.Appointment.Appointment_repository;
import com.Bop_Dop.Doctors.Doctor_names;
import com.Bop_Dop.Doctors.Doctors_city_model;
import com.Bop_Dop.Doctors.Doctors_entity;
import com.Bop_Dop.Doctors.Doctors_in_search_model;
import com.Bop_Dop.Doctors.Doctors_repository;
import com.Bop_Dop.Doctors.Hospital_ClinicNames;
import com.Bop_Dop.Doctors.Speciality_model;
import com.Bop_Dop.Slots.Closed_dates;
import com.Bop_Dop.Slots.Closed_slots;
import com.Bop_Dop.Slots.Slot_entity;
import com.Bop_Dop.Slots.Slot_repository;

import net.bytebuddy.asm.Advice.OffsetMapping.ForOrigin.Renderer.ForReturnTypeName;

@RestController
@RequestMapping("/patient")
@CrossOrigin("*")
public class Patients_rest_controller 
{
	@Autowired
	Patients_repository patient_repository;
	
	@Autowired
	Doctors_repository doctors_repository;
	
	@Autowired
	Appointment_repository appointment_repository;
	
	@Autowired
	Slot_repository slot_repository;


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
	
	/* Checking number existence in both patient and Doctor table */
	@GetMapping("/num_check")
	public String checkNumb(@RequestParam("mob_num")String mob_num)
	{
		String ptient_name=patient_repository.numb_existence(mob_num);
		int mob=doctors_repository.docByMobExist(mob_num).size();
		
		System.out.println("mob numb - "+mob_num+"patient : "+ptient_name+" - mob : "+mob);
		if(mob!=0)
		{
			return "doctor";
		}
		else  if (ptient_name!=null)
		{
			return"patient";
		}
		else 
		{
			String otp=String.valueOf(OTP());
			System.out.println("opt in pt is : "+otp);
			return "notExist otp :"+otp;
		}
	}
	/* patient Sign up */
	@PostMapping("/sign_up")
	public String pt_sign_up(@RequestParam("mob_num")String mob_num,@RequestParam("pt_name")String pt_name,@RequestParam("pswrd")String pswrd)
	{
			int num=patient_repository.insert_pt(pt_name, mob_num, pswrd);
			if (num!=0)
			{
				return"Done";
			}
			else 
			{
				return"not_done";
			}
	}	
	
	@PostMapping("/verify")
	public String verify(@RequestParam("mob_num")String mob_num,@RequestParam("password")String password)
	{
		String result=null;
		if (mob_num!=null && password!=null) 
		{
			result=patient_repository.verify(mob_num, password);
			if (result!=null) 
			{
				return "ok";
			}
			return null;
		}
		return result;
	}
	
	/* Patient Login */
	@PostMapping("/ptLogin")
	public String login(@RequestParam("mob_num")String u_id,@RequestParam("password")String paswrd)
	{
		List<Patients_entity>data=patient_repository.empty_profile(u_id, paswrd);
		System.out.println("data size : "+data.size()+" status is : ");
//		System.out.println(data.get(0).getStatus().equalsIgnoreCase("working"));
		if (data.size()!=0 && data.get(0).getStatus().equalsIgnoreCase("working"))
		{
			if (data.get(0).getAge()==null)
			{
				System.out.println("age is null");
				return "{\"age\":"+null+",\"name\":\""+data.get(0).getPatient_name()+"\"}";
			}
			else 
			{
				return "{\"age\":\""+data.get(0).getAge()+"\",\"name\":\""+data.get(0).getPatient_name()+"\"}";
			}
		}
		return "{\"age\":"+null+",\"name\":"+null+"}";
	}
	
	/* Updating patient info */
	@PostMapping("/update_info")
	public String pt_update_info(@RequestBody Patients_entity patients_entity)
	{
		int up=patient_repository.update_pt_info(patients_entity.getAge(),patients_entity.getGender(),patients_entity.getAddress(),patients_entity.getCity(),
												patients_entity.getState(),patients_entity.getEmail(),patients_entity.getMob_number());
		System.out.println("in update patient and mob number is : "+patients_entity.getMob_number());
		if (up!=0)
		{
			return"updated";
		}
		return"Unsuccessfull";
	}
	
	/* Get Cities from our database */
	@GetMapping("/cities")
	public List<Doctors_city_model>cities()
	{
		List<Doctors_entity>doc_cities=doctors_repository.cities();
		System.out.println("size of cites is : "+doc_cities.size());
		if (doc_cities.size() !=0) 
		{
			List<Doctors_city_model>cities=new ArrayList<>();
			for (Doctors_entity de : doc_cities) 
			{
				Doctors_city_model dcm=new Doctors_city_model();
				dcm.setCity(de.getCity());
				System.out.println("city is : "+de.getCity());
					cities.add(dcm);	
			}
			return cities;
		}
		return null;
	}
	
	/* Get Doctors name as per City */
	@PostMapping("/search_docName")
	public List<Doctor_names> docs(@RequestParam("city")String city)
	{
		System.out.println("hitting docname by city !");
		List<Doctors_entity>list=doctors_repository.docName_list(city);
		if (list.size()!=0) 
		{
			List<Doctor_names>docName=new ArrayList<>();
			for (Doctors_entity doc : list) 
			{
				Doctor_names dn=new Doctor_names();
				dn.setName(doc.getDoctor_name());
				docName.add(dn);
			}
			return docName;
		}
		return null;
	}
	
	/* Get Clinic or Hospital as per City */
//	@PostMapping("/search_hospi")
//	public Set<Hospital_ClinicNames>hospitals(@RequestParam("city")String city)
//	{
//		System.out.println("hitting hos names !");
//		List<Doctors_entity>list=doctors_repository.docName_list(city);
//		if (list.size()!=0) 
//		{
//			Set<Hospital_ClinicNames>set=new HashSet<>();
//			for (Doctors_entity doctors: list) 
//			{
//				Hospital_ClinicNames hcn=new Hospital_ClinicNames();
//				hcn.setHosName(doctors.getClinic_name());
//				set.add(hcn);
//			}
//			return set;
//		}
//		
//		return null;
//	}
	
	/* Get Clinic or Hospital as per City */
	@PostMapping("/search_hospi")
	public Set<String>hospitals(@RequestParam("city")String city)
	{
		System.out.println("hitting hos names !");
		List<Doctors_entity>list=doctors_repository.docName_list(city);
		if (list.size()!=0) 
		{
			Set<String>set=new HashSet<>();
			for (Doctors_entity doctors: list) 
			{
				set.add(doctors.getClinic_name());
			}
			return set;
		}
		return null;
	}
	
	/* Get Specialty of Doctors as Per City */
	@PostMapping("/search_city")
	public List<Speciality_model>specialty(@RequestParam("city")String city)
	{
		System.out.println("in city "+ city);
		List<Doctors_entity>list=doctors_repository.speciality_list(city);
		System.out.println("size is : "+list.size());
		if (list.size()!=0)
		{
			List<Speciality_model>spcl=new ArrayList<Speciality_model>();
			for (Doctors_entity d_e : list) 
			{
				Speciality_model sm=new Speciality_model();
				sm.setSpeciality(d_e.getSpecialisation());
				System.out.println("sm spc : "+sm.getSpeciality());
				spcl.add(sm);
			}
			System.out.println("size of spcl : "+spcl.size());
			return spcl;
		}
		return null;
	}
	
	/* Get Doctors as Per City only */
	@PostMapping("/search_city_only")
	public List<Doctors_in_search_model>doc_city_only(@RequestParam("city")String city)
	{
		System.out.println("in city & specialty ");
		List<Doctors_entity>list=doctors_repository.city_special_only(city);
		System.out.println("size is : "+list.size());
		if (list.size()!=0)
		{
			List<Doctors_in_search_model>search_result=new ArrayList<>();
			for (Doctors_entity de : list) 
			{
				Doctors_in_search_model dsm=new Doctors_in_search_model();
				dsm.setClinic_name(de.getClinic_name());
				dsm.setDoctor_name(de.getDoctor_name());
				dsm.setExperience(de.getExperience());
				dsm.setSpecialty(de.getSpecialisation());
				dsm.setAlt_number(de.getAlt_contact_num());
				dsm.setClinic_location(de.getClinic_location());
				dsm.setCity(de.getCity());
				dsm.setState(de.getState());
				dsm.setDoc_number(de.getMob_number());
				dsm.setDoc_id(de.getDoctor_id());
				dsm.setDegree(de.getDegree());
				dsm.setTiming(de.getOpd_timing());
				
				search_result.add(dsm);
			}
			System.out.println("size of spcl : "+search_result.size());
			return search_result;
		}
		return null;
	}
	
	
	
	/* Get Doctors as Per City And Specialty */
	@PostMapping("/search_spclty_city")
	public List<Doctors_in_search_model>doc_city_specialty(@RequestParam("city")String city,@RequestParam("specialty")String specialty)
	{
		System.out.println("in city & specialty ");
		List<Doctors_entity>list=doctors_repository.city_special_list(city, specialty);
		System.out.println("size is : "+list.size());
		if (list.size()!=0)
		{
			List<Doctors_in_search_model>search_result=new ArrayList<>();
			for (Doctors_entity de : list) 
			{
				Doctors_in_search_model dsm=new Doctors_in_search_model();
				dsm.setClinic_name(de.getClinic_name());
				dsm.setDoctor_name(de.getDoctor_name());
				dsm.setExperience(de.getExperience());
				dsm.setSpecialty(de.getSpecialisation());
				dsm.setAlt_number(de.getAlt_contact_num());
				dsm.setClinic_location(de.getClinic_location());
				dsm.setCity(de.getCity());
				dsm.setState(de.getState());
				dsm.setDoc_number(de.getMob_number());
				dsm.setDoc_id(de.getDoctor_id());
				dsm.setDegree(de.getDegree());
				dsm.setTiming(de.getOpd_timing());
				
				search_result.add(dsm);
			}
			System.out.println("size of spcl : "+search_result.size());
			return search_result;
		}
		return null;
	}
	
	/* Get Doctors as per City And Name */
	@PostMapping("/name_and_city")
	public List<Doctors_in_search_model>city_name(@RequestParam("city")String city,@RequestParam("name")String doc_name)
	{
		System.out.println("in doc name and city !");
		List<Doctors_entity>doc_list=doctors_repository.city_name_list(city, doc_name);
		
		System.out.println("doc list size is :"+doc_list.size());
		if (doc_list.size()!=0) 
		{
			List<Doctors_in_search_model>showData=new ArrayList<Doctors_in_search_model>();
			
			for (Doctors_entity doc : doc_list) 
			{
				Doctors_in_search_model dcm=new Doctors_in_search_model();
				dcm.setAlt_number(doc.getAlt_contact_num());
				dcm.setCity(doc.getCity());
				dcm.setClinic_location(doc.getClinic_location());
				dcm.setClinic_name(doc.getClinic_name());
				dcm.setDegree(doc.getDegree());
				dcm.setDoc_id(doc.getDoctor_id());
				dcm.setDoc_number(doc.getMob_number());
				dcm.setDoctor_name(doc.getDoctor_name());
				dcm.setExperience(doc.getExperience());
				dcm.setSpecialty(doc.getSpecialisation());
				dcm.setState(doc.getState());
				dcm.setTiming(doc.getOpd_timing());
				showData.add(dcm);
			}
			System.out.println("size of show data is "+showData.size());
			return showData;
		}
		return null;
	}
	
	/* Get Doctors as per City And Hospital/Clinic */
	@PostMapping("/hospi_and_city")
	public List<Doctors_in_search_model>city_hospi(@RequestParam("city")String city,@RequestParam("hospital")String hospital)
	{
		System.out.println("in hospital and city !");
		List<Doctors_entity>doc_list=doctors_repository.city_hospital_list(city, hospital);
		System.out.println("doc list size is :"+doc_list.size());
		if (doc_list.size()!=0) 
		{
			List<Doctors_in_search_model>showData=new ArrayList<Doctors_in_search_model>();
			
			for (Doctors_entity doc : doc_list) 
			{
				Doctors_in_search_model dcm=new Doctors_in_search_model();
				dcm.setAlt_number(doc.getAlt_contact_num());
				dcm.setCity(doc.getCity());
				dcm.setClinic_location(doc.getClinic_location());
				dcm.setClinic_name(doc.getClinic_name());
				dcm.setDegree(doc.getDegree());
				dcm.setDoc_id(doc.getDoctor_id());
				dcm.setDoc_number(doc.getMob_number());
				dcm.setDoctor_name(doc.getDoctor_name());
				dcm.setExperience(doc.getExperience());
				dcm.setSpecialty(doc.getSpecialisation());
				dcm.setState(doc.getState());
				dcm.setTiming(doc.getOpd_timing());
				showData.add(dcm);
			}
			System.out.println("size of show data is "+showData.size());
			return showData;
		}
		return null;
	}
	
	/* Doctors Profile */
	@GetMapping("/pt_doctor_profile")
	public List<Doctor_profile_show>profile(@RequestParam("mob_num")String mob_num)
	{
		List<Doctors_entity>doc=doctors_repository.doc_profile(mob_num);
		if (doc.size()!=0)
		{
			List<Doctor_profile_show>dps_list=new ArrayList<Doctor_profile_show>();
			for ( Doctors_entity de : doc) 
			{
				Doctor_profile_show obj=new Doctor_profile_show();
				obj.setAlt_numb(de.getAlt_contact_num());
				obj.setCity(de.getCity());
				obj.setClinic_location(de.getClinic_location());
				obj.setClinic_name(de.getClinic_name());
				obj.setDegree(de.getDegree());
				obj.setDoctor_id(de.getDoctor_id());
				obj.setDoctor_name(de.getDoctor_name());
				obj.setExperience(de.getExperience());
				obj.setSpecialisation(de.getSpecialisation());
				obj.setState(de.getState());
				obj.setTiming(de.getOpd_timing());
				dps_list.add(obj);
			}
			return dps_list;
		}
		return null;
	}
	
	/* Appointments History */
	@GetMapping("/history")
	public List<Patient_Appointment_history_model> history(@RequestParam("mob_num")String mob_num)
	{
		List<Appointment_entity>apt_his=appointment_repository.pt_apt_history(mob_num);
		if (apt_his.size()!=0) 
		{
			System.out.println("mob_number in history method : "+mob_num+" size : "+apt_his.size());
			
			List<Patient_Appointment_history_model>pahm=new ArrayList<Patient_Appointment_history_model>();
			for (Appointment_entity pAHmodel : apt_his) 
			{
				Patient_Appointment_history_model obj=new Patient_Appointment_history_model();
				obj.setApt_status(pAHmodel.getStatus());
				obj.setDate(pAHmodel.getDate());
				obj.setClinic_name(pAHmodel.getDoc_id().getClinic_name());
				obj.setTime_slot(pAHmodel.getTime());
				obj.setDoctor(pAHmodel.getDoc_id().getDoctor_name());
				obj.setApt_id(pAHmodel.getApt_id());
				
				System.out.println(pAHmodel.getDate()+" "+pAHmodel.getTime()+" apt id : "+pAHmodel.getApt_id());
				pahm.add(obj);
			}
			return pahm;
		}
		return null;
	}
	
	/* Change Password */
	@PostMapping("/change_password")
	public String changePassword(@RequestParam("mob_num")String mob,@RequestParam("old_pass")String old_pass,@RequestParam("new_pass")String new_pass)
	{
		int result=patient_repository.change_password(new_pass, mob, old_pass);
		if (result!=0)
		{
		return "pass";	
		}
		return "fail";
	}
	
	@PostMapping("/forget_password")
	public String check_number(@RequestParam("mob_num")String mob)
	{
		String name=patient_repository.numb_existence(mob);
		int size=doctors_repository.docByMobExist(mob).size();
		System.out.println("mob : "+mob+" and name we get : "+name);
		if (name!=null || size!=0) 
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
		int result=patient_repository.forget_password(new_pass, mob);
		int doc_result=doctors_repository.forget_password(new_pass, mob);
		if (result!=0 || doc_result!=0)
		{
			return "pass";	
		}
		return "fail";
	}
	
	/* Closed and open Slots/Dates  */
	@PostMapping("/get_closed_date")
	public List<Closed_dates> closed_dates(@RequestParam("doc_id")String doc_id)
	{
		
		List<Slot_entity>data=slot_repository.for_pt_dates_closed(Long.parseLong(doc_id));
		System.out.println("size we get : "+data.size()+" doc_id "+doc_id);
		if (data.size()!=0)
		{
			List<Closed_dates>cd=new ArrayList<>();
			for (Slot_entity closed : data) 
			{
				Closed_dates obj=new Closed_dates();
				obj.setDates(closed.getDate());
				
				cd.add(obj);
			}
			return cd;
		} 
		return null;
	}
	
	@PostMapping("/get_closed_slot")
	public List<Closed_slots> closed_slots(@RequestParam("doc_id")String doc_id,@RequestParam("date")String date)
	{
		List<Slot_entity>data=slot_repository.for_pt_closed_slots(Long.parseLong(doc_id), date);
		System.out.println("in patient api size we get : "+data.size()+" doc_id "+doc_id+" and date is : "+date);
		if (data.size()!=0)
		{
			List<Closed_slots>cs=new ArrayList<>();
			for (Slot_entity closed : data) 
			{
				Closed_slots obj=new Closed_slots();
				obj.setClosed_slots(closed.getSlots());
				cs.add(obj);
			}
			return cs;
		} 
		return null;
	}
	/*pateint profile view */
	@GetMapping("/pt_profile")
	public Patient_model pt_profile(@RequestParam("mob_num")String mob_num)
	{
		Patients_entity pEntity=patient_repository.pt_data(mob_num);
		System.out.println("value : "+pEntity);
		if (pEntity!=null) 
		{
			System.out.println("in if ");
			Patient_model pm=new Patient_model();
			pm.setAddress(pEntity.getAddress());
			
//			Calendar cal=Calendar.getInstance();
//			int current_year=cal.get(Calendar.YEAR);
//			String []dat=pEntity.getAge().split("-");
//			int pt_year=Integer.parseInt(dat[0]);
//			int age=current_year-pt_year;
			pm.setAge(pEntity.getAge());
			pm.setCity(pEntity.getCity());
			pm.setEmail(pEntity.getEmail());
			pm.setGender(pEntity.getGender());
			pm.setMob_number(pEntity.getMob_number());
			pm.setPatient_name(pEntity.getPatient_name());
			pm.setState(pEntity.getState());
			
			return pm;
		}
		System.out.println("in else ");
		return null;
	}
	
	/* changing Status to delete and deleting account  */
	@PostMapping("/delete")
	public String delete(@RequestParam("mob_num")String mob_num)
	{
		System.out.println("in pt delete ! ");
		if (mob_num!=null) 
		{
			int res=patient_repository.delete_account(mob_num);
			if (res!=0) 
			{
				return "successful";
			}
			return "unsuccessfull";
		}
		return "unsuccessfull";
	}
	
	/* Patient canceling appointment */
	@PutMapping("/cancel")
	public String cancel_apt(@RequestParam("apt_id")String apt_id)
	{
		int result=appointment_repository.accpt_appointment("cancel", "by patient", Long.parseLong(apt_id));
		if (result!=0)
		{
			return "successfull";
		}
		
		return"unsuccessfull";
	}
	@DeleteMapping("/deletePatient")
	public String deletePatient(@RequestParam(value = "patient_id")long patient_data){
		String message = "{\"message\":\"Unsuccessful\"}";
		int deleteAppointmentData=appointment_repository.deletePatientData(patient_data);
		int deletePatient=patient_repository.deletePatientData(patient_data);
		if (deletePatient>0){
			message = "{\"message\":\"successful\"}";
		}
		return message;
	}
	
}