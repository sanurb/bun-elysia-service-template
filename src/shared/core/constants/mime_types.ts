/**
 * @fileoverview
 * MIME type constants for HTTP content negotiation.
 *
 * Defines:
 *  - `MimeType` and `MimeTypeRecord`
 *  - Organized by IANA media type categories
 *
 * @see https://www.iana.org/assignments/media-types/media-types.xhtml
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 */

//////////////////
// TEXT MIME TYPES
//////////////////

/**
 * Text-based content types.
 * @see https://www.iana.org/assignments/media-types/text
 */
const TEXT_MIME_TYPES = {
  /**
   * Plain text content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/text/plain)
   */
  Plain: 'text/plain',

  /**
   * HTML content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/text/html)
   */
  Html: 'text/html',

  /**
   * CSS stylesheets.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/text/css)
   */
  Css: 'text/css',

  /**
   * JavaScript code.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/text/javascript)
   */
  Javascript: 'text/javascript',

  /**
   * JSON data.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/json)
   */
  Json: 'application/json',

  /**
   * XML content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/xml)
   */
  Xml: 'application/xml',

  /**
   * CSV data.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/text/csv)
   */
  Csv: 'text/csv',

  /**
   * Markdown content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/text/markdown)
   */
  Markdown: 'text/markdown',

  /**
   * Rich Text Format.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/text/rtf)
   */
  Rtf: 'text/rtf',

  /**
   * YAML content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/x-yaml)
   */
  Yaml: 'application/x-yaml',

  /**
   * TypeScript code.
   */
  Typescript: 'text/typescript',

  /**
   * JavaScript module.
   */
  JsModule: 'text/javascript; charset=utf-8',

  /**
   * TypeScript module.
   */
  TsModule: 'text/typescript; charset=utf-8',
} as const;

type TextMimeType = (typeof TEXT_MIME_TYPES)[keyof typeof TEXT_MIME_TYPES];

//////////////////////
// APPLICATION MIME TYPES
//////////////////////

/**
 * Application-specific content types.
 * @see https://www.iana.org/assignments/media-types/application
 */
const APPLICATION_MIME_TYPES = {
  /**
   * JSON data.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/json)
   */
  Json: 'application/json',

  /**
   * XML content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/xml)
   */
  Xml: 'application/xml',

  /**
   * PDF documents.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/pdf)
   */
  Pdf: 'application/pdf',

  /**
   * ZIP archives.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/zip)
   */
  Zip: 'application/zip',

  /**
   * GZIP compressed data.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/gzip)
   */
  Gzip: 'application/gzip',

  /**
   * TAR archives.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/x-tar)
   */
  Tar: 'application/x-tar',

  /**
   * 7-Zip archives.
   */
  SevenZip: 'application/x-7z-compressed',

  /**
   * RAR archives.
   */
  Rar: 'application/vnd.rar',

  /**
   * Microsoft Word documents.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.wordprocessingml.document)
   */
  Word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

  /**
   * Microsoft Excel spreadsheets.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)
   */
  Excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

  /**
   * Microsoft PowerPoint presentations.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.presentationml.presentation)
   */
  Powerpoint:
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',

  /**
   * OpenDocument Text.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/vnd.oasis.opendocument.text)
   */
  OpenDocumentText: 'application/vnd.oasis.opendocument.text',

  /**
   * OpenDocument Spreadsheet.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/vnd.oasis.opendocument.spreadsheet)
   */
  OpenDocumentSpreadsheet: 'application/vnd.oasis.opendocument.spreadsheet',

  /**
   * OpenDocument Presentation.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/vnd.oasis.opendocument.presentation)
   */
  OpenDocumentPresentation: 'application/vnd.oasis.opendocument.presentation',

  /**
   * Binary data.
   */
  OctetStream: 'application/octet-stream',

  /**
   * Form data.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/x-www-form-urlencoded)
   */
  FormUrlencoded: 'application/x-www-form-urlencoded',

  /**
   * Multipart form data.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/form-data)
   */
  MultipartFormData: 'multipart/form-data',

  /**
   * GraphQL queries.
   */
  Graphql: 'application/graphql',

  /**
   * GraphQL JSON responses.
   */
  GraphqlJson: 'application/graphql+json',

  /**
   * LD+JSON structured data.
   */
  LdJson: 'application/ld+json',

  /**
   * Web App Manifest.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/manifest+json)
   */
  ManifestJson: 'application/manifest+json',

  /**
   * WebAssembly binary.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/wasm)
   */
  Wasm: 'application/wasm',

  /**
   * Protocol Buffers.
   */
  Protobuf: 'application/x-protobuf',

  /**
   * MessagePack.
   */
  MessagePack: 'application/msgpack',

  /**
   * BSON (Binary JSON).
   */
  Bson: 'application/bson',

  /**
   * CBOR (Concise Binary Object Representation).
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/cbor)
   */
  Cbor: 'application/cbor',

  /**
   * YAML content.
   */
  Yaml: 'application/x-yaml',

  /**
   * TOML content.
   */
  Toml: 'application/toml',

  /**
   * INI configuration files.
   */
  Ini: 'text/plain',

  /**
   * SQL scripts.
   */
  Sql: 'application/sql',

  /**
   * GeoJSON data.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/application/geo+json)
   */
  GeoJson: 'application/geo+json',

  /**
   * TopoJSON data.
   */
  TopoJson: 'application/topo+json',

  /**
   * MIME type for unknown content.
   */
  Unknown: 'application/octet-stream',
} as const;

