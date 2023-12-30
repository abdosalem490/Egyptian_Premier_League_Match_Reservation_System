# description
**An online automated ticket reservation system for football matches in the Egyptian Premier League**



# How to run
1. make sure to have `.env` file in the directory called `code` where the content of the `.env` file will be as follow:
```
PORT_NUM=<port_number>
SECRET="<some string key used by session>"
DB_URL="<database_link>"
MAPBOX_API_KEY="<mapbox_API_KEY>"
```

2. run the command `npm install` while standing in the directory called `code` to install all dependencies specified by  `package.json` file.
3. make sure you have MongoDB installed.
4. run `nodemon app.js` or `node app.js` to run the project.

# TODOs:
- add verification to input data
- connect to online database
- use any online storage service as Cloudinary instead of storing in the local files
- modify some of the endpoints
- change architecture of the system


# Notes:
- the directory [seeds](code/seeds) contains only 1 file responsible for creating seeds for the database
- the directory [utils](code/utils) contains only 1 file responsible for some time formatting
- the directory [views](code/views) contains files related to html files that will be rendered using `ejs` and sent 
- the directory [routes](code/routes) contains files responsible for routing to different endpoints
- the directory [controllers](code/controller) contains files that has code implementation for the routes
- the directory [models](code/models) contains files responsible for defining document structures and schemas for the mongo database
- the directory [public](code/public) contains miscellaneous files responsible for different things used by `views`


# Features
## Common
### 0. main Page
Designing good looking home page

https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/e0e8fe3a-c051-4836-bd22-fccb7b83b55a

## Site Administrator
### 1. Approve new users as an authority
New Users should sign-up & the user account is given
an authority when the administrator approves their
authority.



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/feba1156-6018-410a-acb3-fff18594dd5b



### 2. Remove an existing user.
The administrator can remove an existing account.


https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/c5e231d1-59ac-41d7-b102-4454fd5988e1




## EFA Managers
### 3. Create a new match event
The EFA managers can create a new match event and
add all its details.


https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/1862455c-6058-4762-945b-837b7f3ec18f



### 4. Edit the details of an existing match.
The EFA managers can change/edit the details of a
certain match.



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/163234fc-f242-40c0-85f8-ebd8899eb158





### 5. Add a new stadium.
The EFA managers can add a new stadium and define
its shape and number of seats as shown below.



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/59209aa7-8830-4862-bf1a-decdaa6d78d1




### 6. View match details.
The EFA managers can view matches details.



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/fec4e7b3-ef3e-4c58-ab85-911dffc2fbff





### 7. View vacant/reserved seats for each match.
The EFA managers can view the overall seat status for
each event (vacant/reserved).



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/9227e5fe-cd17-439b-967c-8770f6093d56







## Customers (Fans)
### 8. Edit their data.
The customer can edit their personal data (except for
the username and email address).




https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/1f4f7a65-0c96-4369-a96e-c8f4f7e7feec





### 9. View matches details.
The customer can view all matches details as well as
the vacant seats for each match.



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/4ec57f31-1f02-41dc-a428-1143d917cf08





### 10. Reserve vacant seat(s) in future matches.
The customer can select vacant seat/s only.



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/8252931f-1f1e-4a6d-9e71-d264c08662af






### 11. Cancel a reservation.
The customer can cancel a reserved ticket only 3 days
before the start of the event.
The seat/s in the reservation should be vacant again.



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/ae860ced-73ee-4dfc-8119-22c06b10edee





## Guests
### 12. Register a new account.
The guest can register a new account (whether as a
fan or as a manager).



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/99a0640c-6e20-47c7-88fb-3387d42e8e70





### 13. Sign in as an existing account.
The guest can log in as an existing account.



https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/4ccfc2e7-ab91-4e10-9a73-7a812fa30ab6






### 14. View matches details.
The guest can view matches details (whether signed in
or not).


https://github.com/abdosalem490/Egyptian_Premier_League_Match_Reservation_System/assets/82474719/38d9a296-56f9-4f09-a694-e87d7ca0023e





