package com.Bop_Dop.Appointment;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Appointment_repository extends CrudRepository<Appointment_entity, Long> 
{
	
	/* Inserting Data in Appointment Table */
	@Modifying
	@Query(value = "insert into appointment_data (status,date,time,patient_id,doctor_id) values('await',?1,?2,"
				+ "(select p.patient_id from patient_data p where mob_number=?3 and patient_name=?4),?5)",nativeQuery = true)
	@Transactional
	public int add_appointment(String date,String time,String mob_num,String pt_name,int doctor_id);
	
	/* Checking Appointment For Same day For same pt_name*/
	@Query("select p from Appointment_entity p where status='appointed' or status='await' and patient_id=(select p.patient_id from Patients_entity p where mob_number=?1) and doctor_id=?2")
	public List<Appointment_entity> check_apt(String mob_numb,String doc_id);
	
	
	/* Getting appointments details as per doctor */
	@Query("select a from Appointment_entity a where status='await' and doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1)")
	public List<Appointment_entity>await_list(String mob_num);
	
	/* Handler or Doctor will accept Appointment */
	@Modifying
	@Query(value="update appointment_data set status=?1, reason_token_no=?2 where apt_id=?3",nativeQuery = true)
	@Transactional
	public int accpt_appointment(String status,String reason_token,long apt_id);
	
	
	/* Automatically expire appointment which are in await */
	@Modifying
	@Query(value="update appointment_data set status='expire',reason_token_no='no response' where status='await' and date=curdate()",nativeQuery = true)
	@Transactional
	public int expire_appointment();
	
	/* Approved appointments as per doctor */
	@Query("select s from Appointment_entity s where status='approve' and doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1)")
	public List<Appointment_entity>approved_list(String mob_num);
	
	/* Update Appointment Status Done after visiting doctor */
	@Modifying
	@Query(value="update appointment_data set status='done' where apt_id=?1",nativeQuery = true)
	@Transactional
	public int done_visit(long apt_id);
	
	/* Done patients data */
	@Query("select s from Appointment_entity s where status='done' and doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1)")
	public List<Appointment_entity>done_list(String mob_num);
	
	
	/* Count of appointments */
	@Query("select count(a) from Appointment_entity a where patient_id=?1")
	public int appt_count(long patient_id);


	@Modifying
	@Query(value = "delete  from appointment_data  where patient_id=?1",nativeQuery = true)
	@Transactional
	public int deletePatientData(long patient_id);

	@Modifying
	@Query(value = "delete  from appointment_data  where doctor_id=?1",nativeQuery = true)
	@Transactional
	public int deleteDoctorData(long doctor_id);

	
	/* List of total patients as per doctor */
	@Query("select s from Appointment_entity s where doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1)")
	public List<Appointment_entity>pts_list_per_doc(String mob_num);
	
	/* Total Patients for today as per doctor */
	@Query("select s from Appointment_entity s where doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1) and date=curdate()")
	public List<Appointment_entity>today_pts_data(String mob_num);
	
	/* Total unattended Patients for today as per doctor */
	@Query("select s from Appointment_entity s where doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1) and date=curdate() and status='approve'")
	public List<Appointment_entity>today_unattended_pts(String mob_num);
	
	/* Total attended for today as per doctor */
	@Query("select s from Appointment_entity s where doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1) and date=curdate() and status='done'")
	public List<Appointment_entity>today_attended_pts(String mob_numb);
	
	/* Patients appointment History */
//	@Query("select s from Appointment_entity s where date <=curdate() and patient_id=(select p.patient_id from Patients_entity p where mob_number=?1)")
//	public List<Appointment_entity>pt_apt_history(String mob_number);
	
	@Query("select s from Appointment_entity s where patient_id=(select p.patient_id from Patients_entity p where mob_number=?1) ORDER BY year(date) desc,month(date) desc,day(date) desc,status asc")
	public List<Appointment_entity>pt_apt_history(String mob_number);
	
	/* Current appointment Status of Patient TO SHOW Patient */
	@Query("SELECT max(apt_id) from Appointment_entity s where (status='await' or status='approve') and patient_id=(select p.patient_id from Patients_entity p where mob_number=?1)")
	public long get_apt_id(String mob_num);
	
//	/* Current appointment Status of Patient TO SHOW Patient */
//	@Query("SELECT max(apt_id) from Appointment_entity s where status='approve' and patient_id=(select p.patient_id from Patients_entity p where mob_number=?1)")
//	public long get_apt_id(String mob_num);
	
	/* Getting latest appointment data for PATIENT */
	@Query("select s from Appointment_entity s where apt_id=?1")
	public List<Appointment_entity>getLatestAptData(long apt_id);
	
	/* Get Number of patients Visited as per doctor */
	@Query("select s from Appointment_entity s where doctor_id=?1")
	public List<Appointment_entity>ptsByDocID(int doc_id);
}