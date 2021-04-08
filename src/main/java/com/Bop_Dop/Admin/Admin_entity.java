package com.Bop_Dop.Admin;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin_entity 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ad_id;
	private String admin_user_name;
	private String password;
	private String emial;
	private String aonther_emial;
	private String mob_num;
	
	public String getAonther_emial() 
	{
		return aonther_emial;
	}
	public void setAonther_emial(String aonther_emial) 
	{
		this.aonther_emial = aonther_emial;
	}
	public String getEmial() 
	{
		return emial;
	}
	public void setEmial(String emial) 
	{
		this.emial = emial;
	}
	public String getMob_num() 
	{
		return mob_num;
	}
	public void setMob_num(String mob_num) 
	{
		this.mob_num = mob_num;
	}
	public Long getAd_id() 
	{
		return ad_id;
	}
	public void setAd_id(Long ad_id) 
	{
		this.ad_id = ad_id;
	}

	public String getAdmin_user_name() 
	{
		return admin_user_name;
	}
	
	public void setAdmin_user_name(String admin_user_name) 
	{
		this.admin_user_name = admin_user_name;
	}
	
	public String getPassword() 
	{
		return password;
	}
	
	public void setPassword(String password) 
	{
		this.password = password;
	}
}