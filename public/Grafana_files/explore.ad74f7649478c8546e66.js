(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["explore"],{

/***/ "./public/app/core/components/ToggleButtonGroup/ToggleButtonGroup.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/core/components/ToggleButtonGroup/ToggleButtonGroup.tsx ***!
  \****************************************************************************/
/*! exports provided: default, ToggleButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return ToggleButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_components_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/Tooltip/Tooltip */ "./public/app/core/components/Tooltip/Tooltip.tsx");



var ToggleButtonGroup = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToggleButtonGroup, _super);
    function ToggleButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleButtonGroup.prototype.render = function () {
        var _a = this.props, children = _a.children, label = _a.label, transparent = _a.transparent;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
            label && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", { className: "gf-form-label " + (transparent ? 'gf-form-label--transparent' : '') }, label),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "toggle-button-group " + (transparent ? 'toggle-button-group--transparent' : '') }, children)));
    };
    return ToggleButtonGroup;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (ToggleButtonGroup);
var ToggleButton = function (_a) {
    var children = _a.children, selected = _a.selected, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.value, value = _c === void 0 ? null : _c, tooltip = _a.tooltip, onChange = _a.onChange;
    var handleChange = function (event) {
        event.stopPropagation();
        if (onChange) {
            onChange(value);
        }
    };
    var btnClassName = "btn " + className + " " + (selected ? 'active' : '');
    var button = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: btnClassName, onClick: handleChange },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, children)));
    if (tooltip) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], { content: tooltip }, button);
    }
    else {
        return button;
    }
};


/***/ }),

/***/ "./public/app/core/utils/text.ts":
/*!***************************************!*\
  !*** ./public/app/core/utils/text.ts ***!
  \***************************************/
/*! exports provided: findHighlightChunksInText, findMatchesInText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findHighlightChunksInText", function() { return findHighlightChunksInText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findMatchesInText", function() { return findMatchesInText; });
/**
 * Adapt findMatchesInText for react-highlight-words findChunks handler.
 * See https://github.com/bvaughn/react-highlight-words#props
 */
function findHighlightChunksInText(_a) {
    var searchWords = _a.searchWords, textToHighlight = _a.textToHighlight;
    return findMatchesInText(textToHighlight, searchWords.join(' '));
}
var cleanNeedle = function (needle) {
    return needle.replace(/[[{(][\w,.-?:*+]+$/, '');
};
/**
 * Returns a list of substring regexp matches.
 */
function findMatchesInText(haystack, needle) {
    // Empty search can send re.exec() into infinite loop, exit early
    if (!haystack || !needle) {
        return [];
    }
    var matches = [];
    var cleaned = cleanNeedle(needle);
    var regexp;
    try {
        regexp = new RegExp("(?:" + cleaned + ")", 'g');
    }
    catch (error) {
        return matches;
    }
    haystack.replace(regexp, function (substring) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if (substring) {
            var offset = rest[rest.length - 2];
            matches.push({
                text: substring,
                start: offset,
                length: substring.length,
                end: offset + substring.length,
            });
        }
        return '';
    });
    return matches;
}


/***/ }),

/***/ "./public/app/features/explore/ElapsedTime.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/ElapsedTime.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var INTERVAL = 150;
var ElapsedTime = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ElapsedTime, _super);
    function ElapsedTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            elapsed: 0,
        };
        _this.tick = function () {
            var jetzt = Date.now();
            var elapsed = jetzt - _this.offset;
            _this.setState({ elapsed: elapsed });
        };
        return _this;
    }
    ElapsedTime.prototype.start = function () {
        this.offset = Date.now();
        this.timer = window.setInterval(this.tick, INTERVAL);
    };
    ElapsedTime.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.time) {
            clearInterval(this.timer);
        }
        else if (this.props.time) {
            this.start();
        }
    };
    ElapsedTime.prototype.componentDidMount = function () {
        this.start();
    };
    ElapsedTime.prototype.componentWillUnmount = function () {
        clearInterval(this.timer);
    };
    ElapsedTime.prototype.render = function () {
        var elapsed = this.state.elapsed;
        var _a = this.props, className = _a.className, time = _a.time;
        var value = (time || elapsed) / 1000;
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "elapsed-time " + className },
            value.toFixed(1),
            "s");
    };
    return ElapsedTime;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (ElapsedTime);


/***/ }),

/***/ "./public/app/features/explore/Error.tsx":
/*!***********************************************!*\
  !*** ./public/app/features/explore/Error.tsx ***!
  \***********************************************/
/*! exports provided: Alert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return Alert; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var Alert = function (props) {
    var message = props.message;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-group section" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-error alert" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "fa fa-exclamation-triangle" })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-body" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-title" }, message)))));
};


/***/ }),

/***/ "./public/app/features/explore/ErrorBoundary.tsx":
/*!*******************************************************!*\
  !*** ./public/app/features/explore/ErrorBoundary.tsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var ErrorBoundary = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { error: null, errorInfo: null };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.errorInfo) {
            // Error path
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "An unexpected error happened."),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("details", { style: { whiteSpace: 'pre-wrap' } },
                    this.state.error && this.state.error.toString(),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                    this.state.errorInfo.componentStack)));
        }
        // Normally, just render children
        return this.props.children;
    };
    return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (ErrorBoundary);


/***/ }),

/***/ "./public/app/features/explore/Explore.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/explore/Explore.tsx ***!
  \*************************************************/
/*! exports provided: Explore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Explore", function() { return Explore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/Select/DataSourcePicker */ "./public/app/core/components/Select/DataSourcePicker.tsx");
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");
/* harmony import */ var app_core_utils_emitter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/utils/emitter */ "./public/app/core/utils/emitter.ts");
/* harmony import */ var app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/utils/datemath */ "./public/app/core/utils/datemath.ts");
/* harmony import */ var _Panel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Panel */ "./public/app/features/explore/Panel.tsx");
/* harmony import */ var _QueryRows__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./QueryRows */ "./public/app/features/explore/QueryRows.tsx");
/* harmony import */ var _Graph__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Graph */ "./public/app/features/explore/Graph.tsx");
/* harmony import */ var _Logs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Logs */ "./public/app/features/explore/Logs.tsx");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Table */ "./public/app/features/explore/Table.tsx");
/* harmony import */ var _ErrorBoundary__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ErrorBoundary */ "./public/app/features/explore/ErrorBoundary.tsx");
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Error */ "./public/app/features/explore/Error.tsx");
/* harmony import */ var _TimePicker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./TimePicker */ "./public/app/features/explore/TimePicker.tsx");


















/**
 * Explore provides an area for quick query iteration for a given datasource.
 * Once a datasource is selected it populates the query section at the top.
 * When queries are run, their results are being displayed in the main section.
 * The datasource determines what kind of query editor it brings, and what kind
 * of results viewers it supports.
 *
 * QUERY HANDLING
 *
 * TLDR: to not re-render Explore during edits, query editing is not "controlled"
 * in a React sense: values need to be pushed down via `initialQueries`, while
 * edits travel up via `this.modifiedQueries`.
 *
 * By default the query rows start without prior state: `initialQueries` will
 * contain one empty DataQuery. While the user modifies the DataQuery, the
 * modifications are being tracked in `this.modifiedQueries`, which need to be
 * used whenever a query is sent to the datasource to reflect what the user sees
 * on the screen. Query"react-popper": "^0.7.5", rows can be initialized or reset using `initialQueries`,
 * by giving the respec"react-popper": "^0.7.5",tive row a new key. This wipes the old row and its state.
 * This property is als"react-popper": "^0.7.5",o used to govern how many query rows there are (minimum 1).
 *
 * This flow makes sure that a query row can be arbitrarily complex without the
 * fear of being wiped or re-initialized via props. The query row is free to keep
 * its own state while the user edits or builds a query. Valid queries can be sent
 * up to Explore via the `onChangeQuery` prop.
 *
 * DATASOURCE REQUESTS
 *
 * A click on Run Query creates transactions for all DataQueries for all expanded
 * result viewers. New runs are discarding previous runs. Upon completion a transaction
 * saves the result. The result viewers construct their data from the currently existing
 * transactions.
 *
 * The result viewers determine some of the query options sent to the datasource, e.g.,
 * `format`, to indicate eventual transformations by the datasources' result transformers.
 */
