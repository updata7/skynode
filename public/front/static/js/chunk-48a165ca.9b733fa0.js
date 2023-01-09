(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48a165ca"],{"09f4":function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),Math.easeInOutQuad=function(e,t,a,r){return e/=r/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function n(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(e,t,a){var s=o(),l=e-s,i=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=i;var o=Math.easeInOutQuad(c,s,l,t);n(o),c<t?r(e):a&&"function"===typeof a&&a()};u()}},"0f69":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"search"},[a("el-form",{ref:"queryFormRef",attrs:{model:e.queryParams,inline:!0}},[a("el-form-item",{attrs:{label:"关键字",prop:"keywords"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"用户名/昵称/手机号",clearable:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.keywords,callback:function(t){e.$set(e.queryParams,"keywords",t)},expression:"queryParams.keywords"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"全部",clearable:""},model:{value:e.queryParams.status,callback:function(t){e.$set(e.queryParams,"status",t)},expression:"queryParams.status"}},[a("el-option",{attrs:{label:"启用",value:"1"}}),a("el-option",{attrs:{label:"禁用",value:"0"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQuery}},[e._v("搜索")]),a("el-button",{attrs:{icon:"el-icon-refresh"},on:{click:e.resetQuery}},[e._v("重置")])],1)],1)],1),a("el-card",{scopedSlots:e._u([{key:"header",fn:function(){return[a("el-form",{staticClass:"operUser"},[a("el-form-item",{staticStyle:{float:"left"}},[a("el-button",{attrs:{type:"success",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("新增")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",disabled:0===e.ids.length},on:{click:function(t){e.handleDelete({ids:e.ids.map((function(e){return e.id}))})}}},[e._v("删除")])],1)],1)]},proxy:!0}])},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.userList},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"50",align:"center"}}),a("el-table-column",{key:"account",attrs:{label:"用户名",align:"center",prop:"account"}}),a("el-table-column",{attrs:{label:"用户昵称",width:"120",align:"center",prop:"nickname"}}),a("el-table-column",{attrs:{label:"手机号码",align:"center",prop:"mobile",width:"120"}}),a("el-table-column",{attrs:{label:"状态",align:"center",prop:"status"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"inactive-value":1,"active-value":0},on:{change:function(a){return e.handleStatusChange(t.row)}},model:{value:t.row.status,callback:function(a){e.$set(t.row,"status",a)},expression:"scope.row.status"}})]}}])}),a("el-table-column",{attrs:{label:"创建时间",align:"center",prop:"createTime",width:"180"}}),a("el-table-column",{attrs:{label:"更新时间",align:"center",prop:"updateTime",width:"180"}}),a("el-table-column",{attrs:{label:"操作",align:"left",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"success",link:"",size:"small"},on:{click:function(a){return e.resetPassword(t.row)}}},[e._v("重置密码")]),a("el-button",{attrs:{type:"primary",link:"",size:"small"},on:{click:function(a){return e.handleUpdate(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",size:"small",link:""},on:{click:function(a){return e.handleDelete({ids:[t.row.id]})}}},[e._v("删除")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.queryParams.pageNo,limit:e.queryParams.pageSize},on:{"update:page":function(t){return e.$set(e.queryParams,"pageNo",t)},"update:limit":function(t){return e.$set(e.queryParams,"pageSize",t)},pagination:e.getList}})],1),a("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialog.visible,width:"600px","append-to-body":""},on:{"update:visible":function(t){return e.$set(e.dialog,"visible",t)},close:e.closeDialog},scopedSlots:e._u([{key:"footer",fn:function(){return[a("div",{staticClass:"dialog-footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")]),a("el-button",{on:{click:e.closeDialog}},[e._v("取 消")])],1)]},proxy:!0}])},[a("el-form",{ref:"ruleForm",attrs:{model:e.formData,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"角色",prop:"role"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.role,callback:function(t){e.$set(e.formData,"role",t)},expression:"formData.role"}},e._l(e.roleList,(function(e){return a("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1)],1),a("el-form-item",{attrs:{label:"用户名",prop:"account"}},[a("el-input",{attrs:{readonly:!!e.formData.id,placeholder:"请输入用户名"},model:{value:e.formData.account,callback:function(t){e.$set(e.formData,"account",t)},expression:"formData.account"}})],1),a("el-form-item",{attrs:{label:"用户昵称",prop:"nickname"}},[a("el-input",{attrs:{placeholder:"请输入用户昵称"},model:{value:e.formData.nickname,callback:function(t){e.$set(e.formData,"nickname",t)},expression:"formData.nickname"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}})],1),a("el-form-item",{attrs:{label:"手机号码",prop:"mobile"}},[a("el-input",{attrs:{placeholder:"请输入手机号码",maxlength:"11"},model:{value:e.formData.mobile,callback:function(t){e.$set(e.formData,"mobile",t)},expression:"formData.mobile"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入邮箱",maxlength:"50"},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email",t)},expression:"formData.email"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-radio-group",{model:{value:e.formData.status,callback:function(t){e.$set(e.formData,"status",t)},expression:"formData.status"}},[a("el-radio",{attrs:{label:0}},[e._v("正常")]),a("el-radio",{attrs:{label:1}},[e._v("禁用")])],1)],1),a("el-form-item",{attrs:{label:"备注",prop:"introduction"}},[a("el-input",{attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:""},model:{value:e.formData.introduction,callback:function(t){e.$set(e.formData,"introduction",t)},expression:"formData.introduction"}})],1)],1)],1)],1)},n=[],o=a("c7eb"),s=a("1da1"),l=a("ade3"),i=a("5c96"),c=a("c24f"),u=a("cc5e"),d=a("333d"),m=a("ed08"),p={components:{Pagination:d["a"]},data:function(){var e,t=this,a=function(e,a,r){console.debug("dddd ==> ",a,t.formData.id),a||t.formData.id?r():r(new Error("密码不能为空"))};return e={roleList:[],queryParams:{pageNo:1,pageSize:m["a"]},userList:[],rules:{account:[{required:!0,message:"用户名不能为空",trigger:"blur"}],nickname:[{required:!0,message:"用户昵称不能为空",trigger:"blur"}],password:[{validator:a,message:"密码不能为空",trigger:"blur"}],role:[{required:!0,message:"用户角色不能为空",trigger:"blur"}],email:[{pattern:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,message:"请输入正确的邮箱地址",trigger:"blur"}],mobile:[{pattern:/^1[3|4|5|6|7|8|9][0-9]\d{8}$/,message:"请输入正确的手机号码",trigger:"blur"}]},ids:[]},Object(l["a"])(e,"userList",[]),Object(l["a"])(e,"loading",!1),Object(l["a"])(e,"total",0),Object(l["a"])(e,"dialog",{}),Object(l["a"])(e,"formData",{status:0}),e},computed:{},created:function(){this.getList()},methods:{getRoleList:function(){var e=this;return Object(s["a"])(Object(o["a"])().mark((function t(){var a,r;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["c"])({isLoadAll:!0});case 2:a=t.sent,r=a.data.data,console.debug("getRoleList ==> ",r),e.roleList=r;case 6:case"end":return t.stop()}}),t)})))()},getList:function(){var e=this;return Object(s["a"])(Object(o["a"])().mark((function t(){var a,r,n,s;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["g"])(e.queryParams);case 2:a=t.sent,r=a.data,n=r.data,s=r.total,console.debug("getList ==> ",n),e.userList=n,e.total=s;case 7:case"end":return t.stop()}}),t)})))()},closeDialog:function(){this.dialog.visible=!1},submitForm:function(){var e=this;return Object(s["a"])(Object(o["a"])().mark((function t(){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs["ruleForm"].validate(function(){var t=Object(s["a"])(Object(o["a"])().mark((function t(a){var r,n;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=3;break}return console.debug("confirmRole ==> bad params"),t.abrupt("return");case 3:if(!e.formData.id){t.next=13;break}return delete e.formData.createTime,delete e.formData.updateTime,delete e.formData.fatherAccount,t.next=9,Object(c["h"])(e.formData);case 9:r=t.sent,n="修改成功",t.next=17;break;case 13:return t.next=15,Object(c["e"])(e.formData);case 15:r=t.sent,n="添加成功";case 17:e.dialog.visible=!1,r.data.success?e.$message({type:"success",message:n}):e.$message({type:"fail",message:r.message}),e.getList();case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},handleQuery:function(){this.getList()},resetQuery:function(){this.queryParams={}},handleAdd:function(){this.getRoleList(),console.debug("handleAdd ==>"),this.formData={status:0},this.dialog={title:"添加用户",visible:!0}},handleDelete:function(e){var t=this;this.$confirm("确定要删除该用户？","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(Object(o["a"])().mark((function a(){var r,n,s,l;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(c["f"])(e);case 2:r=a.sent,n=r.data,s=n.success,l=n.message,t.getList(),s?t.$message({type:"success",message:"Delete succed!"}):t.$message({type:"fail",message:l});case 7:case"end":return a.stop()}}),a)})))).catch((function(e){console.error(e)}))},handleSelectionChange:function(e){this.ids=e},handleStatusChange:function(){},handleUpdate:function(e){this.getRoleList(),this.formData=e,this.dialog={title:"编辑用户",visible:!0}},resetPassword:function(e){var t=this;i["MessageBox"].prompt("请输入用户「"+e.account+"」的新密码","重置密码",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(a){var r=a.value;if(!r)return ElMessage.warning("请输入新密码"),!1;Object(c["h"])({id:e.id,password:r}).then((function(){t.$message({type:"success",message:"修改成功!"})}))})).catch((function(){}))}}},f=p,b=(a("99de"),a("2877")),g=Object(b["a"])(f,r,n,!1,null,"2b108dca",null);t["default"]=g.exports},"99de":function(e,t,a){"use strict";a("fe69")},cc5e:function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return o})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return l}));var r=a("b775");function n(e){return Object(r["a"])({url:"/role/search",method:"get",params:e})}function o(e){return Object(r["a"])({url:"/role/create",method:"post",data:e})}function s(e){return Object(r["a"])({url:"/role/update",method:"post",data:e})}function l(e){return Object(r["a"])({url:"/role/delete",method:"put",data:e})}},fe69:function(e,t,a){}}]);