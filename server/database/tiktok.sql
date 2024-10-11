-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2024 at 05:29 AM
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `avatars`
--

INSERT INTO `avatars` (`id`, `publicId`, `url`, `code`, `createdAt`, `updatedAt`) VALUES
(1, 'tiktok_avatar/qrabjbofeuu20wpg28o0', 'https://res.cloudinary.com/da5wewzih/image/upload/v1708242262/tiktok_avatar/qrabjbofeuu20wpg28o0.png', 'defaultAvatar', '2024-02-24 06:38:02', '2024-02-24 06:38:02'),
(2, 'tiktok_avatar/vb3lsu3tj5l2isahmfi7', 'http://res.cloudinary.com/dwuypueso/image/upload/v1719968242/tiktok_avatar/vb3lsu3tj5l2isahmfi7.jpg', 'avatarOfUser1', '2024-05-22 06:20:34', '2024-07-03 00:57:38'),
(3, 'tiktok_avatar/tvfmylnammlzck3w3abg', 'http://res.cloudinary.com/da5wewzih/image/upload/v1716359349/tiktok_avatar/tvfmylnammlzck3w3abg.jpg', 'avatarOfUser4', '2024-05-22 06:24:01', '2024-05-22 06:29:00'),
(4, 'tiktok_avatar/c0rpvv5dkrx8xvadspjp', 'http://res.cloudinary.com/da5wewzih/image/upload/v1716925984/tiktok_avatar/c0rpvv5dkrx8xvadspjp.jpg', 'avatarOfUser3', '2024-05-28 19:53:04', '2024-05-28 19:53:04');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chatrooms`
--

CREATE TABLE `chatrooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `parentCommentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `commenter`, `postId`, `content`, `createdAt`, `updatedAt`, `parentCommentId`) VALUES
(76, 1, 34, 'check comment', '2024-10-01 13:59:43', '2024-10-01 13:59:43', NULL),
(77, 1, 34, 'ok', '2024-10-02 08:03:58', '2024-10-02 08:03:58', 76),
(78, 1, 34, 'check comment', '2024-10-02 08:05:55', '2024-10-02 08:05:55', 76),
(79, 1, 34, 'okkk', '2024-10-02 08:06:08', '2024-10-02 08:06:08', 76),
(80, 1, 34, '306', '2024-10-02 08:06:57', '2024-10-02 08:06:57', 76),
(81, 1, 34, 'nice', '2024-10-02 08:07:45', '2024-10-02 08:07:45', 76),
(82, 1, 34, 'hello there', '2024-10-02 08:08:00', '2024-10-02 08:08:00', 76),
(83, 1, 34, 'nice', '2024-10-02 08:08:10', '2024-10-02 08:08:10', 76),
(84, 1, 34, 'hello there', '2024-10-02 08:08:14', '2024-10-02 08:08:14', 76),
(85, 1, 34, 'check comment', '2024-10-02 08:09:55', '2024-10-02 08:09:55', 76),
(86, 1, 34, 'check ', '2024-10-02 08:10:33', '2024-10-02 08:10:33', 76),
(87, 1, 34, 'comment', '2024-10-02 08:12:38', '2024-10-02 08:12:38', 76),
(88, 1, 34, 'comment 2', '2024-10-02 08:12:44', '2024-10-02 08:12:44', 76),
(89, 1, 34, 'fuck', '2024-10-02 08:16:34', '2024-10-02 08:16:34', 76),
(90, 1, 34, '@@@', '2024-10-02 08:17:10', '2024-10-02 08:17:10', 76),
(91, 1, 34, 'coment 319', '2024-10-02 08:19:10', '2024-10-02 08:19:10', 76),
(92, 1, 35, 'omment', '2024-10-02 08:20:42', '2024-10-02 08:20:42', NULL),
(93, 1, 35, 'a', '2024-10-02 08:20:44', '2024-10-02 08:20:44', 92),
(94, 1, 35, 'comment', '2024-10-02 08:24:05', '2024-10-02 08:24:05', NULL),
(95, 1, 35, 'okkkk', '2024-10-02 08:24:10', '2024-10-02 08:24:10', 94),
(96, 1, 35, 'comment', '2024-10-02 08:24:18', '2024-10-02 08:24:18', 94),
(97, 1, 35, 'comment', '2024-10-02 08:24:23', '2024-10-02 08:24:23', 94),
(98, 1, 35, 'comment', '2024-10-02 08:24:29', '2024-10-02 08:24:29', NULL),
(99, 1, 35, 'comment', '2024-10-02 08:24:32', '2024-10-02 08:24:32', 98),
(100, 1, 35, 'Ok im think that good', '2024-10-03 02:04:40', '2024-10-03 02:04:40', 94),
(101, 1, 35, 'is that so', '2024-10-03 02:04:51', '2024-10-03 02:04:51', 94),
(102, 1, 35, 'Hi', '2024-10-04 10:00:21', '2024-10-04 10:00:21', 94),
(103, 1, 35, 'Reply HI', '2024-10-04 10:01:28', '2024-10-04 10:01:28', 94),
(104, 1, 35, 'Is that so?', '2024-10-04 10:02:10', '2024-10-04 10:02:10', 94),
(105, 1, 35, 'Hi there', '2024-10-04 10:03:15', '2024-10-04 10:03:15', 98),
(106, 1, 35, 'Ok nice', '2024-10-04 10:06:41', '2024-10-04 10:06:41', 98),
(107, 1, 35, 'Hello thre', '2024-10-04 10:06:55', '2024-10-04 10:06:55', 98),
(108, 1, 35, 'good', '2024-10-04 10:07:02', '2024-10-04 10:07:02', 98),
(109, 1, 34, 'nah', '2024-10-08 09:39:03', '2024-10-08 09:39:03', 76),
(110, 1, 33, 'comment', '2024-10-10 03:43:25', '2024-10-10 03:43:25', NULL),
(111, 1, 33, 'check', '2024-10-10 04:04:43', '2024-10-10 04:04:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `follower` int(11) NOT NULL,
  `followee` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `follower`, `followee`, `createdAt`, `updatedAt`) VALUES
(50, 1, 4, '2024-09-19 03:51:41', '2024-09-19 03:51:41'),
(53, 1, 3, '2024-09-19 03:59:25', '2024-09-19 03:59:25'),
(54, 7, 2, '2024-09-27 10:08:58', '2024-09-27 10:08:58');

-- --------------------------------------------------------

--
-- Table structure for table `likescomment`
--

CREATE TABLE `likescomment` (
  `id` int(11) NOT NULL,
  `liker` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likescomment`
