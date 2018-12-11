//初始化db
var sqlite_db;
var BASE_FS_SQDB_NAME = 'dsideal_db.db';
var BASE_FS_SQDB_PATH = 'widget://res/db/';

function dbOpenDb(callback) {
        isExisDb(function(is_true) {
                if (is_true) {
                        sqlite_db = api.require('db');
                        sqlite_db.openDatabase({
                                name : BASE_FS_SQDB_NAME,
                                path : BASE_FS_SQDB_PATH + BASE_FS_SQDB_NAME
                        }, function(ret, err) {

                                if (ret.status) {
                                	
//                                        checkSqliteDbBanben(function(is_true) {
//                                                if (is_true) {
                                                        callback(true);
//                                                }
//                                        });
                                } else {
                                        api.toast({
                                                msg : '对不起，获取会话信息失败，为您恢复数据，请稍后'
                                        });
                                        openDb(function(is_true) {
                                                if (is_true) {
                                                        callback(true);
                                                } else {
                                                        callback(false);
                                                }
                                        });
                                }
                        });
                }
        });

}

/**
* 创建数据库
* 周枫
* 2015.12.24
*/
function dbCreate(callback) {
        owner_id = $api.getStorage('login_name');
        sqlite_db = api.require('db');
        //打开数据库，若数据库不存在则创建数据库
        dbOpenDb(function(is_true) {
                if (is_true) {
                        //创建会话表 t_hh_messages drop table IF EXISTS t_hh_messages;
                        var sql_message = 'create table if not exists t_hh_messages (id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,text  varchar(1000),voicePath  varchar(1000),duration  INTEGER,imagePath  varchar(1000),thumbPath  varchar(1000),nativePath  varchar(1000),extra  varchar(1000),conversationType  varchar(16) NOT NULL,messageDirection  varchar(16) NOT NULL,targetId  varchar(48) NOT NULL,objectName  varchar(16) NOT NULL,sentStatus  varchar(16) NOT NULL,senderUserId  varchar(48) NOT NULL,messageId  INTEGER NOT NULL,sentTime  varchar(48) NOT NULL,receivedTime  varchar(48) NOT NULL,sent_time  varchar(48) NOT NULL,received_time  varchar(48) NOT NULL,msg_left  INTEGER, owner_id varchar(48), is_read INTEGER DEFAULT 0);';
                        //群组表
                        var sql_group = 'create table if not exists t_base_group (id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, group_id varchar(48), group_name varchar(300), avatar_url varchar(500), avatar_url_native varchar(500), avatar_file varchar(50), group_type INTEGER, group_md5 varchar(100), group_list_md5 varchar(100), owner_id varchar(48));';
                        //人员表
                        var sql_person = 'create table if not exists t_base_person (id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, person_name varchar(300), login_name varchar(48), person_id INTEGER, avatar_url varchar(500), avatar_url_native varchar(500), avatar_file varchar(50),  is_friend INTEGER, jp_first varchar(4), owner_id varchar(48));';
                        //群组人员对应表
                        var sql_group_member = 'create table if not exists t_base_group_member (id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, group_id varchar(48),person_id INTEGER,login_name varchar(48),identity_id INTEGER, bureau_id INTEGER, owner_id varchar(48));';
                        //创建数据库
                        dbExecuteSql(sql_message, function(is_flag) {
                                if (is_flag) {
                                        //群组表
                                        dbExecuteSql(sql_group, function(is_flag) {
                                                if (is_flag) {
                                                        //人员表
                                                        dbExecuteSql(sql_person, function(is_flag) {
                                                                if (is_flag) {
                                                                        //群组人员对应表
                                                                        dbExecuteSql(sql_group_member, function(is_flag) {
                                                                                if (is_flag) {
                                                                                        callback(true);
                                                                                } else {
                                                                                        callback(false);
                                                                                }
                                                                        });
                                                                } else {
                                                                        callback(false);
                                                                }
                                                        });
                                                } else {
                                                        callback(false);
                                                }
                                        });
                                } else {
                                        callback(false);
                                }
                        });
                } else {
                        callback(false);
                }
        });
}