var Explore = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Explore, _super);
    function Explore(props) {
        var _this = _super.call(this, props) || this;
        _this.getRef = function (el) {
            _this.el = el;
        };
        _this.onAddQueryRow = function (index) {
            // Local cache
            _this.modifiedQueries[index + 1] = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateQueryKeys"])(index + 1));
            _this.setState(function (state) {
                var initialQueries = state.initialQueries, queryTransactions = state.queryTransactions;
                var nextQueries = initialQueries.slice(0, index + 1).concat([
                    tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.modifiedQueries[index + 1])
                ], initialQueries.slice(index + 1));
                // Ongoing transactions need to update their row indices
                var nextQueryTransactions = queryTransactions.map(function (qt) {
                    if (qt.rowIndex > index) {
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, qt, { rowIndex: qt.rowIndex + 1 });
                    }
                    return qt;
                });
                return {
                    initialQueries: nextQueries,
                    logsHighlighterExpressions: undefined,
                    queryTransactions: nextQueryTransactions,
                };
            });
        };
        _this.onChangeDatasource = function (option) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var origin, datasourceName, datasource;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        origin = this.state.datasource;
                        this.setState({
                            datasource: null,
                            datasourceError: null,
                            datasourceLoading: true,
                            queryTransactions: [],
                        });
                        datasourceName = option.value;
                        return [4 /*yield*/, this.props.datasourceSrv.get(datasourceName)];
                    case 1:
                        datasource = _a.sent();
                        this.setDatasource(datasource, origin);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onChangeQuery = function (value, index, override) {
            // Null value means reset
            if (value === null) {
                value = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateQueryKeys"])(index));
            }
            // Keep current value in local cache
            _this.modifiedQueries[index] = value;
            if (override) {
                _this.setState(function (state) {
                    // Replace query row by injecting new key
                    var initialQueries = state.initialQueries, queryTransactions = state.queryTransactions;
                    var query = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, value, Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateQueryKeys"])(index));
                    var nextQueries = initialQueries.slice();
                    nextQueries[index] = query;
                    _this.modifiedQueries = nextQueries.slice();
                    // Discard ongoing transaction related to row query
                    var nextQueryTransactions = queryTransactions.filter(function (qt) { return qt.rowIndex !== index; });
                    return {
                        initialQueries: nextQueries,
                        queryTransactions: nextQueryTransactions,
                    };
                }, _this.onSubmit);
            }
            else if (_this.state.datasource.getHighlighterExpression && _this.modifiedQueries.length === 1) {
                // Live preview of log search matches. Can only work on single row query for now
                _this.updateLogsHighlights(value);
            }
        };
        _this.onChangeTime = function (nextRange, scanning) {
            var range = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, nextRange);
            if (_this.state.scanning && !scanning) {
                _this.onStopScanning();
            }
            _this.setState({ range: range, scanning: scanning }, function () { return _this.onSubmit(); });
        };
        _this.onClickClear = function () {
            _this.onStopScanning();
            _this.modifiedQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["ensureQueries"])();
            _this.setState(function (prevState) { return ({
                initialQueries: _this.modifiedQueries.slice(),
                queryTransactions: [],
                showingStartPage: Boolean(prevState.StartPage),
            }); }, _this.saveState);
        };
        _this.onClickCloseSplit = function () {
            var onChangeSplit = _this.props.onChangeSplit;
            if (onChangeSplit) {
                onChangeSplit(false);
            }
        };
        _this.onClickGraphButton = function () {
            _this.setState(function (state) {
                var showingGraph = !state.showingGraph;
                var nextQueryTransactions = state.queryTransactions;
                if (!showingGraph) {
                    // Discard transactions related to Graph query
                    nextQueryTransactions = state.queryTransactions.filter(function (qt) { return qt.resultType !== 'Graph'; });
                }
                return { queryTransactions: nextQueryTransactions, showingGraph: showingGraph };
            }, function () {
                if (_this.state.showingGraph) {
                    _this.onSubmit();
                }
            });
        };
        _this.onClickLogsButton = function () {
            _this.setState(function (state) {
                var showingLogs = !state.showingLogs;
                var nextQueryTransactions = state.queryTransactions;
                if (!showingLogs) {
                    // Discard transactions related to Logs query
                    nextQueryTransactions = state.queryTransactions.filter(function (qt) { return qt.resultType !== 'Logs'; });
                }
                return { queryTransactions: nextQueryTransactions, showingLogs: showingLogs };
            }, function () {
                if (_this.state.showingLogs) {
                    _this.onSubmit();
                }
            });
        };
        // Use this in help pages to set page to a single query
        _this.onClickExample = function (query) {
            var nextQueries = [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, query, Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateQueryKeys"])())];
            _this.modifiedQueries = nextQueries.slice();
            _this.setState({ initialQueries: nextQueries }, _this.onSubmit);
        };
        _this.onClickSplit = function () {
            var onChangeSplit = _this.props.onChangeSplit;
            if (onChangeSplit) {
                var state = _this.cloneState();
                onChangeSplit(true, state);
            }
        };
        _this.onClickTableButton = function () {
            _this.setState(function (state) {
                var showingTable = !state.showingTable;
                if (showingTable) {
                    return { showingTable: showingTable, queryTransactions: state.queryTransactions };
                }
                // Toggle off needs discarding of table queries
                var nextQueryTransactions = state.queryTransactions.filter(function (qt) { return qt.resultType !== 'Table'; });
                var results = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["calculateResultsFromQueryTransactions"])(nextQueryTransactions, state.datasource, state.graphInterval);
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, results, { queryTransactions: nextQueryTransactions, showingTable: showingTable });
            }, function () {
                if (_this.state.showingTable) {
                    _this.onSubmit();
                }
            });
        };
        _this.onClickLabel = function (key, value) {
            _this.onModifyQueries({ type: 'ADD_FILTER', key: key, value: value });
        };
        _this.onModifyQueries = function (action, index) {
            var datasource = _this.state.datasource;
            if (datasource && datasource.modifyQuery) {
                var preventSubmit_1 = action.preventSubmit;
                _this.setState(function (state) {
                    var initialQueries = state.initialQueries, queryTransactions = state.queryTransactions;
                    var nextQueries;
                    var nextQueryTransactions;
                    if (index === undefined) {
                        // Modify all queries
                        nextQueries = initialQueries.map(function (query, i) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, datasource.modifyQuery(_this.modifiedQueries[i], action), Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateQueryKeys"])(i))); });
                        // Discard all ongoing transactions
                        nextQueryTransactions = [];
                    }
                    else {
                        // Modify query only at index
                        nextQueries = initialQueries.map(function (query, i) {
                            // Synchronise all queries with local query cache to ensure consistency
                            // TODO still needed?
                            return i === index
                                ? tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, datasource.modifyQuery(_this.modifiedQueries[i], action), Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateQueryKeys"])(i)) : query;
                        });
                        nextQueryTransactions = queryTransactions
                            // Consume the hint corresponding to the action
                            .map(function (qt) {
                            if (qt.hints != null && qt.rowIndex === index) {
                                qt.hints = qt.hints.filter(function (hint) { return hint.fix.action !== action; });
                            }
                            return qt;
                        })
                            // Preserve previous row query transaction to keep results visible if next query is incomplete
                            .filter(function (qt) { return preventSubmit_1 || qt.rowIndex !== index; });
                    }
                    _this.modifiedQueries = nextQueries.slice();
                    return {
                        initialQueries: nextQueries,
                        queryTransactions: nextQueryTransactions,
                    };
                }, 
                // Accepting certain fixes do not result in a well-formed query which should not be submitted
                !preventSubmit_1 ? function () { return _this.onSubmit(); } : null);
            }
        };
        _this.onRemoveQueryRow = function (index) {
            // Remove from local cache
            _this.modifiedQueries = _this.modifiedQueries.slice(0, index).concat(_this.modifiedQueries.slice(index + 1));
            _this.setState(function (state) {
                var initialQueries = state.initialQueries, queryTransactions = state.queryTransactions;
                if (initialQueries.length <= 1) {
                    return null;
                }
                // Remove row from react state
                var nextQueries = initialQueries.slice(0, index).concat(initialQueries.slice(index + 1));
                // Discard transactions related to row query
                var nextQueryTransactions = queryTransactions.filter(function (qt) { return qt.rowIndex !== index; });
                var results = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["calculateResultsFromQueryTransactions"])(nextQueryTransactions, state.datasource, state.graphInterval);
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, results, { initialQueries: nextQueries, logsHighlighterExpressions: undefined, queryTransactions: nextQueryTransactions });
            }, function () { return _this.onSubmit(); });
        };
        _this.onStartScanning = function () {
            _this.setState({ scanning: true }, _this.scanPreviousRange);
        };
        _this.scanPreviousRange = function () {
            var scanRange = _this.timepickerRef.current.move(-1, true);
            _this.setState({ scanRange: scanRange });
        };
        _this.onStopScanning = function () {
            clearTimeout(_this.scanTimer);
            _this.setState(function (state) {
                var queryTransactions = state.queryTransactions;
                var nextQueryTransactions = queryTransactions.filter(function (qt) { return qt.scanning && !qt.done; });
                return { queryTransactions: nextQueryTransactions, scanning: false, scanRange: undefined };
            });
        };
        _this.onSubmit = function () {
            var _a = _this.state, showingLogs = _a.showingLogs, showingGraph = _a.showingGraph, showingTable = _a.showingTable, supportsGraph = _a.supportsGraph, supportsLogs = _a.supportsLogs, supportsTable = _a.supportsTable;
            // Keep table queries first since they need to return quickly
            if (showingTable && supportsTable) {
                _this.runQueries('Table', {
                    format: 'table',
                    instant: true,
                    valueWithRefId: true,
                }, function (data) { return data[0]; });
            }
            if (showingGraph && supportsGraph) {
                _this.runQueries('Graph', {
                    format: 'time_series',
                    instant: false,
                }, app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["makeTimeSeriesList"]);
            }
            if (showingLogs && supportsLogs) {
                _this.runQueries('Logs', { format: 'logs' });
            }
            _this.saveState();
        };
        _this.updateLogsHighlights = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.debounce(function (value, index) {
            _this.setState(function (state) {
                var datasource = state.datasource;
                if (datasource.getHighlighterExpression) {
                    var logsHighlighterExpressions = [state.datasource.getHighlighterExpression(value)];
                    return { logsHighlighterExpressions: logsHighlighterExpressions };
                }
                return null;
            });
        }, 500);
        _this.saveState = function () {
            var _a = _this.props, stateKey = _a.stateKey, onSaveState = _a.onSaveState;
            onSaveState(stateKey, _this.cloneState());
        };
        var splitState = props.splitState;
        var initialQueries;
        if (splitState) {
            // Split state overrides everything
            _this.state = splitState;
            initialQueries = splitState.initialQueries;
        }
        else {
            var _a = props.urlState, datasource = _a.datasource, queries = _a.queries, range = _a.range;
            initialQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["ensureQueries"])(queries);
            var initialRange = { from: Object(_TimePicker__WEBPACK_IMPORTED_MODULE_17__["parseTime"])(range.from), to: Object(_TimePicker__WEBPACK_IMPORTED_MODULE_17__["parseTime"])(range.to) } || tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["DEFAULT_RANGE"]);
            // Millies step for helper bar charts
            var initialGraphInterval = 15 * 1000;
            _this.state = {
                datasource: null,
                datasourceError: null,
                datasourceLoading: null,
                datasourceMissing: false,
                datasourceName: datasource,
                exploreDatasources: [],
                graphInterval: initialGraphInterval,
                graphResult: [],
                initialQueries: initialQueries,
                history: [],
                logsResult: null,
                queryTransactions: [],
                range: initialRange,
                scanning: false,
                showingGraph: true,
                showingLogs: true,
                showingStartPage: false,
                showingTable: true,
                supportsGraph: null,
                supportsLogs: null,
                supportsTable: null,
                tableResult: new app_core_table_model__WEBPACK_IMPORTED_MODULE_7__["default"](),
            };
        }
        _this.modifiedQueries = initialQueries.slice();
        _this.exploreEvents = new app_core_utils_emitter__WEBPACK_IMPORTED_MODULE_8__["Emitter"]();
        _this.timepickerRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();
        return _this;
    }
    Explore.prototype.componentDidMount = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var datasourceSrv, datasourceName, datasources, exploreDatasources, datasource;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datasourceSrv = this.props.datasourceSrv;
                        datasourceName = this.state.datasourceName;
                        if (!datasourceSrv) {
                            throw new Error('No datasource service passed as props.');
                        }
                        datasources = datasourceSrv.getExternal();
                        exploreDatasources = datasources.map(function (ds) { return ({
                            value: ds.name,
                            name: ds.name,
                            meta: ds.meta,
                        }); });
                        if (!(datasources.length > 0)) return [3 /*break*/, 6];
                        this.setState({ datasourceLoading: true, exploreDatasources: exploreDatasources });
                        datasource = void 0;
                        if (!datasourceName) return [3 /*break*/, 2];
                        return [4 /*yield*/, datasourceSrv.get(datasourceName)];
                    case 1:
                        datasource = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, datasourceSrv.get()];
                    case 3:
                        datasource = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.setDatasource(datasource)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        this.setState({ datasourceMissing: true });
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Explore.prototype.componentWillUnmount = function () {
        this.exploreEvents.removeAllListeners();
        clearTimeout(this.scanTimer);
    };
    Explore.prototype.setDatasource = function (datasource, origin) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, initialQueries, range, supportsGraph, supportsLogs, supportsTable, datasourceId, datasourceError, testResult, error_1, historyKey, history, modifiedQueries, nextQueries, StartPage, graphInterval;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.state, initialQueries = _a.initialQueries, range = _a.range;
                        supportsGraph = datasource.meta.metrics;
                        supportsLogs = datasource.meta.logs;
                        supportsTable = datasource.meta.tables;
                        datasourceId = datasource.meta.id;
                        datasourceError = null;
                        // Keep ID to track selection
                        this.requestedDatasourceId = datasourceId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, datasource.testDatasource()];
                    case 2:
                        testResult = _b.sent();
                        datasourceError = testResult.status === 'success' ? null : testResult.message;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        datasourceError = (error_1 && error_1.statusText) || 'Network error';
                        return [3 /*break*/, 4];
                    case 4:
                        if (datasourceId !== this.requestedDatasourceId) {
                            // User already changed datasource again, discard results
                            return [2 /*return*/];
                        }
                        historyKey = "grafana.explore.history." + datasourceId;
                        history = app_core_store__WEBPACK_IMPORTED_MODULE_4__["default"].getObject(historyKey, []);
                        if (datasource.init) {
                            datasource.init();
                        }
                        modifiedQueries = this.modifiedQueries;
                        if (!origin) return [3 /*break*/, 8];
                        if (!(origin.meta.id === datasource.meta.id)) return [3 /*break*/, 5];
                        // Keep same queries if same type of datasource
                        modifiedQueries = this.modifiedQueries.slice();
                        return [3 /*break*/, 8];
                    case 5:
                        if (!datasource.importQueries) return [3 /*break*/, 7];
                        return [4 /*yield*/, datasource.importQueries(this.modifiedQueries, origin.meta)];
                    case 6:
                        // Datasource-specific importers
                        modifiedQueries = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        // Default is blank queries
                        modifiedQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["ensureQueries"])();
                        _b.label = 8;
                    case 8:
                        nextQueries = initialQueries.map(function (q, i) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, modifiedQueries[i], Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateQueryKeys"])(i))); });
                        this.modifiedQueries = modifiedQueries;
                        StartPage = datasource.pluginExports.ExploreStartPage;
                        graphInterval = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["getIntervals"])(range, datasource, this.el ? this.el.offsetWidth : 0).intervalMs;
                        this.setState({
                            StartPage: StartPage,
                            datasource: datasource,
                            datasourceError: datasourceError,
                            graphInterval: graphInterval,
                            history: history,
                            supportsGraph: supportsGraph,
                            supportsLogs: supportsLogs,
                            supportsTable: supportsTable,
                            datasourceLoading: false,
                            datasourceName: datasource.name,
                            initialQueries: nextQueries,
                            logsHighlighterExpressions: undefined,
                            showingStartPage: Boolean(StartPage),
                        }, function () {
                            if (datasourceError === null) {
                                _this.onSubmit();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Explore.prototype.buildQueryOptions = function (query, queryOptions) {
        var _a = this.state, datasource = _a.datasource, range = _a.range;
        var _b = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["getIntervals"])(range, datasource, this.el.offsetWidth), interval = _b.interval, intervalMs = _b.intervalMs;
        var configuredQueries = [
            tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, query, queryOptions),
        ];
        // Clone range for query request
        // const queryRange: RawTimeRange = { ...range };
        // const { from, to, raw } = this.timeSrv.timeRange();
        // Datasource is using `panelId + query.refId` for cancellation logic.
        // Using `format` here because it relates to the view panel that the request is for.
        var panelId = queryOptions.format;
        return {
            interval: interval,
            intervalMs: intervalMs,
            panelId: panelId,
            targets: configuredQueries,
            range: {
                from: app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_9__["parse"](range.from, false),
                to: app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_9__["parse"](range.to, true),
                raw: range,
            },
            rangeRaw: range,
            scopedVars: {
                __interval: { text: interval, value: interval },
                __interval_ms: { text: intervalMs, value: intervalMs },
            },
        };
    };
    Explore.prototype.startQueryTransaction = function (query, rowIndex, resultType, options) {
        var queryOptions = this.buildQueryOptions(query, options);
        var transaction = {
            query: query,
            resultType: resultType,
            rowIndex: rowIndex,
            id: Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateKey"])(),
            done: false,
            latency: 0,
            options: queryOptions,
            scanning: this.state.scanning,
        };
        // Using updater style because we might be modifying queryTransactions in quick succession
        this.setState(function (state) {
            var queryTransactions = state.queryTransactions;
            // Discarding existing transactions of same type
            var remainingTransactions = queryTransactions.filter(function (qt) { return !(qt.resultType === resultType && qt.rowIndex === rowIndex); });
            // Append new transaction
            var nextQueryTransactions = remainingTransactions.concat([transaction]);
            var results = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["calculateResultsFromQueryTransactions"])(nextQueryTransactions, state.datasource, state.graphInterval);
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, results, { queryTransactions: nextQueryTransactions, showingStartPage: false, graphInterval: queryOptions.intervalMs });
        });
        return transaction;
    };
    Explore.prototype.completeQueryTransaction = function (transactionId, result, latency, queries, datasourceId) {
        var _this = this;
        var datasource = this.state.datasource;
        if (datasource.meta.id !== datasourceId) {
            // Navigated away, queries did not matter
            return;
        }
        this.setState(function (state) {
            var history = state.history, queryTransactions = state.queryTransactions;
            var scanning = state.scanning;
            // Transaction might have been discarded
            var transaction = queryTransactions.find(function (qt) { return qt.id === transactionId; });
            if (!transaction) {
                return null;
            }
            // Get query hints
            var hints;
            if (datasource.getQueryHints) {
                hints = datasource.getQueryHints(transaction.query, result);
            }
            // Mark transactions as complete
            var nextQueryTransactions = queryTransactions.map(function (qt) {
                if (qt.id === transactionId) {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, qt, { hints: hints,
                        latency: latency,
                        result: result, done: true });
                }
                return qt;
            });
            var results = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["calculateResultsFromQueryTransactions"])(nextQueryTransactions, state.datasource, state.graphInterval);
            var nextHistory = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["updateHistory"])(history, datasourceId, queries);
            // Keep scanning for results if this was the last scanning transaction
            if (scanning) {
                if (lodash__WEBPACK_IMPORTED_MODULE_3___default.a.size(result) === 0) {
                    var other = nextQueryTransactions.find(function (qt) { return qt.scanning && !qt.done; });
                    if (!other) {
                        _this.scanTimer = setTimeout(_this.scanPreviousRange, 1000);
                    }
                }
                else {
                    // We can stop scanning if we have a result
                    scanning = false;
                }
            }
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, results, { scanning: scanning, history: nextHistory, queryTransactions: nextQueryTransactions });
        });
    };
    Explore.prototype.failQueryTransaction = function (transactionId, response, datasourceId) {
        var datasource = this.state.datasource;
        if (datasource.meta.id !== datasourceId || response.cancelled) {
            // Navigated away, queries did not matter
            return;
        }
        console.error(response);
        var error;
        if (response.data) {
            if (typeof response.data === 'string') {
                error = response.data;
            }
            else if (response.data.error) {
                error = response.data.error;
                if (response.data.response) {
                    error = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, response.data.error),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("details", null, response.data.response)));
                }
            }
            else {
                throw new Error('Could not handle error response');
            }
        }
        else if (response.message) {
            error = response.message;
        }
        else if (typeof response === 'string') {
            error = response;
        }
        else {
            error = 'Unknown error during query transaction. Please check JS console logs.';
        }
        this.setState(function (state) {
            // Transaction might have been discarded
            if (!state.queryTransactions.find(function (qt) { return qt.id === transactionId; })) {
                return null;
            }
            // Mark transactions as complete
            var nextQueryTransactions = state.queryTransactions.map(function (qt) {
                if (qt.id === transactionId) {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, qt, { error: error, done: true });
                }
                return qt;
            });
            return {
                queryTransactions: nextQueryTransactions,
            };
        });
    };
    Explore.prototype.runQueries = function (resultType, queryOptions, resultGetter) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var queries, datasource, datasourceId;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                queries = this.modifiedQueries.slice();
                if (!Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["hasNonEmptyQuery"])(queries)) {
                    this.setState({
                        queryTransactions: [],
                    });
                    return [2 /*return*/];
                }
                datasource = this.state.datasource;
                datasourceId = datasource.meta.id;
                // Run all queries concurrentlyso
                queries.forEach(function (query, rowIndex) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    var transaction, now, res, latency, results, response_1;
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                transaction = this.startQueryTransaction(query, rowIndex, resultType, queryOptions);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                now = Date.now();
                                return [4 /*yield*/, datasource.query(transaction.options)];
                            case 2:
                                res = _a.sent();
                                this.exploreEvents.emit('data-received', res.data || []);
                                latency = Date.now() - now;
                                results = resultGetter ? resultGetter(res.data) : res.data;
                                this.completeQueryTransaction(transaction.id, results, latency, queries, datasourceId);
                                return [3 /*break*/, 4];
                            case 3:
                                response_1 = _a.sent();
                                this.exploreEvents.emit('data-error', response_1);
                                this.failQueryTransaction(transaction.id, response_1, datasourceId);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Explore.prototype.cloneState = function () {
        // Copy state, but copy queries including modifications
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.state, { queryTransactions: [], initialQueries: this.modifiedQueries.slice() });
    };
    Explore.prototype.render = function () {
        var _a = this.props, position = _a.position, split = _a.split;
        var _b = this.state, StartPage = _b.StartPage, datasource = _b.datasource, datasourceError = _b.datasourceError, datasourceLoading = _b.datasourceLoading, datasourceMissing = _b.datasourceMissing, exploreDatasources = _b.exploreDatasources, graphResult = _b.graphResult, history = _b.history, initialQueries = _b.initialQueries, logsHighlighterExpressions = _b.logsHighlighterExpressions, logsResult = _b.logsResult, queryTransactions = _b.queryTransactions, range = _b.range, scanning = _b.scanning, scanRange = _b.scanRange, showingGraph = _b.showingGraph, showingLogs = _b.showingLogs, showingStartPage = _b.showingStartPage, showingTable = _b.showingTable, supportsGraph = _b.supportsGraph, supportsLogs = _b.supportsLogs, supportsTable = _b.supportsTable, tableResult = _b.tableResult;
        var graphHeight = showingGraph && showingTable ? '200px' : '400px';
        var exploreClass = split ? 'explore explore-split' : 'explore';
        var selectedDatasource = datasource ? exploreDatasources.find(function (d) { return d.name === datasource.name; }) : undefined;
        var graphLoading = queryTransactions.some(function (qt) { return qt.resultType === 'Graph' && !qt.done; });
        var tableLoading = queryTransactions.some(function (qt) { return qt.resultType === 'Table' && !qt.done; });
        var logsLoading = queryTransactions.some(function (qt) { return qt.resultType === 'Logs' && !qt.done; });
        var loading = queryTransactions.some(function (qt) { return !qt.done; });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: exploreClass, ref: this.getRef },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "navbar" },
                position === 'left' ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "navbar-page-btn" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-rocket" }),
                        "Explore"))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "navbar-buttons explore-first-button" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button", onClick: this.onClickCloseSplit }, "Close Split"))),
                !datasourceMissing ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "navbar-buttons" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_6__["DataSourcePicker"], { onChange: this.onChangeDatasource, datasources: exploreDatasources, current: selectedDatasource }))) : null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "navbar__spacer" }),
                position === 'left' && !split ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "navbar-buttons" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button", onClick: this.onClickSplit }, "Split"))) : null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TimePicker__WEBPACK_IMPORTED_MODULE_17__["default"], { ref: this.timepickerRef, range: range, onChangeTime: this.onChangeTime }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "navbar-buttons" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--no-icon", onClick: this.onClickClear }, "Clear All")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "navbar-buttons relative" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--primary", onClick: this.onSubmit },
                        "Run Query",
                        ' ',
                        loading ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-spinner fa-spin run-icon" }) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-level-down run-icon" })))),
            datasourceLoading ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" }, "Loading datasource...") : null,
            datasourceMissing ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" }, "Please add a datasource that supports Explore (e.g., Prometheus).")) : null,
            datasourceError && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Error__WEBPACK_IMPORTED_MODULE_16__["Alert"], { message: "Error connecting to datasource: " + datasourceError }))),
            datasource && !datasourceError ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryRows__WEBPACK_IMPORTED_MODULE_11__["default"], { datasource: datasource, history: history, initialQueries: initialQueries, onAddQueryRow: this.onAddQueryRow, onChangeQuery: this.onChangeQuery, onClickHintFix: this.onModifyQueries, onExecuteQuery: this.onSubmit, onRemoveQueryRow: this.onRemoveQueryRow, transactions: queryTransactions, exploreEvents: this.exploreEvents, range: range }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", { className: "m-t-2" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ErrorBoundary__WEBPACK_IMPORTED_MODULE_15__["default"], null,
                        showingStartPage && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StartPage, { onClickExample: this.onClickExample }),
                        !showingStartPage && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                            supportsGraph && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Panel__WEBPACK_IMPORTED_MODULE_10__["default"], { label: "Graph", isOpen: showingGraph, loading: graphLoading, onToggle: this.onClickGraphButton },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Graph__WEBPACK_IMPORTED_MODULE_12__["default"], { data: graphResult, height: graphHeight, id: "explore-graph-" + position, onChangeTime: this.onChangeTime, range: range, split: split }))),
                            supportsTable && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Panel__WEBPACK_IMPORTED_MODULE_10__["default"], { label: "Table", loading: tableLoading, isOpen: showingTable, onToggle: this.onClickTableButton },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Table__WEBPACK_IMPORTED_MODULE_14__["default"], { data: tableResult, loading: tableLoading, onClickCell: this.onClickLabel }))),
                            supportsLogs && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Panel__WEBPACK_IMPORTED_MODULE_10__["default"], { label: "Logs", loading: logsLoading, isOpen: showingLogs, onToggle: this.onClickLogsButton },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Logs__WEBPACK_IMPORTED_MODULE_13__["default"], { data: logsResult, key: logsResult.id, highlighterExpressions: logsHighlighterExpressions, loading: logsLoading, position: position, onChangeTime: this.onChangeTime, onClickLabel: this.onClickLabel, onStartScanning: this.onStartScanning, onStopScanning: this.onStopScanning, range: range, scanning: scanning, scanRange: scanRange }))))))))) : null));
    };
    return Explore;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Explore));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/Graph.tsx":
