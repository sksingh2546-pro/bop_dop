package com.Bop_Dop.Doctors;

import java.util.List;
import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Doctors_repository extends CrudRepository<Doctors_entity,Integer> 
{
	
	/* Doctor Signing Up */
	@Modifying
	@Query(value="insert into doctor_data(doctor_name,mob_number,password,experience,no_of_handlers,status) values(?1,?2,?3,0,0,'unfilled')",nativeQuery = true)
	@Transactional
	public int insert_doc(String name,String mob_num,String password);
	
	/* Checking whether doc name exist */
	@Query("Select s from Doctors_entity s where doctor_name=?1")
	public List<Doctors_entity> docByNameExist(String name);
	
	/* Checking whether doc mob numb exist */
	@Query("Select s from Doctors_entity s where mob_number=?1")
	public List<Doctors_entity> docByMobExist(String mob_numb);
	
	/* Checking whether doctor filled all details or not */
	@Query("select d.degree from Doctors_entity d where mob_number=?1 and password=?2") 
	public String verify(String mob_numb,String password);
	
		/* First Time Doctor updating Details */
	@Modifying
	@Query(value="update doctor_data set status='hold',degree=?1,registration_number=?2,specialisation=?3,clinic_location=?4,state=?5,city=?6,"
			+ "opd_timing=?7,alt_contact_num=?8,emial=?9,experience=?10,no_of_handlers=?11,clinic_name=?12,applied_date=?14,register_by=?15 where mob_number=?13",nativeQuery = true)
	@Transactional
	public int update_doc(String degree,String reg_num,String specilisation,String location,String state,String city,String opd_timing,String contact_num,String email,int experience,int handlers,
			String clinic_name,String mob_number,String applied_date,String reg_by);
	
	/* Admin Adding Doctor */
	@Modifying
	@Query(value="insert into doctor_data(degree,registration_number,specialisation,clinic_location,state,city,doctor_name,opd_timing,alt_contact_num,emial,experience,no_of_handlers"
			+ ",clinic_name,mob_number,applied_date,register_by,password,status,approved_date) values(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17,?18,?19)",nativeQuery = true)
	@Transactional
	public int adminAddDoc(String degree,String reg_num,String specilisation,String location,String state,String city,String doc_name,String opd_timing,String alt_contact_num,String email,
			int experience,int handlers,String clinic_name,String mob_number,String applied_date,String reg_by,String password,String status,String approved_date);
	
	/* Doctor Edit Profile */
	@Modifying
	@Query(value="update doctor_data set degree=?1,registration_number=?2,specialisation=?3,"
			+ "clinic_location=?4,state=?5,city=?6,alt_contact_num=?7,emial=?8,experience=?9,no_of_handlers=?10,clinic_name=?11 where mob_number=?12",nativeQuery = true)
	@Transactional
	public int update_doc(String degree,String reg_num,String specilisation,String location,String state,String city,String contact_num,String email,int experience,int handlers,
			String clinic_name,String mob_number);
	
	/* Doctor get their Profile */
	@Query("select s from Doctors_entity s where mob_number=?1")
	public List<Doctors_entity>doc_profile(String mob_num);
	
	/* Getting Doctor id  */
	@Query("select d.doctor_id from Doctors_entity d where mob_number=?1")
	public long getDoc_id(String mob_num);
	
	
	/* Login */
	@Query("select s from Doctors_entity s where (mob_number=?1 and password=?2) and (status='working' or status='unfilled') ")
	public List<Doctors_entity> dlogin(String mob,String password);
	
	/* Check status of Doctor */
	@Query("Select s.status from Doctors_entity s where mob_number=?1")
	public String doc_status(String mob_numb);
	
	/* Doctors on Hold */
	@Query("select d from Doctors_entity d where status='hold'")
	public List<Doctors_entity>onHoldDoctors();
	
	/* Change Password */
	@Modifying
	@Query(value = "update doctor_data set password=?1 where mob_number=?2 and password=?3",nativeQuery = true)
	@Transactional
	public int changePassword(String new_pass,String mob_num,String old_pass);
	
	/* Forget Password */
	@Modifying
	@Query(value="update doctor_data set password=?1 where mob_number=?2 ",nativeQuery = true)
	@Transactional
	public int forget_password(String new_pss,String mob_num);
	
	/* Getting number of required handlers */
	@Query("select s.no_of_handlers from Doctors_entity s where mob_number=?1")
	public int handlers_exist(String mob_num);
	
	/* Getting Doc name after number */
	@Query("select s.doctor_name from Doctors_entity s where mob_number=?1")
	public String doc_name(String mob_num);
	
	/* Deleting Doctor by Admin */
	@Modifying
	@Query(value = "update doctor_data set status='delete' where doctor_id=?1",nativeQuery = true)
	@Transactional
	public int delete_doctor(int doc_id);
	
	
	/* ReActive Doctor by Admin */
	@Modifying
	@Query(value = "update doctor_data set status='working' where doctor_id=?1",nativeQuery = true)
	@Transactional
	public int reActive_doctor(int doc_id);
	
	/* Deleting Doctor by itself */
	@Modifying
	@Query(value = "update doctor_data set status='delete' where mob_number=?1",nativeQuery = true)
	@Transactional
	public int delete_doctor_by_itself(String mob_num);
	
	/* Accepting doctor */
	@Modifying
	@Query(value = "update doctor_data set status='working' where doctor_id=?1",nativeQuery = true)
	@Transactional
	public int accept_doctor(int doc_id);
	
	/* canceling doctor request */
	@Modifying
	@Query(value = "update doctor_data set status='cancel' where doctor_id=?1",nativeQuery = true)
	@Transactional
	public int canceling_doctor(int doc_id);
	
	/* Get doctor details by Doctor_id */
	@Query("select d from Doctors_entity d where doctor_id=?1")
	public List<Doctors_entity>doc_details(int doc_id);
	
			// /* FOR PATIENT */ //
	
	/* Selecting all cities in our Data Base */
	@Query("select s from Doctors_entity s where status='working' GROUP by city")
	public List<Doctors_entity>cities();
	
	/* Selecting all Specialties as per city */
	@Query("select s from Doctors_entity s where city=?1 and (status='working') GROUP by specialisation")
	public List<Doctors_entity>speciality_list(String city);
	
	/* Selecting all Doctors as per city */
	@Query("select s from Doctors_entity s where city=?1 and (status='working')")
	public List<Doctors_entity>docName_list(String city);
	
	/* Get doctors as Per city and specialty */
	@Query("select s from Doctors_entity s where city=?1 and specialisation=?2 and (status='working')")
	public List<Doctors_entity>city_special_list(String city,String specialisation);
	
	/* Get doctors as Per city only */
	@Query("select s from Doctors_entity s where city=?1 and status='working'")
	public List<Doctors_entity>city_special_only(String city);
	
	/* Get doctors as Per city and Name */
	@Query("select s from Doctors_entity s where city=?1 and doctor_name=?2 and (status='working')")
	public List<Doctors_entity>city_name_list(String city,String doc_name);
	
	/* Get doctors as Per city and specialty */
	@Query("select s from Doctors_entity s where city=?1 and clinic_name=?2 and (status='working')")
	public List<Doctors_entity>city_hospital_list(String city,String clinic_name);
	
			/* ADMIN */
	/* List of All working Doctors */
	@Query("select s from Doctors_entity s where status='working'")
	public List<Doctors_entity>doc_list();
	
	/* List of All deleted Doctors */
	@Query("select s from Doctors_entity s where status='delete'")
	public List<Doctors_entity>delete_doc_list();

	@Query("select d.opd_timing from Doctors_entity d where mob_number=?1")
	List<String> getOptTiming(String mob_no);
}