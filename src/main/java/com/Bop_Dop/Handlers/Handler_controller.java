package com.Bop_Dop.Handlers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Bop_Dop.Appointment.Appointment_repository;
import com.Bop_Dop.Doctors.Doctors_repository;

@RestController
@RequestMapping("/handler")
@CrossOrigin("*")
public class Handler_controller 
{
	@Autowired
	Doctors_repository doctors_repository;
	
	@Autowired
	Handlers_repository handlers_repository;
	
	@Autowired
	Appointment_repository appointment_repository;

	@PostMapping("/add_handler")
	public String add(@RequestParam("user_name")String user_name,@RequestParam("password")String password,@RequestParam("mob_num")String mob_num,@RequestParam("url")String url)
	{
		int wanted_handlers=doctors_repository.handlers_exist(mob_num);
		long existing_handlers=handlers_repository.handler_count(mob_num);
		
		long doc_id=doctors_repository.getDoc_id(mob_num);
		
		System.out.println("docid is : "+doc_id+"existing is : "+existing_handlers+" wanted handlers are : "+wanted_handlers);
		int left=wanted_handlers-(int)(existing_handlers);
		String doc_name=doctors_repository.doc_name(mob_num);
		if (left!=0)
		{
			int res=handlers_repository.insert_handler(user_name, password, url, doc_name,doc_id);
			if (res!=0)
			{
				return"Successfull";
			}
		}
		return null;
	}
	
	/* Login */
	@PostMapping("handler_login")
	public String login(@RequestParam("user_name")String u_name,@RequestParam("password")String password,@RequestParam("mob_num")String mob_num)
	{
		List<Handlers_entity>data=handlers_repository.login(u_name, password, mob_num);
		System.out.println("in handler login and data :"+data.size());
		System.out.println("mob : "+mob_num+" ,user : "+u_name+", pass : "+password +"size is "+data.size());
		if (data.size()!=0)
		{
			System.out.println("doctor name is : "+data.get(0).getDoctor_name());
			return data.get(0).getDoctor_name();
		}
		return "Unsuccessfull";
	}
	
	/* Handlers List */
	@PostMapping("handlers_list")
	public List<Handlers_entity>handlers(@RequestParam("mob_num")String mob)
	{
		List<Handlers_entity>hList=handlers_repository.findHandlersByDoctor(mob);
		return hList;
	}
	
	 /*  */
}