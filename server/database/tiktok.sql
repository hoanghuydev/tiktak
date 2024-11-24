-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2024 at 04:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tiktok`
--

-- --------------------------------------------------------

--
-- Table structure for table `avatars`
--

CREATE TABLE `avatars` (
  `id` int(11) NOT NULL,
  `publicId` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `avatars`
--

INSERT INTO `avatars` (`id`, `publicId`, `url`, `code`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'tiktok_avatar/qrabjbofeuu20wpg28o0', 'https://res.cloudinary.com/da5wewzih/image/upload/v1708242262/tiktok_avatar/qrabjbofeuu20wpg28o0.png', 'defaultAvatar', '2024-02-24 06:38:02', '2024-02-24 06:38:02', NULL),
(2, 'tiktok_avatar/vb3lsu3tj5l2isahmfi7', 'http://res.cloudinary.com/dwuypueso/image/upload/v1719968242/tiktok_avatar/vb3lsu3tj5l2isahmfi7.jpg', 'avatarOfUser1', '2024-05-22 06:20:34', '2024-07-03 00:57:38', NULL),
(3, 'tiktok_avatar/tvfmylnammlzck3w3abg', 'http://res.cloudinary.com/da5wewzih/image/upload/v1716359349/tiktok_avatar/tvfmylnammlzck3w3abg.jpg', 'avatarOfUser4', '2024-05-22 06:24:01', '2024-05-22 06:29:00', NULL),
(4, 'tiktok_avatar/c0rpvv5dkrx8xvadspjp', 'http://res.cloudinary.com/da5wewzih/image/upload/v1716925984/tiktok_avatar/c0rpvv5dkrx8xvadspjp.jpg', 'avatarOfUser3', '2024-05-28 19:53:04', '2024-05-28 19:53:04', NULL),
(5, 'tiktok_avatar/xkyfjjhsrot6fqwxmru4', 'http://res.cloudinary.com/da5wewzih/image/upload/v1728640772/tiktok_avatar/xkyfjjhsrot6fqwxmru4.jpg', 'avatarOfUser7', '2024-10-11 09:03:08', '2024-10-11 09:59:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categoriesofpost`
--

