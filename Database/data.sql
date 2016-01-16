-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: fundispenser_server
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

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
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `answerId` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(45) DEFAULT NULL,
  `questionId` int(11) NOT NULL,
  PRIMARY KEY (`answerId`),
  KEY `fk_answers_questions1_idx` (`questionId`),
  CONSTRAINT `fk_answers_questions1` FOREIGN KEY (`questionId`) REFERENCES `questions` (`questionId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,'5',1),(2,'4',1),(3,'3',1),(4,'9',2),(5,'8',2),(6,'7',2),(7,'5',3),(8,'2',3),(9,'1',3),(10,'SHOW COLUMNS FROM tabel',4),(11,'SHOW COLUMNS WHERE table=\'tabel\'',4),(12,'SHOW COLUMNS tabel',4);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers_log`
--

DROP TABLE IF EXISTS `answers_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers_log` (
  `questionId` int(11) DEFAULT NULL,
  `answerId` int(11) DEFAULT NULL,
  `timestamp` int(32) DEFAULT NULL,
  `answers_logId` int(11) NOT NULL AUTO_INCREMENT,
  `playerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`answers_logId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers_log`
--

LOCK TABLES `answers_log` WRITE;
/*!40000 ALTER TABLE `answers_log` DISABLE KEYS */;
INSERT INTO `answers_log` VALUES (1,3,NULL,1,2),(2,4,NULL,2,7),(4,10,NULL,3,7),(3,9,NULL,4,7),(2,4,NULL,5,7),(4,10,NULL,6,6),(3,9,NULL,7,6),(3,9,NULL,8,6),(4,10,NULL,9,6),(4,10,NULL,10,6),(2,4,NULL,11,6),(4,10,NULL,12,6),(2,4,NULL,13,6),(4,12,NULL,14,6),(4,10,NULL,15,6),(1,2,NULL,16,6);
/*!40000 ALTER TABLE `answers_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `difficulty`
--

DROP TABLE IF EXISTS `difficulty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `difficulty` (
  `playerSkill` int(2) DEFAULT NULL,
  `subjectId` int(11) NOT NULL,
  `levelId` int(11) NOT NULL,
  KEY `fk_difficulty_subjects1_idx` (`subjectId`),
  KEY `fk_difficulty_levels1_idx` (`levelId`),
  CONSTRAINT `fk_difficulty_subjects1` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`subjectId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_difficulty_levels1` FOREIGN KEY (`levelId`) REFERENCES `levels` (`levelId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `difficulty`
--

LOCK TABLES `difficulty` WRITE;
/*!40000 ALTER TABLE `difficulty` DISABLE KEYS */;
/*!40000 ALTER TABLE `difficulty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flavours`
--

DROP TABLE IF EXISTS `flavours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flavours` (
  `flavourId` int(11) NOT NULL AUTO_INCREMENT,
  `flavourName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`flavourId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flavours`
--

LOCK TABLES `flavours` WRITE;
/*!40000 ALTER TABLE `flavours` DISABLE KEYS */;
INSERT INTO `flavours` VALUES (1,'Aardbei'),(2,'Banaan');
/*!40000 ALTER TABLE `flavours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `levels` (
  `levelId` int(11) NOT NULL AUTO_INCREMENT,
  `achievedAt` int(11) DEFAULT NULL,
  `levelName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`levelId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,0,'Beginner'),(2,100,'Lekkerbek');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `playerId` int(11) NOT NULL AUTO_INCREMENT,
  `playerName` varchar(45) DEFAULT NULL,
  `tagID` varchar(45) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `levelId` int(11) NOT NULL,
  `flavourId` int(11) NOT NULL,
  PRIMARY KEY (`playerId`),
  KEY `fk_players_flavours_idx` (`flavourId`),
  KEY `fk_players_levels1_idx` (`levelId`),
  CONSTRAINT `fk_players_flavours` FOREIGN KEY (`flavourId`) REFERENCES `flavours` (`flavourId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_players_levels1` FOREIGN KEY (`levelId`) REFERENCES `levels` (`levelId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (5,'Heek','04964c3aa13e80',0,1,1),(6,'Chinji','04ab4c3aa13e80',0,1,2),(7,'Stefan','04c04c3aa13e80',0,1,2);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `questionId` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(128) DEFAULT NULL,
  `subjectId` int(11) NOT NULL,
  `answerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`questionId`),
  KEY `fk_questions_subjects1_idx` (`subjectId`),
  CONSTRAINT `fk_questions_subjects1` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`subjectId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'1+2',2,3),(2,'3+6',2,4),(3,'1*1',2,9),(4,'Hoe laat je columns van een tabel zien? (mySQL)',1,10);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `subjectId` int(11) NOT NULL AUTO_INCREMENT,
  `subjectName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`subjectId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'SQL'),(2,'Wiskunde');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-15 17:20:03
