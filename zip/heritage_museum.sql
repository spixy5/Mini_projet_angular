-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2025 at 04:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heritage_museum`
--

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`user_id`, `comment_id`) VALUES
(1, 3),
(1, 4),
(1, 5),
(5, 3),
(5, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `museums`
--

CREATE TABLE `museums` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT 1,
  `entry_price` decimal(10,2) DEFAULT 0.00,
  `visits` int(11) DEFAULT 0,
  `category` enum('Archaeological','Ethnographic','Islamic Art','Traditional Arts','Modern Art') DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `opening_hour` time NOT NULL DEFAULT '09:00:00',
  `closing_hour` time NOT NULL DEFAULT '18:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `museums`
--

INSERT INTO `museums` (`id`, `name`, `photo`, `description`, `is_open`, `entry_price`, `visits`, `category`, `location`, `created_at`, `opening_hour`, `closing_hour`) VALUES
(1, 'Musée national du Bardo', 'photos/bardo.jpg', 'Exceptionnelle collection de mosaïques romaines et d\'artefacts antiques.', 1, 12.00, 248, 'Archaeological', 'Tunis', '2025-11-18 00:00:00', '09:00:00', '18:00:00'),
(2, 'Musée de Carthage', 'photos/carthage.jpg', 'Vestiges puniques et romains, sur le site antique de Carthage.', 1, 10.00, 152, 'Archaeological', 'Carthage', '2025-11-18 18:54:01', '09:00:00', '18:00:00'),
(3, 'Musée des Beaux-Arts de Sousse', 'photos/sousse_arts.jpg', 'Collections modernes et expositions temporaires au cœur de la médina.', 1, 8.00, 302, 'Modern Art', 'Sousse', '2025-11-18 18:54:01', '09:00:00', '18:00:00'),
(4, 'Musée de Mahdia', 'photos/mahdia.jpg', 'Trésors sous-marins et patrimoine régional.', 1, 7.00, 40, 'Islamic Art', 'Mahdia', '2025-11-18 18:54:01', '09:00:00', '18:00:00'),
(5, 'Musée de Kairouan', 'photos/kairouan.jpg', 'Arts islamiques et traditions artisanales.', 0, 5.00, 10, 'Islamic Art', 'Kairouan', '2025-11-18 18:54:01', '09:00:00', '18:00:00'),
(6, 'Musée de Djerba', 'photos/djerba.jpg', 'Vie et traditions djerbiennes, artisanat et costumes.', 1, 6.00, 30, 'Ethnographic', 'Houmt Souk', '2025-11-18 18:54:01', '09:00:00', '18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `museum_comments`
--

CREATE TABLE `museum_comments` (
  `id` int(11) NOT NULL,
  `museum_id` int(11) NOT NULL,
  `like_count` int(11) DEFAULT 0,
  `author_name` varchar(255) NOT NULL,
  `author_email` varchar(255) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `museum_comments`
--

INSERT INTO `museum_comments` (`id`, `museum_id`, `like_count`, `author_name`, `author_email`, `message`, `created_at`) VALUES
(3, 2, 2, 'Farah', 'farah@gmail.com', 'ok', '2025-11-21 20:47:40'),
(4, 2, 2, 'Farah', 'farah@gmail.com', 'ok', '2025-11-21 20:51:39'),
(5, 1, 2, 'Farah', 'farah@gmail.com', 'Bien', '2025-11-21 22:16:24'),
(7, 1, 0, 'admin', 'undefined', 'ok', '2025-11-21 23:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes`
--

CREATE TABLE `promo_codes` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `percentage` decimal(5,2) NOT NULL,
  `used` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promo_codes`
--

INSERT INTO `promo_codes` (`id`, `code`, `percentage`, `used`) VALUES
(1, 'WELCOME10', 10.00, 1),
(2, 'SUMMER20', 20.00, 0),
(3, 'BLACKFRIDAY', 50.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `museum_id` int(11) NOT NULL,
  `museum_name` varchar(255) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `numberOfTickets` int(11) NOT NULL,
  `visit_date` date DEFAULT NULL,
  `ticket_type` enum('group','adult','child','student') NOT NULL,
  `promo_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `suspension` tinyint(4) DEFAULT 0 CHECK (`suspension` <= 3),
  `banned` tinyint(1) DEFAULT 0,
  `last_login` datetime DEFAULT NULL,
  `activity_count` int(11) DEFAULT 0,
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `suspension`, `banned`, `last_login`, `activity_count`, `role`) VALUES
(1, 'Farah', 'farah@gmail.com', '$2y$10$jTSYvt5uHjbCL.8XZPDpTOoVIUFjdj.j9w7.xhsKHUEYvO5Wo1HYW', 1, 0, '2025-11-22 09:09:50', 307, 'user'),
(2, 'admin', 'admin@example.com', '$2b$12$1RoEZ5khVz9R/6ljSVeHWuvfPOyOxCi.3pfF1dtK3c1YnSsJrViy.', 0, 0, '2025-11-22 15:26:42', 43, 'admin'),
(3, 'Sarah', 'sarah@gmail.com', '$2y$10$nPb6AyuH2tN7vEXlcpq6aekbfzueqUyGnayqYcqx/GZ6ixGDS3FVK', 0, 1, '2025-11-20 21:05:38', 0, 'user'),
(4, 'Tassnim', 'tasnnim@gmail.com', '$2y$10$Mu.ciVNHVqE6imtJoI.Lz.zVDgzfS6I/kenhDOmOIABfLrRRHhnre', 1, 1, '2025-11-20 22:35:10', 0, 'user'),
(5, 'Hassan', 'hassan@gmail.com', '$2y$10$obnLHGwIM8tlisq1T8Zo3um2dfIFB.IFv9aPJkzyO4PRa9Afzh4Fe', 0, 0, '2025-11-21 23:37:12', 12, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`user_id`,`comment_id`),
  ADD KEY `fk_likes_comment_id` (`comment_id`);

--
-- Indexes for table `museums`
--
ALTER TABLE `museums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `museum_comments`
--
ALTER TABLE `museum_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `museum_id` (`museum_id`);

--
-- Indexes for table `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_user` (`user_email`),
  ADD KEY `fk_museum` (`museum_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `museums`
--
ALTER TABLE `museums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `museum_comments`
--
ALTER TABLE `museum_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_likes_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `museum_comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `museum_comments`
--
ALTER TABLE `museum_comments`
  ADD CONSTRAINT `museum_comments_ibfk_1` FOREIGN KEY (`museum_id`) REFERENCES `museums` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `fk_museum` FOREIGN KEY (`museum_id`) REFERENCES `museums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`museum_id`) REFERENCES `museums` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
