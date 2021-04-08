package com.Bop_Dop.Handlers;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Handlers_repository extends CrudRepository<Handlers_entity, Long> 
{
	@Modifying
	@Query(value="insert into handlers (user_name,password,url,doctor_name,doctor_id) values(?1,?2,?3,?4,?5)",nativeQuery = true)
	@Transactional
	public int insert_handler(String uname,String password,String url,String doctor_name,long doc_id);
	
	@Query("select count(s) from Handlers_entity s where doctor_id=(select d.doctor_id from Doctors_entity d where mob_number=?1)")
	public int handler_count(String mob_num);
	
	@Query("select h from Handlers_entity h where user_name=?1 and password=?2 and doctor_name=(select d.doctor_name from Doctors_entity d where mob_number=?3)")
	public List<Handlers_entity> login(String u_name,String password,String mob);
	
	/* List of handlers as per doctor */
	@Query("select h from Handlers_entity h where doctor_name=(select d.doctor_name from Doctors_entity d where mob_number=?1)")
	public List<Handlers_entity> findHandlersByDoctor(String mob_num);
	
	/* Deleting handlers */
	@Modifying
	@Query(value="delete from handlers where id=?1",nativeQuery = true)
	@Transactional
	public int delete_handler(long id);
	
}