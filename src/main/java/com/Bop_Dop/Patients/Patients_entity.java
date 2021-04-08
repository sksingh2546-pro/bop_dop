package com.Bop_Dop.Patients;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.Bop_Dop.Appointment.Appointment_entity;


@Entity
@Table(name = "patient_data")
public class Patients_entity 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long patient_id;
	
	private String patient_name;
	private String age;
	private String gender;
	private String email;
	private String address;
	private String mob_number;
	private String city;
	private String state;
	private String status;
	private String password;
	
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "pt_dt")
	private List<Appointment_entity> data;
	
	public long getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(long patient_id) {
		this.patient_id = patient_id;
	}
	public String getPatient_name() {
		return patient_name;
	}
	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMob_number() {
		return mob_number;
	}
	public void setMob_number(String mob_number) {
		this.mob_number = mob_number;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}