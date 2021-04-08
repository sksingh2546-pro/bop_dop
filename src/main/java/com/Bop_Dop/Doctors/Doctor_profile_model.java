package com.Bop_Dop.Doctors;

public class Doctor_profile_model 
{
	private String doctor_name;
	private String specialisation;
	private String qualification;
	private int experience;
	private String phone_numb;
	private String email;
	private String clinic_address;
	private String city;
	private String state;
	private String clinic_name;
	private String timing;
	private String reg_number;
	private int number_of_handlers;
	
	
	public String getTiming() {
		return timing;
	}
	
	public void setTiming(String timing) {
		this.timing = timing;
	}
	
	public String getReg_number() {
		return reg_number;
	}
	
	public void setReg_number(String reg_number) {
		this.reg_number = reg_number;
	}
	
	public int getNumber_of_handlers() {
		return number_of_handlers;
	}
	
	public void setNumber_of_handlers(int number_of_handlers) {
		this.number_of_handlers = number_of_handlers;
	}
	public String getDoctor_name() {
		return doctor_name;
	}
	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}
	public String getSpecialisation() {
		return specialisation;
	}
	public void setSpecialisation(String specialisation) {
		this.specialisation = specialisation;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public int getExperience() {
		return experience;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	public String getPhone_numb() {
		return phone_numb;
	}
	public void setPhone_numb(String phone_numb) {
		this.phone_numb = phone_numb;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getClinic_address() {
		return clinic_address;
	}
	public void setClinic_address(String clinic_address) {
		this.clinic_address = clinic_address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getClinic_name() {
		return clinic_name;
	}
	public void setClinic_name(String clinic_name) {
		this.clinic_name = clinic_name;
	}
}