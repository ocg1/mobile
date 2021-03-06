/**
 * @name Limits controller
 * @author Nazanin Reihani Haghighi
 * @contributors []
 * @since 01/18/2017
 * @copyright Binary Ltd
 */

(function() {
    angular.module("binary.pages.limits.controllers").controller("LimitsController", Limits);

    Limits.$inject = ["$scope", "$state", "websocketService", "accountService", "appStateService"];

    function Limits($scope, $state, websocketService, accountService, appStateService) {
        const vm = this;
        vm.limits = {};
        vm.loginId = accountService.getDefault().id;
        vm.landingCompany = localStorage.getItem("landingCompany");

        websocketService.sendRequestFor.accountLimits();
        $scope.$on("get_limits", (e, get_limits) => {
            $scope.$applyAsync(() => {
                vm.limits = get_limits;
                if (vm.limits.lifetime_limit === 99999999 && vm.limits.num_of_days_limit === 99999999) {
                    // fully aithenticated
                    vm.fullyAuthenticated = true;
                    vm.mxAccount = false;
                    vm.crAccount = false;
                    vm.otherAccount = false;
                } else if (vm.landingCompany === "iom") {
                    // MX accounts
                    vm.mxAccount = true;
                    vm.fullyAuthenticated = false;
                    vm.crAccount = false;
                    vm.otherAccount = false;
                } else if (vm.landingCompany === "costarica") {
                    // CR accounts
                    vm.crAccount = true;
                    vm.fullyAuthenticated = false;
                    vm.mxAccount = false;
                    vm.otherAccount = false;
                } else {
                    vm.otherAccount = true;
                    vm.fullyAuthenticated = false;
                    vm.mxAccount = false;
                    vm.crAccount = false;
                }
            });
        });

        vm.currency =
            _.startsWith(vm.loginId, "MLT") || _.startsWith(vm.loginId, "MF") || _.startsWith(vm.loginId, "MX")
                ? "EUR"
                : sessionStorage.getItem("currency") || "USD";

        $scope.$on("authorize", () => {
            if (appStateService.limitsChange) {
                if(appStateService.virtuality) {
                    $state.go("trade");
                } else {
                    $state.reload();
                }
                appStateService.limitsChange = false;
            }
        });

        vm.getLanguageId = function (title) {
            return `limits.${title.replace(/[\s]/g, '_').toLowerCase()}`;
        }

    }
})();
