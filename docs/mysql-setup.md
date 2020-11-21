# MySQL Setup

## Install MySQL Server and WorkBench

### Windows
- Go to this [link](https://dev.mysql.com/downloads/installer/) and download the installer for Windows
- Run the installer and in the `Setup Type` screen, select the default option

### Ubuntu
- Update apt: `sudo apt update`
- Instal mysql-server: `sudo apt install mysql-server`
- Secure mysql-server: `sudo mysql_secure_installation`
  - Follow the steps
  - Don't activate `VALIDATE PASSWORD COMPONENT`
- Download mysql workbench from this [link](https://dev.mysql.com/downloads/workbench/) for ubuntu
- Run the downloaded file to install.

## Add New User to MySQL
- Run the command `mysql` (or `mysql -u root -p` if the preceding fails) on Ubuntu terminal OR Windows powershell/command prompt
- Then run the series of commands sequentially:
```
CREATE USER 'tourism'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tourism123';
GRANT ALL PRIVILEGES ON *.* TO 'tourism'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```
- Now close the terminal

## Configure New Connection in MySQL WorkBench
- Open MySQL WorkBench
- Create a new connection
  - Connection Name: Anything
  - Hostname: `127.0.0.1`
  - Port: `13306`
  - Username: `tourism`
  - Password: `tourism123`
    - This will be prompted to you when you run the connection
- Test the connection, if all good continue
- Press OK

## Configuring New Database using MySQL WorkBench
- Open MySQL WorkBench
- Run the new connection (if prompted for password, enter `tourism123`)
- Press the option `Create a new schema in the connected server`
- Write the Schema Name: `tourism_db`
- Press Apply/OK
- Now double click the `tourism_db` in the `Schemas` view (mostly at the left side of the screen)
- Excute the following query to populate all tables for our application:
```
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(64) NOT NULL,
  `active` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `admin_permission` (
  `id` int NOT NULL,
  `manageAdmins` tinyint NOT NULL,
  `manageTrips` tinyint NOT NULL,
  `manageReqList` tinyint NOT NULL,
  `manageReports` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_admin_permission_id` FOREIGN KEY (`id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `admin_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(64) NOT NULL,
  `active` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `promo_code` (
  `code` varchar(10) NOT NULL,
  `maxDiscount` int NOT NULL,
  `discountPercentage` int NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `trip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminID` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `itienrary` varchar(500) NOT NULL,
  `price` int NOT NULL,
  `capacity` int NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_trip_adminID_idx` (`adminID`),
  CONSTRAINT `fk_trip_adminID` FOREIGN KEY (`adminID`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `trip_location` (
  `tripID` int NOT NULL,
  `locationID` int NOT NULL,
  PRIMARY KEY (`tripID`,`locationID`),
  KEY `fk_trip_location_locationID_idx` (`locationID`),
  CONSTRAINT `fk_trip_location_locationID` FOREIGN KEY (`locationID`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_trip_location_tripID` FOREIGN KEY (`tripID`) REFERENCES `trip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `trip_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tripID` int NOT NULL,
  `customerID` int NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `numberOfPeople` int NOT NULL,
  `amountDue` int NOT NULL,
  `accepted` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_trip_request_tripID_idx` (`tripID`),
  KEY `fk_trip_request_customerID_idx` (`customerID`),
  KEY `fk_trip_request_code_idx` (`code`),
  CONSTRAINT `fk_trip_request_code` FOREIGN KEY (`code`) REFERENCES `promo_code` (`code`),
  CONSTRAINT `fk_trip_request_customerID` FOREIGN KEY (`customerID`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_trip_request_tripID` FOREIGN KEY (`tripID`) REFERENCES `trip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```