(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b3750a7","chunk-0e2c97d7"],{5851:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-editor-container"},[e("div",{staticClass:" clearfix"},[e("pan-thumb",{staticStyle:{float:"left"},attrs:{image:t.avatar}},[t._v(" Your roles: "),t._l(t.roles,(function(a){return e("span",{key:a,staticClass:"pan-info-roles"},[t._v(t._s(a))])}))],2),e("github-corner",{staticStyle:{position:"absolute",top:"0px",border:"0",right:"0"}}),e("div",{staticClass:"info-container"},[e("span",{staticClass:"display_name"},[t._v(t._s(t.name))]),e("span",{staticStyle:{"font-size":"20px","padding-top":"20px",display:"inline-block"}},[t._v("Editor's Dashboard")])])],1),e("div",[e("img",{staticClass:"emptyGif",attrs:{src:t.emptyGif}})])])},s=[],c=e("5530"),r=e("2f62"),i=e("3cbc"),o=e("f168"),d={name:"DashboardEditor",components:{PanThumb:i["a"],GithubCorner:o["a"]},data:function(){return{emptyGif:"https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"}},computed:Object(c["a"])({},Object(r["b"])(["name","avatar","roles"]))},l=d,u=(e("cb89"),e("0c7c")),b=Object(u["a"])(l,n,s,!1,null,"e3426062",null);a["default"]=b.exports},9406:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-container"},[e(t.currentRole,{tag:"component"})],1)},s=[],c=e("5530"),r=(e("caad"),e("2532"),e("2f62")),i=e("3f2c"),o=e("5851"),d={name:"Dashboard",components:{adminDashboard:i["default"],editorDashboard:o["default"]},data:function(){return{currentRole:"adminDashboard"}},computed:Object(c["a"])({},Object(r["b"])(["roles"])),created:function(){this.roles.includes("admin")||(this.currentRole="editorDashboard")}},l=d,u=e("0c7c"),b=Object(u["a"])(l,n,s,!1,null,null,null);a["default"]=b.exports},cb89:function(t,a,e){"use strict";e("eb0f")},eb0f:function(t,a,e){}}]);