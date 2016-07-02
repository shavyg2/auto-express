import MessageController from "./Message";

export default class ErrorStatus extends MessageController {
    constructor(res) {
        super();
        this.res = res;
        this.api = false;
    }


    asApi() {
        this.api = true;
    }

    asPage() {
        this.api = false;
    }

    asPage() {
        this.api = false;
    }

    cont(message) {
        this.res.status(100)
        this.send(message);
    }

    switchingProtocol(message) {
        this.res.status(101);
        this.send(message);
    }

    ok(message) {
        this.res.status(200);
        this.send(message);
    }

    created(message) {
        this.res.status(201);
        this.send(message);
    }

    accepted(message) {
        this.res.status(202);
        this.send(message);
    }


    nonAuthInfo(message) {
        this.res.status(203);
    }

    noContent(message) {
        this.res.status(204);
        this.send(message);
    }


    resetContent(message) {
        this.res.status(205);
        this.send(message);
    }

    partialContent(message) {
        this.res.status(206);
        this.send(message);
    }

    multipleChoice(message) {
        this.res.status(300);
        this.send(message);
    }

    movedPermanently(message) {
        this.res.status(301);
        this.send(message);
    }

    found(message) {
        this.res.status(302);
        this.send(message);
    }

    seeOther(message) {
        this.res.status(303);
        this.send(message);
    }

    notModified(message) {
        this.res.status(304);
        this.send(message);
    }

    useProxy(message) {
        this.res.status(305);
        this.send(message);
    }

    redirect(message) {
        this.res.status(307);
        this.send(message);
    }

    permanantRedirect(message) {
        this.res.status(308);
        this.send(message);
    }

    badRequest(message) {
        this.res.status(400);
        this.send(message);
    }

    unauthorized(message) {
        this.res.status(401);
        this.send(message);
    }

    paymentRequired(messag) {
        this.res.status(402);
        this.send(message);
    }

    forbidden(message) {
        this.res.status(403);
        this.send(message);
    }

    notFound(message) {
        this.res.status(404);
        this.send(message);
    }

    methodNotAllowed(message) {
        this.res.status(405);
        this.send(message);
    }

    notAccepted(message) {
        this.res.status(406);
        this.send(message);
    }

    proxyAuthenticationRequired(message) {
        this.res.status(407);
        this.send(message);
    }

    requestTimeout(message) {
        this.res.status(408);
        this.send(message);
    }

    conflict(message) {
        this.res.status(409);
        this.send(message);
    }

    gone(message) {
        this.res.status(410);
        this.send(message);
    }

    lengthRequired(message) {
        this.res.status(411);
        this.send(message);
    }

    preconditionFailed(message) {
        this.res.status(412);
        this.send(message);
    }

    payloadTooLarge(message) {
        this.res.status(413);
        this.send(message);
    }


    uriTooLong(message) {
        this.res.status(414);
        this.send(message);
    }


    unsupportedMediaType(message) {
        this.res.status(415);
        this.send(message);
    }


    requestedRangeNotSatisfiable(message) {
        this.res.status(416);
        this.send(message);
    }


    expectationFailed(message) {
        this.res.status(417);
        this.send(message);
    }




    teapot(message) {
        this.res.status(418);
        this.send(message);
    }


    misdirected(message) {
        this.res.status(421);
        this.send(message);
    }

    upgradeRequired(message) {
        this.res.status(426);
        this.send(message);
    }

    preconditionRequired(message) {
        this.res.status(428);
        this.send(message);
    }

    tooManyRequest(message) {
        this.res.status(429);
        this.send(message);
    }

    requestHeaderFieldsTooLarge(message) {
        this.res.status(431);
        this.send(message);
    }

    serverError(message) {
        this.res.status(500);
        this.send(message);
    }



    notImplemented(message) {
        this.res.status(501);
        this.send(message);
    }

    badGateway(message) {
        this.res.status(502);
        this.send(message);
    }

    serviceUnavailable(message) {
        this.res.status(503);
        this.send(message);
    }

    gatewayTimeout(message) {
        this.res.status(504);
        this.send(message);
    }

    versionUnsupported(message) {
        this.res.status(505);
        this.send(message);
    }


    variantAlsoNegotiates6(message) {
        this.res.status(506);
        this.send(message);
    }

    variantAlsoNegotiates7(message) {
        this.res.status(507);
        this.send(message);
    }


    networkAuthenticationRequired(message) {
        this.res.status(511);
        this.send(message);
    }


    /*message,*/
    send(...args) {

        let message = args.length > 0 ? args[0] : null;

        if (this.api) {
            this.res.send.apply(this.res, {
                status: message
            })
        } else {
            this.res.send.apply(this.res, args);
        }

    }


}


export default class ErrorController extends MessageController {
    constructor() {
        super();
        this.status = new ErrorStatus(this.res);
    }






}
