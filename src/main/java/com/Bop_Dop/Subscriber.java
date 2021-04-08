package com.Bop_Dop;

import org.eclipse.paho.client.mqttv3.*;

public  class Subscriber 
{
	public static int qos = 1;
    public static String topic = "appointed_patients";
    public static MqttClient client;
}