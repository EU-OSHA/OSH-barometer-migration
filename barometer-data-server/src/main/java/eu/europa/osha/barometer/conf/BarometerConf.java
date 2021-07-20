package eu.europa.osha.barometer.conf;

import java.util.ResourceBundle;

public class BarometerConf {
	
	private static ResourceBundle barometerConf = ResourceBundle.getBundle("eu.europa.osha.barometer.properties.oshaDvt");
	
	public static String getBarometerConf(String propertyName)
	{
		return barometerConf.getString(propertyName);
	}
}