type ApplicationMimeType =
  (typeof APPLICATION_MIME_TYPES)[keyof typeof APPLICATION_MIME_TYPES];

//////////////////
// IMAGE MIME TYPES
//////////////////

/**
 * Image content types.
 * @see https://www.iana.org/assignments/media-types/image
 */
const IMAGE_MIME_TYPES = {
  /**
   * JPEG images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/jpeg)
   */
  Jpeg: 'image/jpeg',

  /**
   * PNG images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/png)
   */
  Png: 'image/png',

  /**
   * GIF images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/gif)
   */
  Gif: 'image/gif',

  /**
   * WebP images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/webp)
   */
  Webp: 'image/webp',

  /**
   * SVG images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/svg+xml)
   */
  Svg: 'image/svg+xml',

  /**
   * ICO favicon images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/x-icon)
   */
  Ico: 'image/x-icon',

  /**
   * BMP images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/bmp)
   */
  Bmp: 'image/bmp',

  /**
   * TIFF images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/tiff)
   */
  Tiff: 'image/tiff',

  /**
   * AVIF images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/avif)
   */
  Avif: 'image/avif',

  /**
   * HEIC images.
   */
  Heic: 'image/heic',

  /**
   * HEIF images.
   */
  Heif: 'image/heif',

  /**
   * JPEG 2000 images.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/image/jp2)
   */
  Jp2: 'image/jp2',

  /**
   * JPEG XR images.
   */
  Jxr: 'image/jxr',

  /**
   * APNG images.
   */
  Apng: 'image/apng',

  /**
   * AV1 images.
   */
  Av1: 'image/av1',
} as const;

type ImageMimeType = (typeof IMAGE_MIME_TYPES)[keyof typeof IMAGE_MIME_TYPES];

//////////////////
// AUDIO MIME TYPES
//////////////////

/**
 * Audio content types.
 * @see https://www.iana.org/assignments/media-types/audio
 */
const AUDIO_MIME_TYPES = {
  /**
   * MP3 audio.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/audio/mpeg)
   */
  Mp3: 'audio/mpeg',

  /**
   * WAV audio.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/audio/wav)
   */
  Wav: 'audio/wav',

  /**
   * OGG audio.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/audio/ogg)
   */
  Ogg: 'audio/ogg',

  /**
   * FLAC audio.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/audio/flac)
   */
  Flac: 'audio/flac',

  /**
   * AAC audio.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/audio/aac)
   */
  Aac: 'audio/aac',

  /**
   * WebM audio.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/audio/webm)
   */
  Webm: 'audio/webm',

  /**
   * M4A audio.
   */
  M4a: 'audio/mp4',

  /**
   * Opus audio.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/audio/opus)
   */
  Opus: 'audio/opus',

  /**
   * MIDI audio.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/audio/midi)
   */
  Midi: 'audio/midi',

  /**
   * AIFF audio.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/audio/aiff)
   */
  Aiff: 'audio/aiff',
} as const;

