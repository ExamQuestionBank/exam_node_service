
use TESTDB;

create table tb_single_tests (
  id int(10) not null auto_increment,
  subject varchar(40) default null comment '科目',
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
  created_at datetime DEFAULT null COMMENT 'created time',
  updated_at datetime DEFAULT null COMMENT 'updated time',
  version varchar(100) default null comment 'version',
  primary key (id)
)engine=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 comment 'tb_single_tests';

-- 2020-08-16添加字段
alter table tb_single_tests add answer_analysis text default null ;
