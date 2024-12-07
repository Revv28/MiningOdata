sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (Controller) => {
    "use strict";
  
    return Controller.extend("app.mining0953.controller.BaseController", {
        onInit() {
        },
        _extractRowData:function(oEvt){
          var oItem = oEvt.getParameter("listItem");
          var sPath = oItem.mAggregations.cells
          var miningObj = {}
          for (let obj of sPath){
              // console.log(Boolean(obj.mBindingInfos.text));
              
              if (obj.mBindingInfos.text){
                  var colName = obj.mBindingInfos.text.binding.sPath
                  var colValue = obj.mBindingInfos.text.binding.oValue
                  miningObj[colName] = colValue
              }

          }
          return miningObj
        }

    });
  });