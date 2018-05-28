-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: Balm
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

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
-- Table structure for table `Offer`
--

DROP TABLE IF EXISTS `Offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `postcode` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `department` varchar(45) NOT NULL,
  `region` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `nbpeople` varchar(45) NOT NULL,
  `pool` tinyint(1) NOT NULL,
  `garden` tinyint(1) NOT NULL,
  `citycenter` tinyint(1) NOT NULL,
  `Echange` int(11) NOT NULL,
  `Hebergement` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Offer_1_idx` (`userId`),
  CONSTRAINT `UserIdKey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Offer`
--

LOCK TABLES `Offer` WRITE;
/*!40000 ALTER TABLE `Offer` DISABLE KEYS */;
INSERT INTO `Offer` VALUES (1,1,69000,'Maison en banlieue Lyonnaise','Très belle maison à proximité de Lyon. Piscine, terrasse et 3 chambres pouvant accueillir jusqu\'à 6 personnes ! proximité avec un arret de bus pour se rendre dans le centre ville.','100','Lyon','Rhone','Rhone Aple','20 avenue albert einstein','5',1,1,1,0,0),(2,1,69000,'Maison de Campagne','Belle vue avec piscine','159','Lyon','Rhone','Rhone-Alpes','19 Avenue Albert Einstein','4',1,1,0,0,0),(3,1,69000,'Maison en centre ville','Beaucoup de pollution','185','Lyon','Rhone','Rhone-Alpes','15 rue Barthélémy','4',1,1,1,0,0),(4,2,69000,'Appartement','Cool man !','58','Lyon','Rhone','Rhone-Alpes','850 boulevard lafayette','4',0,0,1,0,0),(5,3,69800,'Prairie','Pleins de champs','800','Villeurbanne','Rhone','Rhone-Alpes','8 rue des champs','5',1,1,0,0,0),(9,1,69000,'Nouvelle maison 2','La maison la plus belle','10','Lyon','Rhone','Rhone-Alpes','Chez moi','2',0,0,1,0,0),(10,1,69000,'Nouvelle maison 2','La maison la plus belle','10','Lyon','Rhone','Rhone-Alpes','Chez moi','2',1,0,0,0,0),(11,1,69000,'Nouvelle maison 2','La maison la plus belle','10','Lyon','Rhone','Rhone-Alpes','Chez moi','3',0,1,1,0,0),(12,1,69000,'Nouvelle maison 2','La maison la plus belle','10000','Lyon','Rhone','Rhone-Alpes','Chez moi','4',1,1,1,0,0),(14,4,69000,'Echange de maison Lyon','Je recherche des gens voulant faire un échange de maison, de préfèrence dans le sud de la France. Ma maison est grande et spacieuse, elle peut acceuillir un groupe allant jusqu\'à 8 personnes.','0','Lyon','Rhone','Rhone-Alpes','20 avenue du bonheur','8',0,0,0,1,0),(15,4,69000,'Hebergement','J\'heberge gratuitement contre un peu d\'aide pour les courses et le ménage. Une grande chambre privée, mais salle de bain commune. ','0','Lyon','Rhone','Rhone-Alpes','3 boulevard de la générosité','2',0,0,1,0,1),(16,7,26000,'Hébergement dans la Drome pour 2 semaines','offre d\'herbergement pour deux personnes max durant deux semaines.','0','Valence','Drome','','route blabla','',0,0,0,0,1);
/*!40000 ALTER TABLE `Offer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-28 11:42:32
