-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 05:01 PM
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

--
-- Dumping data for table `blog_category`
--

INSERT INTO `blog_category` (`blog_cate_id`, `category_title`, `category_description`, `meta_tag`, `meta_description`, `meta_keyword`, `canonical_url`, `category_image`, `category_icon`, `status`) VALUES
(51, 'blogs', '<p>blogs</p>', '', '', '', '', '1700623946512.aarogya_setu_a.png', '1700623946512.aarogya_setu.png', 1);

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

--
-- Dumping data for table `blog_master`
--

INSERT INTO `blog_master` (`blog_id`, `blog_title`, `blog_thumbnail`, `blog_description`, `meta_tag`, `meta_desc`, `meta_keyword`, `canonical_url`, `published_date`, `updated_date`, `status`, `blog_cate_id`) VALUES
(1, 'new blog', '1700624046484.aarogya_setu.png', '<p>new blog</p>', '', '', '', '', '2023-11-22', NULL, 1, 51);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `gallery_title` varchar(50) NOT NULL,
  `gallery_image` varchar(200) NOT NULL,
  `gallery_sort` int(11) NOT NULL,
  `gallery_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_category`
--

CREATE TABLE `gallery_category` (
  `id` int(11) NOT NULL,
  `category_title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery_category`
--

INSERT INTO `gallery_category` (`id`, `category_title`) VALUES
(23, 'Terrace waterproofing with coloured top coat'),
(24, 'Terrace Waterproofing'),
(25, ' External wall waterproofing');

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
(42, 'cdscsdc', 'csdc', '', ',dd', 'dd', ',dd', 'dd', '1700317051922.Screenshot(7).png', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_docs`
--

CREATE TABLE `product_docs` (
  `prod_docs_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `pdf_title` varchar(500) NOT NULL,
  `pdf_link` varchar(500) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_docs`
--

INSERT INTO `product_docs` (`prod_docs_id`, `product_id`, `pdf_title`, `pdf_link`, `status`) VALUES
(28, 53, '', '1701951970814_Shortlisted_Teams_grand_Finale.pdf', 1);

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
(87, 53, 'im', '1701951486297_Acupressure and Massage Therapy Services.png', 0, '', '', '', 1);

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
(53, 42, 'new product', '<p>new product</p>', '<p>new product</p>', '', '', '', '', '1700919344913.Screenshot(3).png', '2023-11-25', NULL, 1);

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

--
-- Dumping data for table `product_video`
--

INSERT INTO `product_video` (`prod_video_id`, `product_id`, `product_video`, `video_thumbnail`, `video_title`, `video_description`, `status`) VALUES
(18, 53, 'new video edit', '1701419950240.Screenshot(15).png', 'new vedio edit', '<p>new vedio edit</p>', 1);

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE `testimonial` (
  `id` int(11) NOT NULL,
  `testimonial_title` varchar(100) NOT NULL,
  `testimonial_desc` varchar(500) NOT NULL,
  `testimonial_image` varchar(200) NOT NULL,
  `testimonial_video` varchar(200) NOT NULL,
  `rating` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonial`
--

INSERT INTO `testimonial` (`id`, `testimonial_title`, `testimonial_desc`, `testimonial_image`, `testimonial_video`, `rating`, `status`) VALUES
(14, 'One', '<p>hello i am one</p>\r\n<table style=\"border-collapse: collapse; width: 100%; height: 44.7812px;\" border=\"1\"><colgroup><col style=\"width: 49.9582%;\"><col style=\"width: 49.9582%;\"></colgroup>\r\n<tbody>\r\n<tr style=\"height: 22.3906px;\">\r\n<td style=\"height: 22.3906px;\">one</td>\r\n<td style=\"height: 22.3906px;\">two</td>\r\n</tr>\r\n<tr style=\"height: 22.3906px;\">\r\n<td style=\"height: 22.3906px;\">1-nan</td>\r\n<td style=\"height: 22.3906px;\">2</td>\r\n</tr>\r\n</tbody>\r\n</table>', '1700882965784.IMG_20221008_163924.jpg', 'https://www.youtube.com/watch?v=tOwjEOt1zYU', 4, 0),
(17, 'Bagwan Husen', '<p>Nice your water proofing projects</p>\r\n<p>&nbsp;</p>', '1700463777536.plantScreen3(2).png', 'www.youtube.com/watch?v=gDUzaANQ01A', 2, 1),
(19, 'Sunasara', '<p>Hiii</p>', '1700464201714.IMG_20221030_180524.jpg', 'https://www.youtube.com/watch?v=gDUzaANQ01A', 4, 1);

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
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gallery_category_id` (`gallery_category_id`);

--
-- Indexes for table `gallery_category`
--
ALTER TABLE `gallery_category`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `testimonial`
--
ALTER TABLE `testimonial`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `blog_cate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `blog_master`
--
ALTER TABLE `blog_master`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `gallery_category`
--
ALTER TABLE `gallery_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `product_docs`
--
ALTER TABLE `product_docs`
  MODIFY `prod_docs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `prod_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `product_master`
--
ALTER TABLE `product_master`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `product_video`
--
ALTER TABLE `product_video`
  MODIFY `prod_video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `testimonial`
--
ALTER TABLE `testimonial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_category_id_fk` FOREIGN KEY (`gallery_category_id`) REFERENCES `gallery_category` (`id`);

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
