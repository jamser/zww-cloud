/**
 * member channel管理初始化
 */
var Member = {
    id: "ChannelTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Member.initColumn = function () {
    return [
        // {field: 'selectItem', radio: true},
        {field: 'selectItem', checkbox: true},
            {title: '注册渠道', field: 'registerChannel', visible: true, align: 'center', valign: 'middle',
                formatter:function (value,row,index) {
                   if (value == null || value == ''){
                       return '--';
                   }else {
                       return value;
                   }
                }
            },
            {title: '最后一次登录渠道', field: 'loginChannel', visible: true, align: 'center', valign: 'middle',
                formatter:function (value,row,index) {
                    if (value == null || value == ''){
                        return '--';
                    }else {
                        return value;
                    }
                }
            },
            {title: '用户名', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '手机', field: 'mobile', visible: true, align: 'center', valign: 'middle'},
            {title: '性别', field: 'genderName', visible: true, align: 'center', valign: 'middle'},
            {title: '金币', field: 'Acoins', visible: true, align: 'center', valign: 'middle'},
            {title: '抓取次数', field: 'catchNumber', visible: true, align: 'center', valign: 'middle'},
            {title: '注册时间', field: 'registerDate', visible: true, align: 'center', valign: 'middle'},
            {title: '最近登录时间', field: 'lastLoginDate', visible: true, align: 'center', valign: 'middle'},
            {title: '手机机型', field: 'phoneModel', visible: true, align: 'center', valign: 'middle'}

    ];
};



/**
 * 检查是否选中
 */
Member.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Member.seItem = selected[0];//单个
        Member.seItems = selected;//多个
        return true;
    }
};

/**
 * 点击添加member
 */
// Member.openAddMember = function () {
//     var index = layer.open({
//         type: 2,
//         title: '添加member',
//         area: ['800px', '420px'], //宽高
//         fix: false, //不固定
//         maxmin: true,
//         content: Feng.ctxPath + '/member/member_add'
//     });
//     this.layerIndex = index;
// };


/**
 * 扣量member
 */
Member.channelDeduct = function () {
    if (this.check()) {
        var ids = '';
        for (var sitem in this.seItems){
            var val = this.seItems[sitem].id;
            ids += val + ',';
            // alert(ids)
        }
        var ajax = new $ax(Feng.ctxPath + "/member/channelDeduct", function (data) {
            if(data.code ==200){
                Feng.success("操作成功!");
                Member.table.refresh();
            }else{
                Feng.error("操作失败!" + data.message + "!");
            }
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("memberIds",ids);
        ajax.start();
    }
};


/**
 * 打开查看member详情
 */
Member.openMemberDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '用户修改金币',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/member/member_update/' + Member.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 打开查看充值记录详情
 */
Member.openMemberChargeDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '充值记录详情',
            area: ['900px', '520px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/member/chargeDetail/' + Member.seItem.id

        });
        this.layerIndex = index;

    }
};

/**
 * 打开查看抓取记录详情
 */
Member.openMemberCatchDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '抓取记录详情',
            area: ['900px', '520px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/member/catchDetail/' + Member.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除member
 */
// Member.delete = function () {
//     if (this.check()) {
//         var ajax = new $ax(Feng.ctxPath + "/member/delete", function (data) {
//             Feng.success("删除成功!");
//             Member.table.refresh();
//         }, function (data) {
//             Feng.error("删除失败!" + data.responseJSON.message + "!");
//         });
//         ajax.set("memberId",this.seItem.id);
//         ajax.start();
//     }
// };

/**
 * 查询member列表
 */
Member.search = function () {
    var queryData = {};
    queryData['channelNum'] = $("#channelNum").val();
    queryData['userName'] = $("#userName").val();
    queryData['registerDate'] = $("#registerDate").val();
    queryData['endDate'] = $("#endDate").val();
    queryData['phoneModel'] = $("#phoneModel").val();
    Member.load();
    Member.table.refresh({query: queryData});
};

//jquery实现回车键触发事件
$(document).keyup(function(event){
    if(event.keyCode ==13){
        Member.search();
    }
});

/**
 * zongjine
 */
Member.load = function(){
	 $("#totalCoins").val(10000);
};

$(function () {
	Member.load();
    var defaultColunms = Member.initColumn();
    var table = new BSTable(Member.id, "/member/channel", defaultColunms);
    table.setPaginationType("server");
    Member.table = table.init();
    
});


