package com.Bop_Dop.Patients;

public class Patient_Appointment_history_model 
{
	private String date;
	private String time_slot;
	private String doctor;
	private String clinic_name;
	private String apt_status;
	private long apt_id;
	
	
	/**
	 * @return the apt_id
	 */
	public long getApt_id() {
		return apt_id;
	}
	/**
	 * @param apt_id the apt_id to set
	 */
	public void setApt_id(long apt_id) {
		this.apt_id = apt_id;
	}
	/**
	 * @return the date
	 */
	public String getDate() {
		return date;
	}
	/**
	 * @param date the date to set
	 */
	public void setDate(String date) {
		this.date = date;
	}
	/**
	 * @return the time_slot
	 */
	public String getTime_slot() {
		return time_slot;
	}
	/**
	 * @param time_slot the time_slot to set
	 */
	public void setTime_slot(String time_slot) {
		this.time_slot = time_slot;
	}
	/**
	 * @return the doctor
	 */
	public String getDoctor() {
		return doctor;
	}
	/**
	 * @param doctor the doctor to set
	 */
	public void setDoctor(String doctor) {
		this.doctor = doctor;
	}
	/**
	 * @return the clinic_name
	 */
	public String getClinic_name() {
		return clinic_name;
	}
	/**
	 * @param clinic_name the clinic_name to set
	 */
	public void setClinic_name(String clinic_name) {
		this.clinic_name = clinic_name;
	}
	/**
	 * @return the apt_status
	 */
	public String getApt_status() {
		return apt_status;
	}
	/**
	 * @param apt_status the apt_status to set
	 */
	public void setApt_status(String apt_status) {
		this.apt_status = apt_status;
	}
}