/*!***********************************************!*\
  !*** ./public/app/features/explore/Graph.tsx ***!
  \***********************************************/
/*! exports provided: Graph, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graph", function() { return Graph; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_sizeme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-sizeme */ "./node_modules/react-sizeme/dist/react-sizeme.js");
/* harmony import */ var react_sizeme__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_sizeme__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vendor_flot_jquery_flot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vendor/flot/jquery.flot */ "./public/vendor/flot/jquery.flot.js");
/* harmony import */ var vendor_flot_jquery_flot__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vendor_flot_jquery_flot__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vendor_flot_jquery_flot_time__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vendor/flot/jquery.flot.time */ "./public/vendor/flot/jquery.flot.time.js");
/* harmony import */ var vendor_flot_jquery_flot_time__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vendor_flot_jquery_flot_time__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vendor_flot_jquery_flot_selection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vendor/flot/jquery.flot.selection */ "./public/vendor/flot/jquery.flot.selection.js");
/* harmony import */ var vendor_flot_jquery_flot_selection__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vendor_flot_jquery_flot_selection__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var vendor_flot_jquery_flot_stack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vendor/flot/jquery.flot.stack */ "./public/vendor/flot/jquery.flot.stack.js");
/* harmony import */ var vendor_flot_jquery_flot_stack__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(vendor_flot_jquery_flot_stack__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/utils/datemath */ "./public/app/core/utils/datemath.ts");
/* harmony import */ var _Legend__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Legend */ "./public/app/features/explore/Legend.tsx");
/* harmony import */ var _utils_set__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/set */ "./public/app/features/explore/utils/set.ts");












