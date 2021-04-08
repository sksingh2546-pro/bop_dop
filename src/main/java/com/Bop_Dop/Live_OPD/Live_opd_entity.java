package com.Bop_Dop.Live_OPD;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.Bop_Dop.Doctors.Doctors_entity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity 
@Table(name = "live_opd_data")
public class Live_opd_entity 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private int live_opd;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctors_entity doc_id;
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	public int getLive_opd() {
		return live_opd;
	}
	public void setLive_opd(int live_opd) {
		this.live_opd = live_opd;
	}
	
}