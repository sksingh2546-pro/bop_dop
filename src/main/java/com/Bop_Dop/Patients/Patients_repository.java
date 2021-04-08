package com.Bop_Dop.Patients;

import java.util.List;

import javax.transaction.Transactional;

import org.apache.poi.ss.formula.ptg.StringPtg;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Patients_repository extends CrudRepository<Patients_entity, Long> 
{
	/* Sign_up Adding mob_number, name and Password of Patient */
	@Modifying
	@Query(value ="insert into patient_data (patient_name,mob_number,password,status) values(?1,?2,?3,'working')",nativeQuery = true)
	@Transactional
	public int insert_pt(String pt_name,String mob_num,String pswrd);
	
	/* At the time of Sign_up Checking for Mob number existence */
	@Query("select p.patient_name from Patients_entity p where mob_number=?1")
	public String numb_existence(String mob_num);
	
	/* Patient Login */
	@Query("select p.patient_name from Patients_entity p where mob_number=?1 and password=?2")
	public String pt_login(String mob_num,String password);
	
	/* details are filled or not and login aswell */
	@Query("select p from Patients_entity p where mob_number=?1 and password=?2")
	public List<Patients_entity> empty_profile(String mob_num,String password);
	
	/* Verify whether data is filled */
	@Query("select p.city from Patients_entity p where mob_number=?1 and password=?2")
	public String verify(String mob,String password);
	
	/* After Sign_up & login Adding details of patient */
	@Modifying
	@Query(value = "update patient_data set age=?1,gender=?2,address=?3,city=?4,state=?5,email=?6 where mob_number=?7",nativeQuery = true)
	@Transactional
	public int update_pt_info(String age,String gender,String address,String city,String state,String email,String mob_num);
	
	/* Change Password */
	@Modifying
	@Query(value="update patient_data set password=?1 where mob_number=?2 and password=?3",nativeQuery = true)
	@Transactional
	public int change_password(String new_pss,String mob_num,String old_pass);
	
	/* Forget Password */
	@Modifying
	@Query(value="update patient_data set password=?1 where mob_number=?2 ",nativeQuery = true)
	@Transactional
	public int forget_password(String new_pss,String mob_num);
	
	/* All active patients for Admin */
	@Query("select p from Patients_entity p where status='working'")
	public List<Patients_entity>allPatients();
	
	/* All InActive patients for Admin */
	@Query("select p from Patients_entity p where status='delete'")
	public List<Patients_entity>all_delete_Patients();
	
	/* Single Patient Details */
	@Query("select p from Patients_entity p where mob_number=?1")
	public Patients_entity pt_data(String mob);
	
	/* Admin Deleting Account */
	@Modifying
	@Query(value="update patient_data set status='delete' where patient_id=?1",nativeQuery = true)
	@Transactional
	public int admin_delete_account(long pt_id);
	
	/* Admin ReActivating Account */
	@Modifying
	@Query(value="update patient_data set status='working' where patient_id=?1",nativeQuery = true)
	@Transactional
	public int admin_reActive_account(long pt_id);
	
	
	/*  Deleting Account */
	@Modifying
	@Query(value="update patient_data set status='delete' where mob_number=?1",nativeQuery = true)
	@Transactional
	public int delete_account(String mob_num);
}
