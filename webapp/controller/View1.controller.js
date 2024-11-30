sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("app.mining0953.controller.View1", {
        onInit() {
        },
        onRowPress: function (oEvt) {
            var oItem = oEvt.getParameter("listItem");
            var sPath = oItem.mAggregations.cells
            var miningObj = {}
            for (let obj of sPath){
                var colName = obj.mBindingInfos.text.binding.sPath
                var colValue = obj.mBindingInfos.text.binding.oValue
                miningObj[colName] = colValue
 
            }
            var miningJsonObject = JSON.stringify(miningObj);
            

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView2", {
                locationId: miningJsonObject
            })

        },
    });
});