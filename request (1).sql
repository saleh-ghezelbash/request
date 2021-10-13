-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2021 at 11:11 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `request`
--

-- --------------------------------------------------------

--
-- Table structure for table `actions`
--

CREATE TABLE `actions` (
  `ID` int(11) NOT NULL,
  `DAT_CREATED_ACTION` date NOT NULL,
  `NAM_CREATED_ACTION` varchar(200) NOT NULL,
  `DAT_MODIFIED_ACTION` date NOT NULL,
  `NAM_MODIFIED_ACTION` varchar(200) NOT NULL,
  `FLG_ACTIVE_ACTION` int(11) NOT NULL,
  `NUM_STATUS_ACTION` int(11) NOT NULL,
  `NAM_DES_ACTION` varchar(2000) NOT NULL COMMENT 'شرح اقدام',
  `NAM_REPORT_ACTION` varchar(2000) NOT NULL COMMENT 'گزارش اقدام',
  `DAT_DEADLINE_ACTION` date NOT NULL COMMENT 'مهلت انجام',
  `DAT_START_ACTION` date NOT NULL COMMENT 'تاریخ شروع',
  `DAT_END_ACTION` date NOT NULL COMMENT 'تاریخ پایان',
  `NUM_PROGRESS_ACTION` int(11) NOT NULL COMMENT 'درصد پیشرفت',
  `NUM_PARENT_ID_ACTION` int(11) NOT NULL COMMENT 'آی دی اقدام والد',
  `LKP_IDE_MEET_ACTION` int(11) NOT NULL COMMENT 'کلید خارجی جدول جلسه'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meets`
--

CREATE TABLE `meets` (
  `ID` int(11) NOT NULL,
  `DAT_CREATED_MEET` date NOT NULL,
  `NAM_CREATED_MEET` varchar(200) NOT NULL,
  `DAT_MODIFIED_MEET` date NOT NULL,
  `NAM_MODIFIED_MEET` varchar(200) NOT NULL,
  `FLG_ACTIVE_MEET` int(11) NOT NULL,
  `NUM_STATUS_MEET` int(11) NOT NULL,
  `NAM_TITLE_MEET` varchar(200) NOT NULL COMMENT 'عنوان جلسه',
  `DAT_MEETING_MEET` date NOT NULL COMMENT 'تاریخ جلسه',
  `NAM_SUBJECT_MEET` varchar(200) NOT NULL COMMENT 'موضوع',
  `NAM_KEY_WORD_MEET` varchar(20) NOT NULL COMMENT 'شماره صورت جلسه',
  `LKP_IDE_REQ_MEET` int(11) NOT NULL COMMENT 'کلید خارجی جدول درخواست'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `ID` int(11) NOT NULL,
  `DAT_CREATED_REQ` date NOT NULL,
  `NAM_CREATED_REQ` varchar(200) NOT NULL,
  `DAT_MODIFIED_REQ` date NOT NULL,
  `NAM_MODIFIED_REQ` varchar(200) NOT NULL,
  `FLG_ACTIVE_REQ` int(11) NOT NULL,
  `NUM_STATUS_REQ` int(11) NOT NULL,
  `DAT_REQUEST_REQ` date NOT NULL COMMENT 'تاریخ درخواست',
  `NUM_TYPE_REQ` int(11) NOT NULL COMMENT 'نوع درخواست',
  `NAM_OWN_REQ` varchar(200) NOT NULL COMMENT 'درخواست دهنده'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `meets`
--
ALTER TABLE `meets`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actions`
--
ALTER TABLE `actions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meets`
--
ALTER TABLE `meets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
