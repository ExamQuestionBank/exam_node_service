
use TESTDB;

create table tb_token (
  id int(10) not null auto_increment,
  uid int(10) not null comment '用户id',
  access_token varchar(256) default null comment 'access_token',
  refresh_token varchar(256) default null comment 'refresh_token',
  created_at datetime DEFAULT null COMMENT 'created time',
  updated_at datetime DEFAULT null COMMENT 'updated time',
  version varchar(100) default null comment 'version',
  primary key (id)
)engine=InnoDB AUTO_INCREMENT=1 comment 'tb_token';
