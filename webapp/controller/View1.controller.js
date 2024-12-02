sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], (Controller,Fragment,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("app.mining0953.controller.View1", {
        onInit() {
            var oDefaultModel = this.getOwnerComponent().getModel()

            var oMiningOdata = this.getOwnerComponent().getModel('odataMining')
            var url = "/oMiningSet"
            oDefaultModel.read(url, {
                success: function (oData, res) {
                    if (res.statusCode === '200' || res.statusText === "OK") {
                        console.log(oData);
                        
                        oMiningOdata.setData(oData)
                        // oModel1.setData(oData); 
                        // that.getView().setModel()
                    }

                },
                error: function (error) {
                    if (error.statusCode === "404") {
                        console.log(error)
                    }
                }


            })
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
                mining: miningJsonObject
            })

        },
        onFilterSearch: function(oEvt){
            var oLocationId = this.byId("searchField1");
            var oLocationIdValue = oLocationId.getValue();

            var oLocationDesc = this.byId("searchField2");
            var oLocationDescValue = oLocationDesc.getValue();

            var oMiningRes = this.byId("searchField3");
            var oMiningResIdValue = oMiningRes.getValue();

            var aFilters = [];
            if (oLocationIdValue) {
              aFilters.push(new Filter("LocationId", FilterOperator.Contains, oLocationIdValue));
            }
            if (oLocationDescValue) {
                aFilters.push(new Filter("LocationDesc", FilterOperator.Contains, oLocationDescValue));
              }
            if (oMiningResIdValue) {
                aFilters.push(new Filter("MiningRa", FilterOperator.Contains, oMiningResIdValue));
              }
            var oTable = this.byId("idTable1");
            var oBinding = oTable.getBinding("items")
            oBinding.filter(aFilters)
        },
    });
});