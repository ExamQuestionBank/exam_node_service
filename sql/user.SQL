
use TESTDB;

create table tb_admin (
  id int(10) not null auto_increment,
  username varchar(40) default null comment '用户名',
  password varchar(32) default null comment '密码',
  primary key (id)
)engine=InnoDB AUTO_INCREMENT=1 comment '管理员表';

insert into tb_admin(username,password)
value('admin','123456');