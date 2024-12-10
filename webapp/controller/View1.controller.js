sap.ui.define([
    "app/mining0953/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text"
], (BaseController,Fragment,Filter,FilterOperator,Dialog,Button,Text) => {
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
            var that = this 
            var locationId = this.getView().byId('locationId');
            var locationIdValue = locationId.getValue();
            var locationDescription =  this.getView().byId('locationDescription');
            var locationDescriptionValue = locationDescription.getValue();
            var miningResourceAllocation = this.getView().byId('miningResourceAllocation');
            var miningResourceAllocationValue = miningResourceAllocation.getValue();
            var totalCost = this.getView().byId('totalCost');
            var totalCostValue = totalCost.getValue();
            var oDefaultModel = this.getOwnerComponent().getModel()
            var createModel = this.getOwnerComponent().getModel('oDataCreate');
            var oData = {
                LocationId:locationIdValue,
                LocationDesc:locationDescriptionValue,
                MiningRa:miningResourceAllocationValue,
                TotalCost:totalCostValue
            }
            var entitySet = "/oMiningSet";
            var parameters = {
                success:function(oData,res){
                   if (res.statusCode === '201' || res.statusText === "OK") {
                        locationId.setValue('');
                        locationDescription.setValue('');
                        miningResourceAllocation.setValue('');
                        totalCost.setValue('');
                        if (that._oDialog) {
                            that._oDialog.close(); 
                            that.showMessageDialog('Successfully Created','Success')

                    }
                   }

                },
                error:function(error){
                   
                    
                }
            }
            oDefaultModel.create(entitySet,oData,parameters)
        },
        onEditPress:function(oEvt){
            var oButton = oEvt.getSource();
            var locatoinId = oButton.getCustomData()[0].getValue();
            
        }

    });
});