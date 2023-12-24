-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2023 at 05:27 AM
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
(53, 'dd', '', 'dd', '', 'ss,ss,gg', '', '1703304029566_1.unit_image_3.webp', '1703304029566_2.unit_image_2.webp', 1),
(55, 'new cact', '<p>cat</p>', '', '', '', '', '1703304043165_1.3.jpg', '1703304043165_2.awc-roof300-2.jpg', 1),
(56, ',,', '', '', '', '', '', '1703304057687_1.unit_image_3.webp', '1703304057688_2.contact_us_img_3.webp', 1);

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
(2, 'Unlocking the Secrets of Effective Roof Waterproofing', '1703304120342.blog-1.png', '<h1 class=\"blog_sec_desc_section\">Blog DAta</h1>\r\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 24.975%;\"><col style=\"width: 24.975%;\"><col style=\"width: 24.975%;\"><col style=\"width: 24.975%;\"></colgroup>\r\n<tbody>\r\n<tr>\r\n<td>\r\n<h1>jjujjjj</h1>\r\n</td>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n</tr>\r\n<tr>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n</tr>\r\n<tr>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p class=\"blog_sec_desc_section\">Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions.</p>\r\n<p class=\"blog_sec_desc_section\">Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions. Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions. Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions. Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions.</p>', '', '', '', '', '2023-12-16', '2023-12-23', 1, 53),
(3, 'Wall Waterproofing Made Simple: Tips and Techniques', '1703304130353.blog-2.png', '<h1 class=\"blog_sec_desc_section\">Blog DAta</h1>\r\n<p class=\"blog_sec_desc_section\">Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions.&nbsp;Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions. Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions. Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions. Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions.</p>', 'exit', '', 'exit,.', '', '2023-12-18', '2023-12-23', 1, 53),
(5, 'The Green Approach: Waterproofing Solutions', '1703305090176.blog-3.png', '<p class=\"blog_desc_section\">The Green Approach: Waterproofing Solutions&nbsp; The Green Approach: Waterproofing Solutions The Green Approach: Waterproofing Solutions</p>', '', '', '', '', '2023-12-23', '2023-12-23', 1, 53),
(6, 'Unlocking the Secrets of Effective Roof Waterproofing', '1703305167145.blog-1.png', '<p class=\"blog_sec_desc_section\">Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions.</p>', '', '', '', '', '2023-12-23', NULL, 1, 53),
(7, 'Wall Waterproofing Made Simple: Tips and Techniques', '1703305191653.blog-2.png', '<p class=\"blog_sec_desc_section\">Discover the key strategies and expert insights for achieving long-lasting roof waterproofing solutions. Discover the key strategies and expert insights</p>', '', '', '', '', '2023-12-23', NULL, 1, 53),
(8, 'The Green Approach: Waterproofing Solutions', '1703305232280.blog-3.png', '<p class=\"blog_sec_desc_section\">The Green Approach: Waterproofing Solutions The Green Approach: Waterproofing Solutions The Green Approach: Waterproofing Solutions</p>', '', '', '', '', '2023-12-23', NULL, 1, 53);

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

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `gallery_title`, `gallery_image`, `gallery_sort`, `gallery_category_id`) VALUES
(159, 'new image', '1703305865144.roof_540_image.png', 0, 25),
(160, 'er', '1703305847476.blog-3.png', 0, 23),
(161, 'er', '1703305838957.blog-2.png', 0, 25),
(162, 'dfdsf', '1703305780973.blog-1.png', 0, 24),
(163, 'new image', '1703340213546_roof_540_image.png', 1, 23),
(164, 'new image', '1703340213553_roof_540_image.png', 1, 25),
(165, 'new image', '1703340213557_roof_540_image.png', 1, 24),
(166, 'img 2', '1703340213567_blog-3.png', 3, 23),
(167, 'img 2', '1703340213572_blog-3.png', 3, 24),
(168, 'img 3', '1703340213575_blog-2.png', 5, 25),
(169, 'img 3', '1703340213579_blog-2.png', 5, 24),
(170, 'img 5', '1703340213583_blog-1.png', 5, 24),
(171, 'img 5', '1703340213587_blog-1.png', 5, 23),
(172, 'er', '1703340314086_roof_540_image.png', 0, 24),
(173, 'img 2', '1703340314092_blog-3.png', 0, 23),
(174, 'img 2', '1703340314099_blog-3.png', 0, 24),
(175, 'img 3', '1703340314104_blog-2.png', 0, 23),
(176, 'img 3', '1703340314114_blog-2.png', 0, 25),
(177, 'img 3', '1703340314119_blog-2.png', 0, 24),
(178, 'img 5', '1703340314124_blog-1.png', 0, 23),
(179, 'img 5', '1703340314128_blog-1.png', 0, 24),
(180, 'img 5', '1703340314132_Abnormal..png', 0, 24),
(181, 'img', '1703340314138_IMG_20231222_172538.jpg', 0, 24),
(182, 'img 8', '1703340314142_IMG_20231222_172546.jpg', 0, 24);

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
(23, 'Terrace waterproofing with coloured top coated'),
(24, 'Terrace Waterproofing'),
(25, ' External wall waterproofing');