type AudioMimeType = (typeof AUDIO_MIME_TYPES)[keyof typeof AUDIO_MIME_TYPES];

//////////////////
// VIDEO MIME TYPES
//////////////////

/**
 * Video content types.
 * @see https://www.iana.org/assignments/media-types/video
 */
const VIDEO_MIME_TYPES = {
  /**
   * MP4 video.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/video/mp4)
   */
  Mp4: 'video/mp4',

  /**
   * WebM video.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/video/webm)
   */
  Webm: 'video/webm',

  /**
   * OGG video.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/video/ogg)
   */
  Ogg: 'video/ogg',

  /**
   * AVI video.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/video/x-msvideo)
   */
  Avi: 'video/x-msvideo',

  /**
   * MOV video.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/video/quicktime)
   */
  Mov: 'video/quicktime',

  /**
   * WMV video.
   */
  Wmv: 'video/x-ms-wmv',

  /**
   * FLV video.
   */
  Flv: 'video/x-flv',

  /**
   * 3GP video.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/video/3gpp)
   */
  ThreeGp: 'video/3gpp',

  /**
   * MKV video.
   */
  Mkv: 'video/x-matroska',

  /**
   * M4V video.
   */
  M4v: 'video/x-m4v',

  /**
   * H.264 video.
   */
  H264: 'video/h264',

  /**
   * H.265 video.
   */
  H265: 'video/h265',

  /**
   * VP8 video.
   */
  Vp8: 'video/vp8',

  /**
   * VP9 video.
   */
  Vp9: 'video/vp9',

  /**
   * AV1 video.
   */
  Av1: 'video/av1',
} as const;

type VideoMimeType = (typeof VIDEO_MIME_TYPES)[keyof typeof VIDEO_MIME_TYPES];

//////////////////
// FONT MIME TYPES
//////////////////

/**
 * Font content types.
 * @see https://www.iana.org/assignments/media-types/font
 */
const FONT_MIME_TYPES = {
  /**
   * WOFF fonts.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/font/woff)
   */
  Woff: 'font/woff',

  /**
   * WOFF2 fonts.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/font/woff2)
   */
  Woff2: 'font/woff2',

  /**
   * TTF fonts.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/font/ttf)
   */
  Ttf: 'font/ttf',

  /**
   * OTF fonts.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/font/otf)
   */
  Otf: 'font/otf',

  /**
   * EOT fonts.
   */
  Eot: 'application/vnd.ms-fontobject',

  /**
   * Collection fonts.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/font/collection)
   */
  Collection: 'font/collection',
} as const;

type FontMimeType = (typeof FONT_MIME_TYPES)[keyof typeof FONT_MIME_TYPES];

//////////////////
// MODEL MIME TYPES
//////////////////

/**
 * 3D model content types.
 * @see https://www.iana.org/assignments/media-types/model
 */
const MODEL_MIME_TYPES = {
  /**
   * GLTF models.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/model/gltf+json)
   */
  Gltf: 'model/gltf+json',

  /**
   * GLB models.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/model/gltf-binary)
   */
  Glb: 'model/gltf-binary',

  /**
   * OBJ models.
   */
  Obj: 'text/plain',

  /**
   * STL models.
   */
  Stl: 'model/stl',

  /**
   * PLY models.
   */
  Ply: 'model/ply',

  /**
   * 3DS models.
   */
  ThreeDs: 'application/x-3ds',

  /**
   * FBX models.
   */
  Fbx: 'application/octet-stream',

  /**
   * DAE models.
   */
  Dae: 'model/vnd.collada+xml',
} as const;

type ModelMimeType = (typeof MODEL_MIME_TYPES)[keyof typeof MODEL_MIME_TYPES];

//////////////////
// MULTIPART MIME TYPES
//////////////////

/**
 * Multipart content types.
 * @see https://www.iana.org/assignments/media-types/multipart
 */
