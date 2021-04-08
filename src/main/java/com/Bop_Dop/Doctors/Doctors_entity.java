package com.Bop_Dop.Doctors;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.Bop_Dop.Appointment.Appointment_entity;
import com.Bop_Dop.Handlers.Handlers_entity;

@Entity
@Table(name = "doctor_data")
public class Doctors_entity 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int doctor_id;
	private String doctor_name;
	private String clinic_name;
	private String mob_number;
	private String password;
	private String degree;
	private String registration_number;
	private String specialisation;
	private String clinic_location;
	private String city;
	private String state;
	private String opd_timing;
	private String alt_contact_num;
	private String emial;
	private String status;
	private int experience;
	private int no_of_handlers;
	private String applied_date;
	private String approved_date;
	private String register_by;

	@OneToMany(cascade = CascadeType.ALL,mappedBy = "doc_id")
	private List<Appointment_entity> apt_data;
	
	
	public String getRegister_by() 
	{
		return register_by;
	}
	public void setRegister_by(String register_by) 
	{
		this.register_by = register_by;
	}
	public String getClinic_name() {
		return clinic_name;
	}
	public void setClinic_name(String clinic_name) {
		this.clinic_name = clinic_name;
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
	public List<Appointment_entity> getApt_data() {
		return apt_data;
	}
	public void setApt_data(List<Appointment_entity> apt_data) {
		this.apt_data = apt_data;
	}
	public String getDoctor_name() {
		return doctor_name;
	}
	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}
	public String getMob_number() {
		return mob_number;
	}
	public void setMob_number(String mob_number) {
		this.mob_number = mob_number;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getDoctor_id() 
	{
		return doctor_id;
	}
	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public String getRegistration_number() {
		return registration_number;
	}
	public void setRegistration_number(String registration_number) {
		this.registration_number = registration_number;
	}
	public String getSpecialisation() {
		return specialisation;
	}
	public void setSpecialisation(String specialisation) {
		this.specialisation = specialisation;
	}
	public String getClinic_location() {
		return clinic_location;
	}
	public void setClinic_location(String clinic_location) {
		this.clinic_location = clinic_location;
	}
	public String getOpd_timing() {
		return opd_timing;
	}
	public void setOpd_timing(String opd_timing) {
		this.opd_timing = opd_timing;
	}
	public String getAlt_contact_num() {
		return alt_contact_num;
	}
	public void setAlt_contact_num(String alt_contact_num) {
		this.alt_contact_num = alt_contact_num;
	}
	public String getEmial() {
		return emial;
	}
	public void setEmial(String emial) {
		this.emial = emial;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getNo_of_handlers() {
		return no_of_handlers;
	}
	public void setNo_of_handlers(int no_of_handlers) {
		this.no_of_handlers = no_of_handlers;
	}
	public int getExperience() {
		return experience;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	public String getApplied_date() {
		return applied_date;
	}
	public void setApplied_date(String applied_date) {
		this.applied_date = applied_date;
	}
	public String getApproved_date() {
		return approved_date;
	}
	public void setApproved_date(String approved_date) {
		this.approved_date = approved_date;
	}
	
}