var MAX_NUMBER_OF_TIME_SERIES = 20;
// Copied from graph.ts
function time_format(ticks, min, max) {
    if (min && max && ticks) {
        var range = max - min;
        var secPerTick = range / ticks / 1000;
        var oneDay = 86400000;
        var oneYear = 31536000000;
        if (secPerTick <= 45) {
            return '%H:%M:%S';
        }
        if (secPerTick <= 7200 || range <= oneDay) {
            return '%H:%M';
        }
        if (secPerTick <= 80000) {
            return '%m/%d %H:%M';
        }
        if (secPerTick <= 2419200 || range <= oneYear) {
            return '%m/%d';
        }
        return '%Y-%m';
    }
    return '%H:%M';
}
var FLOT_OPTIONS = {
    legend: {
        show: false,
    },
    series: {
        lines: {
            linewidth: 1,
            zero: false,
        },
        shadowSize: 0,
    },
    grid: {
        minBorderMargin: 0,
        markings: [],
        backgroundColor: null,
        borderWidth: 0,
        // hoverable: true,
        clickable: true,
        color: '#a1a1a1',
        margin: { left: 0, right: 0 },
        labelMarginX: 0,
    },
    selection: {
        mode: 'x',
        color: '#666',
    },
};
var Graph = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Graph, _super);
    function Graph() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dynamicOptions = null;
        _this.state = {
            hiddenSeries: new Set(),
            showAllTimeSeries: false,
        };
        _this.onPlotSelected = function (event, ranges) {
            if (_this.props.onChangeTime) {
                var range = {
                    from: moment__WEBPACK_IMPORTED_MODULE_3___default()(ranges.xaxis.from),
                    to: moment__WEBPACK_IMPORTED_MODULE_3___default()(ranges.xaxis.to),
                };
                _this.props.onChangeTime(range);
            }
        };
        _this.onShowAllTimeSeries = function () {
            _this.setState({
                showAllTimeSeries: true,
            }, _this.draw);
        };
        _this.onToggleSeries = function (series, exclusive) {
            _this.setState(function (state, props) {
                var data = props.data, onToggleSeries = props.onToggleSeries;
                var hiddenSeries = state.hiddenSeries;
                // Deduplicate series as visibility tracks the alias property
                var oneSeriesVisible = hiddenSeries.size === new Set(data.map(function (d) { return d.alias; })).size - 1;
                var nextHiddenSeries = new Set();
                if (exclusive) {
                    if (hiddenSeries.has(series.alias) || !oneSeriesVisible) {
                        nextHiddenSeries = new Set(data.filter(function (d) { return d.alias !== series.alias; }).map(function (d) { return d.alias; }));
                    }
                }
                else {
                    // Prune hidden series no longer part of those available from the most recent query
                    var availableSeries = new Set(data.map(function (d) { return d.alias; }));
                    nextHiddenSeries = Object(_utils_set__WEBPACK_IMPORTED_MODULE_11__["intersect"])(new Set(hiddenSeries), availableSeries);
                    if (nextHiddenSeries.has(series.alias)) {
                        nextHiddenSeries.delete(series.alias);
                    }
                    else {
                        nextHiddenSeries.add(series.alias);
                    }
                }
                if (onToggleSeries) {
                    onToggleSeries(series.alias, nextHiddenSeries);
                }
                return {
                    hiddenSeries: nextHiddenSeries,
                };
            }, _this.draw);
        };
        return _this;
    }
    Graph.prototype.getGraphData = function () {
        var data = this.props.data;
        return this.state.showAllTimeSeries ? data : data.slice(0, MAX_NUMBER_OF_TIME_SERIES);
    };
    Graph.prototype.componentDidMount = function () {
        this.draw();
        this.$el = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#" + this.props.id);
        this.$el.bind('plotselected', this.onPlotSelected);
    };
    Graph.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.data !== this.props.data ||
            prevProps.range !== this.props.range ||
            prevProps.split !== this.props.split ||
            prevProps.height !== this.props.height ||
            (prevProps.size && prevProps.size.width !== this.props.size.width) ||
            !Object(_utils_set__WEBPACK_IMPORTED_MODULE_11__["equal"])(prevState.hiddenSeries, this.state.hiddenSeries)) {
            this.draw();
        }
    };
    Graph.prototype.componentWillUnmount = function () {
        this.$el.unbind('plotselected', this.onPlotSelected);
    };
    Graph.prototype.getDynamicOptions = function () {
        var _a = this.props, range = _a.range, size = _a.size;
        var ticks = (size.width || 0) / 100;
        var from = range.from, to = range.to;
        if (!moment__WEBPACK_IMPORTED_MODULE_3___default.a.isMoment(from)) {
            from = app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_9__["parse"](from, false);
        }
        if (!moment__WEBPACK_IMPORTED_MODULE_3___default.a.isMoment(to)) {
            to = app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_9__["parse"](to, true);
        }
        var min = from.valueOf();
        var max = to.valueOf();
        return {
            xaxis: {
                mode: 'time',
                min: min,
                max: max,
                label: 'Datetime',
                ticks: ticks,
                timezone: 'browser',
                timeformat: time_format(ticks, min, max),
            },
        };
    };
    Graph.prototype.draw = function () {
        var _a = this.props.userOptions, userOptions = _a === void 0 ? {} : _a;
        var hiddenSeries = this.state.hiddenSeries;
        var data = this.getGraphData();
        var $el = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#" + this.props.id);
        var series = [{ data: [[0, 0]] }];
        if (data && data.length > 0) {
            series = data.filter(function (ts) { return !hiddenSeries.has(ts.alias); }).map(function (ts) { return ({
                color: ts.color,
                label: ts.label,
                data: ts.getFlotPairs('null'),
            }); });
        }
        this.dynamicOptions = this.getDynamicOptions();
        var options = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, FLOT_OPTIONS, this.dynamicOptions, userOptions);
        jquery__WEBPACK_IMPORTED_MODULE_1___default.a.plot($el, series, options);
    };
    Graph.prototype.render = function () {
        var _a = this.props, _b = _a.height, height = _b === void 0 ? '100px' : _b, _c = _a.id, id = _c === void 0 ? 'graph' : _c;
        var hiddenSeries = this.state.hiddenSeries;
        var data = this.getGraphData();
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
            this.props.data &&
                this.props.data.length > MAX_NUMBER_OF_TIME_SERIES &&
                !this.state.showAllTimeSeries && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "time-series-disclaimer" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-fw fa-warning disclaimer-icon" }), "Showing only " + MAX_NUMBER_OF_TIME_SERIES + " time series. ",
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: "show-all-time-series", onClick: this.onShowAllTimeSeries }, "Show all " + this.props.data.length))),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { id: id, className: "explore-graph", style: { height: height } }),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Legend__WEBPACK_IMPORTED_MODULE_10__["default"], { data: data, hiddenSeries: hiddenSeries, onToggleSeries: this.onToggleSeries })));
    };
    return Graph;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_sizeme__WEBPACK_IMPORTED_MODULE_4__["withSize"])()(Graph));