const MULTIPART_MIME_TYPES = {
  /**
   * Form data.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/form-data)
   */
  FormData: 'multipart/form-data',

  /**
   * Mixed content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/mixed)
   */
  Mixed: 'multipart/mixed',

  /**
   * Alternative content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/alternative)
   */
  Alternative: 'multipart/alternative',

  /**
   * Related content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/related)
   */
  Related: 'multipart/related',

  /**
   * Digest content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/digest)
   */
  Digest: 'multipart/digest',

  /**
   * Parallel content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/parallel)
   */
  Parallel: 'multipart/parallel',

  /**
   * Report content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/report)
   */
  Report: 'multipart/report',

  /**
   * Signed content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/signed)
   */
  Signed: 'multipart/signed',

  /**
   * Encrypted content.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/encrypted)
   */
  Encrypted: 'multipart/encrypted',

  /**
   * Byte ranges.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/multipart/byteranges)
   */
  ByteRanges: 'multipart/byteranges',
} as const;

type MultipartMimeType =
  (typeof MULTIPART_MIME_TYPES)[keyof typeof MULTIPART_MIME_TYPES];

//////////////////
// MESSAGE MIME TYPES
//////////////////

/**
 * Message content types.
 * @see https://www.iana.org/assignments/media-types/message
 */
const MESSAGE_MIME_TYPES = {
  /**
   * RFC 822 message.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/rfc822)
   */
  Rfc822: 'message/rfc822',

  /**
   * Partial message.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/partial)
   */
  Partial: 'message/partial',

  /**
   * External body message.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/external-body)
   */
  ExternalBody: 'message/external-body',

  /**
   * HTTP message.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/http)
   */
  Http: 'message/http',

  /**
   * Disposition notification.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/disposition-notification)
   */
  DispositionNotification: 'message/disposition-notification',

  /**
   * Global message.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/global)
   */
  Global: 'message/global',

  /**
   * Global delivery status.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/global-delivery-status)
   */
  GlobalDeliveryStatus: 'message/global-delivery-status',

  /**
   * Global disposition notification.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/global-disposition-notification)
   */
  GlobalDispositionNotification: 'message/global-disposition-notification',

  /**
   * Report message.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/report)
   */
  Report: 'message/report',

  /**
   * S-http message.
   *
   * [IANA Reference](https://www.iana.org/assignments/media-types/message/s-http)
   */
  SHttp: 'message/s-http',
} as const;

type MessageMimeType =
  (typeof MESSAGE_MIME_TYPES)[keyof typeof MESSAGE_MIME_TYPES];

/**
 * All MIME types organized by category.
 */
export const MIME_TYPES = {
  ...TEXT_MIME_TYPES,
  ...APPLICATION_MIME_TYPES,
  ...IMAGE_MIME_TYPES,
  ...AUDIO_MIME_TYPES,
  ...VIDEO_MIME_TYPES,
  ...FONT_MIME_TYPES,
  ...MODEL_MIME_TYPES,
  ...MULTIPART_MIME_TYPES,
  ...MESSAGE_MIME_TYPES,

  /**
   * Text-based MIME types.
   */
  Text: TEXT_MIME_TYPES,

  /**
   * Application-specific MIME types.
   */
  Application: APPLICATION_MIME_TYPES,

  /**
   * Image MIME types.
   */
  Image: IMAGE_MIME_TYPES,

  /**
   * Audio MIME types.
   */
  Audio: AUDIO_MIME_TYPES,

  /**
   * Video MIME types.
   */
  Video: VIDEO_MIME_TYPES,

  /**
   * Font MIME types.
   */
  Font: FONT_MIME_TYPES,

  /**
   * 3D model MIME types.
   */
  Model: MODEL_MIME_TYPES,

  /**
   * Multipart MIME types.
   */
  Multipart: MULTIPART_MIME_TYPES,

  /**
   * Message MIME types.
   */
  Message: MESSAGE_MIME_TYPES,
} as const;

/**
 * Union of all MIME type values.
 */
export type MimeType =
  | TextMimeType
  | ApplicationMimeType
  | ImageMimeType
  | AudioMimeType
  | VideoMimeType
  | FontMimeType
  | ModelMimeType
  | MultipartMimeType
  | MessageMimeType;

/**
 * A mapping from MIME type names to their string values.
 */
export type MimeTypeRecord = Partial<Record<MimeType, string>>;

/**
 * Text-based MIME type values.
 */
export type MimeTypeText = TextMimeType;

/**
 * Application-specific MIME type values.
 */
export type MimeTypeApplication = ApplicationMimeType;

/**
 * Image MIME type values.
 */
