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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
function isErrorSol(sol) {
    return sol.status === 404 || sol.status === 500;
}
// DICTIONARY
var API_URL = 'https://api.maas2.apollorion.com';
var SOL_OFFSET = 4;
var Units = {
    Celsius: 'C',
};
// API
function API(url) {
    return fetch(API_URL + "/" + url, { method: 'GET' })
        .then(function (res) { return res.text().then(JSON.parse); })
        .catch(console.error);
}
function fetchLatestSol() {
    return API('');
}
function fetchSol(solOrder) {
    return API("" + solOrder);
}
// APP
getSols().catch(console.error);
function getSols() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var latestSol, _b, _c, historySol, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, fetchLatestSol()];
                case 1:
                    latestSol = _d.sent();
                    if (isErrorSol(latestSol)) {
                        throw new Error(latestSol.errorMessage);
                    }
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 13]);
                    _b = __asyncValues(getSolHistory(latestSol.sol));
                    _d.label = 3;
                case 3: return [4 /*yield*/, _b.next()];
                case 4:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                    historySol = _c.value;
                    if (isErrorSol(historySol)) {
                        throw new Error(historySol.errorMessage);
                    }
                    console.log("Sol #" + historySol.sol + ": " + historySol.min_temp + ".." + historySol.max_temp + " " + Units[historySol.unitOfMeasure]);
                    _d.label = 5;
                case 5: return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _d.trys.push([8, , 11, 12]);
                    if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(_b)];
                case 9:
                    _d.sent();
                    _d.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
/*
  actually, generator is optional,
  but it allows us to split fetching
  and displaying logic.
*/
function getSolHistory(solOrder) {
    return __asyncGenerator(this, arguments, function getSolHistory_1() {
        var oldestSol, solsRequests, i, solsResponses, i, solResponse;
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
                    solsResponses = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < solsRequests.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await(solsRequests[i])];
                case 2:
                    solResponse = _a.sent();
                    solsResponses.push(solResponse);
                    return [4 /*yield*/, __await(solResponse)];
                case 3: return [4 /*yield*/, _a.sent()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [4 /*yield*/, __await(solsResponses)];
                case 7: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
