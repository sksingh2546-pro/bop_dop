package com.Bop_Dop.Live_OPD;

import java.util.List;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Bop_Dop.MqttConnection;
import com.Bop_Dop.Subscriber;
import com.Bop_Dop.Doctors.Doctors_repository;
import com.fasterxml.jackson.databind.util.JSONPObject;

@RestController
@CrossOrigin("*")
@RequestMapping("/live")
public class Live_opd_controller 
{
	@Autowired
	Live_opd_repository live_opd_repository;
	
	@Autowired
	Doctors_repository doctors_repository;
	
	@Scheduled(cron = "0 0 0 ? * *")
	public String updateZero()
	{
		live_opd_repository.updateZero();
		System.out.println("updated zero in all ");
		return null;
	}
	
	
	/* Adding and Updating LIVE_OPD */
	@PostMapping("/updates")
	public String insert(@RequestParam("live_opd")String live,@RequestParam("mob_num")String mob_num)
	{
		System.out.println("in live opd metthod");
		int exist=live_opd_repository.exist(mob_num).size();
		if (exist==0) 
		{
			System.out.println("in insert size of exist is :"+exist);
			int result =live_opd_repository.insert_live(Integer.parseInt(live), mob_num);
			
			long doc_id=doctors_repository.getDoc_id(mob_num);

			String jsonMsg=live+","+doc_id; //creating json data in a string
			MqttMessage msg=new MqttMessage(jsonMsg.getBytes()); // creating mqtt msg for sending that data 
			try 
			{
				Subscriber.client.publish(Subscriber.topic, msg);  // publishing it
			}
			catch (MqttException e) 
			{
				e.printStackTrace();
			}											
			
			System.out.println("done !!");
			if (result!=0) 
			{
				System.out.println("added");
				return "successful";
			}
			return "Unsuccessful";
		}
		else 
		{
			System.out.println("in else "+live);
			int result=live_opd_repository.update_live(Integer.parseInt(live), mob_num);
			
			long doc_id=doctors_repository.getDoc_id(mob_num);

			String jsonMsg=live+","+doc_id; //creating json data in a string 
			
			MqttMessage msg=new MqttMessage(jsonMsg.getBytes()); // creating mqttmsg for sending that data 
			
			try {
				MqttConnection con=new MqttConnection();
			
				Subscriber.client.publish(Subscriber.topic, msg); // publishing it
				}
			catch (MqttPersistenceException e) 
			{
				e.printStackTrace();
			} 
			catch (MqttException e) 
			{
				e.printStackTrace();
			} 
			
			if (result!=0) 
			{
				return "successful";
			}
			return "Unsuccessful";
		}
	}
	
	/* Get live OPD info for handler */
	@PostMapping("/live_info")
	public String getLive_info(@RequestParam("mob_num")String mob_num)
	{
		System.out.println("in live on load mob num : "+mob_num);
		List<Live_opd_entity> data =live_opd_repository.liv_opd(mob_num);
		System.out.println("live number we have "+data.get(0).getLive_opd());
		return String.valueOf(data.get(0).getLive_opd());
	}
	
	
	/* Get LIVE OPD for pt */
	@PostMapping("/get_opd")
	public String get_opd_data(@RequestParam("doc_id")String doc_id)
	{
		System.out.println("doc id ge : "+doc_id);
		int result=live_opd_repository.opd_num(Integer.parseInt(doc_id));
		
		return "Result :"+result;
	}
}