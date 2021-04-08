package com.Bop_Dop.Slots;

import java.util.List;

import javax.transaction.Transactional;

import org.aspectj.weaver.patterns.ConcreteCflowPointcut.Slot;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Slot_repository extends CrudRepository<Slot_entity, Long> 
{
	@Modifying
	@Query(value = "insert into slot_data (date,slots,close,doctor_id) values(?1,?2,?3,(select d.doctor_id from doctor_data d where mob_number=?4))",nativeQuery = true)
	@Transactional
	public int insert_slot(String date,String slots,String close,String mob_num);
	
	@Query("select s from Slot_entity s where date=?1 and doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?2)")
	public List<Slot_entity>slotExist(String date,String mob_num);
	
	@Modifying
	@Query(value = "update slot_data set slots=?1 where date=?2 and doctor_id=(select d.doctor_id from doctor_data d where mob_number=?3)",nativeQuery = true)
	@Transactional
	public int update_slot(String slot,String date,String mob_num);
	
	
	/* if slot is closed then changing to date close */
	@Modifying
	@Query(value = "update slot_data set slots='all',close='day' where id=?1",nativeQuery = true)
	@Transactional
	public int update_slot_date(long id);
	
	
	@Modifying
	@Query(value = "delete from slot_data where close='day' and (date=?1 and doctor_id=(select d.doctor_id from doctor_data d where mob_number=?2))",nativeQuery = true)
	@Transactional
	public int delete_date(String date,String mob_num);
	
	/* For Doctor getting close dates */
	@Query("select s from Slot_entity s where close='day' and doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1)")
	public List<Slot_entity>dates_closed(String mob_num);
	
	/* For Doctor getting close slots as per date */
	@Query("select s from Slot_entity s where close='slot' and (doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1) and date=?2)")
	public List<Slot_entity>closed_slots(String mob_num,String date);
	

	/* For Patient getting close dates */
	@Query("select s from Slot_entity s where close='day' and doctor_id=?1")
	public List<Slot_entity>for_pt_dates_closed(long doc_id);
	
	/* For Patient getting close slots as per date */
	@Query("select s from Slot_entity s where close='slot' and (doctor_id=?1 and date=?2)")
	public List<Slot_entity>for_pt_closed_slots(long doc_id,String date);
	
}