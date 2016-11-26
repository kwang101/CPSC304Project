-- MySQL dump 10.13  Distrib 5.7.16, for Win64 (x86_64)
--
-- Host: localhost    Database: cpsc304_test
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!50001 DROP VIEW IF EXISTS `classes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `classes` AS SELECT 
 1 AS `programType`,
 1 AS `term`,
 1 AS `price`,
 1 AS `name`,
 1 AS `programId`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `date`
--

DROP TABLE IF EXISTS `date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `date` (
  `startTime` time NOT NULL DEFAULT '00:00:01',
  `endTime` time NOT NULL DEFAULT '00:00:01',
  `dayOfWeek` double NOT NULL,
  PRIMARY KEY (`startTime`,`endTime`,`dayOfWeek`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `date`
--

LOCK TABLES `date` WRITE;
/*!40000 ALTER TABLE `date` DISABLE KEYS */;
INSERT INTO `date` VALUES ('09:00:00','10:00:00',6),('10:00:00','22:00:00',6),('11:00:00','12:00:00',3),('11:00:00','12:00:00',4),('11:00:00','12:00:00',5),('11:00:00','12:00:00',6),('11:00:00','12:00:00',7),('19:00:00','20:00:00',1),('19:00:00','20:00:00',2),('19:00:00','20:00:00',3),('19:00:00','20:00:00',4),('20:00:00','21:00:00',1),('20:00:00','21:00:00',2),('20:00:00','21:00:00',3),('20:00:00','21:00:00',4),('21:00:00','22:00:00',4),('23:00:00','24:00:00',5);
/*!40000 ALTER TABLE `date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `islocated`
--

DROP TABLE IF EXISTS `islocated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `islocated` (
  `name` varchar(30) NOT NULL,
  `address` varchar(100) NOT NULL,
  `programId` int(11) NOT NULL,
  PRIMARY KEY (`name`,`address`,`programId`),
  KEY `programId` (`programId`),
  CONSTRAINT `islocated_ibfk_1` FOREIGN KEY (`name`, `address`) REFERENCES `location` (`name`, `address`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `islocated_ibfk_2` FOREIGN KEY (`programId`) REFERENCES `program` (`programId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `islocated`
--

LOCK TABLES `islocated` WRITE;
/*!40000 ALTER TABLE `islocated` DISABLE KEYS */;
INSERT INTO `islocated` VALUES ('Gym 1','1 West Mall',132),('Hugh Dempster Pavillion','6245 Agronomy Road',133),('Gym 3','1 West Mall',134),('Birdcoop','1 West Mall',135),('Birdcoop','1 West Mall',136),('Gym 2','1 West Mall',137),('Gym 2','1 West Mall',140),('Gym 2','1 West Mall',141),('War Memorial Gym','2 University Boulevard',152),('War Memorial Gym','2 University Boulevard',153),('Gym 2','1 West Mall',154),('Gym 2','1 West Mall',155);
/*!40000 ALTER TABLE `islocated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `capacity` int(11) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `address` varchar(100) NOT NULL,
  PRIMARY KEY (`name`,`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (150,'Birdcoop','1 West Mall'),(50,'Gym 1','1 West Mall'),(50,'Gym 2','1 West Mall'),(50,'Gym 3','1 West Mall'),(100,'Hugh Dempster Pavillion','6245 Agronomy Road'),(100,'War Memorial Gym','2 University Boulevard');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `occurs`
--

DROP TABLE IF EXISTS `occurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `occurs` (
  `startTime` time NOT NULL DEFAULT '00:00:01',
  `endTime` time NOT NULL DEFAULT '00:00:01',
  `dayOfWeek` double NOT NULL,
  `programId` int(11) NOT NULL,
  PRIMARY KEY (`startTime`,`endTime`,`dayOfWeek`,`programId`),
  KEY `programId` (`programId`),
  CONSTRAINT `occurs_ibfk_1` FOREIGN KEY (`startTime`, `endTime`, `dayOfWeek`) REFERENCES `date` (`startTime`, `endTime`, `dayOfWeek`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `occurs_ibfk_2` FOREIGN KEY (`programId`) REFERENCES `program` (`programId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `occurs`
--

LOCK TABLES `occurs` WRITE;
/*!40000 ALTER TABLE `occurs` DISABLE KEYS */;
INSERT INTO `occurs` VALUES ('19:00:00','20:00:00',1,132),('20:00:00','21:00:00',1,133),('23:00:00','24:00:00',5,134),('19:00:00','20:00:00',2,135),('20:00:00','21:00:00',2,136),('19:00:00','20:00:00',3,137),('20:00:00','21:00:00',3,140),('19:00:00','20:00:00',4,141),('20:00:00','21:00:00',4,152),('21:00:00','22:00:00',4,153),('09:00:00','10:00:00',6,154),('10:00:00','22:00:00',6,155);
/*!40000 ALTER TABLE `occurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program` (
  `programType` enum('class','dropin','intramural') NOT NULL,
  `term` double DEFAULT NULL,
  `price` float DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `programId` int(11) NOT NULL,
  PRIMARY KEY (`programId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES ('class',2,20,'Yoga',132),('class',1,15,'Memeing',133),('class',2,50,'Twerking',134),('class',1,15,'Pilates',135),('class',1,15,'Wrestling',136),('class',2,20,'BootCamp',137),('dropin',1,10,'Basketball Drop-in',140),('dropin',1,10,'Volleyball Drop-in',141),('intramural',1,0,'Volleyball Intramural Tier 2',152),('intramural',2,10,'Volleyball Intramural Tier 1',153),('intramural',1,5,'Basketball Intramural Tier 2',154),('intramural',2,10,'Basketball Intramural Tier 1',155);
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `programcapacity`
--

DROP TABLE IF EXISTS `programcapacity`;
/*!50001 DROP VIEW IF EXISTS `programcapacity`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `programcapacity` AS SELECT 
 1 AS `programType`,
 1 AS `programId`,
 1 AS `capacity`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `registers`
--

DROP TABLE IF EXISTS `registers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registers` (
  `transactionId` int(11) DEFAULT NULL,
  `isPaid` tinyint(1) DEFAULT NULL,
  `fees` float DEFAULT NULL,
  `programId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  KEY `programId` (`programId`),
  KEY `userId` (`userId`),
  CONSTRAINT `registers_ibfk_1` FOREIGN KEY (`programId`) REFERENCES `program` (`programId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `registers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registers`
--

LOCK TABLES `registers` WRITE;
/*!40000 ALTER TABLE `registers` DISABLE KEYS */;
INSERT INTO `registers` VALUES (1234142093,1,20,132,12345678),(1234142093,1,15,133,12345678),(1234146789,1,50,134,12345678),(1234142093,1,15,135,12345678),(1234142093,1,15,136,12345678),(1234142093,1,20,137,12345678),(1234149812,1,15,135,23452344),(1234145893,1,15,135,9289345),(1234148437,1,15,135,18237481);
/*!40000 ALTER TABLE `registers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachesclass`
--

DROP TABLE IF EXISTS `teachesclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teachesclass` (
  `programId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`programId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `teachesclass_ibfk_1` FOREIGN KEY (`programId`) REFERENCES `program` (`programId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teachesclass_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachesclass`
--

LOCK TABLES `teachesclass` WRITE;
/*!40000 ALTER TABLE `teachesclass` DISABLE KEYS */;
INSERT INTO `teachesclass` VALUES (133,9289345),(135,12341133),(132,12345678),(134,12345678),(137,12345678),(136,18237481);
/*!40000 ALTER TABLE `teachesclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `isInstructor` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `isUBC` tinyint(1) DEFAULT NULL,
  `creditCard` mediumtext,
  `expiryDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `passwordHash` char(64) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23452345 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,1,'Gregor Kiczales','gregor@cs.ubc.ca',9289345,1,'9472837492831037','2020-06-06 06:59:59','$2a$10$wENMOiXaNvkXN9BmCbh4ZOs0h6GoQnVGuC2rEI04soCVMeL3H7vR6'),(0,0,'Mike Feeley','mike@cs.ubc.ca',12341133,1,'9877123487652342','2020-06-06 06:59:59','$2a$10$wENMOiXaNvkXN9BmCbh4ZOs0h6GoQnVGuC2rEI04soCVMeL3H7vR6'),(1,1,'Edward Zhou','edwardzhou@cs.ubc.ca',12345678,1,'4432013293128423','2018-06-06 06:59:59','$2a$10$wENMOiXaNvkXN9BmCbh4ZOs0h6GoQnVGuC2rEI04soCVMeL3H7vR6'),(0,0,'Patrice Something','patrice@cs.ubc.ca',18237481,1,'2837461923094728','2020-06-06 06:59:59','$2a$10$wENMOiXaNvkXN9BmCbh4ZOs0h6GoQnVGuC2rEI04soCVMeL3H7vR6'),(0,1,'Steve Wolfman','steve@cs.ubc.ca',23452344,1,'1234267842641234','2020-06-06 06:59:59','$2a$10$wENMOiXaNvkXN9BmCbh4ZOs0h6GoQnVGuC2rEI04soCVMeL3H7vR6');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `classes`
--

/*!50001 DROP VIEW IF EXISTS `classes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=CURRENT_USER SQL SECURITY DEFINER */
/*!50001 VIEW `classes` AS select `p`.`programType` AS `programType`,`p`.`term` AS `term`,`p`.`price` AS `price`,`p`.`name` AS `name`,`p`.`programId` AS `programId` from `program` `p` where (`p`.`programType` = 'class') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `programcapacity`
--

/*!50001 DROP VIEW IF EXISTS `programcapacity`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=CURRENT_USER SQL SECURITY DEFINER */
/*!50001 VIEW `programcapacity` AS select `p`.`programType` AS `programType`,`p`.`programId` AS `programId`,`l`.`capacity` AS `capacity` from ((`program` `p` join `islocated` `i`) join `location` `l`) where ((`p`.`programId` = `i`.`programId`) and (`i`.`name` = `l`.`name`)) */;
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

-- Dump completed on 2016-11-26  0:09:29
