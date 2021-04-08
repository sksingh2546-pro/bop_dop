package com.Bop_Dop;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin("*")
public class Home_controller 
{
	
	@RequestMapping("/")
    public String openz() 
    {
		System.out.println("in basic home");
        return "index.html";
    }
	
	@RequestMapping("/admin")
	public String admin()
	{
		System.out.println("in admin");
		return "admin/index.html";
	}
	
	@RequestMapping("/admin/")
	public String admin1()
	{
		System.out.println("in admin/");
		return "/admin/index.html";
	}
	
	@RequestMapping("/doctor")
	public String doctor()
	{
		System.out.println("in doctor ");
		
		return"doctor/doctor-dashboard.html";
	}
	
	@RequestMapping("/doctor/")
	public String doctor1()
	{
		System.out.println("doctor/");
		return"/doctor/doctor-dashboard.html";
	}
	
//	@RequestMapping("**")
//	public String error()
//	{
//		System.out.println("in error");
//		return "index.html";
//	}
	
	
}
