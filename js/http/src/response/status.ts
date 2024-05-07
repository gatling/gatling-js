export class HttpResponseStatus {
  /**
   * 100 Continue
   */
  public static readonly CONTINUE = new HttpResponseStatus(100, "Continue");

  /**
   * 101 Switching Protocols
   */
  public static readonly SWITCHING_PROTOCOLS = new HttpResponseStatus(101, "Switching Protocols");

  /**
   * 102 Processing (WebDAV, RFC2518)
   */
  public static readonly PROCESSING = new HttpResponseStatus(102, "Processing");

  /**
   * 103 Early Hints (RFC 8297)
   */
  public static readonly EARLY_HINTS = new HttpResponseStatus(103, "Early Hints");

  /**
   * 200 OK
   */
  public static readonly OK = new HttpResponseStatus(200, "OK");

  /**
   * 201 Created
   */
  public static readonly CREATED = new HttpResponseStatus(201, "Created");

  /**
   * 202 Accepted
   */
  public static readonly ACCEPTED = new HttpResponseStatus(202, "Accepted");

  /**
   * 203 Non-Authoritative Information (since HTTP/1.1)
   */
  public static readonly NON_AUTHORITATIVE_INFORMATION = new HttpResponseStatus(203, "Non-Authoritative Information");

  /**
   * 204 No Content
   */
  public static readonly NO_CONTENT = new HttpResponseStatus(204, "No Content");

  /**
   * 205 Reset Content
   */
  public static readonly RESET_CONTENT = new HttpResponseStatus(205, "Reset Content");

  /**
   * 206 Partial Content
   */
  public static readonly PARTIAL_CONTENT = new HttpResponseStatus(206, "Partial Content");

  /**
   * 207 Multi-Status (WebDAV, RFC2518)
   */
  public static readonly MULTI_STATUS = new HttpResponseStatus(207, "Multi-Status");

  /**
   * 300 Multiple Choices
   */
  public static readonly MULTIPLE_CHOICES = new HttpResponseStatus(300, "Multiple Choices");

  /**
   * 301 Moved Permanently
   */
  public static readonly MOVED_PERMANENTLY = new HttpResponseStatus(301, "Moved Permanently");

  /**
   * 302 Found
   */
  public static readonly FOUND = new HttpResponseStatus(302, "Found");

  /**
   * 303 See Other (since HTTP/1.1)
   */
  public static readonly SEE_OTHER = new HttpResponseStatus(303, "See Other");

  /**
   * 304 Not Modified
   */
  public static readonly NOT_MODIFIED = new HttpResponseStatus(304, "Not Modified");

  /**
   * 305 Use Proxy (since HTTP/1.1)
   */
  public static readonly USE_PROXY = new HttpResponseStatus(305, "Use Proxy");

  /**
   * 307 Temporary Redirect (since HTTP/1.1)
   */
  public static readonly TEMPORARY_REDIRECT = new HttpResponseStatus(307, "Temporary Redirect");

  /**
   * 308 Permanent Redirect (RFC7538)
   */
  public static readonly PERMANENT_REDIRECT = new HttpResponseStatus(308, "Permanent Redirect");

  /**
   * 400 Bad Request
   */
  public static readonly BAD_REQUEST = new HttpResponseStatus(400, "Bad Request");

  /**
   * 401 Unauthorized
   */
  public static readonly UNAUTHORIZED = new HttpResponseStatus(401, "Unauthorized");

  /**
   * 402 Payment Required
   */
  public static readonly PAYMENT_REQUIRED = new HttpResponseStatus(402, "Payment Required");

  /**
   * 403 Forbidden
   */
  public static readonly FORBIDDEN = new HttpResponseStatus(403, "Forbidden");

  /**
   * 404 Not Found
   */
  public static readonly NOT_FOUND = new HttpResponseStatus(404, "Not Found");

  /**
   * 405 Method Not Allowed
   */
  public static readonly METHOD_NOT_ALLOWED = new HttpResponseStatus(405, "Method Not Allowed");

  /**
   * 406 Not Acceptable
   */
  public static readonly NOT_ACCEPTABLE = new HttpResponseStatus(406, "Not Acceptable");

  /**
   * 407 Proxy Authentication Required
   */
  public static readonly PROXY_AUTHENTICATION_REQUIRED = new HttpResponseStatus(407, "Proxy Authentication Required");

  /**
   * 408 Request Timeout
   */
  public static readonly REQUEST_TIMEOUT = new HttpResponseStatus(408, "Request Timeout");

  /**
   * 409 Conflict
   */
  public static readonly CONFLICT = new HttpResponseStatus(409, "Conflict");

  /**
   * 410 Gone
   */
  public static readonly GONE = new HttpResponseStatus(410, "Gone");

  /**
   * 411 Length Required
   */
  public static readonly LENGTH_REQUIRED = new HttpResponseStatus(411, "Length Required");

  /**
   * 412 Precondition Failed
   */
  public static readonly PRECONDITION_FAILED = new HttpResponseStatus(412, "Precondition Failed");

  /**
   * 413 Request Entity Too Large
   */
  public static readonly REQUEST_ENTITY_TOO_LARGE = new HttpResponseStatus(413, "Request Entity Too Large");

  /**
   * 414 Request-URI Too Long
   */
  public static readonly REQUEST_URI_TOO_LONG = new HttpResponseStatus(414, "Request-URI Too Long");

  /**
   * 415 Unsupported Media Type
   */
  public static readonly UNSUPPORTED_MEDIA_TYPE = new HttpResponseStatus(415, "Unsupported Media Type");

  /**
   * 416 Requested Range Not Satisfiable
   */
  public static readonly REQUESTED_RANGE_NOT_SATISFIABLE = new HttpResponseStatus(
    416,
    "Requested Range Not Satisfiable"
  );

  /**
   * 417 Expectation Failed
   */
  public static readonly EXPECTATION_FAILED = new HttpResponseStatus(417, "Expectation Failed");

  /**
   * 421 Misdirected Request
   *
   * @see <a href="https://tools.ietf.org/html/rfc7540#section-9.1.2">421 (Misdirected Request) Status Code</a>
   */
  public static readonly MISDIRECTED_REQUEST = new HttpResponseStatus(421, "Misdirected Request");

  /**
   * 422 Unprocessable Entity (WebDAV, RFC4918)
   */
  public static readonly UNPROCESSABLE_ENTITY = new HttpResponseStatus(422, "Unprocessable Entity");

  /**
   * 423 Locked (WebDAV, RFC4918)
   */
  public static readonly LOCKED = new HttpResponseStatus(423, "Locked");

  /**
   * 424 Failed Dependency (WebDAV, RFC4918)
   */
  public static readonly FAILED_DEPENDENCY = new HttpResponseStatus(424, "Failed Dependency");

  /**
   * 425 Unordered Collection (WebDAV, RFC3648)
   */
  public static readonly UNORDERED_COLLECTION = new HttpResponseStatus(425, "Unordered Collection");

  /**
   * 426 Upgrade Required (RFC2817)
   */
  public static readonly UPGRADE_REQUIRED = new HttpResponseStatus(426, "Upgrade Required");

  /**
   * 428 Precondition Required (RFC6585)
   */
  public static readonly PRECONDITION_REQUIRED = new HttpResponseStatus(428, "Precondition Required");

  /**
   * 429 Too Many Requests (RFC6585)
   */
  public static readonly TOO_MANY_REQUESTS = new HttpResponseStatus(429, "Too Many Requests");

  /**
   * 431 Request Header Fields Too Large (RFC6585)
   */
  public static readonly REQUEST_HEADER_FIELDS_TOO_LARGE = new HttpResponseStatus(
    431,
    "Request Header Fields Too Large"
  );

  /**
   * 500 Internal Server Error
   */
  public static readonly INTERNAL_SERVER_ERROR = new HttpResponseStatus(500, "Internal Server Error");

  /**
   * 501 Not Implemented
   */
  public static readonly NOT_IMPLEMENTED = new HttpResponseStatus(501, "Not Implemented");

  /**
   * 502 Bad Gateway
   */
  public static readonly BAD_GATEWAY = new HttpResponseStatus(502, "Bad Gateway");

  /**
   * 503 Service Unavailable
   */
  public static readonly SERVICE_UNAVAILABLE = new HttpResponseStatus(503, "Service Unavailable");

  /**
   * 504 Gateway Timeout
   */
  public static readonly GATEWAY_TIMEOUT = new HttpResponseStatus(504, "Gateway Timeout");

  /**
   * 505 HTTP Version Not Supported
   */
  public static readonly HTTP_VERSION_NOT_SUPPORTED = new HttpResponseStatus(505, "HTTP Version Not Supported");

  /**
   * 506 Variant Also Negotiates (RFC2295)
   */
  public static readonly VARIANT_ALSO_NEGOTIATES = new HttpResponseStatus(506, "Variant Also Negotiates");

  /**
   * 507 Insufficient Storage (WebDAV, RFC4918)
   */
  public static readonly INSUFFICIENT_STORAGE = new HttpResponseStatus(507, "Insufficient Storage");

  /**
   * 510 Not Extended (RFC2774)
   */
  public static readonly NOT_EXTENDED = new HttpResponseStatus(510, "Not Extended");

  /**
   * 511 Network Authentication Required (RFC6585)
   */
  public static readonly NETWORK_AUTHENTICATION_REQUIRED = new HttpResponseStatus(
    511,
    "Network Authentication Required"
  );

  private constructor(
    public readonly code: number,
    public readonly reasonPhrase: string
  ) {
    // Do nothing.
  }
}

