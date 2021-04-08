package com.Bop_Dop.City_States;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface City_State_repository extends CrudRepository<City_State_Entity, Integer>
{
	@Modifying
	@Query(value = "insert into city_state (city,state) values(?1,?2)",nativeQuery = true)
	@Transactional
	public int insert(String city,String state);
	
	/* Selecting all cities in our Data Base */
	@Query("select s from City_State_Entity s GROUP by state")
	public List<City_State_Entity>states();
	
	/* Getting cities as per state */
	@Query("select s from City_State_Entity s where state=?1")
	public List<City_State_Entity>cities(String state);
}
