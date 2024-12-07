sap.ui.define([
    "app/mining0953/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], (BaseController,Fragment,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("app.mining0953.controller.View1", {
        onInit() {
            var oDefaultModel = this.getOwnerComponent().getModel()
            var oMiningOdata = this.getOwnerComponent().getModel('odataMining')
            var entitySet = "/oMiningSet"
            oDefaultModel.read(entitySet, {
                success: function (oData, res) {
                    if (res.statusCode === '200' || res.statusText === "OK") { 
                        oMiningOdata.setData(oData)
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
                // console.log(Boolean(obj.mBindingInfos.text));
                
                if (obj.mBindingInfos.text){
                    var colName = obj.mBindingInfos.text.binding.sPath
                    var colValue = obj.mBindingInfos.text.binding.oValue
                    miningObj[colName] = colValue
                }
 
            }
            var miningObj = this._extractRowData(oEvt);
            var miningJsonObject = JSON.stringify(miningObj);
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView2", {
                mining: miningJsonObject
            })

        },
        onFilterSearch: function(){
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
        onF4Help: function (oEvent) {
            this.idInpt=oEvent.getSource().getId()
            if (!this.dialog) {
                Fragment.load({
                    name: "app.mining0953.fragments.popup",
                    controller: this
                }).then(function (oDialog) {
                    this.dialog = oDialog;
                    this.getView().addDependent(this.dialog);
                    this.dialog.open();
                }.bind(this));
            } else {
                this.dialog.open();
            }
        },
        onConfirm:function(oEvent){
            var oItem=oEvent.getParameter("selectedItem")
            var sItem=oItem.mProperties.title
            var oInpt=this.getView().byId(this.idInpt)
            oInpt.setValue(sItem)
            this.onFilterSearch()
          },
        onRefreshPress:function(){
            var oLocationId = this.byId("searchField1");
            var oLocationDesc = this.byId("searchField2");
            var oMiningRes = this.byId("searchField3");
            if (oLocationId.getValue()){
                oLocationId.setValue('');
            }
            if (oLocationDesc.getValue()){
                oLocationDesc.setValue('');
            }
            if (oMiningRes.getValue()){
                oMiningRes.setValue('')
            }
            var aFilters = [];
            var oTable = this.byId("idTable1");
            var oBinding = oTable.getBinding("items")
            oBinding.filter(aFilters)

        },
        createFragmentOpen: function () {
            if (!this._oDialog) {
                // Load the fragment when the button is pressed
                Fragment.load({
                    id:this.getView().getId(), // This ensures that Id's in fragments are accessable
                    name: "app.mining0953.fragments.create", // Ensure the path is correct
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog; // Store the dialog reference
                    this.getView().addDependent(oDialog); // Add the dialog as dependent to the view
                    oDialog.open(); // Open the dialog
                }.bind(this));
            } else {
                this._oDialog.open(); // If dialog is already created, just open it
            }
        },

        // Handle the Cancel Button Click
        onCancelPress: function () {
            if (this._oDialog) {
                this._oDialog.close(); // Close the dialog on Cancel
            }
        },

        // Handle the Create Button Click
        onCreatePress: function () {
            var locationId = this.getView().byId('locationId').getValue();
            var locationDescription =  this.getView().byId('locationDescription').getValue();
            var miningResourceAllocation = this.getView().byId('miningResourceAllocation').getValue();
            var totalCost = this.getView().byId('totalCost').getValue();
            var oDefaultModel = this.getOwnerComponent().getModel()
            var createModel = this.getOwnerComponent().getModel('oDataCreate');
            var oData = {
                LocationId:locationId,
                LocationDesc:locationDescription,
                MiningRa:miningResourceAllocation,
                TotalCost:totalCost
            }
            var entitySet = "/oMiningSet";
            var parameters = {
                success:function(oData){
                    
                },
                error:function(error){
                   
                    
                }
            }
        },
        onEditPress:function(oEvt){
           
        }
    });
});