//function exeSqlCreateTableBefore(exe_sum, callback) {
//
//
//
//
//        if (exe_sum < 0) {
//                callback(true);
//        } else {
//                for(var i=exe_sum; i>0; i--) {
//                        exeSqlCreateTable(exe_sum, sql_db);
//                }
//
//
//        }
//}
//
//function exeSqlCreateTable(exe_sum, sql_db){
//        var sql_0 = 'create table if not exists t_hh_messages (id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,text  varchar(1000),voicePath  varchar(1000),duration  INTEGER,imagePath  varchar(1000),thumbPath  varchar(1000),nativePath  varchar(1000),extra  varchar(1000),conversationType  varchar(16) NOT NULL,messageDirection  varchar(16) NOT NULL,targetId  varchar(48) NOT NULL,objectName  varchar(16) NOT NULL,sentStatus  varchar(16) NOT NULL,senderUserId  varchar(48) NOT NULL,messageId  INTEGER NOT NULL,sentTime  varchar(48) NOT NULL,receivedTime  varchar(48) NOT NULL,sent_time  varchar(48) NOT NULL,received_time  varchar(48) NOT NULL,msg_left  INTEGER);';
//        //群组表
//        var sql_1 = 'create table if not exists t_base_group (id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, group_id varchar(48), group_name varchar(300), avatar_url varchar(500), avatar_url_native varchar(500), avatar_file varchar(50), group_type INTEGER, group_md5 char(36), group_list_md5 char(36), owner_id varchar(48));';
//        //人员表
//        var sql_2 = 'create table if not exists t_base_person (id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, person_name varchar(300), login_name varchar(48), person_id INTEGER, avatar_url varchar(500), avatar_url_native varchar(500), avatar_file varchar(50),  is_friend INTEGER, jp_first varchar(4), owner_id varchar(48));';
//        //群组人员对应表
//        var sql_3 = 'create table if not exists t_base_group_member (id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, group_id varchar(48),person_id INTEGER,identity_id INTEGER, bureau_id INTEGER, owner_id varchar(48));';
//
//        var sql_db = 'sql_' + (exe_sum+'');
//        var sql_db = eval('(' + sql_db + ')');
//
//        dbExecuteSql(sql_db, function(is_flag) {
//                        if (is_flag) {
//                                exe_sum--;
//                                exeSqlCreateTableBefore(exe_sum);
//                        } else {
//                                callback(false);
//                        }
//                });
//}

/**
* 执行sql
* 周枫
* 2015.12.24
*/
function dbExecuteSql(sqlite_sql, callback) {
        sqlite_db = api.require('db');
        owner_id = $api.getStorage('login_name');
        //        dbOpenDb(function(is_true) {
        //                if (is_true) {
        sqlite_db.executeSql({
                name : BASE_FS_SQDB_NAME,
                sql : sqlite_sql
        }, function(ret, err) {
                if (ret.status) {
                        callback(true);
                } else {
                        api.toast({
                                msg : '对不起，获取会话信息失败，为您恢复数据，请稍后'
                        });
                        openDb(function(is_true) {
                                if (is_true) {
                                        callback(true);
                                } else {
                                        callback(false);
                                }
                        });
                }
        });
        //                } else {
        //                        callback(false);
        //                }
        //        });
}

/**
* 查询sql
* 周枫
* 2015.12.30
* @param {Object} sqlite_sql
* @param {Object} callback
*/
function dbSelectSql(sqlite_sql, callback) {
        sqlite_db = api.require('db');
        owner_id = $api.getStorage('login_name');
        //        dbOpenDb(function(is_true) {
        //                if (is_true) {
        sqlite_db.selectSql({
                name : BASE_FS_SQDB_NAME,
                sql : sqlite_sql
        }, function(ret, err) {
                if (ret.status) {
                        callback(ret.data);
                } else {
                        api.toast({
                                msg : '对不起，获取会话信息失败，为您恢复数据，请稍后'
                        });
                        openDb(function(is_true) {
                                if (is_true) {
                                        callback(true);
                                } else {
                                        callback(false);
                                }
                        });
                }
        });
        //                } else {
        //                        callback(false);
        //                }
        //        });
}

