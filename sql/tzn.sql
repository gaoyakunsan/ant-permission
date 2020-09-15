/*
SQLyog  v12.2.6 (64 bit)
MySQL - 8.0.19 : Database - tzn
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
USE `tzn`;

/*Table structure for table `menu` */

CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL COMMENT '父层id',
  `show_text` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '显示的名称',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '状态',
  `button_id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '按钮唯一值',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '对应的url',
  `sort` int DEFAULT NULL COMMENT '菜单排序',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '菜单图标',
  `type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '类型 (1:菜单2:按钮)',
  `operate_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '操作类型 (readonly只读;none不可见)',
  `inserttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '插入时间',
  `insertby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `updateby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `isactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_button_id` (`button_id`),
  KEY `idx_inserttime` (`inserttime`),
  KEY `idx_updatetime` (`updatetime`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单表';

/*Data for the table `menu` */

insert  into `menu`(`id`,`parent_id`,`show_text`,`status`,`button_id`,`url`,`sort`,`icon`,`type`,`operate_type`,`inserttime`,`insertby`,`updatetime`,`updateby`,`isactive`) values
(1,0,'功能管理','1',NULL,NULL,1,'iconfont iconbulb','1','','2019-04-03 10:26:10',NULL,'2020-02-02 22:24:29',NULL,1),
(2,1,'幼儿园管理','1',NULL,'http://localhost:8082/#/school/list',1,NULL,'1','','2019-04-03 10:28:50',NULL,'2020-03-02 14:02:28',NULL,1),
(3,1,'分数管理','1',NULL,'http://localhost:8082/#/score/list',1,NULL,'1','','2020-02-09 22:10:30',NULL,'2020-03-02 14:02:33',NULL,1),
(4,1,'用户管理','1',NULL,'http://localhost:8082/#/user/list',1,NULL,'1','','2020-03-02 14:02:43',NULL,'2020-03-02 14:03:56',NULL,1),
(5,1,'角色管理','1',NULL,'http://localhost:8082/#/role/list',1,NULL,'1','','2020-03-02 14:03:32',NULL,'2020-03-02 14:04:30',NULL,1),
(6,1,'菜单管理','1',NULL,'http://localhost:8082/#/menu/list',1,NULL,'1','','2020-03-02 16:23:50',NULL,'2020-03-02 16:24:06',NULL,1),
(16,2,'老师管理','1',NULL,'http://localhost:8082/#/menu/list',1,NULL,'1','','2020-09-12 19:41:11',NULL,'2020-09-14 22:13:36',NULL,0),
(34,2,'幼儿园列表删除','1','childdel',NULL,12,NULL,'2','','2020-09-14 21:54:15',NULL,'2020-09-14 22:13:34',NULL,0),
(35,3,'分数列表删除','1','scoredel',NULL,1,NULL,'2','','2020-09-14 22:14:38',NULL,'2020-09-14 22:14:38',NULL,1),
(36,3,'分数列表查看','1','scoreread',NULL,1,NULL,'2','','2020-09-14 23:21:28',NULL,'2020-09-14 23:21:37',NULL,1),
(37,3,'分数列表编辑','1','scoreedit',NULL,NULL,NULL,'2','','2020-09-15 21:58:51',NULL,'2020-09-15 21:58:51',NULL,1);

/*Table structure for table `qrtz_blob_triggers` */

CREATE TABLE `qrtz_blob_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `BLOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `SCHED_NAME` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `QRTZ_BLOB_TRIGGERS_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_blob_triggers` */

/*Table structure for table `qrtz_calendars` */

CREATE TABLE `qrtz_calendars` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `CALENDAR_NAME` varchar(200) NOT NULL,
  `CALENDAR` blob NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`CALENDAR_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_calendars` */

/*Table structure for table `qrtz_cron_triggers` */

CREATE TABLE `qrtz_cron_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `CRON_EXPRESSION` varchar(120) NOT NULL,
  `TIME_ZONE_ID` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `QRTZ_CRON_TRIGGERS_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_cron_triggers` */

/*Table structure for table `qrtz_fired_triggers` */

CREATE TABLE `qrtz_fired_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `ENTRY_ID` varchar(95) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `INSTANCE_NAME` varchar(200) NOT NULL,
  `FIRED_TIME` bigint NOT NULL,
  `SCHED_TIME` bigint NOT NULL,
  `PRIORITY` int NOT NULL,
  `STATE` varchar(16) NOT NULL,
  `JOB_NAME` varchar(200) DEFAULT NULL,
  `JOB_GROUP` varchar(200) DEFAULT NULL,
  `IS_NONCONCURRENT` varchar(1) DEFAULT NULL,
  `REQUESTS_RECOVERY` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`ENTRY_ID`),
  KEY `IDX_QRTZ_FT_TRIG_INST_NAME` (`SCHED_NAME`,`INSTANCE_NAME`),
  KEY `IDX_QRTZ_FT_INST_JOB_REQ_RCVRY` (`SCHED_NAME`,`INSTANCE_NAME`,`REQUESTS_RECOVERY`),
  KEY `IDX_QRTZ_FT_J_G` (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_FT_JG` (`SCHED_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_FT_T_G` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `IDX_QRTZ_FT_TG` (`SCHED_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_fired_triggers` */

/*Table structure for table `qrtz_job_details` */

CREATE TABLE `qrtz_job_details` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `JOB_NAME` varchar(200) NOT NULL,
  `JOB_GROUP` varchar(200) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `JOB_CLASS_NAME` varchar(250) NOT NULL,
  `IS_DURABLE` varchar(1) NOT NULL,
  `IS_NONCONCURRENT` varchar(1) NOT NULL,
  `IS_UPDATE_DATA` varchar(1) NOT NULL,
  `REQUESTS_RECOVERY` varchar(1) NOT NULL,
  `JOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_J_REQ_RECOVERY` (`SCHED_NAME`,`REQUESTS_RECOVERY`),
  KEY `IDX_QRTZ_J_GRP` (`SCHED_NAME`,`JOB_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_job_details` */

/*Table structure for table `qrtz_locks` */

CREATE TABLE `qrtz_locks` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `LOCK_NAME` varchar(40) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`LOCK_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_locks` */

/*Table structure for table `qrtz_paused_trigger_grps` */

CREATE TABLE `qrtz_paused_trigger_grps` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_paused_trigger_grps` */

/*Table structure for table `qrtz_scheduler_state` */

CREATE TABLE `qrtz_scheduler_state` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `INSTANCE_NAME` varchar(200) NOT NULL,
  `LAST_CHECKIN_TIME` bigint NOT NULL,
  `CHECKIN_INTERVAL` bigint NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`INSTANCE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_scheduler_state` */

/*Table structure for table `qrtz_simple_triggers` */

CREATE TABLE `qrtz_simple_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `REPEAT_COUNT` bigint NOT NULL,
  `REPEAT_INTERVAL` bigint NOT NULL,
  `TIMES_TRIGGERED` bigint NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `QRTZ_SIMPLE_TRIGGERS_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_simple_triggers` */

/*Table structure for table `qrtz_simprop_triggers` */

CREATE TABLE `qrtz_simprop_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `STR_PROP_1` varchar(512) DEFAULT NULL,
  `STR_PROP_2` varchar(512) DEFAULT NULL,
  `STR_PROP_3` varchar(512) DEFAULT NULL,
  `INT_PROP_1` int DEFAULT NULL,
  `INT_PROP_2` int DEFAULT NULL,
  `LONG_PROP_1` bigint DEFAULT NULL,
  `LONG_PROP_2` bigint DEFAULT NULL,
  `DEC_PROP_1` decimal(13,4) DEFAULT NULL,
  `DEC_PROP_2` decimal(13,4) DEFAULT NULL,
  `BOOL_PROP_1` varchar(1) DEFAULT NULL,
  `BOOL_PROP_2` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `QRTZ_SIMPROP_TRIGGERS_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_simprop_triggers` */

/*Table structure for table `qrtz_triggers` */

CREATE TABLE `qrtz_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `JOB_NAME` varchar(200) NOT NULL,
  `JOB_GROUP` varchar(200) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `NEXT_FIRE_TIME` bigint DEFAULT NULL,
  `PREV_FIRE_TIME` bigint DEFAULT NULL,
  `PRIORITY` int DEFAULT NULL,
  `TRIGGER_STATE` varchar(16) NOT NULL,
  `TRIGGER_TYPE` varchar(8) NOT NULL,
  `START_TIME` bigint NOT NULL,
  `END_TIME` bigint DEFAULT NULL,
  `CALENDAR_NAME` varchar(200) DEFAULT NULL,
  `MISFIRE_INSTR` smallint DEFAULT NULL,
  `JOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `IDX_QRTZ_T_J` (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_T_JG` (`SCHED_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_T_C` (`SCHED_NAME`,`CALENDAR_NAME`),
  KEY `IDX_QRTZ_T_G` (`SCHED_NAME`,`TRIGGER_GROUP`),
  KEY `IDX_QRTZ_T_STATE` (`SCHED_NAME`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_N_STATE` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_N_G_STATE` (`SCHED_NAME`,`TRIGGER_GROUP`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_NEXT_FIRE_TIME` (`SCHED_NAME`,`NEXT_FIRE_TIME`),
  KEY `IDX_QRTZ_T_NFT_ST` (`SCHED_NAME`,`TRIGGER_STATE`,`NEXT_FIRE_TIME`),
  KEY `IDX_QRTZ_T_NFT_MISFIRE` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`),
  KEY `IDX_QRTZ_T_NFT_ST_MISFIRE` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_NFT_ST_MISFIRE_GRP` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`,`TRIGGER_GROUP`,`TRIGGER_STATE`),
  CONSTRAINT `QRTZ_TRIGGERS_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`) REFERENCES `qrtz_job_details` (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtz_triggers` */

/*Table structure for table `role` */

CREATE TABLE `role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名',
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '描述',
  `is_manger` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '0表示不给分配菜单权限，1表示分配菜单权限',
  `inserttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '插入时间',
  `insertby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `updateby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `isactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `idx_inserttime` (`inserttime`),
  KEY `idx_updatetime` (`updatetime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

/*Data for the table `role` */

insert  into `role`(`id`,`name`,`desc`,`is_manger`,`inserttime`,`insertby`,`updatetime`,`updateby`,`isactive`) values
(1,'超级管理员','超级管理员','0','2019-04-03 10:38:10',NULL,'2019-04-03 10:38:10',NULL,1);

/*Table structure for table `role_menu_link` */

CREATE TABLE `role_menu_link` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `role_id` int NOT NULL COMMENT '角色ID',
  `menu_id` int NOT NULL COMMENT '菜单ID',
  `inserttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '插入时间',
  `insertby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `updateby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `isactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `idx_inserttime` (`inserttime`),
  KEY `idx_updatetime` (`updatetime`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色菜单对应关系表';

/*Data for the table `role_menu_link` */

insert  into `role_menu_link`(`id`,`role_id`,`menu_id`,`inserttime`,`insertby`,`updatetime`,`updateby`,`isactive`) values
(1,1,1,'2019-04-03 10:38:28',NULL,'2020-09-12 17:45:39',NULL,0),
(2,1,2,'2019-04-03 10:38:31',NULL,'2020-09-12 17:45:39',NULL,0),
(3,1,3,'2019-04-03 10:38:34',NULL,'2020-09-12 17:45:39',NULL,0),
(4,1,4,'2020-03-02 14:04:08',NULL,'2020-09-12 17:45:39',NULL,0),
(5,1,5,'2020-03-02 14:04:13',NULL,'2020-09-12 17:45:39',NULL,0),
(6,1,6,'2020-03-02 16:24:15',NULL,'2020-09-12 17:45:39',NULL,0),
(7,1,1,'2020-09-12 17:45:39',NULL,'2020-09-14 21:51:39',NULL,0),
(8,1,2,'2020-09-12 17:45:39',NULL,'2020-09-14 21:51:39',NULL,0),
(9,1,3,'2020-09-12 17:45:39',NULL,'2020-09-14 21:51:39',NULL,0),
(10,1,4,'2020-09-12 17:45:39',NULL,'2020-09-14 21:51:39',NULL,0),
(11,1,5,'2020-09-12 17:45:39',NULL,'2020-09-14 21:51:39',NULL,0),
(12,1,6,'2020-09-12 17:45:39',NULL,'2020-09-14 21:51:39',NULL,0),
(13,1,13,'2020-09-12 17:45:39',NULL,'2020-09-14 21:51:39',NULL,0),
(14,1,1,'2020-09-14 21:51:39',NULL,'2020-09-14 21:55:25',NULL,0),
(15,1,2,'2020-09-14 21:51:39',NULL,'2020-09-14 21:55:25',NULL,0),
(16,1,3,'2020-09-14 21:51:39',NULL,'2020-09-14 21:55:25',NULL,0),
(17,1,4,'2020-09-14 21:51:39',NULL,'2020-09-14 21:55:25',NULL,0),
(18,1,5,'2020-09-14 21:51:39',NULL,'2020-09-14 21:55:25',NULL,0),
(19,1,6,'2020-09-14 21:51:39',NULL,'2020-09-14 21:55:25',NULL,0),
(20,1,13,'2020-09-14 21:51:39',NULL,'2020-09-14 21:55:25',NULL,0),
(21,1,16,'2020-09-14 21:51:39',NULL,'2020-09-14 21:55:25',NULL,0),
(22,1,1,'2020-09-14 21:55:25',NULL,'2020-09-14 22:15:09',NULL,0),
(23,1,2,'2020-09-14 21:55:25',NULL,'2020-09-14 22:15:09',NULL,0),
(24,1,3,'2020-09-14 21:55:25',NULL,'2020-09-14 22:15:09',NULL,0),
(25,1,4,'2020-09-14 21:55:25',NULL,'2020-09-14 22:15:09',NULL,0),
(26,1,5,'2020-09-14 21:55:25',NULL,'2020-09-14 22:15:09',NULL,0),
(27,1,6,'2020-09-14 21:55:25',NULL,'2020-09-14 22:15:09',NULL,0),
(28,1,13,'2020-09-14 21:55:25',NULL,'2020-09-14 22:15:09',NULL,0),
(29,1,16,'2020-09-14 21:55:25',NULL,'2020-09-14 22:15:09',NULL,0),
(30,1,34,'2020-09-14 21:55:25',NULL,'2020-09-14 22:15:09',NULL,0),
(31,1,1,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(32,1,2,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(33,1,3,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(34,1,4,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(35,1,5,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(36,1,6,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(37,1,13,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(38,1,16,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(39,1,34,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(40,1,35,'2020-09-14 22:15:09',NULL,'2020-09-14 23:21:51',NULL,0),
(41,1,1,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(42,1,2,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(43,1,3,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(44,1,4,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(45,1,5,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(46,1,6,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(47,1,13,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(48,1,16,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(49,1,34,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(50,1,35,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(51,1,36,'2020-09-14 23:21:51',NULL,'2020-09-14 23:35:50',NULL,0),
(52,1,1,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(53,1,2,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(54,1,3,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(55,1,4,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(56,1,5,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(57,1,6,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(58,1,13,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(59,1,16,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(60,1,34,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(61,1,36,'2020-09-14 23:35:50',NULL,'2020-09-14 23:36:28',NULL,0),
(62,1,1,'2020-09-14 23:36:28',NULL,'2020-09-14 23:36:50',NULL,0),
(63,1,2,'2020-09-14 23:36:28',NULL,'2020-09-14 23:36:50',NULL,0),
(64,1,3,'2020-09-14 23:36:28',NULL,'2020-09-14 23:36:50',NULL,0),
(65,1,4,'2020-09-14 23:36:28',NULL,'2020-09-14 23:36:50',NULL,0),
(66,1,5,'2020-09-14 23:36:28',NULL,'2020-09-14 23:36:50',NULL,0),
(67,1,6,'2020-09-14 23:36:28',NULL,'2020-09-14 23:36:50',NULL,0),
(68,1,13,'2020-09-14 23:36:28',NULL,'2020-09-14 23:36:50',NULL,0),
(69,1,16,'2020-09-14 23:36:28',NULL,'2020-09-14 23:36:50',NULL,0),
(70,1,34,'2020-09-14 23:36:28',NULL,'2020-09-14 23:36:50',NULL,0),
(71,1,1,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(72,1,2,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(73,1,3,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(74,1,4,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(75,1,5,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(76,1,6,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(77,1,13,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(78,1,16,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(79,1,34,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(80,1,35,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(81,1,36,'2020-09-14 23:36:50',NULL,'2020-09-15 21:19:33',NULL,0),
(82,1,1,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(83,1,2,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(84,1,3,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(85,1,4,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(86,1,5,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(87,1,6,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(88,1,13,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(89,1,16,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(90,1,34,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(91,1,36,'2020-09-15 21:19:33',NULL,'2020-09-15 21:22:49',NULL,0),
(92,1,1,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(93,1,2,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(94,1,3,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(95,1,4,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(96,1,5,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(97,1,6,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(98,1,13,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(99,1,16,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(100,1,34,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(101,1,36,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1),
(102,1,35,'2020-09-15 21:22:49',NULL,'2020-09-15 21:22:49',NULL,1);

/*Table structure for table `role_user_link` */

CREATE TABLE `role_user_link` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `role_id` int NOT NULL COMMENT '角色ID',
  `user_id` int NOT NULL COMMENT '用户ID',
  `inserttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '插入时间',
  `insertby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `updateby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `isactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `idx_inserttime` (`inserttime`),
  KEY `idx_updatetime` (`updatetime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色用户对应关系表';

/*Data for the table `role_user_link` */

insert  into `role_user_link`(`id`,`role_id`,`user_id`,`inserttime`,`insertby`,`updatetime`,`updateby`,`isactive`) values
(1,1,1,'2019-04-03 10:38:17',NULL,'2019-04-03 10:38:17',NULL,1);

/*Table structure for table `school` */

CREATE TABLE `school` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `inserttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `insertby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updateby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `school` */

insert  into `school`(`id`,`school_name`,`isactive`,`inserttime`,`updatetime`,`insertby`,`updateby`) values
(1,'11111',0,'2020-02-06 21:36:57','2020-02-17 14:06:07',NULL,NULL),
(3,'2222',0,'2020-02-06 22:43:32','2020-02-17 14:06:05',NULL,NULL),
(4,'自强',1,'2020-02-16 20:19:50','2020-02-16 20:19:50',NULL,NULL),
(5,'自强',0,'2020-02-16 20:19:50','2020-02-16 20:23:03',NULL,NULL),
(6,'自强',1,'2020-02-17 14:01:21','2020-02-17 14:01:21',NULL,NULL),
(7,'自强',1,'2020-02-17 14:07:48','2020-02-17 14:07:48',NULL,NULL),
(8,'自强',1,'2020-02-17 14:08:07','2020-02-17 14:08:07',NULL,NULL);

/*Table structure for table `score` */

CREATE TABLE `score` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_id` int DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` int NOT NULL DEFAULT '0' COMMENT '0:男 1:女',
  `age` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `zfp` float DEFAULT NULL,
  `zfp_score` int DEFAULT NULL,
  `ldty` float DEFAULT NULL,
  `ldty_score` int DEFAULT NULL,
  `wqty` float DEFAULT NULL,
  `wqty_score` int DEFAULT NULL,
  `lxt` float DEFAULT NULL,
  `lxt_score` int DEFAULT NULL,
  `tqq` float DEFAULT NULL,
  `tqq_score` int DEFAULT NULL,
  `phm` float DEFAULT NULL,
  `phm_score` int DEFAULT NULL,
  `total_score` int DEFAULT NULL,
  `avg_score` float DEFAULT NULL,
  `level` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `inserttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `insertby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updateby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `score` */

insert  into `score`(`id`,`school_id`,`name`,`sex`,`age`,`height`,`weight`,`zfp`,`zfp_score`,`ldty`,`ldty_score`,`wqty`,`wqty_score`,`lxt`,`lxt_score`,`tqq`,`tqq_score`,`phm`,`phm_score`,`total_score`,`avg_score`,`level`,`isactive`,`inserttime`,`updatetime`,`insertby`,`updateby`) values
(1,1,'11111',0,6,145,30,12.4,1,13,1,14,5,15,1,16,5,12,1,14,2.33,'中下',1,'2020-02-15 08:49:26','2020-02-15 21:53:22',NULL,NULL),
(2,1,'12',0,3,120,30,12,2,12,1,12,5,12,3,12,4,12,3,18,3,'中',0,'2020-02-15 20:23:21','2020-02-15 20:41:24',NULL,NULL),
(3,NULL,'12',0,4,120,39,13,1,13,1,13,5,13,2,13,4,13,2,15,2.5,'中',1,'2020-02-15 23:22:15','2020-02-15 23:22:15',NULL,NULL),
(4,NULL,'六六',0,4,100,15,7,4,100,5,6,4,5,5,12,4,8,3,25,4.17,'良好',0,'2020-02-16 20:25:29','2020-02-17 14:00:32',NULL,NULL),
(5,NULL,'九九',0,3,90,15,8,4,60,4,6,5,6,5,15,5,7,4,27,4.5,'优秀',1,'2020-02-17 14:03:21','2020-02-17 14:03:21',NULL,NULL),
(6,NULL,'小五',0,5,100,20,5,5,105,5,6,3,5,5,9,3,5,4,25,4.17,'良好',1,'2020-02-17 14:04:27','2020-02-17 14:04:27',NULL,NULL),
(7,NULL,'兄奥利',0,6,100,18,5,5,120,4,7,3,6,3,15,5,5,3,23,3.83,'良好',1,'2020-02-17 14:08:37','2020-02-17 14:08:37',NULL,NULL);

/*Table structure for table `user` */

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码',
  `user_type` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '用户类型，0表示域账号类型，1表示普通用户类型',
  `real_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '真实姓名',
  `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '状态',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电话号码',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `inserttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '插入时间',
  `insertby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `updateby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `isactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `idx_inserttime` (`inserttime`),
  KEY `idx_updatetime` (`updatetime`),
  KEY `user_name_index` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

/*Data for the table `user` */

insert  into `user`(`id`,`user_name`,`password`,`user_type`,`real_name`,`status`,`phone`,`email`,`inserttime`,`insertby`,`updatetime`,`updateby`,`isactive`) values
(1,'admin','admin','0',NULL,'1','1','1','2020-02-09 22:14:27',NULL,'2020-02-09 22:20:41',NULL,1),
(2,'1','3','0','2','1','4','5','2020-03-02 14:05:15',NULL,'2020-03-02 15:08:22',NULL,1),
(3,'2','2','0','2','1','2','2','2020-03-02 15:08:13',NULL,'2020-03-02 15:08:13',NULL,1),
(4,'3','3','0','3','1','3','3','2020-03-02 15:08:32',NULL,'2020-03-02 15:08:32',NULL,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
