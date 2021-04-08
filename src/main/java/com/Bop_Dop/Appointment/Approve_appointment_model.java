package com.Bop_Dop.Appointment;

public class Approve_appointment_model 
{
	private String patient_name;
	private int age;
	private String apt_date;
	private String gender;
	private String contact;
	private String slot;
	private long apt_id;
	private String token_no_reason;
	private String status;
	
	public String getStatus() 
	{
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPatient_name() 
	{
		return patient_name;
	}
	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getApt_date() {
		return apt_date;
	}
	public void setApt_date(String apt_date) {
		this.apt_date = apt_date;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getSlot() {
		return slot;
	}
	public void setSlot(String slot) {
		this.slot = slot;
	}
	public long getApt_id() {
		return apt_id;
	}
	public void setApt_id(long apt_id) {
		this.apt_id = apt_id;
	}
	public String getToken_no_reason() {
		return token_no_reason;
	}
	public void setToken_no_reason(String token_no_reason) {
		this.token_no_reason = token_no_reason;
	}
}