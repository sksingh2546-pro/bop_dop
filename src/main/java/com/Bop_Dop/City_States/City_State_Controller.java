package com.Bop_Dop.City_States;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping("/in")
public class City_State_Controller
{
	@Autowired
	City_State_repository city_State_repository;
	
	@PostMapping("/importExcel")
    public String excelImport(@RequestParam("file") MultipartFile file) 
    {	
        Workbook workbook = null;
        String response = "Unsuccessful";
        try 
        {
            workbook = new XSSFWorkbook(file.getInputStream());
        }
        catch (IOException e1) 
        {
            e1.printStackTrace();
        }
         XSSFSheet sheet = (XSSFSheet)workbook.getSheetAt(0);
         int firstrow = 1;
         int lastrow = sheet.getLastRowNum();

         System.out.println("total data in excel is " + lastrow);
        for (int i = firstrow; i <= lastrow; ++i) 
        {
             Row row = (Row)sheet.getRow(i);
            try {
                 Cell city = row.getCell(0);
                 Cell state = row.getCell(1);
                {
                	City_State_Entity cse=new City_State_Entity();
                	cse.setCity(city.getStringCellValue());
                	cse.setState(state.getStringCellValue());
                	
                    city_State_repository.save(cse);
                }
            }
            catch (Exception e2) {
                System.out.println(e2);
            }
        }
        return response;
    }
	
	/* Getting all states */
	@GetMapping("/states")
	public List<State>states()
	{
		List<City_State_Entity>ct=city_State_repository.states();
		System.out.println("states we have : "+ct.size());
		if (ct.size()!=0)
		{
			List<State>stateList=new ArrayList<>();
			for (City_State_Entity cSe : ct) 
			{
				State st=new State();
				st.setState(cSe.getState());
				stateList.add(st);
			}
			return stateList;
		}
		return null;
	}
	
	/* getting all cities of particular State*/
	@GetMapping("/cities")
	public List<City>city(@RequestParam("state")String state)
	{
		List<City_State_Entity>cities=city_State_repository.cities(state);
		System.out.println(cities.size()+"cities we have for state : "+state);
		if (cities.size()!=0)
		{
			List<City>cityList=new ArrayList<>();
			for (City_State_Entity city : cities) 
			{
				City ct= new City();
				ct.setCity(city.getCity());
				
				cityList.add(ct);
			}
			return cityList;
		}
		return null;
	}
}