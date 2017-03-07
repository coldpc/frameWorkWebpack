/**
 * Created by 画画 on 2016/8/31.
 * 接口数据统一获取api
 */
(function () {
    var root = {
        protocol: "http",
        default: "/appapi"
    };
    
    function DataCenterBase(item, event) {
        this.item = item;
        this.event = event;
    }

    /*
     * cof 请求配置
     * data 请求数据
     * success 成功执行
     * error 错误执行
     * type 请求类型
     * mask{info, dom}遮罩页面
     * noAccessMessage 没权限访问输出的消息
     */
    DataCenterBase.prototype.execute = function (cof) {
        var $this = this, item;

        //取出配置的api 预防api配置为空抛出异常
        item = $this.item;
        cof = cof || {};

        //读取接口地址
        cof.url = item.url;

        //配置请求参数
        cof.type = cof.type || "post";
        cof.data = cof.data || {};
        cof._call_ = cof.success;
        cof.contentType = cof.contentType || item.contentType;

        if (!cof.addParaToUrl && item.addParaToUrl){
            cof.addParaToUrl = item.addParaToUrl;
        }

        if (typeof cof._call_ == "function") {
            cof.success = function (res) {
                cof._call_(res);
                window.dataCenter.dispatch($this.event, res);
            };
        } else {
            cof.success = function (res) {
                window.dataCenter.dispatch($this.event, res);
            };
        }

        //是否需要登陆token
        if (item.need) {
            var account = yaok.getAccount();
            if (!account.token) {
                yaok.gotoLogin();
            }
        }

        // cof.data.locale = yaok.getCookie("locale") || "zh_CN";
        if (!cof.data.cityId && item.para && item.para.cityId){
            cof.data.cityId = yaok.getCookie("cityId") || "0000";
        }
        yaok.ajax(cof);
    };

    //dataCenter构造函数
    function DataCenter() {
        yaok.EventListener.call(this);
    }
    
    //原型继承事件模型
    yaok.EventListener.call(DataCenter.prototype);
    DataCenter.prototype.dataCenterBase = DataCenterBase;
    
    window.dataCenter = new DataCenter();
})();