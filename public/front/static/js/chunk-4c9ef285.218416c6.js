(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c9ef285","chunk-2d0e9d56"],{3252:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("switch-roles",{on:{change:e.handleRolesChange}})],1)},o=[],i=s("8ee8"),l={name:"PagePermission",components:{SwitchRoles:i["default"]},methods:{handleRolesChange:function(){this.$router.push({path:"/permission/index?"+ +new Date})}}},r=l,c=s("0c7c"),a=Object(c["a"])(r,n,o,!1,null,null,null);t["default"]=a.exports},"8ee8":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticStyle:{"margin-bottom":"15px"}},[e._v(" "+e._s(e.$t("permission.roles"))+": "+e._s(e.roles)+" ")]),e._v(" "+e._s(e.$t("permission.switchRoles"))+": "),s("el-radio-group",{model:{value:e.switchRoles,callback:function(t){e.switchRoles=t},expression:"switchRoles"}},[s("el-radio-button",{attrs:{label:"editor"}}),s("el-radio-button",{attrs:{label:"admin"}})],1)],1)},o=[],i={computed:{roles:function(){return this.$store.getters.roles},switchRoles:{get:function(){return this.roles[0]},set:function(e){var t=this;this.$store.dispatch("user/changeRoles",e).then((function(){t.$emit("change")}))}}}},l=i,r=s("0c7c"),c=Object(r["a"])(l,n,o,!1,null,null,null);t["default"]=c.exports}}]);