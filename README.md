# Vivriti-Capital-Company-Task
A traditional backend made purely with Nodejs and it's internal http module without using any backend frameworks. The app is built for performing CRUD operation on an employees database in mongodb.

API Routes:

Base URL: https://vivriti-capital-task.onrender.com

1. Adding Employee to DB: 

"/list" : This route is used to get the list of all the employees from the DB in a JSON format.

2. Register a new Employee:

"/Registration" : This route is used to to add a new employee to the DB. Just make a POST request from an API platform with a body as follows:

{
    "Firstname": "Dummy Firstname",
    "Lastname" : "Dummy Lastname",
    "MobileNumber": "7541265982",
    "Address": "Dummy Address",
    "Department": "Dummy Department"
}

3. Update the deatails of Existing Employee:

"/updateEmployee/:userid" : This route is used to update the details of an employee which is already existing in DB. Just make a POST request from an API platform with a body as follows:

{
    "Address": "Shri Krishna Niwas 2nd Bhatwadi Lane C.p.tank,Chennai,400004,India"   
}

This :userid parameter in the URL takes the user ID of the employee present in the DB to find and update the details.

4. Delete an existing employee:

"/deleteEmployee" : This route is used to delete the details of the employee present in the DB with the help of the user ID. Just make a POST request from an API platform with a body as follows:

{
    "userId": 45908
}

The entire document containing the details of the employee, with the provided user ID, will be deleted.

