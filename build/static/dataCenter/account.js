(function(){
        //注册
        var config = {
        register: {
        	need: false,
            url: "/login/registerUser",
            paras: {
                dynamicPassword: "dynamicPassword",	//N	动态密码
                inviteCode: "inviteCode",	//String	N	邀请码
                token: "token",	 //String	N	动态密码的token
                mobile: "mobile", //手机号
                loginId: "loginId", //同手机号
                password: "password", //密码
                internationalCode: "internationalCode" //国家码
            }
        },

        applyInviteCode: {
            need: false,
            url: "/login/invitationApplication",
            paras: {
                iaName: "iaName",
                iaMobile: "iaMobile",
                iaCompany: "iaCompany",
                iaPosition: "iaPosition"
            }
        },

        //登录
        /*
         *测试数据
         *13681641454
         *13564856085
         *18621977079
         *13761680005
         *18621753057
         *密码：test123
         *刁望庆  13:53:04
         *app.uat.yaok.com
         */
        login: {
            //***************** 系统设计数据接口来源必须灵活 用对数据来源于本地或者 app 注：嵌入app内部时候使用
            // app: {
            //     type: "",
            //     data: {
            //
            //     }
            // },
            //***********************************app嵌入html****************************************
            //protocol: "https",
            need: false,
            url: "/login/userLogin",
            paras: {
                loginId: "loginId",
                password: "password",
                loginSite: "loginSite", //登录地点
                loginWay: "loginWay"//登录平台 app h5 weixin
            }
        },

        loginByOpenId: {
            need: false,
            url: "/login/loginByOpenId",
            paras: {
                code: "code",
                loginSite: "loginSize", //ipc
                loginWay: "wx"
            }
        },
        loginOut: {
            need: true,
            url: "/login/userLogOut"
        },

        //接触微信绑定
        removeWeiXinBind: {
            need: true,
            url: "/login/resetWxLogin"
        }

    }
 )();