-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2015 at 11:56 PM
-- Server version: 5.5.34
-- PHP Version: 5.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `leave_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `leave`
--

CREATE TABLE IF NOT EXISTS `leave` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `EmpName` varchar(50) NOT NULL,
  `EmpEmail` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `LeaveMessage` varchar(500) NOT NULL,
  `no_days` int(11) NOT NULL DEFAULT '0',
  `is_approved` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `leave`
--

INSERT INTO `leave` (`id`, `EmpName`, `EmpEmail`, `start_date`, `end_date`, `LeaveMessage`, `no_days`, `is_approved`) VALUES
(1, 'Brijesh', 'kothari775@gmail.com', '2015-03-19', '2015-03-26', 'Test Leave Msg', 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `usertype` tinyint(2) NOT NULL,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `usertype`, `Name`) VALUES
(1, 'brijesh.kothari.aa@gmail.com', 'aton@123', 1, 'Brijesh Kothari'),
(3, 'JSK', '$2a$10$isfaqXjfAvc9ezaDA4urUu4', 0, '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
