-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2023 at 02:43 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `awc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_category`
--

CREATE TABLE `blog_category` (
  `blog_cate_id` int(11) NOT NULL,
  `category_title` varchar(200) NOT NULL,
  `category_description` text NOT NULL,
  `meta_tag` tinytext NOT NULL,
  `meta_description` tinytext NOT NULL,
  `meta_keyword` tinytext NOT NULL,
  `canonical_url` tinytext NOT NULL,
  `category_image` varchar(500) NOT NULL,
  `category_icon` varchar(500) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_master`
--

CREATE TABLE `blog_master` (
  `blog_id` int(11) NOT NULL,
  `blog_title` varchar(400) NOT NULL,
  `blog_thumbnail` varchar(500) NOT NULL,
  `blog_description` text NOT NULL,
  `meta_tag` tinytext NOT NULL,
  `meta_desc` varchar(4000) NOT NULL,
  `meta_keyword` tinytext NOT NULL,
  `canonical_url` tinytext NOT NULL,
  `published_date` date NOT NULL DEFAULT current_timestamp(),
  `updated_date` date DEFAULT NULL,
  `status` int(11) NOT NULL,
  `blog_cate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(200) NOT NULL,
  `category_title` varchar(200) NOT NULL,
  `category_description` text NOT NULL,
  `meta_tag` tinytext NOT NULL,
  `meta_description` text NOT NULL,
  `meta_keyword` tinytext NOT NULL,
  `canonical_url` tinytext NOT NULL,
  `category_image` varchar(100) NOT NULL,
  `sub_category` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`category_id`, `category_name`, `category_title`, `category_description`, `meta_tag`, `meta_description`, `meta_keyword`, `canonical_url`, `category_image`, `sub_category`, `status`) VALUES
(42, 'cdscsdc', 'csdc', '', '', '', '', '', '1700314983873.Screenshot(2).png', 0, 1),
(44, 'product category', 'product category', '<p>product category</p>', '', '', '', '', '1700314348735.Screenshot(1).png', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_docs`
--

CREATE TABLE `product_docs` (
  `prod_docs_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `pdf_title` varchar(500) NOT NULL,
  `pdf_link` varchar(500) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `prod_image_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_title` varchar(200) NOT NULL,
  `product_image` varchar(1000) NOT NULL,
  `sort_image` int(11) NOT NULL DEFAULT 0,
  `image_width` varchar(20) NOT NULL,
  `image_height` varchar(20) NOT NULL,
  `alternative` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`prod_image_id`, `product_id`, `image_title`, `product_image`, `sort_image`, `image_width`, `image_height`, `alternative`, `status`) VALUES
(37, 36, 'img 1', '1700314431274_Screenshot (1).png', 0, '', '', '', 0),
(38, 36, 'img 2', '1700314431276_Screenshot (2).png', 0, '', '', '', 0),
(39, 37, 'img 2', '1700314526613_Screenshot (2).png', 2, '100', '100', 'img 2', 0),
(40, 37, 'img 1', '1700314526611_Screenshot (1).png', 1, '100', '100', 'img 1', 0),
(41, 37, 'img 3', '1700314526615_Screenshot (3).png', 3, '100', '100', 'img 3', 0),
(42, 38, 'imag 1', '1700314740656_Screenshot (1).png', 1, '100', '100', 'imag 1', 1),
(43, 38, 'imag 2', '1700314740658_Screenshot (2).png', 2, '100', '100', 'imag 2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_master`
--

CREATE TABLE `product_master` (
  `product_id` int(11) NOT NULL,
  `cate_id` int(11) DEFAULT NULL,
  `product_title` varchar(200) NOT NULL,
  `product_short_desc` text NOT NULL,
  `product_long_desc` text NOT NULL,
  `meta_tag` tinytext NOT NULL,
  `meta_desc` varchar(5000) NOT NULL,
  `meta_keyword` tinytext NOT NULL,
  `canonical_url` tinytext NOT NULL,
  `product_image` varchar(500) NOT NULL,
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  `updated_date` date DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_master`
--

INSERT INTO `product_master` (`product_id`, `cate_id`, `product_title`, `product_short_desc`, `product_long_desc`, `meta_tag`, `meta_desc`, `meta_keyword`, `canonical_url`, `product_image`, `created_date`, `updated_date`, `status`) VALUES
(36, 44, 'product ', '<p>product&nbsp;</p>', '<p>product&nbsp;</p>', '', '', '', '', '1700314379365.Screenshot(3).png', '2023-11-18', NULL, 1),
(37, 42, 'new product', '<p>new product</p>', '<p>new product</p>', '', '', '', '', '1700314477783.Screenshot(3).png', '2023-11-18', NULL, 1),
(38, 42, 'new product 2', '<p>new product 2</p>', '<p>new product 2</p>', '', '', '', '', '1700314706684.Screenshot(3).png', '2023-11-18', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_video`
--

CREATE TABLE `product_video` (
  `prod_video_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_video` varchar(500) NOT NULL,
  `video_thumbnail` varchar(500) NOT NULL,
  `video_title` varchar(500) NOT NULL,
  `video_description` text NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_category`
--
ALTER TABLE `blog_category`
  ADD PRIMARY KEY (`blog_cate_id`);

--
-- Indexes for table `blog_master`
--
ALTER TABLE `blog_master`
  ADD PRIMARY KEY (`blog_id`),
  ADD KEY `blog_cate_id` (`blog_cate_id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `product_docs`
--
ALTER TABLE `product_docs`
  ADD PRIMARY KEY (`prod_docs_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`prod_image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_master`
--
ALTER TABLE `product_master`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `cate_id` (`cate_id`);

--
-- Indexes for table `product_video`
--
ALTER TABLE `product_video`
  ADD PRIMARY KEY (`prod_video_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_category`
--
ALTER TABLE `blog_category`
  MODIFY `blog_cate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `blog_master`
--
ALTER TABLE `blog_master`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `product_docs`
--
ALTER TABLE `product_docs`
  MODIFY `prod_docs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `prod_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `product_master`
--
ALTER TABLE `product_master`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `product_video`
--
ALTER TABLE `product_video`
  MODIFY `prod_video_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blog_master`
--
ALTER TABLE `blog_master`
  ADD CONSTRAINT `blog_master_ibfk_1` FOREIGN KEY (`blog_cate_id`) REFERENCES `blog_category` (`blog_cate_id`);

--
-- Constraints for table `product_docs`
--
ALTER TABLE `product_docs`
  ADD CONSTRAINT `product_docs_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`);

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`);

--
-- Constraints for table `product_master`
--
ALTER TABLE `product_master`
  ADD CONSTRAINT `product_master_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `product_category` (`category_id`);

--
-- Constraints for table `product_video`
--
ALTER TABLE `product_video`
  ADD CONSTRAINT `product_video_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
