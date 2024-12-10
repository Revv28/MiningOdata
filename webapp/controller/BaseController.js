sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",

  ], (Controller,Fragment) => {
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
        },
        _oMessageDialog: null, // Cache for the dialog instance

        // Show the reusable message dialog
        showMessageDialog: function (message, title) {
            if (!this._oMessageDialog) {
                Fragment.load({
                    id: this.getView().getId(), // Ensure unique instance for this view
                    name: "app.mining0953.fragments.messagePopup", // Path to the fragment
                    controller: this // Attach this controller
                }).then(function (oDialog) {
                    this._oMessageDialog = oDialog;
                    this.getView().addDependent(this._oMessageDialog); // Attach to the view
                    this._updateDialogContent(message, title);
                    this._oMessageDialog.open();
                }.bind(this));
            } else {
                this._updateDialogContent(message, title);
                this._oMessageDialog.open();
            }
        },

        // Update the content of the dialog
        _updateDialogContent: function (message, title) {
            if (this._oMessageDialog) {
                this._oMessageDialog.setTitle(title);
                var oMessageText = sap.ui.core.Fragment.byId(this.getView().getId(), "messageText");
                if (oMessageText) {
                    oMessageText.setText(message);
                }
            }
        },

        // Close the message dialog
        closeMessageDialog: function () {
            if (this._oMessageDialog) {
                this._oMessageDialog.close();
            }
        }

    });
  });