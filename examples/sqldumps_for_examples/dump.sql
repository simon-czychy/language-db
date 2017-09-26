-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: localhost    Database: language_db
-- ------------------------------------------------------
-- Server version	5.7.19-0ubuntu0.16.04.1

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
-- Current Database: `language_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `language_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `language_db`;

--
-- Table structure for table `language_code`
--

DROP TABLE IF EXISTS `language_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_code`
--

LOCK TABLES `language_code` WRITE;
/*!40000 ALTER TABLE `language_code` DISABLE KEYS */;
INSERT INTO `language_code` VALUES (1,'en'),(2,'de');
/*!40000 ALTER TABLE `language_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_data`
--

DROP TABLE IF EXISTS `language_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` text COLLATE utf8mb4_unicode_ci,
  `keyid` int(11) NOT NULL,
  `codeid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `keyid` (`keyid`),
  KEY `codeid` (`codeid`),
  CONSTRAINT `language_data_ibfk_1` FOREIGN KEY (`keyid`) REFERENCES `language_key` (`id`),
  CONSTRAINT `language_data_ibfk_2` FOREIGN KEY (`codeid`) REFERENCES `language_code` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_data`
--

LOCK TABLES `language_data` WRITE;
/*!40000 ALTER TABLE `language_data` DISABLE KEYS */;
INSERT INTO `language_data` VALUES (1,'this is an intro text',1,1),(2,'Das ist ein einleitender Satz.',1,2),(3,'Hello!',2,1),(4,'Hallo!',2,2);
/*!40000 ALTER TABLE `language_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_key`
--

DROP TABLE IF EXISTS `language_key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_key` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `langkey` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_key`
--

LOCK TABLES `language_key` WRITE;
/*!40000 ALTER TABLE `language_key` DISABLE KEYS */;
INSERT INTO `language_key` VALUES (1,'intro',NULL),(2,'hello',NULL);
/*!40000 ALTER TABLE `language_key` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ldb`
--

DROP TABLE IF EXISTS `ldb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ldb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` text COLLATE utf8mb4_unicode_ci,
  `langkey` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ldb`
--

LOCK TABLES `ldb` WRITE;
/*!40000 ALTER TABLE `ldb` DISABLE KEYS */;
INSERT INTO `ldb` VALUES (1,'intro text','intro','en'),(2,'hello!','hello','de');
/*!40000 ALTER TABLE `ldb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-26 22:03:56
