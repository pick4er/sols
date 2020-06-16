"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// DICTIONARY
var API_URL = 'https://api.maas2.apollorion.com';
var SOL_OFFSET = 4;
var Units = {
    Celsius: 'C'
};
// API
function API(url) {
    var fullUrl = API_URL + "/" + url;
    var options = {
        method: 'GET',
    };
    return fetch(fullUrl, options)
        .then(function (res) {
        return res
            .text()
            .then(function (text) {
            try {
                return JSON.parse(text);
            }
            catch (e) {
                return text;
            }
        });
    })
        .catch(function (e) {
        // Error handling is above in stack
        printErrorInConsole(e);
        throw new Error('Cannot parse the response');
    });
}
function fetchLatestSol() {
    return API('');
}
function fetchSol(solOrder) {
    return API(solOrder);
}
// HELPERS
function getSolOrder(_a) {
    var sol = _a.sol;
    return sol;
}
function getSolMinTemp(_a) {
    var min_temp = _a.min_temp;
    return min_temp;
}
function getSolMaxTemp(_a) {
    var max_temp = _a.max_temp;
    return max_temp;
}
function getSolUnit(_a) {
    var unitOfMeasure = _a.unitOfMeasure;
    return Units[unitOfMeasure];
}
// APP
document.addEventListener('DOMContentLoaded', function () {
    console.log('Loading...');
    var timerIdToWait = setTimeout(function () {
        console.log('Please, wait a bit more...');
    }, 5000);
    var timerIdToError = setTimeout(function () {
        console.log('Error occured while fetching data');
    }, 10000);
    getSols()
        .catch(printErrorInConsole)
        .finally(function () {
        clearTimeout(timerIdToWait);
        clearTimeout(timerIdToError);
    });
});
function getSols() {
    return __awaiter(this, void 0, void 0, function () {
        var latestSol, solHistory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchLatestSol()];
                case 1:
                    latestSol = _a.sent();
                    return [4 /*yield*/, getSolHistory(getSolOrder(latestSol))];
                case 2:
                    solHistory = _a.sent();
                    printHistoryInConsole(solHistory);
                    return [2 /*return*/];
            }
        });
    });
}
function printHistoryInConsole(solHistory) {
    solHistory.forEach(function (sol) {
        var order = getSolOrder(sol);
        var min = getSolMinTemp(sol);
        var max = getSolMaxTemp(sol);
        var unit = getSolUnit(sol);
        console.log("Sol #" + order + ": " + min + ".." + max + " " + unit);
    });
}
function printErrorInConsole(e) {
    console.log('--> ERROR:', e);
}
function getSolHistory(solOrder) {
    return __awaiter(this, void 0, void 0, function () {
        var oldestSol, solsRequests, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldestSol = solOrder - SOL_OFFSET;
                    if (oldestSol < 0) {
                        oldestSol = solOrder;
                    }
                    solsRequests = [];
                    for (i = solOrder; i >= oldestSol; i--) {
                        solsRequests.push(fetchSol(i));
                    }
                    return [4 /*yield*/, Promise.all(solsRequests)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