export type MimeTypeImage = ImageMimeType;

/**
 * Audio MIME type values.
 */
export type MimeTypeAudio = AudioMimeType;

/**
 * Video MIME type values.
 */
export type MimeTypeVideo = VideoMimeType;

/**
 * Font MIME type values.
 */
export type MimeTypeFont = FontMimeType;

/**
 * 3D model MIME type values.
 */
export type MimeTypeModel = ModelMimeType;

/**
 * Multipart MIME type values.
 */
export type MimeTypeMultipart = MultipartMimeType;

/**
 * Message MIME type values.
 */
export type MimeTypeMessage = MessageMimeType;

/**
 * Common MIME type groups for content negotiation.
 */
export const COMMON_MIME_GROUPS = {
  /**
   * Common text formats.
   */
  Text: [
    MIME_TYPES.Plain,
    MIME_TYPES.Html,
    MIME_TYPES.Css,
    MIME_TYPES.Javascript,
    MIME_TYPES.Json,
    MIME_TYPES.Xml,
    MIME_TYPES.Csv,
    MIME_TYPES.Markdown,
  ] as const,

  /**
   * Common image formats.
   */
  Image: [
    MIME_TYPES.Jpeg,
    MIME_TYPES.Png,
    MIME_TYPES.Gif,
    MIME_TYPES.Webp,
    MIME_TYPES.Svg,
    MIME_TYPES.Ico,
  ] as const,

  /**
   * Common audio formats.
   */
  Audio: [
    MIME_TYPES.Mp3,
    MIME_TYPES.Wav,
    MIME_TYPES.Ogg,
    MIME_TYPES.Flac,
    MIME_TYPES.Aac,
    MIME_TYPES.Webm,
  ] as const,

  /**
   * Common video formats.
   */
  Video: [
    MIME_TYPES.Mp4,
    MIME_TYPES.Webm,
    MIME_TYPES.Ogg,
    MIME_TYPES.Mov,
  ] as const,

  /**
   * Common document formats.
   */
  Document: [
    MIME_TYPES.Pdf,
    MIME_TYPES.Word,
    MIME_TYPES.Excel,
    MIME_TYPES.Powerpoint,
    MIME_TYPES.OpenDocumentText,
    MIME_TYPES.OpenDocumentSpreadsheet,
    MIME_TYPES.OpenDocumentPresentation,
  ] as const,

  /**
   * Common archive formats.
   */
  Archive: [
    MIME_TYPES.Zip,
    MIME_TYPES.Gzip,
    MIME_TYPES.Tar,
    MIME_TYPES.SevenZip,
    MIME_TYPES.Rar,
  ] as const,

  /**
   * Common font formats.
   */
  Font: [
    MIME_TYPES.Woff,
    MIME_TYPES.Woff2,
    MIME_TYPES.Ttf,
    MIME_TYPES.Otf,
  ] as const,

  /**
   * Common data formats.
   */
  Data: [
    MIME_TYPES.Json,
    MIME_TYPES.Xml,
    MIME_TYPES.Yaml,
    MIME_TYPES.Csv,
    MIME_TYPES.Protobuf,
    MIME_TYPES.MessagePack,
    MIME_TYPES.Bson,
    MIME_TYPES.Cbor,
  ] as const,
} as const;

/**
 * Utility functions for MIME type operations.
 */
