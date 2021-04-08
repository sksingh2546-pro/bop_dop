package com.Bop_Dop.Admin;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface Admin_repository extends CrudRepository<Admin_entity, Long>
{
	@Modifying
	@Query(value="insert into admin (admin_user_name,password) values(?1,?2)",nativeQuery = true)
	@Transactional
	public int create_admin(String u_name,String password);
	
	@Query(value="select a from Admin_entity a where admin_user_name=?1 and password=?2")
	public List<Admin_entity>login(String u_name,String password);
	
}