/***/ }),

/***/ "./public/app/features/explore/Legend.tsx":
/*!************************************************!*\
  !*** ./public/app/features/explore/Legend.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



var LegendItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LegendItem, _super);
    function LegendItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickLabel = function (e) { return _this.props.onClickLabel(_this.props.series, e); };
        return _this;
    }
    LegendItem.prototype.render = function () {
        var _a = this.props, hidden = _a.hidden, series = _a.series;
        var seriesClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            'graph-legend-series-hidden': hidden,
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "graph-legend-series " + seriesClasses },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "graph-legend-icon" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-minus pointer", style: { color: series.color } })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "graph-legend-alias pointer", title: series.alias, onClick: this.onClickLabel }, series.alias)));
    };
    return LegendItem;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var Legend = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Legend, _super);
    function Legend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickLabel = function (series, event) {
            var onToggleSeries = _this.props.onToggleSeries;
            var exclusive = event.ctrlKey || event.metaKey || event.shiftKey;
            onToggleSeries(series, !exclusive);
        };
        return _this;
    }
    Legend.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, hiddenSeries = _a.hiddenSeries;
        var items = data || [];
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "graph-legend ps" }, items.map(function (series, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LegendItem, { hidden: hiddenSeries.has(series.alias), 
            // Workaround to resolve conflicts since series visibility tracks the alias property
            key: series.id + "-" + i, onClickLabel: _this.onClickLabel, series: series })); })));
    };
    Legend.defaultProps = {
        onToggleSeries: function () { },
    };
    return Legend;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Legend);


/***/ }),

/***/ "./public/app/features/explore/LogLabels.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/explore/LogLabels.tsx ***!
  \***************************************************/
/*! exports provided: Stats, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stats", function() { return Stats; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");




function StatsRow(_a) {
    var active = _a.active, count = _a.count, proportion = _a.proportion, value = _a.value;
    var percent = Math.round(proportion * 100) + "%";
    var barStyle = { width: percent };
    var className = classnames__WEBPACK_IMPORTED_MODULE_2___default()('logs-stats-row', { 'logs-stats-row--active': active });
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__label" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__value" }, value),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__count" }, count),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__percent" }, percent)),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__bar" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__innerbar", style: barStyle }))));
}
var STATS_ROW_LIMIT = 5;
var Stats = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Stats, _super);
    function Stats() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stats.prototype.render = function () {
        var _a = this.props, label = _a.label, rowCount = _a.rowCount, stats = _a.stats, value = _a.value, onClickClose = _a.onClickClose;
        var topRows = stats.slice(0, STATS_ROW_LIMIT);
        var activeRow = topRows.find(function (row) { return row.value === value; });
        var otherRows = stats.slice(STATS_ROW_LIMIT);
        var insertActiveRow = !activeRow;
        // Remove active row from other to show extra
        if (insertActiveRow) {
            activeRow = otherRows.find(function (row) { return row.value === value; });
            otherRows = otherRows.filter(function (row) { return row.value !== value; });
        }
        var otherCount = otherRows.reduce(function (sum, row) { return sum + row.count; }, 0);
        var topCount = topRows.reduce(function (sum, row) { return sum + row.count; }, 0);
        var total = topCount + otherCount;
        var otherProportion = otherCount / total;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats__header" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-stats__title" },
                    label,
                    ": ",
                    total,
                    " of ",
                    rowCount,
                    " rows have that label"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-stats__close fa fa-remove", onClick: onClickClose })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats__body" },
                topRows.map(function (stat) { return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StatsRow, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ key: stat.value }, stat, { active: stat.value === value })); }),
                insertActiveRow && activeRow && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StatsRow, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ key: activeRow.value }, activeRow, { active: true })),
                otherCount > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StatsRow, { key: "__OTHERS__", count: otherCount, value: "Other", proportion: otherProportion })))));
    };
    return Stats;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var Label = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            stats: null,
            showStats: false,
        };
        _this.onClickClose = function () {
            _this.setState({ showStats: false });
        };
        _this.onClickLabel = function () {
            var _a = _this.props, onClickLabel = _a.onClickLabel, label = _a.label, value = _a.value;
            if (onClickLabel) {
                onClickLabel(label, value);
            }
        };
        _this.onClickStats = function () {
            _this.setState(function (state) {
                if (state.showStats) {
                    return { showStats: false, stats: null };
                }
                var allRows = _this.props.getRows();
                var stats = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_3__["calculateLogsLabelStats"])(allRows, _this.props.label);
                return { showStats: true, stats: stats };
            });
        };
        return _this;
    }
    Label.prototype.render = function () {
        var _a = this.props, getRows = _a.getRows, label = _a.label, plain = _a.plain, value = _a.value;
        var _b = this.state, showStats = _b.showStats, stats = _b.stats;
        var tooltip = label + ": " + value;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-label" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-label__value", title: tooltip }, value),
            !plain && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { title: "Filter for label", onClick: this.onClickLabel, className: "logs-label__icon fa fa-search-plus" })),
            !plain && getRows && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { onClick: this.onClickStats, className: "logs-label__icon fa fa-signal" }),
            showStats && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-label__stats" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Stats, { stats: stats, rowCount: getRows().length, label: label, value: value, onClickClose: this.onClickClose })))));
    };
    return Label;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var LogLabels = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LogLabels, _super);
    function LogLabels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogLabels.prototype.render = function () {
        var _a = this.props, getRows = _a.getRows, labels = _a.labels, onClickLabel = _a.onClickLabel, plain = _a.plain;
        return Object.keys(labels).map(function (key) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Label, { key: key, getRows: getRows, label: key, value: labels[key], plain: plain, onClickLabel: onClickLabel })); });
    };
    return LogLabels;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (LogLabels);


/***/ }),

/***/ "./public/app/features/explore/Logs.tsx":
/*!**********************************************!*\
  !*** ./public/app/features/explore/Logs.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-highlight-words */ "./node_modules/react-highlight-words/dist/main.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_highlight_words__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/rangeutil */ "./public/app/core/utils/rangeutil.ts");
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");
/* harmony import */ var app_core_utils_text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/utils/text */ "./public/app/core/utils/text.ts");
/* harmony import */ var app_core_components_Switch_Switch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/components/Switch/Switch */ "./public/app/core/components/Switch/Switch.tsx");
/* harmony import */ var app_core_components_ToggleButtonGroup_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/components/ToggleButtonGroup/ToggleButtonGroup */ "./public/app/core/components/ToggleButtonGroup/ToggleButtonGroup.tsx");
/* harmony import */ var _Graph__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Graph */ "./public/app/features/explore/Graph.tsx");
/* harmony import */ var _LogLabels__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./LogLabels */ "./public/app/features/explore/LogLabels.tsx");












var PREVIEW_LIMIT = 100;
var graphOptions = {
    series: {
        stack: true,
        bars: {
            show: true,
            lineWidth: 5,
        },
    },
    yaxis: {
        tickDecimals: 0,
    },
};
/**
 * Renders a highlighted field.
 * When hovering, a stats icon is shown.
 */
var FieldHighlight = function (onClick) { return function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: props.className, style: props.style },
        props.children,
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: "logs-row__field-highlight--icon fa fa-signal", onClick: function () { return onClick(props.children); } })));
}; };
/**
 * Renders a log line.
 *
 * When user hovers over it for a certain time, it lazily parses the log line.
 * Once a parser is found, it will determine fields, that will be highlighted.
 * When the user requests stats for a field, they will be calculated and rendered below the row.
 */
