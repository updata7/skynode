(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21e5e3"],{d4eb:function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"app-container"},[t("div",{staticClass:"filter-container"},[t("el-checkbox-group",{model:{value:a.formThead,callback:function(e){a.formThead=e},expression:"formThead"}},[t("el-checkbox",{attrs:{label:"apple"}},[a._v(" apple ")]),t("el-checkbox",{attrs:{label:"banana"}},[a._v(" banana ")]),t("el-checkbox",{attrs:{label:"orange"}},[a._v(" orange ")])],1)],1),t("el-table",{staticStyle:{width:"100%"},attrs:{data:a.tableData,border:"",fit:"","highlight-current-row":""}},[t("el-table-column",{attrs:{prop:"name",label:"fruitName",width:"180"}}),a._l(a.formThead,(function(e){return t("el-table-column",{key:e,attrs:{label:e},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v(" "+a._s(t.row[e])+" ")]}}],null,!0)})}))],2)],1)},l=[],r={data:function(){return{tableData:[{name:"fruit-1",apple:"apple-10",banana:"banana-10",orange:"orange-10"},{name:"fruit-2",apple:"apple-20",banana:"banana-20",orange:"orange-20"}],formThead:["apple","banana"]}}},o=r,c=t("0c7c"),u=Object(c["a"])(o,n,l,!1,null,null,null);e["default"]=u.exports}}]);