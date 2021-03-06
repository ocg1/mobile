/**
 * @name barrier controller
 * @author Morteza Tavnarad
 * @contributors []
 * @since 09/19/2016
 * @copyright Binary Ltd
 */

(function() {
    angular.module("binary.pages.trade.components.options.controllers").controller("BarrierController", Barrier);

    Barrier.$inject = [];

    function Barrier() {
        const vm = this;
        const pattern = /[+,-]\d+(\.\d{1,5})?|\d+(\.\d{1,5})?/;
        vm.regex = "^([+,-]?(\\d+)?(\\.)?\\d*)$";
    }
})();
