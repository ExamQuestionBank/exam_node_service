
use TESTDB;

create table tb_user_singletest_bank (
  id int(10) not null auto_increment,
  user_id int(10) not null comment '用户id',
  test_id int(10) not null comment '题目id',
  answer varchar(40) default null comment '用户的答案',
  created_at datetime default null comment 'created time',
  updated_at datetime default null comment 'updated time',
  version varchar(100) default null comment 'version',
  primary key (id)
)engine=InnoDB AUTO_INCREMENT=1 comment 'tb_user_singletest_bank';
