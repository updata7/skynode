(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c0d5274"],{"12b8":function(t,e,i){},"440b":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"components-container"},[t._m(0),i("div",{staticClass:"editor-container"},[i("el-tag",{staticClass:"tag-title"},[t._v(" Basic: ")]),i("markdown-editor",{attrs:{height:"300px"},model:{value:t.content1,callback:function(e){t.content1=e},expression:"content1"}})],1),i("div",{staticClass:"editor-container"},[i("el-tag",{staticClass:"tag-title"},[t._v(" Markdown Mode: ")]),i("markdown-editor",{ref:"markdownEditor",attrs:{options:{hideModeSwitch:!0,previewStyle:"tab"},height:"200px"},model:{value:t.content2,callback:function(e){t.content2=e},expression:"content2"}})],1),i("div",{staticClass:"editor-container"},[i("el-tag",{staticClass:"tag-title"},[t._v(" Customize Toolbar: ")]),i("markdown-editor",{attrs:{options:{toolbarItems:["heading","bold","italic"]}},model:{value:t.content3,callback:function(e){t.content3=e},expression:"content3"}})],1),i("div",{staticClass:"editor-container"},[i("el-tag",{staticClass:"tag-title"},[t._v(" I18n: ")]),i("el-alert",{attrs:{closable:!1,title:"You can change the language of the admin system to see the effect",type:"success"}}),i("markdown-editor",{ref:"markdownEditor",attrs:{language:t.language,height:"300px"},model:{value:t.content4,callback:function(e){t.content4=e},expression:"content4"}})],1),i("el-button",{staticStyle:{"margin-top":"80px"},attrs:{type:"primary",icon:"el-icon-document"},on:{click:t.getHtml}},[t._v(" Get HTML ")]),i("div",{domProps:{innerHTML:t._s(t.html)}})],1)},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("aside",[t._v("Markdown is based on "),i("a",{attrs:{href:"https://github.com/nhnent/tui.editor",target:"_blank"}},[t._v("tui.editor")]),t._v(" ，simply wrapped with Vue. "),i("a",{attrs:{target:"_blank",href:"https://panjiachen.github.io/vue-element-admin-site/feature/component/markdown-editor.html"}},[t._v(" Documentation ")])])}],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:t.id}})},r=[],s=i("5530"),d=(i("b680"),i("a7be"),i("44f8"),i("a6e0"),i("547e")),l=i.n(d),c={minHeight:"200px",previewStyle:"vertical",useCommandShortcut:!0,useDefaultHTMLSanitizer:!0,usageStatistics:!1,hideModeSwitch:!1,toolbarItems:["heading","bold","italic","strike","divider","hr","quote","divider","ul","ol","task","indent","outdent","divider","table","image","link","divider","code","codeblock"]},u={name:"MarkdownEditor",props:{value:{type:String,default:""},id:{type:String,required:!1,default:function(){return"markdown-editor-"+ +new Date+(1e3*Math.random()).toFixed(0)}},options:{type:Object,default:function(){return c}},mode:{type:String,default:"markdown"},height:{type:String,required:!1,default:"300px"},language:{type:String,required:!1,default:"en_US"}},data:function(){return{editor:null}},computed:{editorOptions:function(){var t=Object.assign({},c,this.options);return t.initialEditType=this.mode,t.height=this.height,t.language=this.language,t}},watch:{value:function(t,e){t!==e&&t!==this.editor.getValue()&&this.editor.setValue(t)},language:function(t){this.destroyEditor(),this.initEditor()},height:function(t){this.editor.height(t)},mode:function(t){this.editor.changeMode(t)}},mounted:function(){this.initEditor()},destroyed:function(){this.destroyEditor()},methods:{initEditor:function(){var t=this;this.editor=new l.a(Object(s["a"])({el:document.getElementById(this.id)},this.editorOptions)),this.value&&this.editor.setValue(this.value),this.editor.on("change",(function(){t.$emit("input",t.editor.getValue())}))},destroyEditor:function(){this.editor&&(this.editor.off("change"),this.editor.remove())},setValue:function(t){this.editor.setValue(t)},getValue:function(){return this.editor.getValue()},setHtml:function(t){this.editor.setHtml(t)},getHtml:function(){return this.editor.getHtml()}}},h=u,g=i("2877"),m=Object(g["a"])(h,a,r,!1,null,null,null),p=m.exports,f="\n**This is test**\n\n* vue\n* element\n* webpack\n\n",v={name:"MarkdownDemo",components:{MarkdownEditor:p},data:function(){return{content1:f,content2:f,content3:f,content4:f,html:"",languageTypeList:{en:"en_US",zh:"zh_CN",es:"es_ES"}}},computed:{language:function(){return this.languageTypeList[this.$store.getters.language]}},methods:{getHtml:function(){this.html=this.$refs.markdownEditor.getHtml(),console.log(this.html)}}},b=v,w=(i("e48c"),Object(g["a"])(b,n,o,!1,null,"18de7d28",null));e["default"]=w.exports},e48c:function(t,e,i){"use strict";i("12b8")}}]);