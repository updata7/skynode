(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ce2ee054","chunk-2d0c13aa","chunk-2d0e9802","chunk-2d0b325b"],{"26ab":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dropdown",{attrs:{"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[t._v(" Link "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),o("el-dropdown-menu",{staticClass:"no-padding no-border",staticStyle:{width:"400px"},attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-form-item",{staticStyle:{"margin-bottom":"0px"},attrs:{"label-width":"0px",prop:"source_uri"}},[o("el-input",{attrs:{placeholder:"Please enter the content"},model:{value:t.source_uri,callback:function(e){t.source_uri=e},expression:"source_uri"}},[o("template",{slot:"prepend"},[t._v(" URL ")])],2)],1)],1)],1)},r=[],l={props:{value:{type:String,default:""}},computed:{source_uri:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},a=l,i=o("2877"),s=Object(i["a"])(a,n,r,!1,null,null,null);e["default"]=s.exports},4482:function(t,e,o){"use strict";o.r(e);var n=o("44c7");o.d(e,"CommentDropdown",(function(){return n["default"]}));var r=o("8e98");o.d(e,"PlatformDropdown",(function(){return r["default"]}));var l=o("26ab");o.d(e,"SourceUrlDropdown",(function(){return l["default"]}))},"44c7":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dropdown",{attrs:{"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[t._v(" "+t._s(t.comment_disabled?"Comment: closed":"Comment: opened")+" "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),o("el-dropdown-menu",{staticClass:"no-padding",attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",[o("el-radio-group",{staticStyle:{padding:"10px"},model:{value:t.comment_disabled,callback:function(e){t.comment_disabled=e},expression:"comment_disabled"}},[o("el-radio",{attrs:{label:!0}},[t._v(" Close comment ")]),o("el-radio",{attrs:{label:!1}},[t._v(" Open comment ")])],1)],1)],1)],1)},r=[],l={props:{value:{type:Boolean,default:!1}},computed:{comment_disabled:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},a=l,i=o("2877"),s=Object(i["a"])(a,n,r,!1,null,null,null);e["default"]=s.exports},"8e98":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dropdown",{attrs:{"hide-on-click":!1,"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[t._v(" Platfroms("+t._s(t.platforms.length)+") "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),o("el-dropdown-menu",{staticClass:"no-border",attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-checkbox-group",{staticStyle:{padding:"5px 15px"},model:{value:t.platforms,callback:function(e){t.platforms=e},expression:"platforms"}},t._l(t.platformsOptions,(function(e){return o("el-checkbox",{key:e.key,attrs:{label:e.key}},[t._v(" "+t._s(e.name)+" ")])})),1)],1)],1)},r=[],l={props:{value:{required:!0,default:function(){return[]},type:Array}},data:function(){return{platformsOptions:[{key:"a-platform",name:"a-platform"},{key:"b-platform",name:"b-platform"},{key:"c-platform",name:"c-platform"}]}},computed:{platforms:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},a=l,i=o("2877"),s=Object(i["a"])(a,n,r,!1,null,null,null);e["default"]=s.exports}}]);