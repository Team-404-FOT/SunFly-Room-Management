-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: sfrm
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `activebookings`
--

DROP TABLE IF EXISTS `activebookings`;
/*!50001 DROP VIEW IF EXISTS `activebookings`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `activebookings` AS SELECT 
 1 AS `booking_id`,
 1 AS `booking_date_and_time`,
 1 AS `room_num`,
 1 AS `customer_name`,
 1 AS `nic`,
 1 AS `phone_number`,
 1 AS `type`,
 1 AS `actype`,
 1 AS `special_note`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `booking_details_view`
--

DROP TABLE IF EXISTS `booking_details_view`;
/*!50001 DROP VIEW IF EXISTS `booking_details_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `booking_details_view` AS SELECT 
 1 AS `room_num`,
 1 AS `customer_name`,
 1 AS `type`,
 1 AS `actype`,
 1 AS `amount_per_day`,
 1 AS `booking_date_and_time`,
 1 AS `booking_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `bookinghistory`
--

DROP TABLE IF EXISTS `bookinghistory`;
/*!50001 DROP VIEW IF EXISTS `bookinghistory`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `bookinghistory` AS SELECT 
 1 AS `booking_id`,
 1 AS `check_in`,
 1 AS `check_out`,
 1 AS `room_num`,
 1 AS `customer_name`,
 1 AS `nic`,
 1 AS `phone_number`,
 1 AS `type`,
 1 AS `actype`,
 1 AS `special_note`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `booking_date_and_time` date DEFAULT NULL,
  `special_note` varchar(255) DEFAULT NULL,
  `customer_id` int NOT NULL,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `in_booking` bit(1) NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `FKbvfibgflhsb0g2hnjauiv5khs` (`customer_id`),
  KEY `FKrgoycol97o21kpjodw1qox4nc` (`room_id`),
  KEY `FK7d6k6nnum3eh7d8119hikdn0x` (`user_id`),
  CONSTRAINT `FK7d6k6nnum3eh7d8119hikdn0x` FOREIGN KEY (`user_id`) REFERENCES `ourusers` (`id`),
  CONSTRAINT `FKbvfibgflhsb0g2hnjauiv5khs` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`cus_id`),
  CONSTRAINT `FKrgoycol97o21kpjodw1qox4nc` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (31,'2024-11-07','extra towel',18,33,1,_binary '\0'),(32,'2024-11-07','',22,34,1,_binary '\0'),(36,'2024-11-07','',18,34,5,_binary '\0'),(37,'2024-11-07','',18,30,5,_binary '\0'),(38,'2024-11-07','',18,30,5,_binary '\0');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_room_availability` AFTER INSERT ON `bookings` FOR EACH ROW BEGIN
    UPDATE rooms
    SET availability = FALSE
    WHERE room_id = NEW.room_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_booking_delete` AFTER DELETE ON `bookings` FOR EACH ROW BEGIN
    UPDATE rooms
    SET availability = 1
    WHERE room_id = OLD.room_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `cus_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`cus_id`),
  UNIQUE KEY `idx_unique_nic` (`nic`),
  UNIQUE KEY `unique_nic` (`nic`),
  UNIQUE KEY `unique_cus_phone` (`phone_number`),
  KEY `FKpvj3itjmdd2cdckn9iurmjsfs` (`user_id`),
  CONSTRAINT `FKpvj3itjmdd2cdckn9iurmjsfs` FOREIGN KEY (`user_id`) REFERENCES `ourusers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (18,'Ashen ','Kavindu','200004603552','0719047694',1),(19,'Chathumina','Dilshan','200028803614','0766834092',1),(20,'Thisara','Bandara','200023503451','0706900822',1),(21,'Lahiru ','Prasad','200064823352','0767171262',1),(22,'Dinuka','Sandeepa','200001602103','0774229475',1),(23,'Vinod','Kavinda','2000046101291','0789816241',1);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `customerview`
--

DROP TABLE IF EXISTS `customerview`;
/*!50001 DROP VIEW IF EXISTS `customerview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `customerview` AS SELECT 
 1 AS `cus_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `nic`,
 1 AS `phone_number`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ourusers`
--

DROP TABLE IF EXISTS `ourusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ourusers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ourusers`
--

LOCK TABLES `ourusers` WRITE;
/*!40000 ALTER TABLE `ourusers` DISABLE KEYS */;
INSERT INTO `ourusers` VALUES (1,'thisara@gmail.com','thisara bandara','$2a$10$8qzvHNzA6UQJWh8znp5bG.6vsko08IMUXEVsrME3Nce1dc34uu1FW','ADMIN'),(3,'ashen@gmail.com','ashen','$2a$10$I2FnaEfivnlHb.itpuRBUex4HOLt/DRsLGsX6xDgbnJBNgrMeScf2','USER'),(4,'chathumina@gmail.com','chathumina','$2a$10$z4zgf2wZPtYaQ4DZ0gsQ..yhdbE450L7Az5MJbOYgOYal/JSIOAnS','ADMIN'),(5,'dinuka@gmail.com','Dinuka Sandeepa','$2a$10$bWFiyo6.C60NYiBnE4W9yeDkfbuQ4xdxPyzwdGwcPyWSTLzJMN/VG','USER');
/*!40000 ALTER TABLE `ourusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `payment_history`
--

DROP TABLE IF EXISTS `payment_history`;
/*!50001 DROP VIEW IF EXISTS `payment_history`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `payment_history` AS SELECT 
 1 AS `pay_id`,
 1 AS `cus_name`,
 1 AS `room_num`,
 1 AS `ac_type`,
 1 AS `type`,
 1 AS `payment_method`,
 1 AS `check_out`,
 1 AS `amount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `pay_id` int NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `booking_id` int NOT NULL,
  `ac_type` varchar(255) DEFAULT NULL,
  `check_in` datetime(6) DEFAULT NULL,
  `check_out` datetime(6) DEFAULT NULL,
  `cus_name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pay_id`),
  UNIQUE KEY `UKnuscjm6x127hkb15kcb8n56wo` (`booking_id`),
  CONSTRAINT `fk_booking_payment` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`),
  CONSTRAINT `FKc52o2b1jkxttngufqp3t7jr3h` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,3000,NULL,'Cash',31,'AC','2024-11-07 00:00:00.000000','2024-11-07 00:00:00.000000','Ashen  Kavindu','Double'),(2,2000,NULL,'Cash',32,'NonAC','2024-11-07 00:00:00.000000','2024-11-08 00:00:00.000000','Dinuka Sandeepa','Single'),(3,2000,NULL,'',36,'NonAC','2024-11-07 00:00:00.000000','2024-11-08 00:00:00.000000','Ashen  Kavindu','Single'),(4,2500,NULL,'',37,'AC','2024-11-07 00:00:00.000000','2024-11-08 00:00:00.000000','Ashen  Kavindu','Single'),(5,2500,NULL,'',38,'AC','2024-11-07 00:00:00.000000','2024-11-08 00:00:00.000000','Ashen  Kavindu','Single');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_room_availability_after_payment` AFTER INSERT ON `payments` FOR EACH ROW BEGIN
    UPDATE rooms
    SET availability = TRUE
    WHERE room_id = (SELECT room_id FROM bookings WHERE booking_id = NEW.booking_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_inBooking_after_payment` AFTER INSERT ON `payments` FOR EACH ROW BEGIN
    UPDATE bookings
    SET in_booking = FALSE
    WHERE booking_id =  NEW.booking_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `actype` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `availability` bit(1) NOT NULL,
  `amount_per_day` float NOT NULL,
  `room_num` int NOT NULL,
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `unique_room_num` (`room_num`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (30,'AC','Mountain View and Claer environment ','Single',_binary '',2500,1),(32,'NonAC','Balcony rooms with ','Double',_binary '',3500,3),(33,'AC','Mountain view','Double',_binary '',3000,2),(34,'NonAC','balcony area ','Single',_binary '',2000,4),(35,'AC','Studio room','Family',_binary '',5000,5);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sfrm'
--

--
-- Dumping routines for database 'sfrm'
--
/*!50003 DROP FUNCTION IF EXISTS `SearchCustomerNICs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `SearchCustomerNICs`(searchQuery VARCHAR(50)) RETURNS json
    DETERMINISTIC
BEGIN
    DECLARE result JSON;
    SET result = (SELECT JSON_ARRAYAGG(nic) FROM customers WHERE nic LIKE CONCAT('%', searchQuery, '%'));
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `update_customer_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `update_customer_info`(
    p_cus_id INT,
    p_first_name VARCHAR(255),
    p_last_name VARCHAR(255),
    p_nic VARCHAR(20),
    p_phone_number VARCHAR(20)
) RETURNS varchar(50) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(50);

    UPDATE Customers
    SET first_name = p_first_name,
        last_name = p_last_name,
        nic = p_nic,
        phone_number = p_phone_number
    WHERE cus_id = p_cus_id;

    IF ROW_COUNT() > 0 THEN
        SET result = 'Successfully updated';
    ELSE
        SET result = 'Not updated';
    END IF;

    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AddNewCustomer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddNewCustomer`(
    IN p_firstName VARCHAR(100),
    IN p_lastName VARCHAR(100),
    IN p_nic VARCHAR(20),
    IN p_phoneNumber VARCHAR(15),
    IN p_userId INT
)
BEGIN
    INSERT INTO customers (first_name, last_name, nic, phone_number, user_id)
    VALUES (p_firstName, p_lastName, p_nic, p_phoneNumber, p_userId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AddRoom` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddRoom`(
    IN roomNum INT,
    IN type VARCHAR(255),
    IN actype VARCHAR(255),
    IN description TEXT,
    IN amountPerDay FLOAT,
    IN availability BOOLEAN
)
BEGIN
    -- Declare variables for error handling and duplicate checking
    DECLARE room_exists INT DEFAULT 0;

    -- Start transaction
    START TRANSACTION;

    -- Validate inputs
    IF roomNum IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Room number cannot be NULL';
    END IF;

    IF type IS NULL OR type = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Room type cannot be NULL or empty';
    END IF;

    IF actype IS NULL OR actype = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Air conditioning type cannot be NULL or empty';
    END IF;

    IF amountPerDay < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Amount per day cannot be negative';
    END IF;

    -- Check for duplicate room number
    SELECT COUNT(*) INTO room_exists FROM rooms WHERE room_num = roomNum;

    IF room_exists > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Duplicate room number detected. Room number must be unique.';
    END IF;

    -- Insert room 
    INSERT INTO rooms (room_num, type, actype, description, amount_per_day, availability) 
    VALUES (roomNum, type, actype, description, amountPerDay, availability);

    COMMIT;

    -- return the ID of the inserted room
    SELECT LAST_INSERT_ID() AS new_room_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_payment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_payment`(
    IN p_booking_id INT,  
    IN p_type VARCHAR(20),
    IN p_acType VARCHAR(20),
    IN p_cus_name VARCHAR(50),
    IN p_payment_Method VARCHAR(20),
    IN p_check_in DATETIME,
    IN p_check_out DATETIME,
    IN p_amount DECIMAL(10, 2)
)
BEGIN
    INSERT INTO payments (
        ac_type,
        amount,
        check_in,
        check_out,
        cus_name,
        payment_method,
        type,
        booking_id
    )
    VALUES (
        p_acType,
        p_amount,
        p_check_in,
        p_check_out,
        p_cus_name,
        p_payment_Method,
        p_type,
        p_booking_id
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cal_amount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cal_amount`(IN checkOut DATE, IN booking_id INT)
BEGIN
    DECLARE total_amount DECIMAL(10, 2);

    SELECT 
        (GREATEST(DATEDIFF(checkOut, b.booking_date_and_time), 1) * b.amount_per_day) INTO total_amount
    FROM 
        booking_details_view AS b
    WHERE 
        b.booking_id = booking_id
        AND checkOut >= b.booking_date_and_time;

    IF total_amount IS NULL THEN
        SELECT 'No valid booking found or check-out date is invalid.' AS message;
    ELSE
        SELECT total_amount AS total_calculated_amount;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteCustomerByNIC` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteCustomerByNIC`(IN p_nic VARCHAR(20))
BEGIN
    DELETE FROM customers WHERE nic = p_nic;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_booking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_booking`(IN bookingID INT)
BEGIN
    DECLARE booking_exists INT;

    -- Check if the booking exists
    SELECT COUNT(*) INTO booking_exists FROM bookings WHERE booking_id = bookingID;

    -- If booking does not exist, raise an exception
    IF booking_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Booking ID not found.';
    ELSE
        -- If booking exists, proceed with deletion
        DELETE FROM bookings WHERE booking_id = bookingID;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllRooms` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllRooms`()
BEGIN
    SELECT * FROM rooms;  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCustomerByNic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCustomerByNic`(IN customerNic VARCHAR(50))
BEGIN
    SELECT cus_id, first_name, last_name, nic, phone_number
    FROM customers
    WHERE nic = customerNic;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_booking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_booking`(
    IN p_booking_date_and_time DATE,
    IN p_special_note VARCHAR(255),
    IN p_user_id INT,
    IN p_customer_id INT,
    IN p_room_id INT,
    IN p_in_booking BOOL
)
BEGIN
    INSERT INTO bookings (booking_date_and_time, special_note, user_id, customer_id, room_id, in_booking)
    VALUES (p_booking_date_and_time, p_special_note, p_user_id, p_customer_id, p_room_id, p_in_booking);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateRoom` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateRoom`(
    IN roomNum INT,
    IN roomType VARCHAR(50),
    IN actype VARCHAR(50),
    IN description TEXT,
    IN amountPerDay FLOAT,
    IN availability BOOLEAN
)
BEGIN
    UPDATE rooms
    SET 
		type = roomType,
        actype = actype,
        description = description,
        amount_per_day = amountPerDay,
        availability = availability
    WHERE 
		room_num = roomNum;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `activebookings`
--

/*!50001 DROP VIEW IF EXISTS `activebookings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `activebookings` AS select `b`.`booking_id` AS `booking_id`,`b`.`booking_date_and_time` AS `booking_date_and_time`,`r`.`room_num` AS `room_num`,concat(`c`.`first_name`,' ',`c`.`last_name`) AS `customer_name`,`c`.`nic` AS `nic`,`c`.`phone_number` AS `phone_number`,`r`.`type` AS `type`,`r`.`actype` AS `actype`,`b`.`special_note` AS `special_note` from ((`bookings` `b` join `rooms` `r` on((`b`.`room_id` = `r`.`room_id`))) join `customers` `c` on((`b`.`customer_id` = `c`.`cus_id`))) where (`b`.`in_booking` = 1) order by `b`.`booking_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `booking_details_view`
--

/*!50001 DROP VIEW IF EXISTS `booking_details_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `booking_details_view` AS select `r`.`room_num` AS `room_num`,concat(`c`.`first_name`,' ',`c`.`last_name`) AS `customer_name`,`r`.`type` AS `type`,`r`.`actype` AS `actype`,`r`.`amount_per_day` AS `amount_per_day`,`b`.`booking_date_and_time` AS `booking_date_and_time`,`b`.`booking_id` AS `booking_id` from ((`bookings` `b` join `rooms` `r` on((`b`.`room_id` = `r`.`room_id`))) join `customers` `c` on((`b`.`customer_id` = `c`.`cus_id`))) where (`b`.`in_booking` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `bookinghistory`
--

/*!50001 DROP VIEW IF EXISTS `bookinghistory`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `bookinghistory` AS select `b`.`booking_id` AS `booking_id`,`p`.`check_in` AS `check_in`,`p`.`check_out` AS `check_out`,`r`.`room_num` AS `room_num`,concat(`c`.`first_name`,' ',`c`.`last_name`) AS `customer_name`,`c`.`nic` AS `nic`,`c`.`phone_number` AS `phone_number`,`r`.`type` AS `type`,`r`.`actype` AS `actype`,`b`.`special_note` AS `special_note` from (((`bookings` `b` join `rooms` `r` on((`b`.`room_id` = `r`.`room_id`))) join `customers` `c` on((`b`.`customer_id` = `c`.`cus_id`))) join `payments` `p` on((`p`.`booking_id` = `b`.`booking_id`))) where (`b`.`in_booking` = 0) order by `b`.`booking_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `customerview`
--

/*!50001 DROP VIEW IF EXISTS `customerview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `customerview` AS select `customers`.`cus_id` AS `cus_id`,`customers`.`first_name` AS `first_name`,`customers`.`last_name` AS `last_name`,`customers`.`nic` AS `nic`,`customers`.`phone_number` AS `phone_number` from `customers` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `payment_history`
--

/*!50001 DROP VIEW IF EXISTS `payment_history`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `payment_history` AS select `p`.`pay_id` AS `pay_id`,`p`.`cus_name` AS `cus_name`,`r`.`room_num` AS `room_num`,`p`.`ac_type` AS `ac_type`,`p`.`type` AS `type`,`p`.`payment_method` AS `payment_method`,`p`.`check_out` AS `check_out`,`p`.`amount` AS `amount` from ((`payments` `p` join `bookings` `b` on((`b`.`booking_id` = `p`.`booking_id`))) join `rooms` `r` on((`b`.`room_id` = `r`.`room_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08  2:38:26