CREATE TABLE `categoriesofpost` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chatrooms`
--

CREATE TABLE `chatrooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chatrooms`
--

INSERT INTO `chatrooms` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(8, '', '2024-10-12 05:53:58', '2024-10-12 05:53:58', NULL),
(9, '', '2024-11-09 08:54:04', '2024-11-09 08:54:04', NULL),
(12, '', '2024-11-09 09:02:16', '2024-11-09 09:02:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `commenter` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `parentCommentId` int(11) DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `commenter`, `postId`, `content`, `createdAt`, `updatedAt`, `parentCommentId`, `deletedAt`) VALUES
(76, 1, 34, 'check comment', '2024-10-01 13:59:43', '2024-10-01 13:59:43', NULL, NULL),
(77, 1, 34, 'ok', '2024-10-02 08:03:58', '2024-10-02 08:03:58', 76, NULL),
(78, 1, 34, 'check comment', '2024-10-02 08:05:55', '2024-10-02 08:05:55', 76, NULL),
(79, 1, 34, 'okkk', '2024-10-02 08:06:08', '2024-10-02 08:06:08', 76, NULL),
(80, 1, 34, '306', '2024-10-02 08:06:57', '2024-10-02 08:06:57', 76, NULL),
(81, 1, 34, 'nice', '2024-10-02 08:07:45', '2024-10-02 08:07:45', 76, NULL),
(82, 1, 34, 'hello there', '2024-10-02 08:08:00', '2024-10-02 08:08:00', 76, NULL),
(83, 1, 34, 'nice', '2024-10-02 08:08:10', '2024-10-02 08:08:10', 76, NULL),
(84, 1, 34, 'hello there', '2024-10-02 08:08:14', '2024-10-02 08:08:14', 76, NULL),
(85, 1, 34, 'check comment', '2024-10-02 08:09:55', '2024-10-02 08:09:55', 76, NULL),
(86, 1, 34, 'check ', '2024-10-02 08:10:33', '2024-10-02 08:10:33', 76, NULL),
(87, 1, 34, 'comment', '2024-10-02 08:12:38', '2024-10-02 08:12:38', 76, NULL),
(88, 1, 34, 'comment 2', '2024-10-02 08:12:44', '2024-10-02 08:12:44', 76, NULL),
(89, 1, 34, 'fuck', '2024-10-02 08:16:34', '2024-10-02 08:16:34', 76, NULL),
(90, 1, 34, '@@@', '2024-10-02 08:17:10', '2024-10-02 08:17:10', 76, NULL),
(91, 1, 34, 'coment 319', '2024-10-02 08:19:10', '2024-10-02 08:19:10', 76, NULL),
(92, 1, 35, 'omment', '2024-10-02 08:20:42', '2024-10-02 08:20:42', NULL, NULL),
(93, 1, 35, 'a', '2024-10-02 08:20:44', '2024-10-02 08:20:44', 92, NULL),
(94, 1, 35, 'comment', '2024-10-02 08:24:05', '2024-10-02 08:24:05', NULL, NULL),
(95, 1, 35, 'okkkk', '2024-10-02 08:24:10', '2024-10-02 08:24:10', 94, NULL),
(96, 1, 35, 'comment', '2024-10-02 08:24:18', '2024-10-02 08:24:18', 94, NULL),
(97, 1, 35, 'comment', '2024-10-02 08:24:23', '2024-10-02 08:24:23', 94, NULL),
(98, 1, 35, 'comment', '2024-10-02 08:24:29', '2024-10-02 08:24:29', NULL, NULL),
(99, 1, 35, 'comment', '2024-10-02 08:24:32', '2024-10-02 08:24:32', 98, NULL),
(100, 1, 35, 'Ok im think that good', '2024-10-03 02:04:40', '2024-10-03 02:04:40', 94, NULL),
(101, 1, 35, 'is that so', '2024-10-03 02:04:51', '2024-10-03 02:04:51', 94, NULL),
(102, 1, 35, 'Hi', '2024-10-04 10:00:21', '2024-10-04 10:00:21', 94, NULL),
(103, 1, 35, 'Reply HI', '2024-10-04 10:01:28', '2024-10-04 10:01:28', 94, NULL),
(104, 1, 35, 'Is that so?', '2024-10-04 10:02:10', '2024-10-04 10:02:10', 94, NULL),
(105, 1, 35, 'Hi there', '2024-10-04 10:03:15', '2024-10-04 10:03:15', 98, NULL),
(106, 1, 35, 'Ok nice', '2024-10-04 10:06:41', '2024-10-04 10:06:41', 98, NULL),
(107, 1, 35, 'Hello thre', '2024-10-04 10:06:55', '2024-10-04 10:06:55', 98, NULL),
(108, 1, 35, 'good', '2024-10-04 10:07:02', '2024-10-04 10:07:02', 98, NULL),
(109, 1, 34, 'nah', '2024-10-08 09:39:03', '2024-10-08 09:39:03', 76, NULL),
(110, 1, 33, 'comment', '2024-10-10 03:43:25', '2024-10-10 03:43:25', NULL, NULL),
(111, 1, 33, 'check', '2024-10-10 04:04:43', '2024-10-10 04:04:43', NULL, NULL),
(112, 1, 34, '234234', '2024-10-11 04:05:42', '2024-10-11 04:05:42', 76, NULL),
(113, 7, 35, 'Tính ra con này cũng cute he', '2024-10-11 10:00:27', '2024-10-11 10:00:27', NULL, NULL),
(114, 7, 35, 'True', '2024-10-11 10:00:38', '2024-10-11 10:00:38', 113, NULL),
(115, 7, 35, 'it does work', '2024-10-11 10:00:50', '2024-10-11 10:00:50', 113, NULL),
(116, 7, 35, 'nah', '2024-10-11 10:01:01', '2024-10-11 10:01:01', 98, NULL),
(117, 7, 35, 'Hi', '2024-10-11 10:02:02', '2024-10-11 10:02:02', 113, NULL),
(118, 4, 35, '🤫🤫🤫🤫', '2024-10-28 08:19:02', '2024-10-28 08:19:02', NULL, NULL),
(119, 4, 35, '\n😶sdfasdf', '2024-10-28 08:47:02', '2024-10-28 08:47:02', NULL, NULL),
(120, 1, 35, 'Comment 1', '2024-10-31 09:06:10', '2024-10-31 09:06:10', NULL, NULL),
(121, 1, 35, 'Comment reply', '2024-10-31 09:06:19', '2024-10-31 09:06:19', 113, NULL),
(122, 1, 35, 'Nice', '2024-10-31 09:06:34', '2024-10-31 09:06:34', 113, NULL),
(123, 1, 35, 'ádfasjdfakjsdfkajsd', '2024-10-31 10:11:15', '2024-10-31 10:11:15', NULL, NULL),
(124, 1, 35, 'Chào', '2024-11-01 03:40:31', '2024-11-01 03:40:31', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `follower` int(11) NOT NULL,
  `followee` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `follower`, `followee`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(50, 1, 4, '2024-09-19 03:51:41', '2024-09-19 03:51:41', NULL),
(53, 1, 3, '2024-09-19 03:59:25', '2024-09-19 03:59:25', NULL),
(54, 7, 2, '2024-09-27 10:08:58', '2024-09-27 10:08:58', NULL),
(63, 4, 1, '2024-10-12 05:53:58', '2024-10-12 05:53:58', NULL),
(67, 2, 7, '2024-11-09 09:02:16', '2024-11-09 09:02:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `likescomment`
--

CREATE TABLE `likescomment` (
  `id` int(11) NOT NULL,
  `liker` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likescomment`
--

