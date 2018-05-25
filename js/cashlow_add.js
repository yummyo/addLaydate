	var title="资金流水";
	$(document).ready(function() {
        setDateInput();
        addRowFluid_this($(".addRow"), "body_dist", "dist_num", "body_dist_box");
    });
    function addRowFluid_this(addButton, wrapid, rowNumId, rowFluid, autoNum) {
        var _add = function () {
            var rowNumobj = $("#" + rowNumId);
            rowNumobj.val(parseInt(rowNumobj.val()) + 1);
            if($("#" + wrapid).find("." + rowFluid + ":hidden").length>0){
                var _body = $("#" + wrapid).find("#" + rowFluid + ":hidden").clone();
            }else{
                var _body = $("#" + wrapid).find("#" + rowFluid).clone();
            }
            _body.find(".dateTime").removeAttr("lay-key");
            var rowContent = _body.html();
            var rowid = wrapid + "_" + rowNumobj.val();
            var delContent = "<button type='button' class='btn btn-danger span12 d_delRow' onclick='delRowFluid_this(this,\"" + rowid + "\",\"row-fluid\");' >删除</button>";

            rowContent = rowContent.replace('<delarea>', delContent);
            $("#" + wrapid).append("<div class='" + rowFluid + " " + wrapid + "' id='" + rowid + "' fsendsta='0'>" + rowContent + "</div>");
			$("#"+rowid).find(".body_dist_title").text("流水"+rowNumobj.val()+"：");
			//绑定时间插件并对input赋值
            setDateInput("#"+rowid);
        }
        if (autoNum > 0) {
            for (var i = 0; i < autoNum; i++) {
                _add();
            }
        }
		if (addButton.length) {
			addButton.on("click", function () {
				_add();
			});
		}
    }
    function setDateInput(DOM){
        DOM = DOM || ".body_dist_box";
        var _laydate = {
            elem:$(DOM+" .dateTime")[0],
            max: '2099-06-16',
            trigger: 'click',
            //istime:true,
            istoday: true,
            type: "datetime",
            choose: function (datas) {
            },
            theme: 'grid'
        };
		_laydate.format = 'yyyy-MM-dd HH:mm:ss';
		_laydate.istime = true;
        laydate.render(_laydate)
	}
    function delRowFluid_this(dom,rowid, rowNumId) {
		if($(dom).parents(".body_dist_box").attr("fsendsta") == 0){
            $("#" + rowid).remove();
            $("#" + rowNumId).val(parseInt($("#" + rowNumId).val()) - 1);
		}else{
			d_alert("错误","已上传数据不允许删除！","error");
		}
    }
