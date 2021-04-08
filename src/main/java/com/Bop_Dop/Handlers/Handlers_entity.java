package com.Bop_Dop.Handlers;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.Bop_Dop.Doctors.Doctors_entity;

@Entity
@Table(name = "handlers")
public class Handlers_entity 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String user_name;
	private String password;
	private String url;
	private String doctor_name;
	private long doctor_id;
	
	
	
	/**
	 * @return the doctor_id
	 */
	public long getDoctor_id() {
		return doctor_id;
	}
	/**
	 * @param doctor_id the doctor_id to set
	 */
	public void setDoctor_id(long doctor_id) {
		this.doctor_id = doctor_id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getDoctor_name() {
		return doctor_name;
	}
	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Long getId() 
	{ 
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}