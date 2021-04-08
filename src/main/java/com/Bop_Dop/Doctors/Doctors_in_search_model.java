package com.Bop_Dop.Doctors;

public class Doctors_in_search_model 
{
	private String doctor_name;
	private int experience;
	private String clinic_name;
	private String clinic_location;
	private String city;
	private String state;
	private String specialty;
	private String alt_number;
	private String doc_number;
	private int doc_id;
	private String degree;
	private String timing;
	
	
	public String getClinic_name() 
	{
		return clinic_name;
	}
	public void setClinic_name(String clinic_name) {
		this.clinic_name = clinic_name;
	}
	public int getDoc_id() 
	{
		return doc_id;
	}
	public void setDoc_id(int doc_id) {
		this.doc_id = doc_id;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public String getTiming() {
		return timing;
	}
	public void setTiming(String timing) {
		this.timing = timing;
	}
	public String getDoc_number() {
		return doc_number;
	}
	public void setDoc_number(String doc_number) {
		this.doc_number = doc_number;
	}
	public String getDoctor_name() {
		return doctor_name;
	}
	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}
	public int getExperience() {
		return experience;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	public String getClinic_location() {
		return clinic_location;
	}
	public void setClinic_location(String clinic_location) {
		this.clinic_location = clinic_location;
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
	public String getSpecialty() {
		return specialty;
	}
	public void setSpecialty(String specialty) {
		this.specialty = specialty;
	}
	public String getAlt_number() {
		return alt_number;
	}
	public void setAlt_number(String alt_number) {
		this.alt_number = alt_number;
	}
}