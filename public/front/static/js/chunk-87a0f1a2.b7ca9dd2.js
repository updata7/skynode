(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-87a0f1a2"],{"54a1":function(e,t,a){"use strict";a("6c0d")},6030:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"content-main"},[a("div",{staticClass:"form-table-box"},[a("el-form",{ref:"infoForm",attrs:{rules:e.infoRules,model:e.infoForm,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"模板名字",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入模板名称",autofocus:""},model:{value:e.infoForm.name,callback:function(t){e.$set(e.infoForm,"name",t)},expression:"infoForm.name"}})],1),a("el-form-item",{attrs:{label:"付费类型"}},[a("el-radio-group",{model:{value:e.infoForm.charge_type,callback:function(t){e.$set(e.infoForm,"charge_type",t)},expression:"infoForm.charge_type"}},[a("el-radio",{attrs:{label:0}},[e._v("自定义邮费")]),a("el-radio",{attrs:{label:1}},[e._v("卖家承担运费")])],1)],1),0==e.infoForm.charge_type?a("div",[a("el-form-item",{attrs:{label:"快递收费方式"}},[a("el-radio-group",{model:{value:e.infoForm.freight_type,callback:function(t){e.$set(e.infoForm,"freight_type",t)},expression:"infoForm.freight_type"}},[a("el-radio",{attrs:{label:0}},[e._v("按件计费")]),a("el-radio",{attrs:{label:1}},[e._v("按重量计费")])],1)],1),a("el-form-item",{staticClass:"default-freight",attrs:{label:"默认运费"}},[a("div",{staticClass:"line-wrap"},[a("div",{staticClass:"line"},[a("el-input",{model:{value:e.infoForm.start,callback:function(t){e.$set(e.infoForm,"start",t)},expression:"infoForm.start"}}),a("div",{staticClass:"text"},[e._v(e._s(0==e.infoForm.freight_type?"件内":"KG内"))]),a("el-input",{model:{value:e.infoForm.start_fee,callback:function(t){e.$set(e.infoForm,"start_fee",t)},expression:"infoForm.start_fee"}}),a("div",{staticClass:"text"},[e._v("元")])],1),a("div",{staticClass:"line2"},[a("div",{staticClass:"text2"},[e._v("每增加")]),a("el-input",{model:{value:e.infoForm.add,callback:function(t){e.$set(e.infoForm,"add",t)},expression:"infoForm.add"}}),a("div",{staticClass:"text"},[e._v(e._s(0==e.infoForm.freight_type?"件":"KG"))]),a("div",{staticClass:"text2"},[e._v("增加")]),a("el-input",{model:{value:e.infoForm.add_fee,callback:function(t){e.$set(e.infoForm,"add_fee",t)},expression:"infoForm.add_fee"}}),a("div",{staticClass:"text"},[e._v("元")])],1)])]),a("el-form-item",{staticClass:"special-freight",attrs:{label:"指定区域运费"}},[a("div",{staticClass:"form-table-box"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.areaData,border:"",stripe:""}},[a("el-table-column",{attrs:{prop:"areaNames",label:"运送到"}}),a("el-table-column",{attrs:{prop:"start",label:0==e.infoForm.freight_type?"首件(个)":"首重(KG)",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:"mini",placeholder:"个",autofocus:""},model:{value:t.row.start,callback:function(a){e.$set(t.row,"start",a)},expression:"scope.row.start"}})]}}],null,!1,2319301711)}),a("el-table-column",{attrs:{prop:"start_fee",label:"运费(元)",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:"mini",placeholder:"运费"},model:{value:t.row.start_fee,callback:function(a){e.$set(t.row,"start_fee",a)},expression:"scope.row.start_fee"}})]}}],null,!1,361707168)}),a("el-table-column",{attrs:{prop:"add",label:0==e.infoForm.freight_type?"续件(个)":"续重(KG)",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:"mini",placeholder:"个"},model:{value:t.row.add,callback:function(a){e.$set(t.row,"add",a)},expression:"scope.row.add"}})]}}],null,!1,2713835675)}),a("el-table-column",{attrs:{prop:"add_fee",label:"运费(元)",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:"mini",placeholder:"运费"},model:{value:t.row.add_fee,callback:function(a){e.$set(t.row,"add_fee",a)},expression:"scope.row.add_fee"}})]}}],null,!1,4112566433)}),a("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){return e.handleRowEdit(t.$index,t.row)}}},[e._v("编辑地区 ")]),a("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(a){return a.preventDefault(),e.deleteRow(t.$index,e.areaData)}}},[e._v(" 移除 ")])]}}],null,!1,2128226937)})],1)],1),a("div",{staticClass:"add-btn"},[a("el-button",{attrs:{type:"text"},on:{click:e.addTemplate}},[e._v("+添加指定地区运费")])],1)])],1):e._e(),a("el-button",{staticClass:"float-left",attrs:{type:"primary"},on:{click:e.onAddTemplate}},[e._v(" 保存模板 ")])],1)],1)]),a("el-dialog",{attrs:{title:"设置运送到到区域",visible:e.specEditVisible},on:{"update:visible":function(t){e.specEditVisible=t}}},[a("el-form",{ref:"specForm"},[a("el-form-item",{attrs:{label:"",prop:"value","label-width":"80px"}},[a("el-transfer",{attrs:{props:{key:"code",label:"name"},data:e.allAreaData,titles:["可选","已选"]},model:{value:e.selectedArea,callback:function(t){e.selectedArea=t},expression:"selectedArea"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.specEditVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.updateArea}},[e._v("确定")])],1)],1)],1)},o=[],i=a("b85c"),n=a("c7eb"),l=a("1da1"),s=(a("a15b"),a("d81d"),a("b0c0"),a("e9c4"),a("a434"),a("b775"));function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(s["a"])({url:"/area/province",method:"get",params:e})}var d=a("8a9d"),u={data:function(){return{nowTableIndex:0,allAreaData:[],areaData:[],selectedArea:[],hiddenSelectedArea:[],specEditVisible:!1,infoForm:{charge_type:0,freight_type:0,name:"",start:1,start_fee:1,add:1,add_fee:1,areas:[]},infoRules:{name:[{required:!0,message:"请输入模板名称",trigger:"blur"}],charge_type:[{required:!0,message:"付费类型不能为空",trigger:"blur"}]}}},methods:{updateArea:function(){var e=this,t=this.nowTableIndex,a=this.selectedArea;console.log("selected 22 ==> ",this.selectedArea);for(var r=[],o=function(t){e.allAreaData.map((function(e){return e.code==a[t]?r.push(e.name):""}))},i=0;i<a.length;i++)o(i);console.log("newName iii ==> ",r),this.areaData[t].areaNames=r.join(","),this.areaData[t].codes=this.selectedArea,console.log("this.infoForm ==> ",this.infoForm),this.specEditVisible=!1},onAddTemplate:function(){var e=this;this.$refs["infoForm"].validate((function(t){if(t){for(var a=e.infoForm.id?d["e"]:d["a"],r=JSON.parse(JSON.stringify(e.infoForm)),o=0;o<r.areas.length;o++)delete r.areas[o].areaNames;r.updateTime&&delete r.updateTime,r.createTime&&delete r.createTime,a(r).then((function(t){var a=t.data,r=a.success,o=a.message;r?(e.$message({type:"success",message:"操作成功"}),e.$router.go(-1)):e.$message({type:"error",message:o})}))}}))},deleteRow:function(e,t){this.$confirm("确定要删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.splice(e,1)}))},addTemplate:function(){var e={start:1,start_fee:0,add:1,add_fee:0,codes:[],areaNames:""};this.areaData.push(e)},goBackPage:function(){this.$router.go(-1)},loadData:function(){var e=this;return Object(l["a"])(Object(n["a"])().mark((function t(){var a;return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c();case 2:a=t.sent,e.allAreaData=a.data.data,console.log("this.infoForm.id ==> ",e.infoForm.id),Object(d["c"])({id:e.infoForm.id}).then((function(t){e.infoForm=t.data.data,e.areaData=e.infoForm.areas||[],e.areaData.map((function(t){for(var a=[],r=function(r){e.allAreaData.map((function(e){return e.code==t.codes[r]?a.push(e.name):""}))},o=0;o<t.codes.length;o++)r(o);t.areaNames=a.join(",")}))}));case 6:case"end":return t.stop()}}),t)})))()},handleRowEdit:function(e,t){this.nowTableIndex=e;var a=this.areaData[e];this.selectedArea=a&&a.codes?a.codes:[],console.log("this.allAreaData ==> ",this.allAreaData),console.log("this.selectedArea ==> ",e,this.selectedArea);var r,o=Object(i["a"])(this.allAreaData);try{for(o.s();!(r=o.n()).done;){var n=r.value;n.disabled=!1;for(var l=0;l<this.areaData.length;l++)if(l!==e){var s,c=this.areaData[l].codes||[],d=Object(i["a"])(c);try{for(d.s();!(s=d.n()).done;){var u=s.value;if(n.code==u){n.disabled=!0;break}}}catch(f){d.e(f)}finally{d.f()}}}}catch(f){o.e(f)}finally{o.f()}this.specEditVisible=!0}},components:{},mounted:function(){this.infoForm.id=this.$route.query.id,this.loadData()}},f=u,m=(a("54a1"),a("0c7c")),p=Object(m["a"])(f,r,o,!1,null,"56f8c03a",null);t["default"]=p.exports},"6c0d":function(e,t,a){},"8a9d":function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n})),a.d(t,"e",(function(){return l})),a.d(t,"b",(function(){return s}));var r=a("b775");function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["a"])({url:"/freight/list",method:"get",params:e})}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["a"])({url:"/freight/getOne",method:"get",params:e})}function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["a"])({url:"/freight/create",method:"post",data:e})}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["a"])({url:"/freight/update",method:"post",data:e})}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["a"])({url:"/freight/delete",method:"put",data:e})}},e9c4:function(e,t,a){var r=a("23e7"),o=a("d066"),i=a("d039"),n=o("JSON","stringify"),l=/[\uD800-\uDFFF]/g,s=/^[\uD800-\uDBFF]$/,c=/^[\uDC00-\uDFFF]$/,d=function(e,t,a){var r=a.charAt(t-1),o=a.charAt(t+1);return s.test(e)&&!c.test(o)||c.test(e)&&!s.test(r)?"\\u"+e.charCodeAt(0).toString(16):e},u=i((function(){return'"\\udf06\\ud834"'!==n("\udf06\ud834")||'"\\udead"'!==n("\udead")}));n&&r({target:"JSON",stat:!0,forced:u},{stringify:function(e,t,a){var r=n.apply(null,arguments);return"string"==typeof r?r.replace(l,d):r}})}}]);