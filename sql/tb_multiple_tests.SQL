
use TESTDB;

create table tb_multiple_tests (
  id int(10) not null auto_increment,
  subject varchar (40) default null comment '科目',
  test_year varchar(40) default null comment '年份',
  test_from varchar(100) default null comment '来源',
  test_no varchar(100) default null comment '试题编号',
  question text default null comment '题目问题',
  answer_a text default null comment '答案a',
  answer_b text default null comment '答案b',
  answer_c text default null comment '答案c',
  answer_d text default null comment '答案d',
  answer varchar(40) default null comment '答案',
  answer_analysis text default null comment '答案解析',
  section text default null comment '试题板块',
  checked int(1) default 0 comment '是否校验',
  created_at datetime default null comment 'created time',
  updated_at datetime default null comment 'updated time',
  version varchar(100) default null comment 'version',
  primary key (id)
)engine=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 comment 'tb_multiple_tests';