export const MimeTypeUtils = {
  /**
   * Check if a MIME type is a text type.
   */
  isText: (mimeType: string): mimeType is TextMimeType => {
    return (
      mimeType.startsWith('text/') ||
      mimeType === MIME_TYPES.Json ||
      mimeType === MIME_TYPES.Xml ||
      mimeType === MIME_TYPES.Graphql ||
      mimeType === MIME_TYPES.GraphqlJson ||
      mimeType === MIME_TYPES.LdJson ||
      mimeType === MIME_TYPES.ManifestJson ||
      mimeType === MIME_TYPES.GeoJson ||
      mimeType === MIME_TYPES.TopoJson
    );
  },

  /**
   * Check if a MIME type is an image type.
   */
  isImage: (mimeType: string): mimeType is ImageMimeType => {
    return mimeType.startsWith('image/');
  },

  /**
   * Check if a MIME type is an audio type.
   */
  isAudio: (mimeType: string): mimeType is AudioMimeType => {
    return mimeType.startsWith('audio/');
  },

  /**
   * Check if a MIME type is a video type.
   */
  isVideo: (mimeType: string): mimeType is VideoMimeType => {
    return mimeType.startsWith('video/');
  },

  /**
   * Check if a MIME type is a font type.
   */
  isFont: (mimeType: string): mimeType is FontMimeType => {
    return mimeType.startsWith('font/') || mimeType === MIME_TYPES.Eot;
  },

  /**
   * Check if a MIME type is a model type.
   */
  isModel: (mimeType: string): mimeType is ModelMimeType => {
    return (
      mimeType.startsWith('model/') ||
      mimeType === MIME_TYPES.Obj ||
      mimeType === MIME_TYPES.ThreeDs ||
      mimeType === MIME_TYPES.Fbx
    );
  },

  /**
   * Check if a MIME type is a multipart type.
   */
  isMultipart: (mimeType: string): mimeType is MultipartMimeType => {
    return mimeType.startsWith('multipart/');
  },

  /**
   * Check if a MIME type is a message type.
   */
  isMessage: (mimeType: string): mimeType is MessageMimeType => {
    return mimeType.startsWith('message/');
  },

  /**
   * Get the file extension for a MIME type.
   */
  getExtension: (mimeType: string): string | undefined => {
    const extensionMap: Record<string, string> = {
      [MIME_TYPES.Plain]: 'txt',
      [MIME_TYPES.Html]: 'html',
      [MIME_TYPES.Css]: 'css',
      [MIME_TYPES.Javascript]: 'js',
      [MIME_TYPES.Typescript]: 'ts',
      [MIME_TYPES.Json]: 'json',
      [MIME_TYPES.Xml]: 'xml',
      [MIME_TYPES.Csv]: 'csv',
      [MIME_TYPES.Markdown]: 'md',
      [MIME_TYPES.Yaml]: 'yml',
      [MIME_TYPES.Toml]: 'toml',
      [MIME_TYPES.Pdf]: 'pdf',
      [MIME_TYPES.Zip]: 'zip',
      [MIME_TYPES.Gzip]: 'gz',
      [MIME_TYPES.Tar]: 'tar',
      [MIME_TYPES.SevenZip]: '7z',
      [MIME_TYPES.Rar]: 'rar',
      [MIME_TYPES.Word]: 'docx',
      [MIME_TYPES.Excel]: 'xlsx',
      [MIME_TYPES.Powerpoint]: 'pptx',
      [MIME_TYPES.OpenDocumentText]: 'odt',
      [MIME_TYPES.OpenDocumentSpreadsheet]: 'ods',
      [MIME_TYPES.OpenDocumentPresentation]: 'odp',
      [MIME_TYPES.Jpeg]: 'jpg',
      [MIME_TYPES.Png]: 'png',
      [MIME_TYPES.Gif]: 'gif',
      [MIME_TYPES.Webp]: 'webp',
      [MIME_TYPES.Svg]: 'svg',
      [MIME_TYPES.Ico]: 'ico',
      [MIME_TYPES.Bmp]: 'bmp',
      [MIME_TYPES.Tiff]: 'tiff',
      [MIME_TYPES.Avif]: 'avif',
      [MIME_TYPES.Mp3]: 'mp3',
      [MIME_TYPES.Wav]: 'wav',
      [MIME_TYPES.Ogg]: 'ogg',
      [MIME_TYPES.Flac]: 'flac',
      [MIME_TYPES.Aac]: 'aac',
      [MIME_TYPES.Webm]: 'webm',
      [MIME_TYPES.M4a]: 'm4a',
      [MIME_TYPES.Opus]: 'opus',
      [MIME_TYPES.Midi]: 'midi',
      [MIME_TYPES.Aiff]: 'aiff',
      [MIME_TYPES.Mp4]: 'mp4',
      [MIME_TYPES.Mov]: 'mov',
      [MIME_TYPES.Avi]: 'avi',
      [MIME_TYPES.Wmv]: 'wmv',
      [MIME_TYPES.Flv]: 'flv',
      [MIME_TYPES.ThreeGp]: '3gp',
      [MIME_TYPES.Mkv]: 'mkv',
      [MIME_TYPES.M4v]: 'm4v',
      [MIME_TYPES.Woff]: 'woff',
      [MIME_TYPES.Woff2]: 'woff2',
      [MIME_TYPES.Ttf]: 'ttf',
      [MIME_TYPES.Otf]: 'otf',
      [MIME_TYPES.Eot]: 'eot',
      [MIME_TYPES.Gltf]: 'gltf',
      [MIME_TYPES.Glb]: 'glb',
      [MIME_TYPES.Stl]: 'stl',
      [MIME_TYPES.Ply]: 'ply',
      [MIME_TYPES.ThreeDs]: '3ds',
      [MIME_TYPES.Fbx]: 'fbx',
      [MIME_TYPES.Dae]: 'dae',
    };

    return extensionMap[mimeType];
  },

  /**
   * Get the MIME type for a file extension.
   */
  fromExtension: (extension: string): MimeType | undefined => {
    const mimeTypeMap: Record<string, MimeType> = {
      txt: MIME_TYPES.Plain,
      html: MIME_TYPES.Html,
      htm: MIME_TYPES.Html,
      css: MIME_TYPES.Css,
      js: MIME_TYPES.Javascript,
      ts: MIME_TYPES.Typescript,
      json: MIME_TYPES.Json,
      xml: MIME_TYPES.Xml,
      csv: MIME_TYPES.Csv,
      md: MIME_TYPES.Markdown,
      yml: MIME_TYPES.Yaml,
      yaml: MIME_TYPES.Yaml,
      toml: MIME_TYPES.Toml,
      pdf: MIME_TYPES.Pdf,
      zip: MIME_TYPES.Zip,
      gz: MIME_TYPES.Gzip,
      tar: MIME_TYPES.Tar,
      '7z': MIME_TYPES.SevenZip,
      rar: MIME_TYPES.Rar,
      docx: MIME_TYPES.Word,
      xlsx: MIME_TYPES.Excel,
      pptx: MIME_TYPES.Powerpoint,
      odt: MIME_TYPES.OpenDocumentText,
      ods: MIME_TYPES.OpenDocumentSpreadsheet,
      odp: MIME_TYPES.OpenDocumentPresentation,
      jpg: MIME_TYPES.Jpeg,
      jpeg: MIME_TYPES.Jpeg,
      png: MIME_TYPES.Png,
      gif: MIME_TYPES.Gif,
      webp: MIME_TYPES.Webp,
      svg: MIME_TYPES.Svg,
      ico: MIME_TYPES.Ico,
      bmp: MIME_TYPES.Bmp,
      tiff: MIME_TYPES.Tiff,
      tif: MIME_TYPES.Tiff,
      avif: MIME_TYPES.Avif,
      mp3: MIME_TYPES.Mp3,
      wav: MIME_TYPES.Wav,
      ogg: MIME_TYPES.Ogg,
      flac: MIME_TYPES.Flac,
      aac: MIME_TYPES.Aac,
      m4a: MIME_TYPES.M4a,
      opus: MIME_TYPES.Opus,
      midi: MIME_TYPES.Midi,
      aiff: MIME_TYPES.Aiff,
      mp4: MIME_TYPES.Mp4,
      mov: MIME_TYPES.Mov,
      avi: MIME_TYPES.Avi,
      wmv: MIME_TYPES.Wmv,
      flv: MIME_TYPES.Flv,
      '3gp': MIME_TYPES.ThreeGp,
      mkv: MIME_TYPES.Mkv,
      m4v: MIME_TYPES.M4v,
      woff: MIME_TYPES.Woff,
      woff2: MIME_TYPES.Woff2,
      ttf: MIME_TYPES.Ttf,
      otf: MIME_TYPES.Otf,
      eot: MIME_TYPES.Eot,
      gltf: MIME_TYPES.Gltf,
      glb: MIME_TYPES.Glb,
      obj: MIME_TYPES.Obj,
      stl: MIME_TYPES.Stl,
      ply: MIME_TYPES.Ply,
      '3ds': MIME_TYPES.ThreeDs,
      fbx: MIME_TYPES.Fbx,
      dae: MIME_TYPES.Dae,
    };

    return mimeTypeMap[extension.toLowerCase()];
  },
} as const;
