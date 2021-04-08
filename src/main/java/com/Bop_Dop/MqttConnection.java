package com.Bop_Dop;

import java.io.IOException;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public class MqttConnection implements MqttCallback 
{
	public MqttConnection() throws MqttException 
	{
        String host = String.format("ws://%s:%d", "18.217.174.27", 9001);
        String clientId = "MQTT-Java-Example";
        MqttConnectOptions conOpt = new MqttConnectOptions();
        conOpt.setCleanSession(true);
        if (Subscriber.client == null) 
        {
        	Subscriber.client = new MqttClient(host, clientId+Math.random(), new MemoryPersistence());
        	Subscriber.client.setCallback(this);
        	Subscriber.client.connect(conOpt);
        	Subscriber.client.subscribe(Subscriber.topic, Subscriber.qos);
        }

    }
	
	public void connectionLost(Throwable cause) 
	{
        System.out.println("Connection lost because: " + cause);
        new Subscriber();
    }

   
    public void deliveryComplete(IMqttDeliveryToken token) 
    {
    
    }

    public void messageArrived(String topic, MqttMessage message) throws MqttException 
     {
    	
     }
}
