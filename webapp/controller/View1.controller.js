sap.ui.define([
    "app/mining0953/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController,Fragment,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("app.mining0953.controller.View1", {
        onInit() {
           this.readCallFunction()
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
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            var fragmntPath = oResourceBundle.getText("fPath");
            var fragmentBtnName = oResourceBundle.getText("fCBName");
            var actionType = fragmentBtnName
            var fragmentDiaglogTitle = oResourceBundle.getText("fCDiaTitle");
            this.showFormDialog(fragmntPath,fragmentDiaglogTitle,fragmentBtnName,actionType) //This opens the location Details fragment
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
            // var createModel = this.getOwnerComponent().getModel('oDataCreate');
            var oDefaultModel = this.getOwnerComponent().getModel()
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
                    that.readCallFunction()
                   }
                },
                error:function(error){
                   
                    
                }
            }
            oDefaultModel.create(entitySet,oData,parameters)
        },
        updateFragmentOpen:function(oEvt){
            var oButton = oEvt.getSource();
            var locationId = oButton.getCustomData()[0].getValue();
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            var fragmntPath = oResourceBundle.getText("fPath");
            var fragmentBtnName = oResourceBundle.getText("fUBName");
            var actionType = fragmentBtnName
            var fragmentDiaglogTitle = oResourceBundle.getText("fUDiaTitle");
            this.showFormDialog(fragmntPath,fragmentDiaglogTitle,fragmentBtnName,actionType,locationId) //This opens the location Details fragment
 
        },
        onUpdatePress:function(){
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
            var oData = {
                LocationId:locationIdValue,
                LocationDesc:locationDescriptionValue,
                MiningRa:miningResourceAllocationValue,
                TotalCost:totalCostValue
            }
            var entitySet = `/oMiningSet('${locationIdValue}')`;
            var parameters = {
                success:function(oData,res){
                   if (res.statusCode === '204' ) {
                        locationId.setValue('');
                        locationDescription.setValue('');
                        miningResourceAllocation.setValue('');
                        totalCost.setValue('');
                        if (that._oDialog) {
                            that._oDialog.close(); 
                            that.showMessageDialog('Successfully Updated','Success')
                            var some =  that.getOwnerComponent().getModel('odataMining').getProperty('/results')
                    }
                   }
                   that.readCallFunction()
                },
                error:function(error){
                   
                    
                }
            }
            oDefaultModel.update(entitySet,oData,parameters)
        },
        onDeletePress:function(oEvt){
            var oButton = oEvt.getSource();
            var locationId = oButton.getCustomData()[0].getValue();
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            var fragmntPath = oResourceBundle.getText("dPath");
            var locationDetails = {locationId:locationId}
            var oLocModel = this.getOwnerComponent().getModel('oLocationId');
                oLocModel.setData(locationDetails)
            var message = `You are deleteing the details of Location Id ${locationId}. Are you sure ?`;
            this.showDeleteMessageDialog(fragmntPath,message,'Delete Item',locationId);
        },
        deleteMessageDialog:function(){
            var that = this 
            var oLocModel = this.getOwnerComponent().getModel('oLocationId').getProperty('/locationId');
            var oDefaultModel = this.getOwnerComponent().getModel();
            var entitySet = `/oMiningSet('${oLocModel}')`;
            var parameters = {
                success:function(oData,res){
                   if (res.statusCode === '204' ) {
                    if (that._oDeleteDialog) {
                        that._oDeleteDialog.close(); // Close the dialog on Cancel
                        that.showMessageDialog('Successfully Deleted','Success')
                    }
                   }
                   that.readCallFunction()
                },
                error:function(error){
                   
                    
                }
            }
            oDefaultModel.remove(entitySet,parameters)
        },
        closeDeleteDialog:function(){
            if (this._oDeleteDialog) {
                this._oDeleteDialog.close(); // Close the dialog on Cancel
            }
        },
    });
});