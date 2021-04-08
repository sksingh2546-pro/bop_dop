package com.Bop_Dop.Appointment;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.Bop_Dop.Doctors.Doctors_entity;
import com.Bop_Dop.Patients.Patients_entity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "appointment_data")
public class Appointment_entity 
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long apt_id;
	private String date;
	private String time;
	private String status;
	private String reason_token_no;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctors_entity doc_id;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "patient_id")
	private Patients_entity pt_dt;
	

	public long getApt_id() {
		return apt_id;
	}

	public void setApt_id(long apt_id) {
		this.apt_id = apt_id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Doctors_entity getDoc_id() {
		return doc_id;
	}

	public void setDoc_id(Doctors_entity doc_id) {
		this.doc_id = doc_id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Patients_entity getPt_dt() {
		return pt_dt;
	}

	public void setPt_dt(Patients_entity pt_dt) {
		this.pt_dt = pt_dt;
	}

	public String getReason_token_no() {
		return reason_token_no;
	}

	public void setReason_token_no(String reason_token_no) {
		this.reason_token_no = reason_token_no;
	}
}