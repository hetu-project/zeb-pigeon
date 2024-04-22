/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from 'protobufjs/minimal';

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {});

export const framework = ($root.framework = (() => {
  /**
   * Namespace framework.
   * @exports framework
   * @namespace
   */
  const framework = {};

  framework.Zmessage = (function () {
    /**
     * Properties of a Zmessage.
     * @memberof framework
     * @interface IZmessage
     * @property {number|null} [version] Zmessage version
     * @property {number|null} [type] Zmessage type
     * @property {string|null} [pubkey] Zmessage pubkey
     * @property {string|null} [data] Zmessage data
     * @property {string|null} [sig] Zmessage sig
     * @property {string|null} [to] Zmessage to
     * @property {string|null} [id] Zmessage id
     */

    /**
     * Constructs a new Zmessage.
     * @memberof framework
     * @classdesc Represents a Zmessage.
     * @implements IZmessage
     * @constructor
     * @param {framework.IZmessage=} [properties] Properties to set
     */
    function Zmessage(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Zmessage version.
     * @member {number} version
     * @memberof framework.Zmessage
     * @instance
     */
    Zmessage.prototype.version = 0;

    /**
     * Zmessage type.
     * @member {number} type
     * @memberof framework.Zmessage
     * @instance
     */
    Zmessage.prototype.type = 0;

    /**
     * Zmessage pubkey.
     * @member {string} pubkey
     * @memberof framework.Zmessage
     * @instance
     */
    Zmessage.prototype.pubkey = '';

    /**
     * Zmessage data.
     * @member {string} data
     * @memberof framework.Zmessage
     * @instance
     */
    Zmessage.prototype.data = '';

    /**
     * Zmessage sig.
     * @member {string} sig
     * @memberof framework.Zmessage
     * @instance
     */
    Zmessage.prototype.sig = '';

    /**
     * Zmessage to.
     * @member {string} to
     * @memberof framework.Zmessage
     * @instance
     */
    Zmessage.prototype.to = '';

    /**
     * Zmessage id.
     * @member {string} id
     * @memberof framework.Zmessage
     * @instance
     */
    Zmessage.prototype.id = '';

    /**
     * Creates a new Zmessage instance using the specified properties.
     * @function create
     * @memberof framework.Zmessage
     * @static
     * @param {framework.IZmessage=} [properties] Properties to set
     * @returns {framework.Zmessage} Zmessage instance
     */
    Zmessage.create = function create(properties) {
      return new Zmessage(properties);
    };

    /**
     * Encodes the specified Zmessage message. Does not implicitly {@link framework.Zmessage.verify|verify} messages.
     * @function encode
     * @memberof framework.Zmessage
     * @static
     * @param {framework.IZmessage} message Zmessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Zmessage.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.version != null && Object.hasOwnProperty.call(message, 'version'))
        writer.uint32(/* id 0, wireType 0 =*/ 0).uint32(message.version);
      if (message.type != null && Object.hasOwnProperty.call(message, 'type'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.type);
      if (message.pubkey != null && Object.hasOwnProperty.call(message, 'pubkey'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.pubkey);
      if (message.data != null && Object.hasOwnProperty.call(message, 'data'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.data);
      if (message.sig != null && Object.hasOwnProperty.call(message, 'sig'))
        writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.sig);
      if (message.to != null && Object.hasOwnProperty.call(message, 'to'))
        writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.to);
      if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
        writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.id);
      return writer;
    };

    /**
     * Encodes the specified Zmessage message, length delimited. Does not implicitly {@link framework.Zmessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof framework.Zmessage
     * @static
     * @param {framework.IZmessage} message Zmessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Zmessage.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Zmessage message from the specified reader or buffer.
     * @function decode
     * @memberof framework.Zmessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {framework.Zmessage} Zmessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Zmessage.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.framework.Zmessage();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 0: {
            message.version = reader.uint32();
            break;
          }
          case 1: {
            message.type = reader.uint32();
            break;
          }
          case 2: {
            message.pubkey = reader.string();
            break;
          }
          case 3: {
            message.data = reader.string();
            break;
          }
          case 4: {
            message.sig = reader.string();
            break;
          }
          case 5: {
            message.to = reader.string();
            break;
          }
          case 6: {
            message.id = reader.string();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Zmessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof framework.Zmessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {framework.Zmessage} Zmessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Zmessage.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Zmessage message.
     * @function verify
     * @memberof framework.Zmessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Zmessage.verify = function verify(message) {
      if (typeof message !== 'object' || message === null) return 'object expected';
      if (message.version != null && message.hasOwnProperty('version'))
        if (!$util.isInteger(message.version)) return 'version: integer expected';
      if (message.type != null && message.hasOwnProperty('type'))
        if (!$util.isInteger(message.type)) return 'type: integer expected';
      if (message.pubkey != null && message.hasOwnProperty('pubkey'))
        if (!$util.isString(message.pubkey)) return 'pubkey: string expected';
      if (message.data != null && message.hasOwnProperty('data'))
        if (!$util.isString(message.data)) return 'data: string expected';
      if (message.sig != null && message.hasOwnProperty('sig'))
        if (!$util.isString(message.sig)) return 'sig: string expected';
      if (message.to != null && message.hasOwnProperty('to'))
        if (!$util.isString(message.to)) return 'to: string expected';
      if (message.id != null && message.hasOwnProperty('id'))
        if (!$util.isString(message.id)) return 'id: string expected';
      return null;
    };

    /**
     * Creates a Zmessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof framework.Zmessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {framework.Zmessage} Zmessage
     */
    Zmessage.fromObject = function fromObject(object) {
      if (object instanceof $root.framework.Zmessage) return object;
      let message = new $root.framework.Zmessage();
      if (object.version != null) message.version = object.version >>> 0;
      if (object.type != null) message.type = object.type >>> 0;
      if (object.pubkey != null) message.pubkey = String(object.pubkey);
      if (object.data != null) message.data = String(object.data);
      if (object.sig != null) message.sig = String(object.sig);
      if (object.to != null) message.to = String(object.to);
      if (object.id != null) message.id = String(object.id);
      return message;
    };

    /**
     * Creates a plain object from a Zmessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof framework.Zmessage
     * @static
     * @param {framework.Zmessage} message Zmessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Zmessage.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.version = 0;
        object.type = 0;
        object.pubkey = '';
        object.data = '';
        object.sig = '';
        object.to = '';
        object.id = '';
      }
      if (message.version != null && message.hasOwnProperty('version')) object.version = message.version;
      if (message.type != null && message.hasOwnProperty('type')) object.type = message.type;
      if (message.pubkey != null && message.hasOwnProperty('pubkey')) object.pubkey = message.pubkey;
      if (message.data != null && message.hasOwnProperty('data')) object.data = message.data;
      if (message.sig != null && message.hasOwnProperty('sig')) object.sig = message.sig;
      if (message.to != null && message.hasOwnProperty('to')) object.to = message.to;
      if (message.id != null && message.hasOwnProperty('id')) object.id = message.id;
      return object;
    };

    /**
     * Converts this Zmessage to JSON.
     * @function toJSON
     * @memberof framework.Zmessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Zmessage.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Zmessage
     * @function getTypeUrl
     * @memberof framework.Zmessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Zmessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/framework.Zmessage';
    };

    return Zmessage;
  })();

  return framework;
})());

export { $root as default };
