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

        // Update the content of the message dialog
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
        },
        showFormDialog: function (name, FTitle, fBtnTxt, actionType, locId = "") {
            if (!this._oDialog) {
                // Load the fragment when the button is pressed
                Fragment.load({
                    id: this.getView().getId(), // Ensure IDs in fragments are accessible
                    name: name, // Ensure the path is correct
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog; // Store the dialog reference
                    this.getView().addDependent(oDialog); // Add the dialog as dependent to the view
                    this._updateFormDialogContent(FTitle, fBtnTxt, locId, actionType);
                    oDialog.open(); // Open the dialog
                }.bind(this));
            } else {
                this._updateFormDialogContent(FTitle, fBtnTxt, locId, actionType);
                this._oDialog.open(); // If dialog is already created, just open it
            }
        },
        
        _updateFormDialogContent: function (FTitle, fBtnTxt, locId, actionType) {
            if (this._oDialog) {
                // Update dialog title
                this._oDialog.setTitle(FTitle);
        
                // Update button text and attach the appropriate press event
                var oButton = sap.ui.core.Fragment.byId(this.getView().getId(), "idBtnCU");
                if (oButton) {
                    oButton.setText(fBtnTxt);
        
                    // Detach previous event handlers to avoid duplicates
                    oButton.detachPress(this.onCreatePress, this);
                    oButton.detachPress(this.onUpdatePress, this);
        
                    // Attach the appropriate event handler based on the action type
                    if (actionType === "Create") {
                        oButton.attachPress(this.onCreatePress, this);
                    } else if (actionType === "Update") {
                        oButton.attachPress(this.onUpdatePress, this);
                         // Update input field value
                        var oInputVal = sap.ui.core.Fragment.byId(this.getView().getId(), "locationId");
                        if (oInputVal) {
                            oInputVal.setValue(locId);
                        }
                    }
                }
            }
        },
        showDeleteMessageDialog:function(name,message,title,locationId){
            if (!this._oDeleteDialog) {
                // Load the fragment when the button is pressed
                Fragment.load({
                    id: this.getView().getId(), // Ensure IDs in fragments are accessible
                    name: name, // Ensure the path is correct
                    controller: this
                }).then(function (oDeleteDialog) {
                    this._oDeleteDialog = oDeleteDialog; // Store the dialog reference
                    this.getView().addDependent(oDeleteDialog); // Add the dialog as dependent to the view
                    this.updateDeleteDialogContent(message,title)
                    oDeleteDialog.open(); // Open the dialog
                }.bind(this));
            } else {
                this.updateDeleteDialogContent(message,title,locationId)
                this._oDeleteDialog.open(); // If dialog is already created, just open it
            }
        },
        updateDeleteDialogContent: function (message, title, locationId) {
            if (this._oDeleteDialog) {
                this._oDeleteDialog.setTitle(title);
                var oDeleteText = sap.ui.core.Fragment.byId(this.getView().getId(), "deleteText");
                if (oDeleteText) {
                    oDeleteText.setText(message);
                }
            }
        },
    });
  });