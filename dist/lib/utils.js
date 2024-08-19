"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
exports.formatPrice = formatPrice;
var config_1 = require("../config");
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
function formatPrice(price, option) {
    if (option === void 0) { option = {}; }
    var _a = option.currency, currency = _a === void 0 ? config_1.DEFAULT_CURRENCY_FORMAT : _a, _b = option.notation, notation = _b === void 0 ? "compact" : _b;
    var numericPrice = typeof price === "string" ? parseInt(price) : price;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        notation: notation,
        maximumFractionDigits: 2,
    }).format(numericPrice);
}
