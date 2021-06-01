package com.Bop_Dop.Live_OPD;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Live_opd_repository extends CrudRepository<Live_opd_entity, Long>
{
	/* Adding  */
	@Transactional
	@Query(value = "insert into live_opd_data (live_opd,doctor_id) values(?1,(select d.doctor_id from doctor_data d where mob_number=?2))",nativeQuery = true)
	@Modifying
	public int insert_live(int live,String mob_num);
	
	/* Updates */
	@Transactional
	@Query(value = "update live_opd_data set live_opd=?1 where doctor_id=(select d.doctor_id from doctor_data d where mob_number=?2)",nativeQuery = true)
	@Modifying
	public int update_live(int live,String mob_num);
	
	
	/* Checking existing */
	@Query("select l from Live_opd_entity l where doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1)")
	public List<Live_opd_entity> exist(String mob_num);
	
	/* Getting details */
	@Query("select l.live_opd from Live_opd_entity l where doctor_id=?1")
	public int opd_num(int doc_id);
	
	/* Getting live info for Handler On Load or refresh */
	@Query("select l from Live_opd_entity l where doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1)")
	public List<Live_opd_entity> liv_opd(String mob_num);
	
	
	/* updating LIVE OPD to 0 at midnight */
	@Transactional
	@Query(value = "update live_opd_data set live_opd='0' where id is not null",nativeQuery = true)
	@Modifying
	public int updateZero();

	@Modifying
	@Query(value = "delete from live_opd_data  where doctor_id=?1",nativeQuery = true)
	@Transactional
	public int deleteLiveDoctorData(long doctor_id);
}