export const fromJvmHttpResponseStatus = (
  jvmStatus: io.netty.handler.codec.http.HttpResponseStatus
): HttpResponseStatus => {
  switch (jvmStatus.code()) {
    case 100:
      return HttpResponseStatus.CONTINUE;
    case 101:
      return HttpResponseStatus.SWITCHING_PROTOCOLS;
    case 102:
      return HttpResponseStatus.PROCESSING;
    case 103:
      return HttpResponseStatus.EARLY_HINTS;
    case 200:
      return HttpResponseStatus.OK;
    case 201:
      return HttpResponseStatus.CREATED;
    case 202:
      return HttpResponseStatus.ACCEPTED;
    case 203:
      return HttpResponseStatus.NON_AUTHORITATIVE_INFORMATION;
    case 204:
      return HttpResponseStatus.NO_CONTENT;
    case 205:
      return HttpResponseStatus.RESET_CONTENT;
    case 206:
      return HttpResponseStatus.PARTIAL_CONTENT;
    case 207:
      return HttpResponseStatus.MULTI_STATUS;
    case 300:
      return HttpResponseStatus.MULTIPLE_CHOICES;
    case 301:
      return HttpResponseStatus.MOVED_PERMANENTLY;
    case 302:
      return HttpResponseStatus.FOUND;
    case 303:
      return HttpResponseStatus.SEE_OTHER;
    case 304:
      return HttpResponseStatus.NOT_MODIFIED;
    case 305:
      return HttpResponseStatus.USE_PROXY;
    case 307:
      return HttpResponseStatus.TEMPORARY_REDIRECT;
    case 308:
      return HttpResponseStatus.PERMANENT_REDIRECT;
    case 400:
      return HttpResponseStatus.BAD_REQUEST;
    case 401:
      return HttpResponseStatus.UNAUTHORIZED;
    case 402:
      return HttpResponseStatus.PAYMENT_REQUIRED;
    case 403:
      return HttpResponseStatus.FORBIDDEN;
    case 404:
      return HttpResponseStatus.NOT_FOUND;
    case 405:
      return HttpResponseStatus.METHOD_NOT_ALLOWED;
    case 406:
      return HttpResponseStatus.NOT_ACCEPTABLE;
    case 407:
      return HttpResponseStatus.PROXY_AUTHENTICATION_REQUIRED;
    case 408:
      return HttpResponseStatus.REQUEST_TIMEOUT;
    case 409:
      return HttpResponseStatus.CONFLICT;
    case 410:
      return HttpResponseStatus.GONE;
    case 411:
      return HttpResponseStatus.LENGTH_REQUIRED;
    case 412:
      return HttpResponseStatus.PRECONDITION_FAILED;
    case 413:
      return HttpResponseStatus.REQUEST_ENTITY_TOO_LARGE;
    case 414:
      return HttpResponseStatus.REQUEST_URI_TOO_LONG;
    case 415:
      return HttpResponseStatus.UNSUPPORTED_MEDIA_TYPE;
    case 416:
      return HttpResponseStatus.REQUESTED_RANGE_NOT_SATISFIABLE;
    case 417:
      return HttpResponseStatus.EXPECTATION_FAILED;
    case 421:
      return HttpResponseStatus.MISDIRECTED_REQUEST;
    case 422:
      return HttpResponseStatus.UNPROCESSABLE_ENTITY;
    case 423:
      return HttpResponseStatus.LOCKED;
    case 424:
      return HttpResponseStatus.FAILED_DEPENDENCY;
    case 425:
      return HttpResponseStatus.UNORDERED_COLLECTION;
    case 426:
      return HttpResponseStatus.UPGRADE_REQUIRED;
    case 428:
      return HttpResponseStatus.PRECONDITION_REQUIRED;
    case 429:
      return HttpResponseStatus.TOO_MANY_REQUESTS;
    case 431:
      return HttpResponseStatus.REQUEST_HEADER_FIELDS_TOO_LARGE;
    case 500:
      return HttpResponseStatus.INTERNAL_SERVER_ERROR;
    case 501:
      return HttpResponseStatus.NOT_IMPLEMENTED;
    case 502:
      return HttpResponseStatus.BAD_GATEWAY;
    case 503:
      return HttpResponseStatus.SERVICE_UNAVAILABLE;
    case 504:
      return HttpResponseStatus.GATEWAY_TIMEOUT;
    case 505:
      return HttpResponseStatus.HTTP_VERSION_NOT_SUPPORTED;
    case 506:
      return HttpResponseStatus.VARIANT_ALSO_NEGOTIATES;
    case 507:
      return HttpResponseStatus.INSUFFICIENT_STORAGE;
    case 510:
      return HttpResponseStatus.NOT_EXTENDED;
    case 511:
      return HttpResponseStatus.NETWORK_AUTHENTICATION_REQUIRED;
  }
  throw Error(
    "This shouldn't happen unless we lag behind the original implementation, call support if this ever happens."
  );
};