var Row = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            fieldCount: 0,
            fieldLabel: null,
            fieldStats: null,
            fieldValue: null,
            parsed: false,
            parser: undefined,
            parsedFieldHighlights: [],
            showFieldStats: false,
        };
        _this.onClickClose = function () {
            _this.setState({ showFieldStats: false });
        };
        _this.onClickHighlight = function (fieldText) {
            var getRows = _this.props.getRows;
            var parser = _this.state.parser;
            var allRows = getRows();
            // Build value-agnostic row matcher based on the field label
            var fieldLabel = parser.getLabelFromField(fieldText);
            var fieldValue = parser.getValueFromField(fieldText);
            var matcher = parser.buildMatcher(fieldLabel);
            var fieldStats = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["calculateFieldStats"])(allRows, matcher);
            var fieldCount = fieldStats.reduce(function (sum, stat) { return sum + stat.count; }, 0);
            _this.setState({ fieldCount: fieldCount, fieldLabel: fieldLabel, fieldStats: fieldStats, fieldValue: fieldValue, showFieldStats: true });
        };
        _this.onMouseOverMessage = function () {
            // Don't parse right away, user might move along
            _this.mouseMessageTimer = setTimeout(_this.parseMessage, 500);
        };
        _this.onMouseOutMessage = function () {
            clearTimeout(_this.mouseMessageTimer);
            _this.setState({ parsed: false });
        };
        _this.parseMessage = function () {
            if (!_this.state.parsed) {
                var row = _this.props.row;
                var parser = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["getParser"])(row.entry);
                if (parser) {
                    // Use parser to highlight detected fields
                    var parsedFieldHighlights = parser.getFields(_this.props.row.entry);
                    _this.setState({ parsedFieldHighlights: parsedFieldHighlights, parsed: true, parser: parser });
                }
            }
        };
        return _this;
    }
    Row.prototype.componentWillUnmount = function () {
        clearTimeout(this.mouseMessageTimer);
    };
    Row.prototype.render = function () {
        var _a = this.props, getRows = _a.getRows, highlighterExpressions = _a.highlighterExpressions, onClickLabel = _a.onClickLabel, row = _a.row, showDuplicates = _a.showDuplicates, showLabels = _a.showLabels, showLocalTime = _a.showLocalTime, showUtc = _a.showUtc;
        var _b = this.state, fieldCount = _b.fieldCount, fieldLabel = _b.fieldLabel, fieldStats = _b.fieldStats, fieldValue = _b.fieldValue, parsed = _b.parsed, parsedFieldHighlights = _b.parsedFieldHighlights, showFieldStats = _b.showFieldStats;
        var previewHighlights = highlighterExpressions && !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEqual(highlighterExpressions, row.searchWords);
        var highlights = previewHighlights ? highlighterExpressions : row.searchWords;
        var needsHighlighter = highlights && highlights.length > 0;
        var highlightClassName = classnames__WEBPACK_IMPORTED_MODULE_4___default()('logs-row__match-highlight', {
            'logs-row__match-highlight--preview': previewHighlights,
        });
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-row" },
            showDuplicates && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-row__duplicates" }, row.duplicates > 0 ? row.duplicates + 1 + "x" : null)),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: row.logLevel ? "logs-row__level logs-row__level--" + row.logLevel : '' }),
            showUtc && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-row__time", title: "Local: " + row.timeLocal + " (" + row.timeFromNow + ")" }, row.timestamp)),
            showLocalTime && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-row__time", title: row.timestamp + " (" + row.timeFromNow + ")" }, row.timeLocal)),
            showLabels && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-row__labels" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_LogLabels__WEBPACK_IMPORTED_MODULE_11__["default"], { getRows: getRows, labels: row.uniqueLabels, onClickLabel: onClickLabel }))),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-row__message", onMouseEnter: this.onMouseOverMessage, onMouseLeave: this.onMouseOutMessage },
                parsed && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_highlight_words__WEBPACK_IMPORTED_MODULE_3___default.a, { autoEscape: true, highlightTag: FieldHighlight(this.onClickHighlight), textToHighlight: row.entry, searchWords: parsedFieldHighlights, highlightClassName: "logs-row__field-highlight" })),
                !parsed &&
                    needsHighlighter && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_highlight_words__WEBPACK_IMPORTED_MODULE_3___default.a, { textToHighlight: row.entry, searchWords: highlights, findChunks: app_core_utils_text__WEBPACK_IMPORTED_MODULE_7__["findHighlightChunksInText"], highlightClassName: highlightClassName })),
                !parsed && !needsHighlighter && row.entry,
                showFieldStats && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-row__stats" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_LogLabels__WEBPACK_IMPORTED_MODULE_11__["Stats"], { stats: fieldStats, label: fieldLabel, value: fieldValue, onClickClose: this.onClickClose, rowCount: fieldCount }))))));
    };
    return Row;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
function renderMetaItem(value, kind) {
    if (kind === app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["LogsMetaKind"].LabelsMap) {
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: "logs-meta-item__labels" },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_LogLabels__WEBPACK_IMPORTED_MODULE_11__["default"], { labels: value, plain: true })));
    }
    return value;
}
var Logs = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Logs, _super);
    function Logs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dedup: app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["LogsDedupStrategy"].none,
            deferLogs: true,
            hiddenLogLevels: new Set(),
            renderAll: false,
            showLabels: null,
            showLocalTime: true,
            showUtc: false,
        };
        _this.onChangeDedup = function (dedup) {
            _this.setState(function (prevState) {
                if (prevState.dedup === dedup) {
                    return { dedup: app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["LogsDedupStrategy"].none };
                }
                return { dedup: dedup };
            });
        };
        _this.onChangeLabels = function (event) {
            var target = event.target;
            _this.setState({
                showLabels: target.checked,
            });
        };
        _this.onChangeLocalTime = function (event) {
            var target = event.target;
            _this.setState({
                showLocalTime: target.checked,
            });
        };
        _this.onChangeUtc = function (event) {
            var target = event.target;
            _this.setState({
                showUtc: target.checked,
            });
        };
        _this.onToggleLogLevel = function (rawLevel, hiddenRawLevels) {
            var hiddenLogLevels = new Set(Array.from(hiddenRawLevels).map(function (level) { return app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["LogLevel"][level]; }));
            _this.setState({ hiddenLogLevels: hiddenLogLevels });
        };
        _this.onClickScan = function (event) {
            event.preventDefault();
            _this.props.onStartScanning();
        };
        _this.onClickStopScan = function (event) {
            event.preventDefault();
            _this.props.onStopScanning();
        };
        return _this;
    }
    Logs.prototype.componentDidMount = function () {
        var _this = this;
        // Staged rendering
        if (this.state.deferLogs) {
            var data = this.props.data;
            var rowCount = data && data.rows ? data.rows.length : 0;
            // Render all right away if not too far over the limit
            var renderAll_1 = rowCount <= PREVIEW_LIMIT * 2;
            this.deferLogsTimer = setTimeout(function () { return _this.setState({ deferLogs: false, renderAll: renderAll_1 }); }, rowCount);
        }
    };
    Logs.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        // Staged rendering
        if (prevState.deferLogs && !this.state.deferLogs && !this.state.renderAll) {
            this.renderAllTimer = setTimeout(function () { return _this.setState({ renderAll: true }); }, 2000);
        }
    };
    Logs.prototype.componentWillUnmount = function () {
        clearTimeout(this.deferLogsTimer);
        clearTimeout(this.renderAllTimer);
    };
    Logs.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, highlighterExpressions = _a.highlighterExpressions, _b = _a.loading, loading = _b === void 0 ? false : _b, onClickLabel = _a.onClickLabel, position = _a.position, range = _a.range, scanning = _a.scanning, scanRange = _a.scanRange;
        var _c = this.state, dedup = _c.dedup, deferLogs = _c.deferLogs, hiddenLogLevels = _c.hiddenLogLevels, renderAll = _c.renderAll, showLocalTime = _c.showLocalTime, showUtc = _c.showUtc;
        var showLabels = this.state.showLabels;
        var hasData = data && data.rows && data.rows.length > 0;
        var showDuplicates = dedup !== app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["LogsDedupStrategy"].none;
        // Filtering
        var filteredData = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["filterLogLevels"])(data, hiddenLogLevels);
        var dedupedData = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["dedupLogRows"])(filteredData, dedup);
        var dedupCount = dedupedData.rows.reduce(function (sum, row) { return sum + row.duplicates; }, 0);
        var meta = data.meta.slice();
        if (dedup !== app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["LogsDedupStrategy"].none) {
            meta.push({
                label: 'Dedup count',
                value: dedupCount,
                kind: app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["LogsMetaKind"].Number,
            });
        }
        // Staged rendering
        var processedRows = dedupedData.rows;
        var firstRows = processedRows.slice(0, PREVIEW_LIMIT);
        var lastRows = processedRows.slice(PREVIEW_LIMIT);
        // Check for labels
        if (showLabels === null) {
            if (hasData) {
                showLabels = data.rows.some(function (row) { return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.size(row.uniqueLabels) > 0; });
            }
            else {
                showLabels = true;
            }
        }
        var scanText = scanRange ? "Scanning " + app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_5__["describeTimeRange"](scanRange) : 'Scanning...';
        // React profiler becomes unusable if we pass all rows to all rows and their labels, using getter instead
        var getRows = function () { return processedRows; };
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-panel" },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-panel-graph" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Graph__WEBPACK_IMPORTED_MODULE_10__["default"], { data: data.series, height: "100px", range: range, id: "explore-logs-graph-" + position, onChangeTime: this.props.onChangeTime, onToggleSeries: this.onToggleLogLevel, userOptions: graphOptions })),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-panel-options" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-panel-controls" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_core_components_Switch_Switch__WEBPACK_IMPORTED_MODULE_8__["Switch"], { label: "Timestamp", checked: showUtc, onChange: this.onChangeUtc, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_core_components_Switch_Switch__WEBPACK_IMPORTED_MODULE_8__["Switch"], { label: "Local time", checked: showLocalTime, onChange: this.onChangeLocalTime, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_core_components_Switch_Switch__WEBPACK_IMPORTED_MODULE_8__["Switch"], { label: "Labels", checked: showLabels, onChange: this.onChangeLabels, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_core_components_ToggleButtonGroup_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_9__["default"], { label: "Dedup", transparent: true }, Object.keys(app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["LogsDedupStrategy"]).map(function (dedupType, i) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_core_components_ToggleButtonGroup_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_9__["ToggleButton"], { key: i, value: dedupType, onChange: _this.onChangeDedup, selected: dedup === dedupType, tooltip: app_core_logs_model__WEBPACK_IMPORTED_MODULE_6__["LogsDedupDescription"][dedupType] }, dedupType)); })))),
            hasData &&
                meta && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-panel-meta" }, meta.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-panel-meta__item", key: item.label },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: "logs-panel-meta__label" },
                    item.label,
                    ":"),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: "logs-panel-meta__value" }, renderMetaItem(item.value, item.kind)))); }))),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-rows" },
                hasData &&
                    !deferLogs &&
                    // Only inject highlighterExpression in the first set for performance reasons
                    firstRows.map(function (row) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Row, { key: row.key + row.duplicates, getRows: getRows, highlighterExpressions: highlighterExpressions, row: row, showDuplicates: showDuplicates, showLabels: showLabels, showLocalTime: showLocalTime, showUtc: showUtc, onClickLabel: onClickLabel })); }),
                hasData &&
                    !deferLogs &&
                    renderAll &&
                    lastRows.map(function (row) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Row, { key: row.key + row.duplicates, getRows: getRows, row: row, showDuplicates: showDuplicates, showLabels: showLabels, showLocalTime: showLocalTime, showUtc: showUtc, onClickLabel: onClickLabel })); }),
                hasData && deferLogs && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null,
                    "Rendering ",
                    dedupedData.rows.length,
                    " rows...")),
            !loading &&
                !hasData &&
                !scanning && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-panel-nodata" },
                "No logs found.",
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { className: "link", onClick: this.onClickScan }, "Scan for older logs"))),
            scanning && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "logs-panel-nodata" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, scanText),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { className: "link", onClick: this.onClickStopScan }, "Stop scan")))));
    };
    return Logs;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Logs);


/***/ }),

/***/ "./public/app/features/explore/Panel.tsx":
/*!***********************************************!*\
  !*** ./public/app/features/explore/Panel.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var Panel = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickToggle = function () { return _this.props.onToggle(!_this.props.isOpen); };
        return _this;
    }
    Panel.prototype.render = function () {
        var _a = this.props, isOpen = _a.isOpen, loading = _a.loading;
        var iconClass = isOpen ? 'fa fa-caret-up' : 'fa fa-caret-down';
        var loaderClass = loading ? 'explore-panel__loader explore-panel__loader--active' : 'explore-panel__loader';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel panel-container" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel__header", onClick: this.onClickToggle },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel__header-buttons" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: iconClass })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel__header-label" }, this.props.label)),
            isOpen && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel__body" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: loaderClass }),
                this.props.children))));
    };
    return Panel;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Panel);


/***/ }),

