import{_ as o,a as n,b as r,c as i,d as m,m as c,e as u,n as p}from"./index.397a4445.js";var f=function(){var s=this,a=s.$createElement,e=s._self._c||a;return e(o,{staticClass:"col-xs-11 col-md-8"},[e(n,{ref:"regForm",staticClass:"grey lighten-2 pa-5 rounded elevation-2",on:{submit:function(t){return t.preventDefault(),s.register.apply(null,arguments)}}},[e(r,{attrs:{name:"email",label:s.elText.labelEmail,required:"",rules:s.emailRules},model:{value:s.formData.email,callback:function(t){s.$set(s.formData,"email",t)},expression:"formData.email"}}),e(r,{attrs:{name:"firstName",label:s.elText.labelName},model:{value:s.formData.name,callback:function(t){s.$set(s.formData,"name",t)},expression:"formData.name"}}),e(r,{attrs:{name:"lastName",label:s.elText.labelLastName},model:{value:s.formData.lastName,callback:function(t){s.$set(s.formData,"lastName",t)},expression:"formData.lastName"}}),e(r,{staticClass:"mt-15",attrs:{name:"password",label:s.elText.labelPassword,required:"",type:"password",rules:s.passRules},model:{value:s.formData.password,callback:function(t){s.$set(s.formData,"password",t)},expression:"formData.password"}}),e(r,{attrs:{name:"password_confirmation",label:s.elText.labelPassConfirm,required:"",type:"password",rules:s.passRules},model:{value:s.formData.passCompare,callback:function(t){s.$set(s.formData,"passCompare",t)},expression:"formData.passCompare"}}),e(o,{staticClass:"d-flex justify-center justify-sm-end"},[e(i,{staticClass:"success mt-3",attrs:{type:"submit"}},[s._v(" "+s._s(s.elText.btnRegister)+" ")])],1)],1),e(m,{attrs:{absolute:!0,timeout:s.snackbar.timeout,top:"top",color:s.snackbar.color},model:{value:s.snackbar.show,callback:function(t){s.$set(s.snackbar,"show",t)},expression:"snackbar.show"}},[s._v(" "+s._s(s.snackbar.snackText)+" ")])],1)},h=[];const d={name:"RegisterUser",data(){return{msgVal:"",passMax:50,minPassLen:8,allowSpaces:!1,elText:{btnRegister:"register",labelName:"name",labelLastName:"surname",labelEmail:"* email",labelPassword:"* password",labelPassConfirm:"* confirm password"},formData:{name:null,lastName:null,email:null,password:null,passCompare:null},info:{success:"User successfully registered \u{1F603}",inputError:"field cannot be empty",emailNotValid:"invalid email address!",passworError:["password must not contain spaces","password cannot be greater","password must contain at least","password mismatch"]},snackbar:{show:!1,timeout:3e3,snackText:"",color:"success"},path:"/users/register"}},computed:{...c(["getUser","getMsgServer"]),...u(["user"]),passRules(){const s=[];if(this.passMax){const a=e=>(e||"").length<=this.passMax||`${this.info.passworError[1]} ${this.minPassLen} \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432`;s.push(a)}if(!this.allowSpaces){const a=e=>(e||"").indexOf(" ")<0||this.info.passworError[0];s.push(a)}if(this.minPassLen){const a=e=>(e||"").length>=this.minPassLen||`${this.info.passworError[2]} ${this.minPassLen} \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432`;s.push(a)}if(this.password===this.rePassword){const a=this.formData.password===this.formData.passCompare||this.info.passworError[3];s.push(a)}return s},emailRules(){return[a=>!!a||this.info.inputError,a=>/.+@.+\..+/.test(a)||this.info.emailNotValid]}},watch:{getMsgServer(s){s&&s.regSuccess?(this.snackbar.color="success",this.snackbar.show=!0,this.snackbar.snackText=s.regSuccess):s&&s.errorCred&&(this.snackbar.color="error",this.snackbar.show=!0,this.snackbar.snackText=s.errorCred)},user(s){s&&"email"in s&&this.$router.push({path:"/home"})}},created(){this.user},methods:{register(){if(!this.$refs.regForm.validate())return;let s=new FormData(this.$refs.regForm.$el);this.$store.dispatch("loginAction",{path:this.path,form:s})}}},l={};var _=p(d,f,h,!1,b,null,null,null);function b(s){for(let a in l)this[a]=l[a]}const w=function(){return _.exports}();export{w as default};
