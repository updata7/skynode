(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c22a9"],{"48c2":function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"app-container"},[t("div",{staticClass:"filter-container"},[t("el-checkbox-group",{model:{value:a.checkboxVal,callback:function(e){a.checkboxVal=e},expression:"checkboxVal"}},[t("el-checkbox",{attrs:{label:"apple"}},[a._v(" apple ")]),t("el-checkbox",{attrs:{label:"banana"}},[a._v(" banana ")]),t("el-checkbox",{attrs:{label:"orange"}},[a._v(" orange ")])],1)],1),t("el-table",{key:a.key,staticStyle:{width:"100%"},attrs:{data:a.tableData,border:"",fit:"","highlight-current-row":""}},[t("el-table-column",{attrs:{prop:"name",label:"fruitName",width:"180"}}),a._l(a.formThead,(function(e){return t("el-table-column",{key:e,attrs:{label:e},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v(" "+a._s(t.row[e])+" ")]}}],null,!0)})}))],2)],1)},l=[],r=(t("4de4"),t("d3b7"),["apple","banana"]),o={data:function(){return{tableData:[{name:"fruit-1",apple:"apple-10",banana:"banana-10",orange:"orange-10"},{name:"fruit-2",apple:"apple-20",banana:"banana-20",orange:"orange-20"}],key:1,formTheadOptions:["apple","banana","orange"],checkboxVal:r,formThead:r}},watch:{checkboxVal:function(a){this.formThead=this.formTheadOptions.filter((function(e){return a.indexOf(e)>=0})),this.key=this.key+1}}},c=o,i=t("2877"),b=Object(i["a"])(c,n,l,!1,null,null,null);e["default"]=b.exports}}]);