/***/ "./public/app/features/explore/QueryEditor.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/QueryEditor.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_services_AngularLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/services/AngularLoader */ "./public/app/core/services/AngularLoader.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_features_dashboard_time_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/dashboard/time_srv */ "./public/app/features/dashboard/time_srv.ts");
/* harmony import */ var app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/plugins/plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");






var QueryEditor = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryEditor, _super);
    function QueryEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryEditor.prototype.componentDidMount = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, datasource, initialQuery, exploreEvents, range, loader, template, target, scopeProps;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                if (!this.element) {
                    return [2 /*return*/];
                }
                _a = this.props, datasource = _a.datasource, initialQuery = _a.initialQuery, exploreEvents = _a.exploreEvents, range = _a.range;
                this.initTimeSrv(range);
                loader = Object(app_core_services_AngularLoader__WEBPACK_IMPORTED_MODULE_2__["getAngularLoader"])();
                template = '<plugin-component type="query-ctrl"> </plugin-component>';
                target = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ datasource: datasource.name }, initialQuery);
                scopeProps = {
                    target: target,
                    ctrl: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ refresh: function () {
                            _this.props.onQueryChange(target, false);
                            _this.props.onExecuteQuery();
                        }, events: exploreEvents, panel: {
                            datasource: datasource,
                            targets: [target],
                        }, dashboard: {
                            getNextQueryLetter: function (x) { return ''; },
                        }, hideEditorRowActions: true }, Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_3__["getIntervals"])(range, datasource, null)),
                };
                this.component = loader.load(this.element, scopeProps, template);
                this.props.onQueryChange(target, false);
                return [2 /*return*/];
            });
        });
    };
    QueryEditor.prototype.componentWillUnmount = function () {
        if (this.component) {
            this.component.destroy();
        }
    };
    QueryEditor.prototype.initTimeSrv = function (range) {
        var timeSrv = Object(app_features_dashboard_time_srv__WEBPACK_IMPORTED_MODULE_4__["getTimeSrv"])();
        timeSrv.init({
            time: range,
            refresh: false,
            getTimezone: function () { return 'utc'; },
            timeRangeUpdated: function () { return console.log('refreshDashboard!'); },
        });
    };
    QueryEditor.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: function (element) { return (_this.element = element); }, style: { width: '100%' } });
    };
    return QueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryEditor);


/***/ }),

/***/ "./public/app/features/explore/QueryRows.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/explore/QueryRows.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _QueryEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryEditor */ "./public/app/features/explore/QueryEditor.tsx");
/* harmony import */ var _QueryTransactionStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryTransactionStatus */ "./public/app/features/explore/QueryTransactionStatus.tsx");


// import DefaultQueryField from './QueryField';


function getFirstHintFromTransactions(transactions) {
    var transaction = transactions.find(function (qt) { return qt.hints && qt.hints.length > 0; });
    if (transaction) {
        return transaction.hints[0];
    }
    return undefined;
}
var QueryRow = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryRow, _super);
    function QueryRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onExecuteQuery = function () {
            var onExecuteQuery = _this.props.onExecuteQuery;
            onExecuteQuery();
        };
        _this.onChangeQuery = function (value, override) {
            var _a = _this.props, index = _a.index, onChangeQuery = _a.onChangeQuery;
            if (onChangeQuery) {
                onChangeQuery(value, index, override);
            }
        };
        _this.onClickAddButton = function () {
            var _a = _this.props, index = _a.index, onAddQueryRow = _a.onAddQueryRow;
            if (onAddQueryRow) {
                onAddQueryRow(index);
            }
        };
        _this.onClickClearButton = function () {
            _this.onChangeQuery(null, true);
        };
        _this.onClickHintFix = function (action) {
            var _a = _this.props, index = _a.index, onClickHintFix = _a.onClickHintFix;
            if (onClickHintFix) {
                onClickHintFix(action, index);
            }
        };
        _this.onClickRemoveButton = function () {
            var _a = _this.props, index = _a.index, onRemoveQueryRow = _a.onRemoveQueryRow;
            if (onRemoveQueryRow) {
                onRemoveQueryRow(index);
            }
        };
        _this.onPressEnter = function () {
            var onExecuteQuery = _this.props.onExecuteQuery;
            if (onExecuteQuery) {
                onExecuteQuery();
            }
        };
        return _this;
    }
    QueryRow.prototype.render = function () {
        var _a = this.props, datasource = _a.datasource, history = _a.history, initialQuery = _a.initialQuery, transactions = _a.transactions, exploreEvents = _a.exploreEvents, range = _a.range;
        var transactionWithError = transactions.find(function (t) { return t.error !== undefined; });
        var hint = getFirstHintFromTransactions(transactions);
        var queryError = transactionWithError ? transactionWithError.error : null;
        var QueryField = datasource.pluginExports.ExploreQueryField;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row-status" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryTransactionStatus__WEBPACK_IMPORTED_MODULE_3__["default"], { transactions: transactions })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row-field" }, QueryField ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(QueryField, { datasource: datasource, error: queryError, hint: hint, initialQuery: initialQuery, history: history, onClickHintFix: this.onClickHintFix, onPressEnter: this.onPressEnter, onQueryChange: this.onChangeQuery })) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryEditor__WEBPACK_IMPORTED_MODULE_2__["default"], { datasource: datasource, error: queryError, onQueryChange: this.onChangeQuery, onExecuteQuery: this.onExecuteQuery, initialQuery: initialQuery, exploreEvents: exploreEvents, range: range }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row-tools" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--tight", onClick: this.onClickClearButton },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-times" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--tight", onClick: this.onClickAddButton },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-plus" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--tight", onClick: this.onClickRemoveButton },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-minus" })))));
    };
    return QueryRow;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var QueryRows = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryRows, _super);
    function QueryRows() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryRows.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, initialQueries = _a.initialQueries, transactions = _a.transactions, handlers = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["className", "initialQueries", "transactions"]);
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className }, initialQueries.map(function (query, index) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(QueryRow, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ key: query.key, index: index, initialQuery: query, transactions: transactions.filter(function (t) { return t.rowIndex === index; }) }, handlers))); })));
    };
    return QueryRows;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryRows);


/***/ }),

/***/ "./public/app/features/explore/QueryTransactionStatus.tsx":
/*!****************************************************************!*\
  !*** ./public/app/features/explore/QueryTransactionStatus.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ElapsedTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ElapsedTime */ "./public/app/features/explore/ElapsedTime.tsx");



function formatLatency(value) {
    return (value / 1000).toFixed(1) + "s";
}
var QueryTransactionStatusItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryTransactionStatusItem, _super);
    function QueryTransactionStatusItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryTransactionStatusItem.prototype.render = function () {
        var transaction = this.props.transaction;
        var className = transaction.done ? 'query-transaction' : 'query-transaction query-transaction--loading';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-transaction__type" },
                transaction.resultType,
                ":"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-transaction__duration" }, transaction.done ? formatLatency(transaction.latency) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ElapsedTime__WEBPACK_IMPORTED_MODULE_2__["default"], null))));
    };
    return QueryTransactionStatusItem;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var QueryTransactionStatus = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryTransactionStatus, _super);
    function QueryTransactionStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryTransactionStatus.prototype.render = function () {
        var transactions = this.props.transactions;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-transactions" }, transactions.map(function (t, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(QueryTransactionStatusItem, { key: t.rowIndex + ":" + t.resultType, transaction: t })); })));
    };
    return QueryTransactionStatus;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryTransactionStatus);


/***/ }),

/***/ "./public/app/features/explore/Table.tsx":
/*!***********************************************!*\
  !*** ./public/app/features/explore/Table.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/es/index.js");
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");





var EMPTY_TABLE = new app_core_table_model__WEBPACK_IMPORTED_MODULE_4__["default"]();
// Identify columns that contain values
var VALUE_REGEX = /^[Vv]alue #\d+/;
function prepareRows(rows, columnNames) {
    return rows.map(function (cells) { return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.zipObject(columnNames, cells); });
}
var Table = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getCellProps = function (state, rowInfo, column) {
            return {
                onClick: function (e) {
                    // Only handle click on link, not the cell
                    if (e.target) {
                        var link = e.target;
                        if (link.className === 'link') {
                            var columnKey = column.Header;
                            var rowValue = rowInfo.row[columnKey];
                            _this.props.onClickCell(columnKey, rowValue);
                        }
                    }
                },
            };
        };
        return _this;
    }
    Table.prototype.render = function () {
        var _a = this.props, data = _a.data, loading = _a.loading;
        var tableModel = data || EMPTY_TABLE;
        var columnNames = tableModel.columns.map(function (_a) {
            var text = _a.text;
            return text;
        });
        var columns = tableModel.columns.map(function (_a) {
            var filterable = _a.filterable, text = _a.text;
            return ({
                Header: text,
                accessor: text,
                className: VALUE_REGEX.test(text) ? 'text-right' : '',
                show: text !== 'Time',
                Cell: function (row) { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: filterable ? 'link' : '' }, row.value); },
            });
        });
        var noDataText = data ? 'The queries returned no data for a table.' : '';
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_table__WEBPACK_IMPORTED_MODULE_3__["default"], { columns: columns, data: tableModel.rows, getTdProps: this.getCellProps, loading: loading, minRows: 0, noDataText: noDataText, resolveData: function (data) { return prepareRows(data, columnNames); }, showPagination: Boolean(data) }));
    };
    return Table;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Table);


/***/ }),

/***/ "./public/app/features/explore/TimePicker.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/explore/TimePicker.tsx ***!
  \****************************************************/
/*! exports provided: DEFAULT_RANGE, parseTime, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RANGE", function() { return DEFAULT_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTime", function() { return parseTime; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/utils/datemath */ "./public/app/core/utils/datemath.ts");
/* harmony import */ var app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/rangeutil */ "./public/app/core/utils/rangeutil.ts");





var DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
var DEFAULT_RANGE = {
    from: 'now-6h',
    to: 'now',
};
/**
 * Return a human-editable string of either relative (inludes "now") or absolute local time (in the shape of DATE_FORMAT).
 * @param value Epoch or relative time
 */