--

INSERT INTO `likescomment` (`id`, `liker`, `commentId`, `createdAt`, `updatedAt`) VALUES
(22, 1, 76, '2024-10-01 13:59:45', '2024-10-01 13:59:45');

-- --------------------------------------------------------

--
-- Table structure for table `likespost`
--

CREATE TABLE `likespost` (
  `id` int(11) NOT NULL,
  `liker` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likespost`
--

INSERT INTO `likespost` (`id`, `liker`, `postId`, `createdAt`, `updatedAt`) VALUES
(4, 1, 11, '2024-05-21 16:04:15', '2024-05-21 16:04:15'),
(8, 3, 11, '2024-05-21 17:02:57', '2024-05-21 17:02:57'),
(14, 1, 28, '2024-05-28 18:34:39', '2024-05-28 18:34:39'),
(16, 3, 10, '2024-05-28 20:01:25', '2024-05-28 20:01:25'),
(21, 4, 29, '2024-05-28 20:11:33', '2024-05-28 20:11:33'),
(22, 4, 28, '2024-05-28 20:11:39', '2024-05-28 20:11:39'),
(23, 4, 26, '2024-05-28 20:11:52', '2024-05-28 20:11:52'),
(29, 1, 8, '2024-06-17 18:59:37', '2024-06-17 18:59:37'),
(33, 1, 31, '2024-09-19 03:51:36', '2024-09-19 03:51:36'),
(34, 1, 33, '2024-09-21 22:13:11', '2024-09-21 22:13:11'),
(35, 7, 9, '2024-09-27 10:08:56', '2024-09-27 10:08:56'),
(41, 8, 34, '2024-09-29 05:10:12', '2024-09-29 05:10:12'),
(42, 4, 34, '2024-09-29 05:12:13', '2024-09-29 05:12:13'),
(44, 7, 34, '2024-09-29 05:43:11', '2024-09-29 05:43:11'),
(45, 7, 11, '2024-09-29 05:47:58', '2024-09-29 05:47:58'),
(50, 1, 35, '2024-10-10 03:32:18', '2024-10-10 03:32:18');

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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `views`, `comments`, `shares`, `poster`, `title`, `thumnailUrl`, `videoUrl`, `thumnailId`, `videoId`, `visibility`, `createdAt`, `updatedAt`) VALUES
(7, 4, 0, 0, 3, 'How to marketing for Facebook', 'https://drive.google.com/uc?export=view&id=1svKID1G6V2T7iRnnRasbq7wTnuqc30kj', 'http://res.cloudinary.com/da5wewzih/video/upload/v1709014619/tiktok_video/xzzgbdzlxuo51eu9qz9q.mp4', '1svKID1G6V2T7iRnnRasbq7wTnuqc30kj', 'tiktok_video/xzzgbdzlxuo51eu9qz9q', 1, '2024-02-27 06:16:42', '2024-10-08 09:42:47'),
(8, 7, 0, 7, 1, 'Talking kittens cat', 'https://drive.usercontent.google.com/download?id=1dE-aHNOzHX5UXfF56UrHGMgWDlVJfunZ&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716220712/tiktok_video/qkfwangsiwkmaszsem1v.mp4', '1dE-aHNOzHX5UXfF56UrHGMgWDlVJfunZ', 'tiktok_video/qkfwangsiwkmaszsem1v', 1, '2024-05-20 15:58:20', '2024-10-10 03:53:07'),
(9, 6, 0, 1, 2, 'Cat: Don’t talk to me any more', 'https://drive.usercontent.google.com/download?id=16RRP_Cm2gXBctSwIQVIH_EDMsRGO_1lX&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716220837/tiktok_video/gqsyudrlwcbxdlp68vd2.mp4', '16RRP_Cm2gXBctSwIQVIH_EDMsRGO_1lX', 'tiktok_video/gqsyudrlwcbxdlp68vd2', 1, '2024-05-20 16:00:26', '2024-10-01 08:59:44'),
(10, 8, 0, 2, 1, 'I wanna love u', 'https://drive.usercontent.google.com/download?id=1wAewUcySxGtzMH-aLzj1sRqvzaoGjMv4&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716220942/tiktok_video/qatbetefbw0bdzuvnl7o.mp4', '1wAewUcySxGtzMH-aLzj1sRqvzaoGjMv4', 'tiktok_video/qatbetefbw0bdzuvnl7o', 1, '2024-05-20 16:02:11', '2024-10-10 03:43:11'),
(11, 20, 0, 7, 4, 'Một video dễ thương ghi lại khoảnh khắc bạn đang vuốt ve một chú mèo mập đáng yêu đang nằm thư giãn. Chú mèo mập, với bộ lông mềm mượt và ánh mắt lười biếng, tận hưởng từng giây phút được cưng nựng. Những cái vuốt ve nhẹ nhàng khiến chú mèo trông hạnh phúc và thoải mái, làm tan chảy trái tim bất cứ ai xem video này. ', 'https://drive.usercontent.google.com/download?id=1GjNmRcJ3rOHVAH5hzxT4_GekPyq4Go_Y&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716226746/tiktok_video/ut2zoqvl9xfuwkzalw1l.mp4', '1GjNmRcJ3rOHVAH5hzxT4_GekPyq4Go_Y', 'tiktok_video/ut2zoqvl9xfuwkzalw1l', 1, '2024-05-20 17:38:55', '2024-10-01 08:59:43'),
(26, 0, 0, 0, 1, 'Lý do tại sao bạn nên sỡ hữu một chú mèo', 'https://drive.usercontent.google.com/download?id=1Nu8S88uR0Sa_yh3AgmvlurK-X1KhTL2x&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716358440/tiktok_video/l8r2ue2zvcd8pr8tch6b.mp4', '1Nu8S88uR0Sa_yh3AgmvlurK-X1KhTL2x', 'tiktok_video/l8r2ue2zvcd8pr8tch6b', 0, '2024-05-22 06:13:40', '2024-05-22 06:13:51'),
(27, 4, 0, 0, 1, 'Hướng dẫn cách đánh bọt cho meo meo', 'https://drive.usercontent.google.com/download?id=1uDOyEae47s3p3B3Pa3Y1fWMLdGnZz6AC&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716359820/tiktok_video/ial9tepmkryolwr10kdp.mp4', '1uDOyEae47s3p3B3Pa3Y1fWMLdGnZz6AC', 'tiktok_video/ial9tepmkryolwr10kdp', -1, '2024-05-22 06:36:34', '2024-10-10 03:52:42'),
(28, 13, 0, 0, 1, 'They\'re angry, grrr', 'https://drive.usercontent.google.com/download?id=19knlEVnnOA0eQ_M_idUPrloOpiGOIxsM&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716921203/tiktok_video/lcchomyfk4pkt3t1yihf.mp4', '19knlEVnnOA0eQ_M_idUPrloOpiGOIxsM', 'tiktok_video/lcchomyfk4pkt3t1yihf', 1, '2024-05-28 18:32:50', '2024-10-10 03:06:56'),
(29, 11, 0, 0, 3, 'Let\' dance', 'https://drive.usercontent.google.com/download?id=10q6pKRhJPb2wD1y-z7HX47joxHJSZMff&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716923645/tiktok_video/iu9ydxvlextz9xgatzxr.mp4', '10q6pKRhJPb2wD1y-z7HX47joxHJSZMff', 'tiktok_video/iu9ydxvlextz9xgatzxr', 1, '2024-05-28 19:13:52', '2024-10-08 09:43:23'),
(30, 10, 0, 1, 1, 'Meo meo', 'https://drive.usercontent.google.com/download?id=1M_LCWLbfe2TT0YQelKpjk2LWkapJCoc2&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716999804/tiktok_video/m1t82t8npeh9p26nibb5.mp4', '1M_LCWLbfe2TT0YQelKpjk2LWkapJCoc2', 'tiktok_video/m1t82t8npeh9p26nibb5', 1, '2024-05-29 16:23:03', '2024-10-10 03:43:06'),
(31, 19, 0, 1, 4, 'Tieu de 1', 'https://drive.usercontent.google.com/download?id=1gf6IO_kU-UeMbEflyiYvsygc-qyppbXu&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1717000643/tiktok_video/gkwhcpq3stbuxr5bkk9j.mp4', '1gf6IO_kU-UeMbEflyiYvsygc-qyppbXu', 'tiktok_video/gkwhcpq3stbuxr5bkk9j', 1, '2024-05-29 16:37:17', '2024-10-10 04:09:19'),
(32, 20, 0, 1, 1, '<script>alert(\'Huy\')</script>', 'https://drive.usercontent.google.com/download?id=1MoKwmk4HnJ0hm_5ClwTwV9EHBFIixy5A&export=view&authuser=1', 'http://res.cloudinary.com/dwuypueso/video/upload/v1719968365/tiktok_video/hciaged5lv3xvjirzr4k.mp4', '1MoKwmk4HnJ0hm_5ClwTwV9EHBFIixy5A', 'tiktok_video/hciaged5lv3xvjirzr4k', 1, '2024-07-03 00:59:28', '2024-10-11 03:10:02'),
(33, 41, 0, 1, 1, 'Xin chao', 'https://drive.usercontent.google.com/download?id=1reb1jfUhnzn57hoD43wyePMS16z6SpSF&export=view&authuser=1', 'http://res.cloudinary.com/dwuypueso/video/upload/v1720184921/tiktok_video/xryqsr2ma3hlh7hfzxbx.mp4', '1reb1jfUhnzn57hoD43wyePMS16z6SpSF', 'tiktok_video/xryqsr2ma3hlh7hfzxbx', 1, '2024-07-05 13:08:53', '2024-10-11 03:10:01'),
(34, 138, 0, 5, 8, 'Trend xé giấy biến hình. Chọn ai xinh hơn nào?', 'https://drive.usercontent.google.com/download?id=1Yea50mnltdLAV3KWQxgmUqDLSbNz985o&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1727585566/tiktok_video/nsfmkq1kb7cgnd9whd26.mp4', '1Yea50mnltdLAV3KWQxgmUqDLSbNz985o', 'tiktok_video/nsfmkq1kb7cgnd9whd26', 1, '2024-09-29 04:52:26', '2024-10-11 03:10:00'),
(35, 113, 0, 2, 7, '=))', 'https://drive.usercontent.google.com/download?id=1xuVIlBZ1uecSMZBu9P1qqP3FMXWOu5YZ&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1727589849/tiktok_video/woj8lan23lqraufpwtde.mp4', '1xuVIlBZ1uecSMZBu9P1qqP3FMXWOu5YZ', 'tiktok_video/woj8lan23lqraufpwtde', 1, '2024-09-29 06:03:48', '2024-10-11 03:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `code`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 'R1', 'Admin', '2024-02-17 05:58:49', '2024-02-17 05:58:49'),
(2, 'R2', 'Moderator', '2024-02-17 05:58:49', '2024-02-17 05:58:49'),
(3, 'R3', 'User', '2024-02-17 05:58:49', '2024-02-17 05:58:49');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('create-avatar.js'),
('create-category.js'),
('create-catogoryOfPost.js'),
('create-chatroom.js'),
('create-commentPost.js'),
('create-commentReply.js'),
('create-follower.js'),
('create-likeComment.js'),
('create-likePost.js'),
('create-livestream.js'),
('create-message.js'),
('create-notification.js'),
('create-otp.js'),
('create-post.js'),
('create-role.js'),
('create-tmpPost.js'),
('create-user.js'),
('create-userInChatroom.js');

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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
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
  `bio` varchar(300) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `userName`, `email`, `password`, `association`, `avatarPublicId`, `isVertified`, `roleCode`, `createdAt`, `updatedAt`, `peerId`, `bio`) VALUES
(1, 'Hoàng Huy', 'hoanghuydev', 'hoanghuydev@gmail.com', '$2b$10$E1mmN84Cvmr2urQYPcXcMO0GCmHfSZOCivONt1szhhasrhuhmD7zW', '', 'tiktok_avatar/vb3lsu3tj5l2isahmfi7', 1, 'R3', '2024-02-24 06:39:20', '2024-07-03 00:57:38', '', 'ig : only.hanhnt  📨 CONTACT WORK : 0866.673.314'),
(2, 'Trần Võ Hoàng Huy', 'google111635119529567317993', '21130386@st.hcmuaf.edu.vn', '$2b$10$pFcC1YtLAaY3jh4wbozFROIXFDZDWqdn1ysZJHP6b5gQNwBlS0J4O', 'google', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 1, 'R3', '2024-05-19 06:11:50', '2024-05-19 06:11:50', '', 'Snapchat - CCC Don’t release this username under any circumstances Underground'),
(3, 'HACK GAME MOBILE', 'google113126273317362616172', 'ngaogaming113@gmail.com', '$2b$10$Jhlime7lexSh9jU3FdGcaurcqipQxCNBBCVtepUGDXYTp5qYN.Qf.', 'google', 'tiktok_avatar/c0rpvv5dkrx8xvadspjp', 1, 'R3', '2024-05-19 06:58:06', '2024-05-28 19:53:04', '', 'Snapchat - CCC Don’t release this username under any circumstances Underground'),
(4, 'github161137978', 'github161137978', 'github161137978@gmail.com', '$2b$10$2Kkp0bS2WG.QAGwuFtEiVevIYezv0.7UTUTSUycIXeF0no/jIp6va', 'github', 'tiktok_avatar/tvfmylnammlzck3w3abg', 1, 'R3', '2024-05-19 07:27:46', '2024-05-22 06:29:00', '', ''),
(6, 'Nguyễn Van Huy', 'vanhuy', 'vanhuy@gmail.com', '$2b$10$c9DVOskcIKnEIELCDVHgf.CaAK9KRwyLtM3QMAcI.XT9ihZiB0N2e', '', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 0, 'R3', '2024-06-17 18:44:20', '2024-06-17 18:44:20', '', ''),
(7, 'Huy Hoàng', 'google102478269810804561785', 'tranvohoanghuy12ab@gmail.com', '$2b$10$bgT6b9IdYgzbcvK3MOBUb.QyRDUIZUwSq4xIzmlKp2DwmZCiEzT06', 'google', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 1, 'R3', '2024-09-27 08:06:51', '2024-09-27 08:06:51', '', ''),
(8, 'fadfsd huy', 'google100429052128032567986', 'hoanghuydev111@gmail.com', '$2b$10$2AuboauxZrXVd9xHOqWlu.4GHRUHfhcAQm1QzO0aM6lCMLcl8MJsO', 'google', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 1, 'R3', '2024-09-29 04:20:32', '2024-09-29 04:20:32', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `usersinchatroom`
--

CREATE TABLE `usersinchatroom` (
  `id` int(11) NOT NULL,
  `member` int(11) NOT NULL,
  `chatroomId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
-- Indexes for table `user_privacy_settings`
--
ALTER TABLE `user_privacy_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avatars`
--
ALTER TABLE `avatars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `likescomment`
--
ALTER TABLE `likescomment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `likespost`
--
ALTER TABLE `likespost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `livestreams`
--
ALTER TABLE `livestreams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `usersinchatroom`
--
ALTER TABLE `usersinchatroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_privacy_settings`
--
ALTER TABLE `user_privacy_settings`
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
-- Constraints for table `user_privacy_settings`
--
ALTER TABLE `user_privacy_settings`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
