-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2024 at 04:14 PM
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
(2, 'tiktok_avatar/tfgnuwbhky8rbyg3pgzm', 'http://res.cloudinary.com/da5wewzih/image/upload/v1716358843/tiktok_avatar/tfgnuwbhky8rbyg3pgzm.jpg', 'avatarOfUser1', '2024-05-22 06:20:34', '2024-05-22 06:20:34'),
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

--
-- Dumping data for table `chatrooms`
--

INSERT INTO `chatrooms` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(5, '', '2024-06-17 19:15:51', '2024-06-17 19:15:51');

-- --------------------------------------------------------

--
-- Table structure for table `commentspost`
--

CREATE TABLE `commentspost` (
  `id` int(11) NOT NULL,
  `commenter` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commentspost`
--

INSERT INTO `commentspost` (`id`, `commenter`, `postId`, `content`, `createdAt`, `updatedAt`) VALUES
(3, 1, 7, 'Test edit comment', '2024-06-20 13:34:09', '2024-06-20 18:41:15'),
(4, 1, 7, 'Comment post 1 test part 2', '2024-06-20 15:02:24', '2024-06-20 15:02:24'),
(5, 6, 7, 'Test', '2024-06-20 15:02:24', '2024-06-20 15:02:24');

-- --------------------------------------------------------

--
-- Table structure for table `commentsreply`
--

CREATE TABLE `commentsreply` (
  `id` int(11) NOT NULL,
  `responder` int(11) NOT NULL,
  `commentPostId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commentsreply`
--

INSERT INTO `commentsreply` (`id`, `responder`, `commentPostId`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 1, 3, 'Im reply my comment id 3', '2024-06-20 13:37:30', '2024-06-20 13:37:30'),
(2, 1, 4, 'Test edit commnet reply', '2024-06-20 15:02:38', '2024-06-20 18:41:40'),
(3, 6, 4, 'Test edit commnet reply', '2024-06-20 15:02:38', '2024-06-20 18:41:40');

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
(39, 4, 1, '2024-05-22 15:34:22', '2024-05-22 15:34:22'),
(43, 3, 4, '2024-05-28 20:08:20', '2024-05-28 20:08:20'),
(44, 3, 1, '2024-05-28 20:08:34', '2024-05-28 20:08:34'),
(45, 3, 2, '2024-05-28 20:08:46', '2024-05-28 20:08:46'),
(46, 1, 4, '2024-06-17 19:15:51', '2024-06-17 19:15:51');

-- --------------------------------------------------------

--
-- Table structure for table `likescomment`
--

CREATE TABLE `likescomment` (
  `id` int(11) NOT NULL,
  `liker` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `isCommentPost` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likescomment`
--

INSERT INTO `likescomment` (`id`, `liker`, `commentId`, `isCommentPost`, `createdAt`, `updatedAt`) VALUES
(2, 1, 4, 1, '2024-06-20 14:57:17', '2024-06-20 14:57:17'),
(3, 1, 3, 1, '2024-06-20 14:57:17', '2024-06-20 14:57:17'),
(5, 1, 2, 0, '2024-06-20 18:56:57', '2024-06-20 18:56:57'),
(6, 3, 3, 0, '2024-06-20 18:57:08', '2024-06-20 18:57:08'),
(7, 1, 1, 0, '2024-06-20 18:59:19', '2024-06-20 18:59:19');

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
(29, 1, 8, '2024-06-17 18:59:37', '2024-06-17 18:59:37');

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
(7, 0, 0, 0, 3, 'How to marketing for Facebook', 'https://drive.google.com/uc?export=view&id=1svKID1G6V2T7iRnnRasbq7wTnuqc30kj', 'http://res.cloudinary.com/da5wewzih/video/upload/v1709014619/tiktok_video/xzzgbdzlxuo51eu9qz9q.mp4', '1svKID1G6V2T7iRnnRasbq7wTnuqc30kj', 'tiktok_video/xzzgbdzlxuo51eu9qz9q', 1, '2024-02-27 06:16:42', '2024-02-27 06:17:20'),
(8, 0, 0, 7, 1, 'Talking kittens cat', 'https://drive.usercontent.google.com/download?id=1dE-aHNOzHX5UXfF56UrHGMgWDlVJfunZ&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716220712/tiktok_video/qkfwangsiwkmaszsem1v.mp4', '1dE-aHNOzHX5UXfF56UrHGMgWDlVJfunZ', 'tiktok_video/qkfwangsiwkmaszsem1v', 1, '2024-05-20 15:58:20', '2024-06-17 19:01:08'),
(9, 0, 0, 0, 2, 'Cat: Don’t talk to me any more', 'https://drive.usercontent.google.com/download?id=16RRP_Cm2gXBctSwIQVIH_EDMsRGO_1lX&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716220837/tiktok_video/gqsyudrlwcbxdlp68vd2.mp4', '16RRP_Cm2gXBctSwIQVIH_EDMsRGO_1lX', 'tiktok_video/gqsyudrlwcbxdlp68vd2', 1, '2024-05-20 16:00:26', '2024-05-20 16:00:36'),
(10, 0, 0, 2, 1, 'I wanna love u', 'https://drive.usercontent.google.com/download?id=1wAewUcySxGtzMH-aLzj1sRqvzaoGjMv4&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716220942/tiktok_video/qatbetefbw0bdzuvnl7o.mp4', '1wAewUcySxGtzMH-aLzj1sRqvzaoGjMv4', 'tiktok_video/qatbetefbw0bdzuvnl7o', 1, '2024-05-20 16:02:11', '2024-05-28 20:12:03'),
(11, 0, 0, 2, 4, 'Một video dễ thương ghi lại khoảnh khắc bạn đang vuốt ve một chú mèo mập đáng yêu đang nằm thư giãn. Chú mèo mập, với bộ lông mềm mượt và ánh mắt lười biếng, tận hưởng từng giây phút được cưng nựng. Những cái vuốt ve nhẹ nhàng khiến chú mèo trông hạnh phúc và thoải mái, làm tan chảy trái tim bất cứ ai xem video này. ', 'https://drive.usercontent.google.com/download?id=1GjNmRcJ3rOHVAH5hzxT4_GekPyq4Go_Y&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716226746/tiktok_video/ut2zoqvl9xfuwkzalw1l.mp4', '1GjNmRcJ3rOHVAH5hzxT4_GekPyq4Go_Y', 'tiktok_video/ut2zoqvl9xfuwkzalw1l', 1, '2024-05-20 17:38:55', '2024-05-21 15:22:51'),
(26, 0, 0, 0, 1, 'Lý do tại sao bạn nên sỡ hữu một chú mèo', 'https://drive.usercontent.google.com/download?id=1Nu8S88uR0Sa_yh3AgmvlurK-X1KhTL2x&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716358440/tiktok_video/l8r2ue2zvcd8pr8tch6b.mp4', '1Nu8S88uR0Sa_yh3AgmvlurK-X1KhTL2x', 'tiktok_video/l8r2ue2zvcd8pr8tch6b', 0, '2024-05-22 06:13:40', '2024-05-22 06:13:51'),
(27, 0, 0, 0, 1, 'Hướng dẫn cách đánh bọt cho meo meo', 'https://drive.usercontent.google.com/download?id=1uDOyEae47s3p3B3Pa3Y1fWMLdGnZz6AC&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716359820/tiktok_video/ial9tepmkryolwr10kdp.mp4', '1uDOyEae47s3p3B3Pa3Y1fWMLdGnZz6AC', 'tiktok_video/ial9tepmkryolwr10kdp', -1, '2024-05-22 06:36:34', '2024-05-22 06:36:51'),
(28, 0, 0, 0, 1, 'They\'re angry, grrr', 'https://drive.usercontent.google.com/download?id=19knlEVnnOA0eQ_M_idUPrloOpiGOIxsM&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716921203/tiktok_video/lcchomyfk4pkt3t1yihf.mp4', '19knlEVnnOA0eQ_M_idUPrloOpiGOIxsM', 'tiktok_video/lcchomyfk4pkt3t1yihf', 1, '2024-05-28 18:32:50', '2024-05-28 18:33:26'),
(29, 0, 0, 0, 3, 'Let\' dance', 'https://drive.usercontent.google.com/download?id=10q6pKRhJPb2wD1y-z7HX47joxHJSZMff&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716923645/tiktok_video/iu9ydxvlextz9xgatzxr.mp4', '10q6pKRhJPb2wD1y-z7HX47joxHJSZMff', 'tiktok_video/iu9ydxvlextz9xgatzxr', 1, '2024-05-28 19:13:52', '2024-05-28 19:14:07'),
(30, 0, 0, 0, 1, 'Meo meo', 'https://drive.usercontent.google.com/download?id=1M_LCWLbfe2TT0YQelKpjk2LWkapJCoc2&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1716999804/tiktok_video/m1t82t8npeh9p26nibb5.mp4', '1M_LCWLbfe2TT0YQelKpjk2LWkapJCoc2', 'tiktok_video/m1t82t8npeh9p26nibb5', 1, '2024-05-29 16:23:03', '2024-05-29 16:23:25'),
(31, 0, 0, 0, 4, 'Tieu de 1', 'https://drive.usercontent.google.com/download?id=1gf6IO_kU-UeMbEflyiYvsygc-qyppbXu&export=view&authuser=1', 'http://res.cloudinary.com/da5wewzih/video/upload/v1717000643/tiktok_video/gkwhcpq3stbuxr5bkk9j.mp4', '1gf6IO_kU-UeMbEflyiYvsygc-qyppbXu', 'tiktok_video/gkwhcpq3stbuxr5bkk9j', 1, '2024-05-29 16:37:17', '2024-05-29 16:37:23');

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
  `peerId` varchar(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `userName`, `email`, `password`, `association`, `avatarPublicId`, `isVertified`, `roleCode`, `createdAt`, `updatedAt`, `peerId`) VALUES
(1, 'Hoàng Huy', 'hoanghuydev', 'hoanghuydev@gmail.com', '$2b$10$E1mmN84Cvmr2urQYPcXcMO0GCmHfSZOCivONt1szhhasrhuhmD7zW', '', 'tiktok_avatar/tfgnuwbhky8rbyg3pgzm', 1, 'R3', '2024-02-24 06:39:20', '2024-06-17 19:13:28', ''),
(2, 'Trần Võ Hoàng Huy', 'google111635119529567317993', '21130386@st.hcmuaf.edu.vn', '$2b$10$pFcC1YtLAaY3jh4wbozFROIXFDZDWqdn1ysZJHP6b5gQNwBlS0J4O', 'google', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 1, 'R3', '2024-05-19 06:11:50', '2024-05-19 06:11:50', ''),
(3, 'HACK GAME MOBILE', 'google113126273317362616172', 'ngaogaming113@gmail.com', '$2b$10$Jhlime7lexSh9jU3FdGcaurcqipQxCNBBCVtepUGDXYTp5qYN.Qf.', 'google', 'tiktok_avatar/c0rpvv5dkrx8xvadspjp', 1, 'R3', '2024-05-19 06:58:06', '2024-05-28 19:53:04', ''),
(4, 'github161137978', 'github161137978', 'github161137978@gmail.com', '$2b$10$2Kkp0bS2WG.QAGwuFtEiVevIYezv0.7UTUTSUycIXeF0no/jIp6va', 'github', 'tiktok_avatar/tvfmylnammlzck3w3abg', 1, 'R3', '2024-05-19 07:27:46', '2024-05-22 06:29:00', ''),
(6, 'Nguyễn Van Huy', 'vanhuy', 'vanhuy@gmail.com', '$2b$10$c9DVOskcIKnEIELCDVHgf.CaAK9KRwyLtM3QMAcI.XT9ihZiB0N2e', '', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 0, 'R3', '2024-06-17 18:44:20', '2024-06-17 18:44:20', '');

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

--
-- Dumping data for table `usersinchatroom`
--

INSERT INTO `usersinchatroom` (`id`, `member`, `chatroomId`, `createdAt`, `updatedAt`) VALUES
(9, 1, 5, '2024-06-17 19:15:51', '2024-06-17 19:15:51'),
(10, 4, 5, '2024-06-17 19:15:51', '2024-06-17 19:15:51');

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
-- Indexes for table `commentspost`
--
ALTER TABLE `commentspost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commenter` (`commenter`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `commentsreply`
--
ALTER TABLE `commentsreply`
  ADD PRIMARY KEY (`id`),
  ADD KEY `responder` (`responder`),
  ADD KEY `commentPostId` (`commentPostId`);

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
  ADD KEY `liker` (`liker`);

--
-- Indexes for table `likespost`
--
ALTER TABLE `likespost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liker` (`liker`),
  ADD KEY `postId` (`postId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `commentspost`
--
ALTER TABLE `commentspost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `commentsreply`
--
ALTER TABLE `commentsreply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `likescomment`
--
ALTER TABLE `likescomment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `likespost`
--
ALTER TABLE `likespost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `usersinchatroom`
--
ALTER TABLE `usersinchatroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
-- Constraints for table `commentspost`
--
ALTER TABLE `commentspost`
  ADD CONSTRAINT `commentspost_ibfk_1` FOREIGN KEY (`commenter`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `commentspost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `commentsreply`
--
ALTER TABLE `commentsreply`
  ADD CONSTRAINT `commentsreply_ibfk_1` FOREIGN KEY (`responder`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `commentsreply_ibfk_2` FOREIGN KEY (`commentPostId`) REFERENCES `commentspost` (`id`);

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
  ADD CONSTRAINT `likescomment_ibfk_1` FOREIGN KEY (`liker`) REFERENCES `users` (`id`);

--
-- Constraints for table `likespost`
--
ALTER TABLE `likespost`
  ADD CONSTRAINT `likespost_ibfk_1` FOREIGN KEY (`liker`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `likespost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
