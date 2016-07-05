"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _Message = require("./Message");

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorController = function (_MessageController) {
    (0, _inherits3.default)(ErrorController, _MessageController);

    function ErrorController() {
        (0, _classCallCheck3.default)(this, ErrorController);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ErrorController).call(this));

        _this.api = false;
        return _this;
    }

    (0, _createClass3.default)(ErrorController, [{
        key: "asApi",
        value: function asApi() {
            this.api = true;
        }
    }, {
        key: "asPage",
        value: function asPage() {
            this.api = false;
        }
    }, {
        key: "cont",
        value: function cont(message) {
            this.res.status(100);
            this.send(message);
        }
    }, {
        key: "switchingProtocol",
        value: function switchingProtocol(message) {
            this.res.status(101);
            this.send(message);
        }
    }, {
        key: "ok",
        value: function ok(message) {
            this.res.status(200);
            this.send(message);
        }
    }, {
        key: "created",
        value: function created(message) {
            this.res.status(201);
            this.send(message);
        }
    }, {
        key: "accepted",
        value: function accepted(message) {
            this.res.status(202);
            this.send(message);
        }
    }, {
        key: "nonAuthInfo",
        value: function nonAuthInfo(message) {
            this.res.status(203);
        }
    }, {
        key: "noContent",
        value: function noContent(message) {
            this.res.status(204);
            this.send(message);
        }
    }, {
        key: "resetContent",
        value: function resetContent(message) {
            this.res.status(205);
            this.send(message);
        }
    }, {
        key: "partialContent",
        value: function partialContent(message) {
            this.res.status(206);
            this.send(message);
        }
    }, {
        key: "multipleChoice",
        value: function multipleChoice(message) {
            this.res.status(300);
            this.send(message);
        }
    }, {
        key: "movedPermanently",
        value: function movedPermanently(message) {
            this.res.status(301);
            this.send(message);
        }
    }, {
        key: "found",
        value: function found(message) {
            this.res.status(302);
            this.send(message);
        }
    }, {
        key: "seeOther",
        value: function seeOther(message) {
            this.res.status(303);
            this.send(message);
        }
    }, {
        key: "notModified",
        value: function notModified(message) {
            this.res.status(304);
            this.send(message);
        }
    }, {
        key: "useProxy",
        value: function useProxy(message) {
            this.res.status(305);
            this.send(message);
        }
    }, {
        key: "redirect",
        value: function redirect(message) {
            this.res.status(307);
            this.send(message);
        }
    }, {
        key: "permanantRedirect",
        value: function permanantRedirect(message) {
            this.res.status(308);
            this.send(message);
        }
    }, {
        key: "badRequest",
        value: function badRequest(message) {
            this.res.status(400);
            this.send(message);
        }
    }, {
        key: "unauthorized",
        value: function unauthorized(message) {
            this.res.status(401);
            this.send(message);
        }
    }, {
        key: "paymentRequired",
        value: function paymentRequired(messag) {
            this.res.status(402);
            this.send(message);
        }
    }, {
        key: "forbidden",
        value: function forbidden(message) {
            this.res.status(403);
            this.send(message);
        }
    }, {
        key: "notFound",
        value: function notFound(message) {
            this.res.status(404);
            this.send(message);
        }
    }, {
        key: "methodNotAllowed",
        value: function methodNotAllowed(message) {
            this.res.status(405);
            this.send(message);
        }
    }, {
        key: "notAccepted",
        value: function notAccepted(message) {
            this.res.status(406);
            this.send(message);
        }
    }, {
        key: "proxyAuthenticationRequired",
        value: function proxyAuthenticationRequired(message) {
            this.res.status(407);
            this.send(message);
        }
    }, {
        key: "requestTimeout",
        value: function requestTimeout(message) {
            this.res.status(408);
            this.send(message);
        }
    }, {
        key: "conflict",
        value: function conflict(message) {
            this.res.status(409);
            this.send(message);
        }
    }, {
        key: "gone",
        value: function gone(message) {
            this.res.status(410);
            this.send(message);
        }
    }, {
        key: "lengthRequired",
        value: function lengthRequired(message) {
            this.res.status(411);
            this.send(message);
        }
    }, {
        key: "preconditionFailed",
        value: function preconditionFailed(message) {
            this.res.status(412);
            this.send(message);
        }
    }, {
        key: "payloadTooLarge",
        value: function payloadTooLarge(message) {
            this.res.status(413);
            this.send(message);
        }
    }, {
        key: "uriTooLong",
        value: function uriTooLong(message) {
            this.res.status(414);
            this.send(message);
        }
    }, {
        key: "unsupportedMediaType",
        value: function unsupportedMediaType(message) {
            this.res.status(415);
            this.send(message);
        }
    }, {
        key: "requestedRangeNotSatisfiable",
        value: function requestedRangeNotSatisfiable(message) {
            this.res.status(416);
            this.send(message);
        }
    }, {
        key: "expectationFailed",
        value: function expectationFailed(message) {
            this.res.status(417);
            this.send(message);
        }
    }, {
        key: "teapot",
        value: function teapot(message) {
            this.res.status(418);
            this.send(message);
        }
    }, {
        key: "misdirected",
        value: function misdirected(message) {
            this.res.status(421);
            this.send(message);
        }
    }, {
        key: "upgradeRequired",
        value: function upgradeRequired(message) {
            this.res.status(426);
            this.send(message);
        }
    }, {
        key: "preconditionRequired",
        value: function preconditionRequired(message) {
            this.res.status(428);
            this.send(message);
        }
    }, {
        key: "tooManyRequest",
        value: function tooManyRequest(message) {
            this.res.status(429);
            this.send(message);
        }
    }, {
        key: "requestHeaderFieldsTooLarge",
        value: function requestHeaderFieldsTooLarge(message) {
            this.res.status(431);
            this.send(message);
        }
    }, {
        key: "serverError",
        value: function serverError(message) {
            this.res.status(500);
            this.send(message);
        }
    }, {
        key: "notImplemented",
        value: function notImplemented(message) {
            this.res.status(501);
            this.send(message);
        }
    }, {
        key: "badGateway",
        value: function badGateway(message) {
            this.res.status(502);
            this.send(message);
        }
    }, {
        key: "serviceUnavailable",
        value: function serviceUnavailable(message) {
            this.res.status(503);
            this.send(message);
        }
    }, {
        key: "gatewayTimeout",
        value: function gatewayTimeout(message) {
            this.res.status(504);
            this.send(message);
        }
    }, {
        key: "versionUnsupported",
        value: function versionUnsupported(message) {
            this.res.status(505);
            this.send(message);
        }
    }, {
        key: "variantAlsoNegotiates6",
        value: function variantAlsoNegotiates6(message) {
            this.res.status(506);
            this.send(message);
        }
    }, {
        key: "variantAlsoNegotiates7",
        value: function variantAlsoNegotiates7(message) {
            this.res.status(507);
            this.send(message);
        }
    }, {
        key: "networkAuthenticationRequired",
        value: function networkAuthenticationRequired(message) {
            this.res.status(511);
            this.send(message);
        }

        /*message,*/

    }, {
        key: "send",
        value: function send() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var message = args.length > 0 ? args[0] : null;

            if (this.api) {
                this.res.send.apply(this.res, {
                    status: message
                });
            } else {
                this.res.send.apply(this.res, args);
            }
        }
    }]);
    return ErrorController;
}(_Message2.default);

exports.default = ErrorController;