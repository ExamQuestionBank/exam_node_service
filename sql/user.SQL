
use TESTDB;

create table tb_user (
  id int(10) not null auto_increment,
  username varchar(100) default null comment '用户名',
  password varchar(100) default null comment '密码',
  type varchar(50) DEFAULT null COMMENT '登录的类型',
  wx_openid varchar(100) DEFAULT null COMMENT '微信用户ID',
  openid char(30) DEFAULT null COMMENT '用户openID',
  created_at datetime DEFAULT null COMMENT 'created time',
  updated_at datetime DEFAULT null COMMENT 'updated time',
  version varchar(100) default null comment 'version',
  primary key (id)
)engine=InnoDB AUTO_INCREMENT=1 comment '用户表';

insert into tb_user(username,password)
value('admin','123456');

-- 增加字段
ALTER TABLE tb_user ADD openid char(30);