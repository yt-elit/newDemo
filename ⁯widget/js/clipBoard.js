/* 复制剪切板方法组件  封装clipBoard模块  2016.06.03 周枫 */

var clipBoardSdk = {
        //设置剪切板内容
        set : function(clip_txt, callback) {
                var clipBoard = api.require('clipBoard');
                clipBoard.set({
                        value : clip_txt
                }, function(ret, err) {
                        if (err) {
                                callback(false, '复制失败');
                        } else {
                                callback(true, '复制成功');
                        }
                });
        },
        //获取剪切板中的数据
        get : function(callback) {
                var clipBoard = api.require('clipBoard');
                clipBoard.get(function(ret, err) {
                        if (err) {
                                callback(false, '复制失败');
                        } else {
                                //{ value:从剪切板获取的字符串    type:数据类型，取值范围见数据类型  }
                                /**
                                 *
                                 email //邮箱地址
                                 phone //手机号码
                                 url //网址
                                 licence_plate_number //车牌号
                                 ip_address //IP地址
                                 string //普通字符串

                                 */
                                callback(true, ret);
                        }
                });
        }
};
/**
 * 打开会话操作菜单
 * 周枫
 * 2016.06.03 
 */
function openHhMenu(msg_txt, msg_type, msg_id){
        var bsqy_list;
        switch(msg_type){
                case 'TxtMsg':
                        bsqy_list = ['复制', '删除'];
                break;
        }
        api.actionSheet({
                cancelTitle : '取消',
                buttons : bsqy_list
        }, function(ret, err) {
                if (ret) {
                        var b_index = ret.buttonIndex;
                        switch(b_index) {
                                case 1:
                                        //复制
                                        clipBoardSdk.set(msg_txt, function(is_true, data){
                                                
                                        });
                                        break;
                                case 2:
                                        api.confirm({
                                                title : "提示",
                                                msg : "是否删除该条消息？",
                                                buttons : ['取消', '确定']
                                        }, function(ret, err) {
                                                if (2 == ret.buttonIndex) {
                                                        //根据融云会话id删除聊天记录
                                                        delteMessageByMessageId(msg_id, function(is_true){
                                                                if(is_true) {
                                                                        //页面加载时获取历史信息
                                                                        $api.remove($api.byId('hh_'+ msg_id));
                                                                } else {
                                                                        
                                                                }
                                                        });
                                                } else {
                                                        return;
                                                } 
                                        });
                                        
                                        break;
                                
                                default:
                                        
                                break;
                        }
                } 
        });
}