function dbAlterTable(t_name, create_table) {
        sqlite_db = api.require('db');
        owner_id = $api.getStorage('login_name');
        //打开数据库，若数据库不存在则创建数据库
        dbOpenDb(function(is_true) {
                if (is_true) {
                        //创建会话表 t_hh_messages
                        var sql = 'ALTER TABLE ' + t_name + ' RENAME TO ' + t_name + '_temp_old;';
                        //创建数据库
                        dbExecuteSql(sql, function(is_flag) {
                                if (is_flag) {
                                        callback(true);
                                } else {
                                        callback(false);
                                }
                        });
                } else {
                        callback(false);
                }
        });
}

function isExisDb(callback) {
        fs = api.require('fs');
        //判断当前是否存在db
        fs.exist({
                path : BASE_FS_SQDB_PATH + BASE_FS_SQDB_NAME
        }, function(ret, err) {
        	
        	
                if (ret.exist) {
                        callback(true);
                } else {
                        api.showProgress({
                                title : '数据缺失',
                                text : '正在恢复中...',
                                modal : true
                        });
                        //拷贝数据库文件
                        fs.copyTo({
                                oldPath : 'widget://res/db/dsideal_db.db',
                                newPath : BASE_FS_SQDB_PATH
                        }, function(ret, err) {
                                if (ret.status) {
                                        dbOpenDb(function(is_true) {
                                                if (is_true) {
                                                        getTongXunluToDb(function(is_true) {
                                                                api.hideProgress();
                                                                if (is_true) {
                                                                        callback(true);
                                                                }
                                                        });
                                                }
                                        });
                                } else {
                                        api.alert({
                                                msg : err.msg
                                        });
                                }
                        });
                }
        });
}

function openDb(callback) {
        fs = api.require('fs');
        //判断当前是否存在db
        fs.exist({
                path : BASE_FS_SQDB_PATH + BASE_FS_SQDB_NAME
        }, function(ret, err) {
                if (ret.exist) {
//                        fs.remove({
//                                path : BASE_FS_SQDB_PATH + BASE_FS_SQDB_NAME
//                        }, function(ret, err) {
//                                if (ret.status) {
//                                        //拷贝数据库文件
//                                        fs.copyTo({
//                                                oldPath : 'widget://res/db/dsideal_db.db',
//                                                newPath : BASE_FS_SQDB_PATH
//                                        }, function(ret, err) {
//                                                if (ret.status) {
                                                        dbOpenDb(function(is_true) {
                                                                if (is_true) {
                                                                        getTongXunluToDb(function(is_true) {
                                                                                if (is_true) {
                                                                                        callback(true);
                                                                                } else {
                                                                                        callback(false);
                                                                                }
                                                                        });
                                                                }
                                                        });
//                                                } else {
//                                                        api.alert({
//                                                                msg : err.msg
//                                                        });
//                                                }
//                                        });
//                                }
//                        });
                } else {
                        //拷贝数据库文件
                        fs.copyTo({
                                oldPath : 'widget://res/db/dsideal_db.db',
                                newPath : BASE_FS_SQDB_PATH
                        }, function(ret, err) {
                                if (ret.status) {
                                        dbOpenDb(function(is_true) {
                                                if (is_true) {
                                                        getTongXunluToDb(function(is_true) {
                                                                if (is_true) {
                                                                        callback(true);
                                                                } else {
                                                                        callback(false);
                                                                }
                                                        });
                                                }
                                        });
                                } else {
                                        api.alert({
                                                msg : err.msg
                                        });
                                }
                        });
                }
        });
}

/**
* 升级数据库版本
* 周枫
* 2016.5.24
*/
function checkSqliteDbBanben(callback) {
        var sql = 'SELECT config_value FROM t_sys_config;';
        dbSelectSql(sql, function(data_attr) {
                var config_bb = 0;
                (data_attr.length == 0) ? ( config_bb = 1) : ( config_bb = data_attr[0].config_value);
                if (config_bb == 1) {
                        api.hideProgress();
                        var t = "对不起，您当前版本需要升级，请重新登录";
                        api.execScript({
                                name : 'root',
                                frameName : 'hh_index',
                                script : 'openNoticeLogout("' + t + '\");'
                        });
                } else {
                        callback(true);
                }
        });
}