package com.Bop_Dop.Slots;

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
@Table(name = "slot_data")
public class Slot_entity  
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String date;
	private String slots;
	private String close;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctors_entity doc_id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getSlots() {
		return slots;
	}

	public void setSlots(String slots) {
		this.slots = slots;
	}

	public String getClose() {
		return close;
	}

	public void setClose(String close) {
		this.close = close;
	}

	public Doctors_entity getDoc_id() {
		return doc_id;
	}

	public void setDoc_id(Doctors_entity doc_id) {
		this.doc_id = doc_id;
	}
}