-- --------------------------------------------------------

--
-- Table structure for table `global_data`
--

CREATE TABLE `global_data` (
  `id` int(11) NOT NULL,
  `header` text NOT NULL,
  `footer` text NOT NULL,
  `shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `global_data`
--

INSERT INTO `global_data` (`id`, `header`, `footer`, `shop_id`) VALUES
(1, '<meta name=\"keywordssss\" content=\"global links, \">\r\n<meta name=\"keywordsyy\" content=\"global links, \">\r\n<meta name=\"keywordsssdes\" content=\"global links, \">', 'Global foooter', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pages_seo`
--

CREATE TABLE `pages_seo` (
  `id` int(11) NOT NULL,
  `home_title` tinytext NOT NULL,
  `home_keyword` tinytext NOT NULL,
  `home_desc` text NOT NULL,
  `home_canonical` tinytext NOT NULL,
  `about_title` tinytext NOT NULL,
  `about_keyword` tinytext NOT NULL,
  `about_desc` text NOT NULL,
  `about_canonical` tinytext NOT NULL,
  `product_title` tinytext NOT NULL,
  `product_keyword` tinytext NOT NULL,
  `product_desc` text NOT NULL,
  `product_canonical` tinytext NOT NULL,
  `gallery_title` tinytext NOT NULL,
  `gallery_keyword` tinytext NOT NULL,
  `gallery_desc` text NOT NULL,
  `gallery_canonical` tinytext NOT NULL,
  `carrer_title` tinytext NOT NULL,
  `carrer_keyword` tinytext NOT NULL,
  `carrer_desc` text NOT NULL,
  `carrer_canonical` tinytext NOT NULL,
  `blog_title` tinytext NOT NULL,
  `blog_keyword` tinytext NOT NULL,
  `blog_desc` text NOT NULL,
  `blog_canonical` tinytext NOT NULL,
  `testimonial_title` tinytext NOT NULL,
  `testimonial_keyword` tinytext NOT NULL,
  `testimonial_desc` text NOT NULL,
  `testimonial_canonical` tinytext NOT NULL,
  `privacy_title` tinytext NOT NULL,
  `privacy_keyword` tinytext NOT NULL,
  `privacy_desc` text NOT NULL,
  `privacy_canonical` tinytext NOT NULL,
  `shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pages_seo`
--

INSERT INTO `pages_seo` (`id`, `home_title`, `home_keyword`, `home_desc`, `home_canonical`, `about_title`, `about_keyword`, `about_desc`, `about_canonical`, `product_title`, `product_keyword`, `product_desc`, `product_canonical`, `gallery_title`, `gallery_keyword`, `gallery_desc`, `gallery_canonical`, `carrer_title`, `carrer_keyword`, `carrer_desc`, `carrer_canonical`, `blog_title`, `blog_keyword`, `blog_desc`, `blog_canonical`, `testimonial_title`, `testimonial_keyword`, `testimonial_desc`, `testimonial_canonical`, `privacy_title`, `privacy_keyword`, `privacy_desc`, `privacy_canonical`, `shop_id`) VALUES
(1, 'Home Page', 'home,key', 'desc', 'canon', 'title', 'about', 'Description', 'url', 'title', 'product', 'Description', 'url', 'title', 'gallery.', 'Description', 'url', 'title', 'carrer', 'Description', 'url', 'title', 'blog', 'Description', 'url', 'title', 'testimonial', 'Description', 'url', 'title', 'privacy policy', 'Description', 'url', 1);

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
(52, 'Roof Waterproofing Solution', 'shoes', '<p>AWC Roof waterproofing and Terrace Waterproofing solutions give your roof and terrace the best care it deserves. AWC roof waterproofing and terrace Waterproofing solutions not just prevent seepage and protect them from weather induced degradation but our exterior wall waterproofing solutions also attempt keep the interiors cooler thus saving you on energy consumption too! AWC roof waterproofing price also turns out quite economical in the long run when compared to the prospect of benefits provided by our products.</p>', '', '', '', '', '1703303657493.contact_us_img_3.webp', 56, 1),
(53, 'Wall Waterproofing Solution', 'men shoes', '<p>men shoes</p>', '', '', '', '', '1703303670666.contact_us_img_2.webp', 52, 1),
(56, 'Exclusive Products', 'mnn', '', '', '', '', '', '1703303679909.unit_image_2.webp', 53, 1),
(57, 'dd', '', '', '', '', '', '', '1703303689563.unit_image_1.webp', 0, 1),
(58, 'sssssssssdf', '', '', '', '', '', '', '1703334821221.blog-3.png', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_certificate`
--

CREATE TABLE `product_certificate` (
  `prod_certi_id` int(10) NOT NULL,
  `prod_id` int(10) NOT NULL,
  `certificate_title` varchar(100) NOT NULL,
  `certificate_link` varchar(1000) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_certificate`
--

INSERT INTO `product_certificate` (`prod_certi_id`, `prod_id`, `certificate_title`, `certificate_link`, `status`) VALUES
(12, 68, 'cert', '1702562293522_cash-flow_total_history (2).pdf', 0),
(14, 68, 'hackthon', '1702562500988_husen a.pdf', 1),
(15, 68, 'ccdd', '1702563587818_CSS-INTERVIEW-Q-A.pdf', 1),
(20, 72, 'quest', '1702699874480_JavaScript-Interview-Questions-Fabio-Author.pdf', 1),
(21, 74, 'husen b', '1702834840842_husen b.pdf', 1);

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
(44, 72, 'qyue', '1702699845679_Javascript-Interview-Q-A-WsCube-Tech.pdf', 1),
(45, 74, 'nn', '1702834828213_clan.pdf', 1);

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
(107, 72, 'img', '1702699778614_1.jpg', 0, '', '', '', 1);

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
(72, 52, 'Roof 540', '<p>external wall waterproofing solutions and ensure seepage-free performance and continue to support the structure throughout their lifespan</p>', '', '', '', '', '', '1703303706642.contact_us_img_3.webp', '2023-12-16', '2023-12-23', 1),
(73, 52, 'Roof 300', '<p>external wall waterproofing solutions and ensure seepage-free performance and continue to support the structure throughout their lifespan</p>', '', '', '', '', '', '1703303718604.unit_image_2.webp', '2023-12-16', '2023-12-23', 1),
(74, 52, 'Roof 250', '<p>external wall waterproofing solutions and ensure seepage-free performance and continue to support the structure throughout their lifespan</p>', '', '', '', '', '', '1703303750338.unit_image_3.webp', '2023-12-17', '2023-12-23', 1),
(75, 53, 'Wall mate', '', '', '', '', '', '', '1703303762878.awc_logo_header.webp', '2023-12-18', '2023-12-23', 1),
(76, 53, 'Elastic', '', '', '..,dd,dds', '', 'dd,sss', '', '1703303778319.unit_image_2.webp', '2023-12-18', '2023-12-23', 1),
(78, 53, 'Elastic', '<p>kk</p>', '<p>kk</p>', '', '', '', '', '1703303789573.unit_image_3.webp', '2023-12-20', '2023-12-23', 1),
(79, 56, 'Tuff Coat', '<p>lkll</p>', '<p>jh</p>', '', '', '', '', '1703303803981.contact_us_img_2.webp', '2023-12-20', '2023-12-23', 1),
(80, 56, 'Clear Coat', '', '', '', '', '', '', '1703303825467.contact_us_img_1.webp', '2023-12-20', '2023-12-23', 1),
(81, 56, 'Swift Plast', '<p>ll</p>', '<p>lll</p>', '', '', '', '', '1703303860381.unit_image_3.webp', '2023-12-20', '2023-12-23', 1),
(82, 56, 'Clear Coat', '', '', '', '', '', '', '1703303907326.unit_image_3.webp', '2023-12-20', '2023-12-23', 1);

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
(31, 72, 'https://www.youtube.com/watch?v=ozq-vIxZPQQ', '1702699789795.2.jpg', 'data data', '', 1),
(32, 74, 'k', '1702834813253.contact_us_img_3.webp', 'kk', '<p>kk</p>', 1),
(33, 74, 'https://www.youtube.com/watch?v=ozq-vIxZPQQ', '1702834987373.contact_us_img_2.webp', 'dd', '', 1),
(34, 73, 'https://www.youtube.com/watch?v=ultYYQIFihY', '1702962855443.contact_us_img_2.webp', 'sample', '<p>test video</p>', 1),
(35, 72, 'https://www.youtube.com/watch?v=ozq-vIxZPQQ', '1703139511541.h_mail_icon.webp', 'dd', '<p>ddddddsfva</p>', 1);

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` int(11) NOT NULL,
  `whatsapp_name` tinytext NOT NULL,
  `whatsapp_link` tinytext NOT NULL,
  `facebook_name` tinytext NOT NULL,
  `facebook_link` tinytext NOT NULL,
  `twiter_name` tinytext NOT NULL,
  `twiter_link` tinytext NOT NULL,
  `instagram_name` tinytext NOT NULL,
  `instagram_link` tinytext NOT NULL,
  `linkedin_name` tinytext NOT NULL,
  `linkedin_link` tinytext NOT NULL,
  `shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `whatsapp_name`, `whatsapp_link`, `facebook_name`, `facebook_link`, `twiter_name`, `twiter_link`, `instagram_name`, `instagram_link`, `linkedin_name`, `linkedin_link`, `shop_id`) VALUES
(1, 'whatsapp', 'www.whatsapp.com', 'facebook', 'https://t.me/s/wingo91clubprediction', 'twiter', 'www.link.com', 'instagram', 'www.link.com', 'linkedin', 'www.link.com', 1);

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
  `rating` float NOT NULL,
  `product_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonial`
--

INSERT INTO `testimonial` (`id`, `testimonial_title`, `testimonial_desc`, `testimonial_image`, `testimonial_video`, `rating`, `product_id`, `status`) VALUES
(32, 'Rajasi Behere', '<p class=\"desc\">AWC is working with highly professional and experienced engineers who have given value for money for their products. They have carried out a good job and have provided good solutions for the leakage problem in our society. Thank you Firoz Sir, for the excellent warranty service that is provided to us which is highly appreciated.</p>', '1703158296452.face2.jpg', '', 5, 72, 1),
(33, 'Camillo Dcosta', '<p class=\"desc\">Madhur Co-Operative Hsg Society did avail of the services by AWC for terrace waterproofing and structural building repairs along with plastering and external paints 3 years back. We are vey happy with the results and the professionalism with which the huge contract was executed in stipulated time! Thanks to the entire team and Mr. Firoz for a job well-done!</p>', '1703158264518.face1.jpg', '', 3.5, 72, 1),
(34, 'Camillo Dcosta', '<p class=\"desc\">Madhur Co-Operative Hsg Society did avail of the services by AWC for terrace waterproofing and structural building repairs along with plastering and external paints 3 years back. We are vey happy with the results and the professionalism with which the huge contract was executed in stipulated time! Thanks to the entire team and Mr. Firoz for a job well-done!</p>', '1703158337149.face4.jpg', '', 4.5, 74, 1),
(35, 'Rajasi Behere', '<p class=\"desc\">AWC is working with highly professional and experienced engineers who have given value for money for their products. They have carried out a good job and have provided good solutions for the leakage problem in our society. Thank you Firoz Sir, for the excellent warranty service that is provided to us which is highly appreciated.</p>', '1703158356665.face9.jpg', '', 4.5, 75, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `number` varchar(20) NOT NULL,
  `favicon` tinytext DEFAULT NULL,
  `logo` tinytext DEFAULT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `number`, `favicon`, `logo`, `username`, `password`) VALUES
(1, 'basannofa', '987654321098', '1702835109006_1.contact_us_img_3.webp', '1702442801260_2.2.jpg', 'admin', 'admin');

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
-- Indexes for table `global_data`
--
ALTER TABLE `global_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `pages_seo`
--
ALTER TABLE `pages_seo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `product_certificate`
--
ALTER TABLE `product_certificate`
  ADD PRIMARY KEY (`prod_certi_id`);

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
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`);

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
  MODIFY `blog_cate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `blog_master`
--
ALTER TABLE `blog_master`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;

--
-- AUTO_INCREMENT for table `gallery_category`
--
ALTER TABLE `gallery_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `global_data`
--
ALTER TABLE `global_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pages_seo`
--
ALTER TABLE `pages_seo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `product_certificate`
--
ALTER TABLE `product_certificate`
  MODIFY `prod_certi_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `product_docs`
--
ALTER TABLE `product_docs`
  MODIFY `prod_docs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `prod_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `product_master`
--
ALTER TABLE `product_master`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `product_video`
--
ALTER TABLE `product_video`
  MODIFY `prod_video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `testimonial`
--
ALTER TABLE `testimonial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

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
-- Constraints for table `global_data`
--
ALTER TABLE `global_data`
  ADD CONSTRAINT `global_data_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `pages_seo`
--
ALTER TABLE `pages_seo`
  ADD CONSTRAINT `pages_seo_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `user` (`id`);

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

--
-- Constraints for table `social_links`
--
ALTER TABLE `social_links`
  ADD CONSTRAINT `social_links_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
