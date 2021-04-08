package com.Bop_Dop.Slots;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/slot")
@CrossOrigin("*")
public class Slot_controller 
{
	@Autowired
	Slot_repository slot_repository;
	
	/* Closing slots */
	@PostMapping("/closing")
	public String insert(@RequestParam("date")String date,@RequestParam("mob_num")String mob_num,@RequestParam("slot")String slot)
	{
		System.out.println("in closing");
		int exist=slot_repository.slotExist(date, mob_num).size();
		System.out.println("value we get : "+exist);
		if (exist!=0)
		{
			int result=slot_repository.update_slot(slot, date, mob_num);
			
			if (result!=0)
			{
				return "Successfull";
			}
		}
		int result=slot_repository.insert_slot(date, slot,"slot", mob_num);
		if (result!=0)
		{
			return "Successfull";
		}
		return "UnSuccessfull";
	}
	
	/* Closing whole date */
	@PostMapping("/closingDate")
	public String insert(@RequestParam("date")String date,@RequestParam("mob_num")String mob_num)
	{
		List<Slot_entity>slots=slot_repository.slotExist(date, mob_num);
		
		int exist=slots.size();
		System.out.println("in closing date");
		if (exist==0) 
		{
			System.out.println("in empty");
			int result=slot_repository.insert_slot(date, "all","day", mob_num);

			if (result!=0)
			{
				return "Successfull";
			}
			return "UnSuccessfull";
		}
		System.out.println("in else part");
		slot_repository.update_slot_date(slots.get(0).getId());
		
		return "Successfull";
	}
	
	@PostMapping("/delete")
	public String delete(@RequestParam("mob_num")String mob_num,@RequestParam("date")String date)
	{
		int exist=slot_repository.slotExist(date, mob_num).size();
		System.out.println("exist : "+exist);
		if (exist!=0)
		{
			int result=slot_repository.delete_date(date, mob_num);
			System.out.println("Result of Size : "+result );
			if (result!=0)
			{
				return "Deleted";
			}
			return "not";
		}
		return "not Exsiting";
	}
	
	@PostMapping("/get_closed_date")
	public List<Closed_dates> closed_dates(@RequestParam("mob_num")String mob_num)
	{
		List<Slot_entity>data=slot_repository.dates_closed(mob_num);
		System.out.println("slot date close size we get : "+data.size()+" mob num : "+mob_num);
		if (data.size()!=0)
		{
			List<Closed_dates>cd=new ArrayList<>();
			for (Slot_entity closed : data) 
			{
				Closed_dates obj=new Closed_dates();
				obj.setDates(closed.getDate());
				
				cd.add(obj);
			}
			return cd;
		} 
		return null;
	}
	
	@PostMapping("/get_closed_slot")
	public List<Closed_slots> closed_slots(@RequestParam("mob_num")String mob_num,@RequestParam("date")String date)
	{
		List<Slot_entity>data=slot_repository.closed_slots(mob_num, date);
		System.out.println("in slot api & size we get : "+data.size()+" mob num : "+mob_num+" and date is : "+date);
		if (data.size()!=0)
		{
			List<Closed_slots>cs=new ArrayList<>();
			for (Slot_entity closed : data) 
			{
				Closed_slots obj=new Closed_slots();
				obj.setClosed_slots(closed.getSlots());
				cs.add(obj);
			}
			System.out.println("size of data we get : "+cs.size());
			return cs;
		} 
		return null;
	}
}