INSERT INTO `likescomment` (`id`, `liker`, `commentId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(22, 1, 76, '2024-10-01 13:59:45', '2024-10-01 13:59:45', NULL),
(23, 7, 113, '2024-10-11 10:00:30', '2024-10-11 10:00:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `likespost`
--

CREATE TABLE `likespost` (
  `id` int(11) NOT NULL,
  `liker` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likespost`
--

INSERT INTO `likespost` (`id`, `liker`, `postId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(4, 1, 11, '2024-05-21 16:04:15', '2024-05-21 16:04:15', NULL),
(8, 3, 11, '2024-05-21 17:02:57', '2024-05-21 17:02:57', NULL),
(14, 1, 28, '2024-05-28 18:34:39', '2024-05-28 18:34:39', NULL),
(16, 3, 10, '2024-05-28 20:01:25', '2024-05-28 20:01:25', NULL),
(21, 4, 29, '2024-05-28 20:11:33', '2024-05-28 20:11:33', NULL),
(22, 4, 28, '2024-05-28 20:11:39', '2024-05-28 20:11:39', NULL),
(23, 4, 26, '2024-05-28 20:11:52', '2024-05-28 20:11:52', NULL),
(29, 1, 8, '2024-06-17 18:59:37', '2024-06-17 18:59:37', NULL),
(33, 1, 31, '2024-09-19 03:51:36', '2024-09-19 03:51:36', NULL),
(34, 1, 33, '2024-09-21 22:13:11', '2024-09-21 22:13:11', NULL),
(35, 7, 9, '2024-09-27 10:08:56', '2024-09-27 10:08:56', NULL),
(41, 8, 34, '2024-09-29 05:10:12', '2024-09-29 05:10:12', NULL),
(42, 4, 34, '2024-09-29 05:12:13', '2024-09-29 05:12:13', NULL),
(44, 7, 34, '2024-09-29 05:43:11', '2024-09-29 05:43:11', NULL),
(45, 7, 11, '2024-09-29 05:47:58', '2024-09-29 05:47:58', NULL),
(50, 1, 35, '2024-10-10 03:32:18', '2024-10-10 03:32:18', NULL),
(51, 1, 34, '2024-10-11 03:54:13', '2024-10-11 03:54:13', NULL),
(52, 7, 35, '2024-10-11 09:59:59', '2024-10-11 09:59:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `like_message`
--

CREATE TABLE `like_message` (
  `user_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `livestreams`
--

CREATE TABLE `livestreams` (
  `id` int(11) NOT NULL,
  `streamer` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `title` varchar(255) NOT NULL DEFAULT 'New Livestream',
  `key` varchar(255) NOT NULL DEFAULT 'New Livestream',
  `views` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `chatroomId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `type` enum('video','image','text') DEFAULT 'text',
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender`, `content`, `chatroomId`, `createdAt`, `updatedAt`, `type`, `deletedAt`) VALUES
(3, 1, 'Hi PA. I\'m fine', 8, '2024-10-14 04:56:41', '2024-10-14 04:56:41', 'text', NULL),
(9, 1, 'Hi PA. I\'m fine', 8, '2024-10-14 05:05:07', '2024-10-14 05:05:07', 'text', NULL),
(10, 1, 'Hi PA. I\'m fine', 8, '2024-10-15 06:35:45', '2024-10-15 06:35:45', 'text', NULL),
(11, 1, 'Hi PA. I\'m fine', 8, '2024-10-15 06:39:19', '2024-10-15 06:39:19', 'text', NULL),
(12, 1, 'Hi PA. I\'m fine', 8, '2024-10-15 06:57:53', '2024-10-15 06:57:53', 'text', NULL),
(13, 1, 'Hi PA. I\'m fine', 8, '2024-10-15 07:04:28', '2024-10-15 07:04:28', 'text', NULL),
(14, 1, 'Hi PA. I\'m fine', 8, '2024-10-15 07:08:36', '2024-10-15 07:08:36', 'text', NULL),
(15, 1, 'Hi PA. I\'m fine', 8, '2024-10-22 03:53:16', '2024-10-22 03:53:16', 'text', NULL),
(16, 1, 'Hi PA. I\'m fine', 8, '2024-10-22 03:53:48', '2024-10-22 03:53:48', 'text', NULL),
(17, 4, 'Acc github hoanghuycoder', 8, '2024-10-26 16:04:30', '2024-10-26 16:04:30', 'text', NULL),
(18, 4, 'Acc github hoanghuycoder', 8, '2024-10-27 09:42:45', '2024-10-27 09:42:45', 'text', NULL),
(19, 4, 'Real time message', 8, '2024-10-27 09:45:13', '2024-10-27 09:45:13', 'text', NULL),
(20, 4, 'Real time message 2', 8, '2024-10-27 09:50:48', '2024-10-27 09:50:48', 'text', NULL),
(21, 4, 'Real time message 2', 8, '2024-10-27 09:51:35', '2024-10-27 09:51:35', 'text', NULL),
(22, 4, 'Real time message 3', 8, '2024-10-27 09:52:01', '2024-10-27 09:52:01', 'text', NULL),
(23, 4, 'Real time message 4', 8, '2024-10-27 09:53:42', '2024-10-27 09:53:42', 'text', NULL),
(24, 4, 'Real time message 5', 8, '2024-10-27 09:58:39', '2024-10-27 09:58:39', 'text', NULL),
(25, 4, 'Real time message 6', 8, '2024-10-27 09:59:07', '2024-10-27 09:59:07', 'text', NULL),
(26, 4, 'Real time message 7', 8, '2024-10-27 10:00:09', '2024-10-27 10:00:09', 'text', NULL),
(27, 4, 'Real time message 8', 8, '2024-10-27 10:04:59', '2024-10-27 10:04:59', 'text', NULL),
(28, 4, 'Real time message 9', 8, '2024-10-27 10:06:28', '2024-10-27 10:06:28', 'text', NULL),
(29, 1, 'Hey man', 8, '2024-10-31 10:25:43', '2024-10-31 10:25:43', 'text', NULL),
(30, 1, 'Are u', 8, '2024-10-31 10:25:49', '2024-10-31 10:25:49', 'text', NULL),
(31, 1, 'alone?', 8, '2024-10-31 10:25:53', '2024-10-31 10:25:53', 'text', NULL),
(32, 1, 'yup', 8, '2024-10-31 10:26:02', '2024-10-31 10:26:02', 'text', NULL),
(33, 1, 'Cmon man are u kidding me huh? Let check some bug in my web😀😀', 8, '2024-11-01 04:28:19', '2024-11-01 04:28:19', 'text', NULL),
(34, 1, 'Duplicate message?', 8, '2024-11-01 04:29:33', '2024-11-01 04:29:33', 'text', NULL),
(35, 1, 'That error', 8, '2024-11-01 04:29:53', '2024-11-01 04:29:53', 'text', NULL),
(36, 1, 'uhu', 8, '2024-11-01 04:29:56', '2024-11-01 04:29:56', 'text', NULL),
(37, 1, 'Cmon man are u kidding me huh? Let check some bug in my web😀😀', 8, '2024-11-01 04:30:04', '2024-11-01 04:30:04', 'text', NULL),
(38, 1, 'Cmon man are u kidding me huh? Let check some bug in my web😀😀', 8, '2024-11-01 04:30:09', '2024-11-01 04:30:09', 'text', NULL),
(39, 1, 'Cmon man are u kidding me huh? Let check some bug in my web😀😀Send a message...', 8, '2024-11-01 04:30:11', '2024-11-01 04:30:11', 'text', NULL),
(40, 1, 'Cmon man are u kidding me huh? Let check some bug in my web😀😀Send a message...', 8, '2024-11-01 04:30:20', '2024-11-01 04:30:20', 'text', NULL),
(41, 1, 'Still error', 8, '2024-11-01 04:30:43', '2024-11-01 04:30:43', 'text', NULL),
(42, 1, 'asdasdsadasdas', 8, '2024-11-01 04:30:57', '2024-11-01 04:30:57', 'text', NULL),
(43, 1, 'Cmon man are u kidding me huh? Let check some bug in my web😀😀Send a message...', 8, '2024-11-01 04:31:47', '2024-11-01 04:31:47', 'text', NULL),
(44, 1, 'Cmon man are u kidding me huh? Let check some bug in my web😀😀Send a message...asdfasdlfajsdfljasdfjlasdlfjalsdfjlasdjflasjdlfsda', 8, '2024-11-01 04:32:16', '2024-11-01 04:32:16', 'text', NULL),
(45, 1, 'ehasndfnasdfna \\n <script>alert(\'Huy\')</script>', 8, '2024-11-01 04:32:48', '2024-11-01 04:32:48', 'text', NULL),
(46, 1, '</p><script>alert(\'Huy\')</script>', 8, '2024-11-01 04:33:15', '2024-11-01 04:33:15', 'text', NULL),
(47, 1, 'Hello bro', 8, '2024-11-05 07:16:06', '2024-11-05 07:16:06', 'text', NULL),
(48, 4, 'Error', 8, '2024-11-05 07:16:27', '2024-11-05 07:16:27', 'text', NULL),
(49, 4, 'Wait', 8, '2024-11-05 07:16:39', '2024-11-05 07:16:39', 'text', NULL),
(50, 4, 'Duplicate message rendering', 8, '2024-11-05 07:16:52', '2024-11-05 07:16:52', 'text', NULL),
(51, 1, 'HI', 8, '2024-11-08 03:17:55', '2024-11-08 03:17:55', 'text', NULL),
(52, 1, 'Hi', 8, '2024-11-08 03:25:24', '2024-11-08 03:25:24', 'text', NULL),
(53, 4, 'Now', 8, '2024-11-08 03:25:30', '2024-11-08 03:25:30', 'text', NULL),
(54, 1, 'Last message', 8, '2024-11-08 03:25:35', '2024-11-08 03:25:35', 'text', NULL),
(55, 1, 'Tiếng việt', 8, '2024-11-08 03:25:57', '2024-11-08 03:25:57', 'text', NULL),
(56, 1, 'CSend a message...', 8, '2024-11-08 03:26:05', '2024-11-08 03:26:05', 'text', NULL),
(57, 1, 'Hello man', 8, '2024-11-08 03:26:36', '2024-11-08 03:26:36', 'text', NULL),
(58, 4, '😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️', 8, '2024-11-08 03:28:03', '2024-11-08 03:28:03', 'text', NULL),
(59, 4, 'Ahfasidf', 8, '2024-11-09 08:31:33', '2024-11-09 08:31:33', 'text', NULL),
(60, 2, 'Hi man', 9, '2024-11-09 08:54:21', '2024-11-09 08:54:21', 'text', NULL),
(61, 2, 'Are u good rn?', 9, '2024-11-09 08:54:29', '2024-11-09 08:54:29', 'text', NULL),
(62, 2, '😶‍🌫️😶‍🌫️I just feel bored', 9, '2024-11-09 08:54:45', '2024-11-09 08:54:45', 'text', NULL),
(63, 2, 'Send a message...Send a message...Send a message...Send a message...Send a message...', 9, '2024-11-09 08:55:09', '2024-11-09 08:55:09', 'text', NULL),
(64, 2, 'Send a message...', 9, '2024-11-09 08:55:11', '2024-11-09 08:55:11', 'text', NULL),
(65, 2, 'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', 9, '2024-11-09 08:59:29', '2024-11-09 08:59:29', 'text', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `isSeen` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `comments` int(11) NOT NULL DEFAULT 0,
  `shares` int(11) NOT NULL,
  `poster` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `thumnailUrl` varchar(255) DEFAULT NULL,
  `videoUrl` varchar(255) DEFAULT NULL,
  `thumnailId` varchar(255) DEFAULT NULL,
  `videoId` varchar(255) DEFAULT NULL,
  `visibility` int(11) DEFAULT 1 COMMENT 'public is 1, friend is 0 and just me is -1',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `views`, `comments`, `shares`, `poster`, `title`, `thumnailUrl`, `videoUrl`, `thumnailId`, `videoId`, `visibility`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(7, 4, 0, 0, 3, 'How to marketing for Facebook', 'https://drive.google.com/uc?export=view&id=1svKID1G6V2T7iRnnRasbq7wTnuqc30kj', 'http://res.cloudinary.com/da5wewzih/video/upload/v1709014619/tiktok_video/xzzgbdzlxuo51eu9qz9q.mp4', '1svKID1G6V2T7iRnnRasbq7wTnuqc30kj', 'tiktok_video/xzzgbdzlxuo51eu9qz9q', 1, '2024-02-27 06:16:42', '2024-10-08 09:42:47', NULL),
(8, 9, 0, 7, 1, 'Talking kittens cat', 'https://drive.usercontent.google.com/download?id=1dE-aHNOzHX5UXfF56UrHGMgWDlVJfunZ&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716220712/tiktok_video/qkfwangsiwkmaszsem1v.mp4', '1dE-aHNOzHX5UXfF56UrHGMgWDlVJfunZ', 'tiktok_video/qkfwangsiwkmaszsem1v', 1, '2024-05-20 15:58:20', '2024-11-11 06:12:41', NULL),
(9, 7, 0, 1, 2, 'Cat: Don’t talk to me any more', 'https://drive.usercontent.google.com/download?id=16RRP_Cm2gXBctSwIQVIH_EDMsRGO_1lX&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716220837/tiktok_video/gqsyudrlwcbxdlp68vd2.mp4', '16RRP_Cm2gXBctSwIQVIH_EDMsRGO_1lX', 'tiktok_video/gqsyudrlwcbxdlp68vd2', 1, '2024-05-20 16:00:26', '2024-10-11 10:45:39', NULL),
(10, 10, 0, 2, 1, 'I wanna love u', 'https://drive.usercontent.google.com/download?id=1wAewUcySxGtzMH-aLzj1sRqvzaoGjMv4&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716220942/tiktok_video/qatbetefbw0bdzuvnl7o.mp4', '1wAewUcySxGtzMH-aLzj1sRqvzaoGjMv4', 'tiktok_video/qatbetefbw0bdzuvnl7o', 1, '2024-05-20 16:02:11', '2024-11-11 06:12:41', NULL),
(11, 21, 0, 7, 4, 'Một video dễ thương ghi lại khoảnh khắc bạn đang vuốt ve một chú mèo mập đáng yêu đang nằm thư giãn. Chú mèo mập, với bộ lông mềm mượt và ánh mắt lười biếng, tận hưởng từng giây phút được cưng nựng. Những cái vuốt ve nhẹ nhàng khiến chú mèo trông hạnh phúc và thoải mái, làm tan chảy trái tim bất cứ ai xem video này. ', 'https://drive.usercontent.google.com/download?id=1GjNmRcJ3rOHVAH5hzxT4_GekPyq4Go_Y&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716226746/tiktok_video/ut2zoqvl9xfuwkzalw1l.mp4', '1GjNmRcJ3rOHVAH5hzxT4_GekPyq4Go_Y', 'tiktok_video/ut2zoqvl9xfuwkzalw1l', 1, '2024-05-20 17:38:55', '2024-10-11 10:45:36', NULL),
(26, 1, 0, 0, 1, 'Lý do tại sao bạn nên sỡ hữu một chú mèo', 'https://drive.usercontent.google.com/download?id=1Nu8S88uR0Sa_yh3AgmvlurK-X1KhTL2x&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716358440/tiktok_video/l8r2ue2zvcd8pr8tch6b.mp4', '1Nu8S88uR0Sa_yh3AgmvlurK-X1KhTL2x', 'tiktok_video/l8r2ue2zvcd8pr8tch6b', 0, '2024-05-22 06:13:40', '2024-11-11 06:12:40', NULL),
(27, 5, 0, 0, 1, 'Hướng dẫn cách đánh bọt cho meo meo', 'https://drive.usercontent.google.com/download?id=1uDOyEae47s3p3B3Pa3Y1fWMLdGnZz6AC&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716359820/tiktok_video/ial9tepmkryolwr10kdp.mp4', '1uDOyEae47s3p3B3Pa3Y1fWMLdGnZz6AC', 'tiktok_video/ial9tepmkryolwr10kdp', -1, '2024-05-22 06:36:34', '2024-10-11 10:45:34', NULL),
(28, 15, 0, 0, 1, 'They\'re angry, grrr', 'https://drive.usercontent.google.com/download?id=19knlEVnnOA0eQ_M_idUPrloOpiGOIxsM&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716921203/tiktok_video/lcchomyfk4pkt3t1yihf.mp4', '19knlEVnnOA0eQ_M_idUPrloOpiGOIxsM', 'tiktok_video/lcchomyfk4pkt3t1yihf', 1, '2024-05-28 18:32:50', '2024-11-11 06:12:40', NULL),
(29, 13, 0, 0, 3, 'Let\' dance', 'https://drive.usercontent.google.com/download?id=10q6pKRhJPb2wD1y-z7HX47joxHJSZMff&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716923645/tiktok_video/iu9ydxvlextz9xgatzxr.mp4', '10q6pKRhJPb2wD1y-z7HX47joxHJSZMff', 'tiktok_video/iu9ydxvlextz9xgatzxr', 1, '2024-05-28 19:13:52', '2024-11-08 03:15:59', NULL),
(30, 14, 0, 1, 1, 'Meo meo', 'https://drive.usercontent.google.com/download?id=1M_LCWLbfe2TT0YQelKpjk2LWkapJCoc2&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716999804/tiktok_video/m1t82t8npeh9p26nibb5.mp4', '1M_LCWLbfe2TT0YQelKpjk2LWkapJCoc2', 'tiktok_video/m1t82t8npeh9p26nibb5', 1, '2024-05-29 16:23:03', '2024-11-11 06:12:39', NULL),
(31, 32, 0, 1, 4, 'Tieu de 1', 'https://drive.usercontent.google.com/download?id=1gf6IO_kU-UeMbEflyiYvsygc-qyppbXu&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1717000643/tiktok_video/gkwhcpq3stbuxr5bkk9j.mp4', '1gf6IO_kU-UeMbEflyiYvsygc-qyppbXu', 'tiktok_video/gkwhcpq3stbuxr5bkk9j', 1, '2024-05-29 16:37:17', '2024-11-09 09:02:29', NULL),
(32, 25, 0, 1, 1, '<script>alert(\'Huy\')</script>', 'https://drive.usercontent.google.com/download?id=1MoKwmk4HnJ0hm_5ClwTwV9EHBFIixy5A&export=view&authuser=1', 'http://res.cloudinary.com/dwuypueso/video/upload/v1719968365/tiktok_video/hciaged5lv3xvjirzr4k.mp4', '1MoKwmk4HnJ0hm_5ClwTwV9EHBFIixy5A', 'tiktok_video/hciaged5lv3xvjirzr4k', 1, '2024-07-03 00:59:28', '2024-11-11 06:12:37', NULL),
(33, 51, 0, 2, 1, 'Xin chao', 'https://drive.usercontent.google.com/download?id=1reb1jfUhnzn57hoD43wyePMS16z6SpSF&export=view&authuser=1', 'http://res.cloudinary.com/dwuypueso/video/upload/v1720184921/tiktok_video/xryqsr2ma3hlh7hfzxbx.mp4', '1reb1jfUhnzn57hoD43wyePMS16z6SpSF', 'tiktok_video/xryqsr2ma3hlh7hfzxbx', 1, '2024-07-05 13:08:53', '2024-11-11 06:12:36', NULL),
(34, 173, 0, 5, 8, 'Trend xé giấy biến hình. Chọn ai xinh hơn nào?', 'https://drive.usercontent.google.com/download?id=1Yea50mnltdLAV3KWQxgmUqDLSbNz985o&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1727585566/tiktok_video/nsfmkq1kb7cgnd9whd26.mp4', '1Yea50mnltdLAV3KWQxgmUqDLSbNz985o', 'tiktok_video/nsfmkq1kb7cgnd9whd26', 1, '2024-09-29 04:52:26', '2024-11-11 06:12:04', NULL),
(35, 289, 0, 2, 7, '=))', 'https://drive.usercontent.google.com/download?id=1xuVIlBZ1uecSMZBu9P1qqP3FMXWOu5YZ&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1727589849/tiktok_video/woj8lan23lqraufpwtde.mp4', '1xuVIlBZ1uecSMZBu9P1qqP3FMXWOu5YZ', 'tiktok_video/woj8lan23lqraufpwtde', 1, '2024-09-29 06:03:48', '2024-11-17 08:41:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `code`, `value`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'R1', 'Admin', '2024-02-17 05:58:49', '2024-02-17 05:58:49', NULL),
(2, 'R2', 'Moderator', '2024-02-17 05:58:49', '2024-02-17 05:58:49', NULL),
(3, 'R3', 'User', '2024-02-17 05:58:49', '2024-02-17 05:58:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`, `deletedAt`) VALUES
('create-avatar.js', NULL),
('create-category.js', NULL),
('create-catogoryOfPost.js', NULL),
('create-chatroom.js', NULL),
('create-commentPost.js', NULL),
('create-commentReply.js', NULL),
('create-follower.js', NULL),
('create-likeComment.js', NULL),
('create-likePost.js', NULL),
('create-livestream.js', NULL),
('create-message.js', NULL),
('create-notification.js', NULL),
('create-otp.js', NULL),
('create-post.js', NULL),
('create-role.js', NULL),
('create-tmpPost.js', NULL),
('create-user.js', NULL),
('create-userInChatroom.js', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tmpposts`
--

CREATE TABLE `tmpposts` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `videoUrl` varchar(255) NOT NULL,
  `videoId` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `association` varchar(255) DEFAULT '',
  `avatarPublicId` varchar(255) DEFAULT 'tiktok_avatar/qrabjbofeuu20wpg28o0',
  `isVertified` tinyint(1) DEFAULT 0,
  `roleCode` varchar(255) DEFAULT 'R3',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `peerId` varchar(255) DEFAULT '',
  `bio` varchar(300) NOT NULL DEFAULT '',
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `userName`, `email`, `password`, `association`, `avatarPublicId`, `isVertified`, `roleCode`, `createdAt`, `updatedAt`, `peerId`, `bio`, `deletedAt`) VALUES
(1, 'Hoàng Huy', 'hoanghuydev', 'hoanghuydev@gmail.com', '$2b$10$E1mmN84Cvmr2urQYPcXcMO0GCmHfSZOCivONt1szhhasrhuhmD7zW', '', 'tiktok_avatar/vb3lsu3tj5l2isahmfi7', 1, 'R3', '2024-02-24 06:39:20', '2024-10-11 10:56:42', '', 'ig : hoanghuydev  \n📨 CONTACT WORK : 0876323489 OR tranvohoanghuy12ab@gmail.com', NULL),
(2, 'Trần Võ Hoàng Huy', 'google111635119529567317993', '21130386@st.hcmuaf.edu.vn', '$2b$10$pFcC1YtLAaY3jh4wbozFROIXFDZDWqdn1ysZJHP6b5gQNwBlS0J4O', 'google', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 1, 'R3', '2024-05-19 06:11:50', '2024-05-19 06:11:50', '', 'Snapchat - CCC Don’t release this username under any circumstances Underground', NULL),
(3, 'HACK GAME MOBILE', 'google113126273317362616172', 'ngaogaming113@gmail.com', '$2b$10$Jhlime7lexSh9jU3FdGcaurcqipQxCNBBCVtepUGDXYTp5qYN.Qf.', 'google', 'tiktok_avatar/c0rpvv5dkrx8xvadspjp', 1, 'R3', '2024-05-19 06:58:06', '2024-05-28 19:53:04', '', 'Snapchat - CCC Don’t release this username under any circumstances Underground', NULL),
(4, 'github161137978', 'github161137978', 'github161137978@gmail.com', '$2b$10$2Kkp0bS2WG.QAGwuFtEiVevIYezv0.7UTUTSUycIXeF0no/jIp6va', 'github', 'tiktok_avatar/tvfmylnammlzck3w3abg', 1, 'R3', '2024-05-19 07:27:46', '2024-11-11 06:28:41', '', 'Hello2', NULL),
(6, 'Nguyễn Van Huy', 'vanhuy', 'vanhuy@gmail.com', '$2b$10$c9DVOskcIKnEIELCDVHgf.CaAK9KRwyLtM3QMAcI.XT9ihZiB0N2e', '', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 0, 'R3', '2024-06-17 18:44:20', '2024-06-17 18:44:20', '', '', NULL),
(7, 'Cao Phương Anh', 'cpacute', 'tranvohoanghuy12ab@gmail.com', '$2b$10$bgT6b9IdYgzbcvK3MOBUb.QyRDUIZUwSq4xIzmlKp2DwmZCiEzT06', 'google', 'tiktok_avatar/xkyfjjhsrot6fqwxmru4', 1, 'R3', '2024-09-27 08:06:51', '2024-10-11 09:59:30', '', 'My Bio', NULL),
(8, 'fadfsd huy', 'google100429052128032567986', 'hoanghuydev111@gmail.com', '$2b$10$2AuboauxZrXVd9xHOqWlu.4GHRUHfhcAQm1QzO0aM6lCMLcl8MJsO', 'google', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 1, 'R3', '2024-09-29 04:20:32', '2024-09-29 04:20:32', '', '', NULL),
(9, 'Trần Võ Hoàng Huy', 'github87463369', 'github87463369@gmail.com', '$2b$10$sV/Bq.w46D8gKi93LpNdTOE62GdUWVyrfVknxGRnrOTM8xbvDOVmC', 'github', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 1, 'R3', '2024-10-27 10:05:23', '2024-10-27 10:05:23', '', '', NULL),
(10, 'Nguyễn Van Huy', 'vanhuy1', 'vanhuy1@gmail.com', '$2b$10$Z2D8oGirzr8mss.Mw5TM1OaBITfJV/PKcfxTL3LEBRSkO9DlwikF2', '', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 1, 'R3', '2024-11-17 07:05:04', '2024-11-17 07:07:39', '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usersinchatroom`
--

CREATE TABLE `usersinchatroom` (
  `id` int(11) NOT NULL,
  `member` int(11) NOT NULL,
  `chatroomId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usersinchatroom`
--

INSERT INTO `usersinchatroom` (`id`, `member`, `chatroomId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(15, 4, 8, '2024-10-12 05:53:58', '2024-10-12 05:53:58', NULL),
(16, 1, 8, '2024-10-12 05:53:58', '2024-10-12 05:53:58', NULL),
(23, 2, 12, '2024-11-09 09:02:16', '2024-11-09 09:02:16', NULL),
(24, 7, 12, '2024-11-09 09:02:16', '2024-11-09 09:02:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_in_call`
--

CREATE TABLE `users_in_call` (
  `id` int(11) NOT NULL,
  `call_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('joined','left') DEFAULT 'joined',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_message_status`
--

CREATE TABLE `user_message_status` (
  `user_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_message_status`
--

INSERT INTO `user_message_status` (`user_id`, `message_id`, `is_deleted`, `deletedAt`) VALUES
(1, 3, 1, NULL),
(1, 9, 1, NULL),
(1, 10, 1, NULL),
(1, 11, 1, NULL),
(1, 12, 1, NULL),
(1, 13, 1, NULL),
(1, 14, 1, NULL),
(1, 15, 1, NULL),
(1, 16, 1, NULL),
(1, 17, 1, NULL),
(1, 18, 1, NULL),
(1, 19, 1, NULL),
(1, 20, 1, NULL),
(1, 21, 1, NULL),
(1, 22, 1, NULL),
(1, 23, 1, NULL),
(1, 24, 1, NULL),
(1, 25, 1, NULL),
(1, 26, 1, NULL),
(1, 27, 1, NULL),
(1, 28, 1, NULL),
(1, 29, 1, NULL),
(1, 30, 1, NULL),
(1, 31, 1, NULL),
(1, 32, 1, NULL),
(1, 33, 1, NULL),
(1, 34, 1, NULL),
(1, 35, 1, NULL),
(1, 36, 1, NULL),
(1, 37, 1, NULL),
(1, 38, 1, NULL),
(1, 39, 1, NULL),
(1, 40, 1, NULL),
(1, 41, 1, NULL),
(1, 42, 1, NULL),
(1, 43, 1, NULL),
(1, 44, 1, NULL),
(1, 45, 1, NULL),
(1, 46, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_privacy_settings`
--

CREATE TABLE `user_privacy_settings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `account_privacy` enum('public','private') DEFAULT 'public',
  `who_can_send_messages` enum('everyone','friends_only','no_one') DEFAULT 'friends_only',
  `who_can_duet` enum('everyone','friends_only','no_one') DEFAULT 'everyone',
  `who_can_stitch` enum('everyone','friends_only','no_one') DEFAULT 'everyone',
  `who_can_comment` enum('everyone','friends_only','no_one') DEFAULT 'everyone',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `video_calls`
--

CREATE TABLE `video_calls` (
  `id` int(11) NOT NULL,
  `chatroom_id` int(11) NOT NULL,
  `caller_id` int(11) NOT NULL,
  `call_status` enum('pending','active','ended') DEFAULT 'pending',
  `start_time` datetime DEFAULT current_timestamp(),
  `end_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avatars`
--
ALTER TABLE `avatars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `publicId` (`publicId`),
  ADD UNIQUE KEY `url` (`url`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `categoriesofpost`
--
ALTER TABLE `categoriesofpost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `chatrooms`
--
ALTER TABLE `chatrooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commenter` (`commenter`),
  ADD KEY `postId` (`postId`),
  ADD KEY `fk_parent_comment` (`parentCommentId`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower` (`follower`),
  ADD KEY `followee` (`followee`);

--
-- Indexes for table `likescomment`
--
ALTER TABLE `likescomment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liker` (`liker`),
  ADD KEY `fk_commentId` (`commentId`);

--
-- Indexes for table `likespost`
--
ALTER TABLE `likespost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liker` (`liker`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `like_message`
--
ALTER TABLE `like_message`
  ADD PRIMARY KEY (`user_id`,`message_id`),
  ADD KEY `message_id` (`message_id`);

--
-- Indexes for table `livestreams`
--
ALTER TABLE `livestreams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `streamer` (`streamer`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender` (`sender`),
  ADD KEY `chatroomId` (`chatroomId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shares` (`shares`),
  ADD KEY `poster` (`poster`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tmpposts`
--
ALTER TABLE `tmpposts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD KEY `avatarPublicId` (`avatarPublicId`),
  ADD KEY `roleCode` (`roleCode`);

--
-- Indexes for table `usersinchatroom`
--
ALTER TABLE `usersinchatroom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member` (`member`),
  ADD KEY `chatroomId` (`chatroomId`);

--
-- Indexes for table `users_in_call`
--
ALTER TABLE `users_in_call`
  ADD PRIMARY KEY (`id`),
  ADD KEY `call_id` (`call_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_message_status`
--
ALTER TABLE `user_message_status`
  ADD PRIMARY KEY (`user_id`,`message_id`),
  ADD KEY `message_id` (`message_id`);

--
-- Indexes for table `user_privacy_settings`
--
ALTER TABLE `user_privacy_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `video_calls`
--
ALTER TABLE `video_calls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `caller_id` (`caller_id`),
  ADD KEY `chatroom_id` (`chatroom_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avatars`
--
ALTER TABLE `avatars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categoriesofpost`
--
ALTER TABLE `categoriesofpost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chatrooms`
--
ALTER TABLE `chatrooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `likescomment`
--
ALTER TABLE `likescomment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `likespost`
--
ALTER TABLE `likespost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `livestreams`
--
ALTER TABLE `livestreams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tmpposts`
--
ALTER TABLE `tmpposts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usersinchatroom`
--
ALTER TABLE `usersinchatroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users_in_call`
--
ALTER TABLE `users_in_call`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_privacy_settings`
--
ALTER TABLE `user_privacy_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `video_calls`
--
ALTER TABLE `video_calls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categoriesofpost`
--
ALTER TABLE `categoriesofpost`
  ADD CONSTRAINT `categoriesofpost_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `categoriesofpost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`commenter`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `fk_parent_comment` FOREIGN KEY (`parentCommentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followee`) REFERENCES `users` (`id`);

--
-- Constraints for table `likescomment`
--
ALTER TABLE `likescomment`
  ADD CONSTRAINT `fk_commentId` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likescomment_ibfk_1` FOREIGN KEY (`liker`) REFERENCES `users` (`id`);

--
-- Constraints for table `likespost`
--
ALTER TABLE `likespost`
  ADD CONSTRAINT `likespost_ibfk_1` FOREIGN KEY (`liker`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `likespost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `like_message`
--
ALTER TABLE `like_message`
  ADD CONSTRAINT `like_message_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `like_message_ibfk_2` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `livestreams`
--
ALTER TABLE `livestreams`
  ADD CONSTRAINT `livestreams_ibfk_1` FOREIGN KEY (`streamer`) REFERENCES `users` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`chatroomId`) REFERENCES `chatrooms` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`poster`) REFERENCES `users` (`id`);

--
-- Constraints for table `tmpposts`
--
ALTER TABLE `tmpposts`
  ADD CONSTRAINT `tmpposts_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`avatarPublicId`) REFERENCES `avatars` (`publicId`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`roleCode`) REFERENCES `roles` (`code`);

--
-- Constraints for table `usersinchatroom`
--
ALTER TABLE `usersinchatroom`
  ADD CONSTRAINT `usersinchatroom_ibfk_1` FOREIGN KEY (`member`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `usersinchatroom_ibfk_2` FOREIGN KEY (`chatroomId`) REFERENCES `chatrooms` (`id`);

--
-- Constraints for table `users_in_call`
--
ALTER TABLE `users_in_call`
  ADD CONSTRAINT `users_in_call_ibfk_1` FOREIGN KEY (`call_id`) REFERENCES `video_calls` (`id`),
  ADD CONSTRAINT `users_in_call_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_message_status`
--
ALTER TABLE `user_message_status`
  ADD CONSTRAINT `user_message_status_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_message_status_ibfk_2` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_privacy_settings`
--
ALTER TABLE `user_privacy_settings`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `video_calls`
--
ALTER TABLE `video_calls`
  ADD CONSTRAINT `video_calls_ibfk_1` FOREIGN KEY (`caller_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `video_calls_ibfk_2` FOREIGN KEY (`chatroom_id`) REFERENCES `chatrooms` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
