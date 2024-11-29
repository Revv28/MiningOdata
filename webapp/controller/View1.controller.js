sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("app.mining0953.controller.View1", {
        onInit() {
        },
        onRowSelect: function (oEvt) {
            var oItem = oEvt.getParameter("listItem");
            var sPath = oItem.mProperties.title

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView2", {
                locationId: sPath
            })

        },
    });
});