function parseTime(value, isUtc, ensureString) {
    if (isUtc === void 0) { isUtc = false; }
    if (ensureString === void 0) { ensureString = false; }
    if (moment__WEBPACK_IMPORTED_MODULE_2___default.a.isMoment(value)) {
        if (ensureString) {
            return value.format(DATE_FORMAT);
        }
        return value;
    }
    if (value.indexOf('now') !== -1) {
        return value;
    }
    var time = value;
    // Possible epoch
    if (!isNaN(time)) {
        time = parseInt(time, 10);
    }
    time = isUtc ? moment__WEBPACK_IMPORTED_MODULE_2___default.a.utc(time) : moment__WEBPACK_IMPORTED_MODULE_2___default()(time);
    return time.format(DATE_FORMAT);
}
/**
 * TimePicker with dropdown menu for relative dates.
 *
 * Initialize with a range that is either based on relative time strings,
 * or on Moment objects.
 * Internally the component needs to keep a string representation in `fromRaw`
 * and `toRaw` for the controlled inputs.
 * When a time is picked, `onChangeTime` is called with the new range that
 * is again based on relative time strings or Moment objects.
 */
var TimePicker = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TimePicker, _super);
    function TimePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChangeFrom = function (e) {
            _this.setState({
                fromRaw: e.target.value,
            });
        };
        _this.handleChangeTo = function (e) {
            _this.setState({
                toRaw: e.target.value,
            });
        };
        _this.handleClickApply = function () {
            var onChangeTime = _this.props.onChangeTime;
            var range;
            _this.setState(function (state) {
                var _a = _this.state, toRaw = _a.toRaw, fromRaw = _a.fromRaw;
                range = {
                    from: app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__["parse"](fromRaw, false),
                    to: app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__["parse"](toRaw, true),
                };
                var rangeString = app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["describeTimeRange"](range);
                return {
                    isOpen: false,
                    rangeString: rangeString,
                };
            }, function () {
                if (onChangeTime) {
                    onChangeTime(range);
                }
            });
        };
        _this.handleClickLeft = function () { return _this.move(-1); };
        _this.handleClickPicker = function () {
            _this.setState(function (state) { return ({
                isOpen: !state.isOpen,
            }); });
        };
        _this.handleClickRight = function () { return _this.move(1); };
        _this.handleClickRefresh = function () { };
        _this.handleClickRelativeOption = function (range) {
            var onChangeTime = _this.props.onChangeTime;
            var rangeString = app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["describeTimeRange"](range);
            _this.setState({
                toRaw: range.to,
                fromRaw: range.from,
                isOpen: false,
                rangeString: rangeString,
            }, function () {
                if (onChangeTime) {
                    onChangeTime(range);
                }
            });
        };
        _this.dropdownRef = function (el) {
            _this.dropdownEl = el;
        };
        _this.state = {
            isOpen: props.isOpen,
            isUtc: props.isUtc,
            rangeString: '',
            fromRaw: '',
            toRaw: '',
            initialRange: DEFAULT_RANGE,
            refreshInterval: '',
        };
        return _this;
    } //Temp solution... How do detect if ds supports table format?
    TimePicker.getDerivedStateFromProps = function (props, state) {
        if (state.initialRange && state.initialRange === props.range) {
            return state;
        }
        var from = props.range ? props.range.from : DEFAULT_RANGE.from;
        var to = props.range ? props.range.to : DEFAULT_RANGE.to;
        // Ensure internal string format
        var fromRaw = parseTime(from, props.isUtc, true);
        var toRaw = parseTime(to, props.isUtc, true);
        var range = {
            from: fromRaw,
            to: toRaw,
        };
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { fromRaw: fromRaw,
            toRaw: toRaw, initialRange: props.range, rangeString: app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["describeTimeRange"](range) });
    };
    TimePicker.prototype.move = function (direction, scanning) {
        var onChangeTime = this.props.onChangeTime;
        var _a = this.state, fromRaw = _a.fromRaw, toRaw = _a.toRaw;
        var from = app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__["parse"](fromRaw, false);
        var to = app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__["parse"](toRaw, true);
        var step = scanning ? 1 : 2;
        var timespan = (to.valueOf() - from.valueOf()) / step;
        var nextTo, nextFrom;
        if (direction === -1) {
            nextTo = to.valueOf() - timespan;
            nextFrom = from.valueOf() - timespan;
        }
        else if (direction === 1) {
            nextTo = to.valueOf() + timespan;
            nextFrom = from.valueOf() + timespan;
            if (nextTo > Date.now() && to < Date.now()) {
                nextTo = Date.now();
                nextFrom = from.valueOf();
            }
        }
        else {
            nextTo = to.valueOf();
            nextFrom = from.valueOf();
        }
        var nextRange = {
            from: moment__WEBPACK_IMPORTED_MODULE_2___default()(nextFrom),
            to: moment__WEBPACK_IMPORTED_MODULE_2___default()(nextTo),
        };
        var nextTimeRange = {
            raw: nextRange,
            from: nextRange.from,
            to: nextRange.to,
        };
        this.setState({
            rangeString: app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["describeTimeRange"](nextRange),
            fromRaw: nextRange.from.format(DATE_FORMAT),
            toRaw: nextRange.to.format(DATE_FORMAT),
        }, function () {
            onChangeTime(nextTimeRange, scanning);
        });
        return nextRange;
    };
    TimePicker.prototype.getTimeOptions = function () {
        return app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["getRelativeTimesList"]({}, this.state.rangeString);
    };
    TimePicker.prototype.renderDropdown = function () {
        var _this = this;
        var _a = this.state, fromRaw = _a.fromRaw, isOpen = _a.isOpen, toRaw = _a.toRaw;
        if (!isOpen) {
            return null;
        }
        var timeOptions = this.getTimeOptions();
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: this.dropdownRef, className: "gf-timepicker-dropdown" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-timepicker-absolute-section" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "section-heading" }, "Custom range"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", { className: "small" }, "From:"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-28" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", { type: "text", className: "gf-form-input input-large timepicker-from", value: fromRaw, onChange: this.handleChangeFrom }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", { className: "small" }, "To:"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-28" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", { type: "text", className: "gf-form-input input-large timepicker-to", value: toRaw, onChange: this.handleChangeTo }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn gf-form-btn btn-secondary", onClick: this.handleClickApply }, "Apply"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-timepicker-relative-section" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "section-heading" }, "Quick ranges"),
                Object.keys(timeOptions).map(function (section) {
                    var group = timeOptions[section];
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { key: section }, group.map(function (option) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: option.active ? 'active' : '', key: option.display },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { onClick: function () { return _this.handleClickRelativeOption(option); } }, option.display))); })));
                }))));
    };
    TimePicker.prototype.render = function () {
        var _a = this.state, isUtc = _a.isUtc, rangeString = _a.rangeString, refreshInterval = _a.refreshInterval;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "timepicker" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "navbar-buttons" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--tight timepicker-left", onClick: this.handleClickLeft },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-chevron-left" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button gf-timepicker-nav-btn", onClick: this.handleClickPicker },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-clock-o" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "timepicker-rangestring" }, rangeString),
                    isUtc ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "gf-timepicker-utc" }, "UTC") : null,
                    refreshInterval ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "text-warning" },
                        "\u00A0 Refresh every ",
                        refreshInterval) : null),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--tight timepicker-right", onClick: this.handleClickRight },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-chevron-right" }))),
            this.renderDropdown()));
    };
    return TimePicker;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (TimePicker);


/***/ }),

/***/ "./public/app/features/explore/Wrapper.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/explore/Wrapper.tsx ***!
  \*************************************************/
/*! exports provided: Wrapper, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wrapper", function() { return Wrapper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var _ErrorBoundary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ErrorBoundary */ "./public/app/features/explore/ErrorBoundary.tsx");
/* harmony import */ var _Explore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Explore */ "./public/app/features/explore/Explore.tsx");








var STATE_KEY_LEFT = 'state';
var STATE_KEY_RIGHT = 'stateRight';
var Wrapper = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Wrapper, _super);
    function Wrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeSplit = function (split, splitState) {
            _this.setState({ split: split, splitState: splitState });
            // When closing split, remove URL state for split part
            if (!split) {
                delete _this.urlStates[STATE_KEY_RIGHT];
                _this.props.updateLocation({
                    query: _this.urlStates,
                });
            }
        };
        _this.onSaveState = function (key, state) {
            var urlState = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["serializeStateToUrlParam"])(state, true);
            _this.urlStates[key] = urlState;
            _this.props.updateLocation({
                query: _this.urlStates,
            });
        };
        _this.urlStates = props.urlStates;
        _this.state = {
            split: Boolean(props.urlStates[STATE_KEY_RIGHT]),
            splitState: undefined,
        };
        return _this;
    }
    Wrapper.prototype.render = function () {
        var datasourceSrv = this.props.datasourceSrv;
        // State overrides for props from first Explore
        var _a = this.state, split = _a.split, splitState = _a.splitState;
        var urlStateLeft = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["parseUrlState"])(this.urlStates[STATE_KEY_LEFT]);
        var urlStateRight = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["parseUrlState"])(this.urlStates[STATE_KEY_RIGHT]);
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-wrapper" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ErrorBoundary__WEBPACK_IMPORTED_MODULE_6__["default"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Explore__WEBPACK_IMPORTED_MODULE_7__["default"], { datasourceSrv: datasourceSrv, onChangeSplit: this.onChangeSplit, onSaveState: this.onSaveState, position: "left", split: split, stateKey: STATE_KEY_LEFT, urlState: urlStateLeft })),
            split && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ErrorBoundary__WEBPACK_IMPORTED_MODULE_6__["default"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Explore__WEBPACK_IMPORTED_MODULE_7__["default"], { datasourceSrv: datasourceSrv, onChangeSplit: this.onChangeSplit, onSaveState: this.onSaveState, position: "right", split: split, splitState: splitState, stateKey: STATE_KEY_RIGHT, urlState: urlStateRight })))));
    };
    return Wrapper;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var mapStateToProps = function (state) { return ({
    urlStates: state.location.query,
}); };
var mapDispatchToProps = {
    updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_4__["updateLocation"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(Wrapper)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/utils/set.ts":
/*!**************************************************!*\
  !*** ./public/app/features/explore/utils/set.ts ***!
  \**************************************************/
/*! exports provided: equal, intersect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equal", function() { return equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersect", function() { return intersect; });
/**
 * Performs a shallow comparison of two sets with the same item type.
 */
function equal(a, b) {
    if (a.size !== b.size) {
        return false;
    }
    var it = a.values();
    while (true) {
        var _a = it.next(), value = _a.value, done = _a.done;
        if (done) {
            return true;
        }
        if (!b.has(value)) {
            return false;
        }
    }
}
/**
 * Returns a new set with items in both sets using shallow comparison.
 */
function intersect(a, b) {
    var result = new Set();
    var it = b.values();
    while (true) {
        var _a = it.next(), value = _a.value, done = _a.done;
        if (done) {
            return result;
        }
        if (a.has(value)) {
            result.add(value);
        }
    }
}


/***/ })

}]);
//# sourceMappingURL=explore.ad74f7649478c8546e66.js.map