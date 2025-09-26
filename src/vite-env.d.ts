/// <reference types="vite/client" />

declare module '*.png' {
  const value: string;
  export default value;
}

/**
 * TypeScript declaration file for the @sutton-signwriting/core package.
 *
 * This file provides type definitions for parsing and stringifying
 * Formal SignWriting (FSW), SignWriting in Unicode (SWU), and custom
 * style strings used for rendering.
 *
 * @version 1.1.0 (Corrected Style Object)
 * @see https://www.sutton-signwriting.io/core/
 */

declare module '@sutton-signwriting/core' {
  /**
   * Type declarations for @sutton-signwriting/core 2.0.0
   *
   * Project: https://github.com/sutton-signwriting/core
   * Documentation: https://www.sutton-signwriting.io/core/
   *
   * This file is generated based on the official documentation.
   */

  //
  // Type Definitions
  //

  /**
   * The elements of a style string
   * @see https://www.sutton-signwriting.io/core/#styleobject
   */
  export interface StyleObject {
    /** boolean to use standardized colors for symbol groups */
    colorize?: boolean;
    /** integer value for padding around symbol or sign */
    padding?: number;
    /** css name or hex color for background */
    background?: string;
    /** array for css name or hex color for line and optional fill */
    detail?: string[];
    /** decimal value for zoom level */
    zoom?: number;
    /** custom colors for individual symbols */
    detailsym?: {
      /** symbol index in sign box */
      index: number;
      /** array for css name or hex color for line and optional fill */
      detail: string[];
    }[];
    /** list of class names separated with spaces used for SVG */
    classes?: string;
    /** id name used for SVG */
    id?: string;
  }

  /**
   * The elements of a symbol string
   * @see https://www.sutton-signwriting.io/core/#symbolobject
   */
  export interface SymbolObject {
    /** symbol identifier */
    symbol?: string;
    /** x,y coordinate */
    coord?: [number, number];
    /** style string */
    style?: string;
  }

  /**
   * The elements of a sign string
   * @see https://www.sutton-signwriting.io/core/#signobject
   */
  export interface SignObject {
    /** array of symbols */
    sequence?: string[];
    /** signbox marker or lane */
    box?: string;
    /** preprocessed x,y coordinate */
    max?: [number, number];
    /** array of symbols with coordinates */
    spatials?: {
      symbol: string;
      coord: [number, number];
    }[];
    /** style string */
    style?: string;
  }

  /**
   * Information about a sign or symbol segment
   * @see https://www.sutton-signwriting.io/core/#segmentinfo
   */
  export interface SegmentInfo {
    /** the min x value within the segment */
    minX: number;
    /** the min y value within the segment */
    minY: number;
    /** the width of the text segment */
    width: number;
    /** the height of the text segment */
    height: number;
    /** Left as -1, Middle as 0, Right as 1 */
    lane: number;
    /** the padding of the text segment affects colored background */
    padding: number;
    /** "sign" or "symbol" */
    segment: 'sign' | 'symbol';
    /** the zoom size of the segment */
    zoom: number;
  }

  /**
   * Options for column layout
   * @see https://www.sutton-signwriting.io/core/#columnoptions
   */
  export interface ColumnOptions {
    /** the height of the columns */
    height?: number;
    /** the widths of the columns */
    width?: number;
    /** the lane offset for left and right lanes */
    offset?: number;
    /** amount of padding before and after signs as well as at top, left, and right of columns */
    pad?: number;
    /** amount of space at bottom of column that is not available */
    margin?: number;
    /** enables variable width columns */
    dynamic?: boolean;
    /** background color for columns */
    background?: string;
    /** an object of style options */
    style?: StyleObject;
    /** an object of punctuation options */
    punctuation?: {
      /** enables special spacing for punctuation with no space above and custom space below */
      spacing?: boolean;
      /** the amount of spacing after a punctuation if punctuation spacing is enabled */
      pad?: number;
      /** prevents line breaks before punctuation by reducing spacing between signs in a column */
      pull?: boolean;
    };
  }

  /**
   * A segment of a column in a layout
   * @see https://www.sutton-signwriting.io/core/#columnsegment
   */
  export interface ColumnSegment {
    /** the x position in the column */
    x: number;
    /** the y position in the column */
    y: number;
    /** the min x value within the segment */
    minX: number;
    /** the min y value within the segment */
    minY: number;
    /** the width of the text segment */
    width: number;
    /** the height of the text segment */
    height: number;
    /** Left as -1, Middle as 0, Right as 1 */
    lane: number;
    /** the padding of the text segment affects colored background */
    padding: number;
    /** "sign" or "symbol" */
    segment: 'sign' | 'symbol';
    /** the text of the sign or symbol with optional style string */
    text: string;
    /** the zoom size of the segment */
    zoom: number;
  }

  /**
   * An array of column segments, representing a column.
   * @see https://www.sutton-signwriting.io/core/#columndata
   */
  export type ColumnData = ColumnSegment[];

  /**
   * A symbol definition in a query signbox
   * @see https://www.sutton-signwriting.io/core/#querysignboxsymbol
   */
  export interface QuerySignboxSymbol {
    /** a symbol */
    symbol: string;
    /** an optional coordinate */
    coord?: [number, number];
  }

  /**
   * A range definition in a query signbox
   * @see https://www.sutton-signwriting.io/core/#querysignboxrange
   */
  export interface QuerySignboxRange {
    /** an array of two symbols */
    range: [string, string];
    /** an optional coordinate */
    coord?: [number, number];
  }

  /**
   * An OR group definition in a query signbox
   * @see https://www.sutton-signwriting.io/core/#querysignboxor
   */
  export interface QuerySignboxOr {
    /** an array of symbol strings and range arrays */
    or: (string | [string, string])[];
    /** an optional coordinate */
    coord?: [number, number];
  }

  /**
   * Object of query elements with regular expression identification.
   * @see https://www.sutton-signwriting.io/core/#queryobject
   */
  export interface QueryObject {
    /** required true for query object */
    query: boolean;
    /** an object for prefix elements */
    prefix?: {
      /** true if sorting prefix is required */
      required: boolean;
      /** array of symbol strings, range arrays, and OR arrays of strings and range arrays */
      parts?: (string | [string, string] | (string | [string, string])[])[];
    };
    /** array of objects for symbols, ranges, and list of symbols or ranges, with optional coordinates */
    signbox?: (QuerySignboxSymbol | QuerySignboxRange | QuerySignboxOr)[];
    /** amount that x or y coordinates can vary and find a match, defaults to 20 */
    variance?: number;
    /** boolean value for including style string in matches */
    style?: boolean;
  }

  /**
   * A tokenizer object with encoding and decoding capabilities.
   * @see https://www.sutton-signwriting.io/core/#tokenizerobject
   */
  export interface TokenizerObject {
    /** Index to string mapping */
    i2s: { [key: number]: string };
    /** String to index mapping */
    s2i: { [key: string]: number };
    /** Total number of tokens */
    length: number;
    /** Returns array of all tokens */
    vocab(): string[];
    /** Encodes a string of SignWriting to token indices */
    encode(
      fsw: string,
      options?: { sequence?: boolean; sep?: string | null }
    ): number[];
    /** Decodes token indices to a string of SignWriting */
    decode(
      indices: number[],
      specialTokens?: { name: string; value: string }[]
    ): string;
    /** Encodes an array of token strings to token indices */
    encodeTokens(tokens: string[]): number[];
    /** Decodes an array of token indices to token strings */
    decodeTokens(indices: number[]): string[];
  }

  /**
   * An element of the default special tokens array.
   */
  export interface SpecialToken {
    index: number;
    name: string;
    value: string;
  }

  /**
   * Default special tokens configuration
   * @example
   * [
   *   { index: 0, name: 'UNK', value: '[UNK]' },
   *   { index: 1, name: 'PAD', value: '[PAD]' },
   *   { index: 2, name: 'CLS', value: '[CLS]' },
   *   { index: 3, name: 'SEP', value: '[SEP]' }
   * ]
   */
  export const DEFAULT_SPECIAL_TOKENS: SpecialToken[];

  //
  // FSW Module
  //

  /**
   * The fsw module contains functions for handling Formal SignWriting in ASCII (FSW) characters.
   * @see https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-formal-signwriting-in-ascii
   */
  export namespace fsw {
    /** Object of regular expressions for FSW strings */
    export const re: {
      /** the null symbol */
      null: string;
      /** a symbol */
      symbol: string;
      /** null or a symbol */
      nullorsymbol: string;
      /** the sorting marker */
      sort: string;
      /** a sorting marker followed by one or more symbols with nulls */
      prefix: string;
      /** a signbox marker */
      box: string;
      /** a coordinate */
      coord: string;
      /** a symbol followed by a coordinate */
      spatial: string;
      /** a signbox marker, max coordinate and zero or more spatial symbols */
      signbox: string;
      /** an optional prefix followed by a signbox */
      sign: string;
      /** a mandatory prefix followed by a signbox */
      sortable: string;
    };

    export namespace parse {
      /**
       * Function to parse an fsw symbol with optional coordinate and style string
       * @param fswSym an fsw symbol
       * @returns elements of fsw symbol
       * @example
       * fsw.parse.symbol('S10000500x500-C')
       *
       * return {
       *  'symbol': 'S10000',
       *  'coord': [500, 500],
       *  'style': '-C'
       * }
       */
      export function symbol(fswSym: string): SymbolObject;
      /**
       * Function to parse an fsw sign with style string
       * @param fswSign an fsw sign
       * @returns elements of fsw sign
       * @example
       * fsw.parse.sign('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-C')
       *
       * return {
       *  sequence: ['S10011', 'S10019', 'S2e704', 'S2e748'],
       *  box: 'M',
       *  max: [525, 535],
       *  spatials: [
       *    { symbol: 'S2e748', coord: [483, 510] },
       *    { symbol: 'S10011', coord: [501, 466] },
       *    { symbol: 'S2e704', coord: [510, 500] },
       *    { symbol: 'S10019', coord: [476, 475] }
       *  ],
       *  style: '-C'
       * }
       */
      export function sign(fswSign: string): SignObject;
      /**
       * Function to parse an fsw text
       * @param fswText an fsw text
       * @returns fsw signs and punctuations
       * @example
       * fsw.parse.text('AS14c20S27106M518x529S14c20481x471S27106503x489 AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468 S38800464x496')
       *
       * return [
       *  'AS14c20S27106M518x529S14c20481x471S27106503x489',
       *  'AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468',
       *  'S38800464x496'
       * ]
       */
      export function text(fswText: string): string[];
    }

    export namespace compose {
      /**
       * Function to compose an fsw symbol with optional coordinate and style string
       * @param fswSymObject an fsw symbol object
       * @returns an fsw symbol string
       * @example
       * fsw.compose.symbol({
       *  'symbol': 'S10000',
       *  'coord': [480, 480],
       *  'style': '-C'
       * })
       *
       * return 'S10000480x480-C'
       */
      export function symbol(fswSymObject: SymbolObject): string;
      /**
       * Function to compose an fsw sign with style string
       * @param fswSignObject an fsw symbol object
       * @returns an fsw sign string
       * @example
       * fsw.compose.sign({
       *  sequence: ['S10011', 'S10019', 'S2e704', 'S2e748'],
       *  box: 'M',
       *  max: [525, 535],
       *  spatials: [
       *    { symbol: 'S2e748', coord: [483, 510] },
       *    { symbol: 'S10011', coord: [501, 466] },
       *    { symbol: 'S2e704', coord: [510, 500] },
       *    { symbol: 'S10019', coord: [476, 475] }
       *  ],
       *  style: '-C'
       * })
       *
       * return 'AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-C'
       */
      export function sign(fswSignObject: SignObject): string;
    }

    /**
     * Function to gather sizing information about an fsw sign or symbol
     * @param fsw an fsw sign or symbol
     * @returns information about the fsw string
     * @example
     * fsw.info('AS14c20S27106L518x529S14c20481x471S27106503x489-P10Z2')
     *
     * return {
     *   minX: 481,
     *   minY: 471,
     *   width: 37,
     *   height: 58,
     *   lane: -1,
     *   padding: 10,
     *   segment: 'sign',
     *   zoom: 2
     * }
     */
    export function info(fsw: string): SegmentInfo;

    /**
     * Function to an object of column options with default values
     * @param options object of column options
     * @returns object of column options merged with column defaults
     */
    export function columnDefaultsMerge(options: ColumnOptions): ColumnOptions;

    /**
     * Function to transform an FSW text to an array of columns
     * @param fswText FSW text of signs and punctuation
     * @param options object of column options
     * @returns object of column options, widths array, and column data
     */
    export function columns(
      fswText: string,
      options: ColumnOptions
    ): {
      options: ColumnOptions;
      widths: number[];
      columns: ColumnData;
    };

    /** Array of numbers for kinds of symbols: writing, location, and punctuation. */
    export const kind: number[];

    /** Array of numbers for categories of symbols: hand, movement, dynamics, head, trunk & limb, location, and punctuation. */
    export const category: number[];

    /** Array of numbers for the 30 symbol groups. */
    export const group: number[];

    /** Object of symbol ranges with starting and ending numbers. */
    export const ranges: {
      all: { start: number; end: number };
      writing: { start: number; end: number };
      hand: { start: number; end: number };
      movement: { start: number; end: number };
      dynamic: { start: number; end: number };
      head: { start: number; end: number };
      hcenter: { start: number; end: number };
      vcenter: { start: number; end: number };
      trunk: { start: number; end: number };
      limb: { start: number; end: number };
      location: { start: number; end: number };
      punctuation: { start: number; end: number };
    };

    /**
     * Function to test if symbol is of a certain type.
     * @param key an FSW symbol key
     * @param type the name of a symbol range
     * @returns is symbol of specified type
     * @example
     * fsw.isType('S10000', 'hand')
     *
     * return true
     */
    export function isType(key: string, type: string): boolean;

    /** Array of colors associated with the seven symbol categories. */
    export const colors: string[];

    /**
     * Function that returns the standardized color for a symbol.
     * @param key an FSW symbol key
     * @returns name of standardized color for symbol
     * @example
     * fsw.colorize('S10000')
     *
     * return '#0000CC'
     */
    export function colorize(key: string): string;

    /**
     * Tokenizes an FSW string into an array of tokens
     * @param fsw FSW string to tokenize
     * @param options Tokenization options
     * @param options.sequence Whether to include sequence tokens (default: true)
     * @param options.signbox Whether to include signbox tokens (default: true)
     * @param options.sep Separator token (default: "[SEP]")
     * @returns Array of tokens
     * @example
     * fsw.tokenize("AS10e00M507x515S10e00492x485",{sequence:false,sep:null})
     *
     * return [
     *   'M', 'p507', 'p515','S10e', 'c0', 'r0', 'p492', 'p485'
     * ]
     */
    export function tokenize(
      fsw: string,
      options?: { sequence?: boolean; signbox?: boolean; sep?: string | null }
    ): string[];

    /**
     * Converts an array of tokens back into an FSW string
     * @param tokens Array of tokens to convert
     * @param specialTokens Array of special token objects to filter out
     * @returns FSW string
     * @example
     * fsw.detokenize(['M', 'p507', 'p515','S10e', 'c0', 'r0', 'p492', 'p485'])
     *
     * return "M507x515S10e00492x485"
     */
    export function detokenize(
      tokens: string[],
      specialTokens?: SpecialToken[]
    ): string;

    /**
     * Creates a tokenizer object with encoding and decoding capabilities
     * @param specialTokens Special tokens mapping object
     * @param startingIndex Starting index for regular tokens
     * @returns Tokenizer object
     * @example
     * const t = fsw.createTokenizer()
     * t.encode('M507x515S10e00492x485')
     *
     * return [7, 941, 949,  24, 678, 662, 926, 919, 3]
     */
    export function createTokenizer(
      specialTokens?: SpecialToken[],
      startingIndex?: number
    ): TokenizerObject;

    /**
     * Splits tokens into chunks of specified size while preserving sign boundaries
     * @param tokens Array of tokens to chunk
     * @param chunkSize Maximum size of each chunk
     * @param options Chunking options
     * @param options.cls CLS token (default: "[CLS]")
     * @param options.sep SEP token (default: "[SEP]")
     * @param options.pad PAD token (default: "[PAD]")
     */
    export function chunkTokens(
      tokens: string[],
      chunkSize: number,
      options?: { cls?: string; sep?: string; pad?: string }
    ): string[][];
  }

  //
  // FSW Query Module
  //

  /**
   * The fswquery module contains functions for handling the FSW query language.
   * @see https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-query-language
   */
  export namespace fswquery {
    /** Object of regular expressions for FSW query strings */
    export const re: {
      null: string;
      base: string;
      coord: string;
      var: string;
      symbol: string;
      nullorsymbol: string;
      range: string;
      item: string;
      list: string;
      prefix: string;
      signbox: string;
      full: string;
    };

    /**
     * Function to parse FSW query string to object
     * @param fswQueryString an FSW query string
     * @returns elements of a of query string identified by regular expression
     */
    export function parse(fswQueryString: string): QueryObject;

    /**
     * Function to compose FSW query string from object
     * @param fswQueryObject an object of query options
     * @returns FSW query string
     */
    export function compose(fswQueryObject: QueryObject): string;

    /**
     * Function to convert an FSW sign to a query string
     * For the flags parameter, use one or more of the following.
     * - A: exact symbol in temporal prefix
     * - a: general symbol in temporal prefix
     * - S: exact symbol in spatial signbox
     * - s: general symbol in spatial signbox
     * - L: spatial signbox symbol at location
     * @param fswSign FSW sign
     * @param flags flags for query string creation
     * @returns FSW query string
     */
    export function fsw2query(fswSign: string, flags: string): string;

    /**
     * Function to transform a range to a regular expression
     * @param min either a decimal number or hexidecimal string
     * @param max either a decimal number or hexidecimal string
     * @param hex if true, the regular expression will match a hexidecimal range
     * @returns a regular expression that matches a range
     */
    export function range(
      min: number | string,
      max: number | string,
      hex?: boolean
    ): string;

    /**
     * Function to transform an FSW query string to one or more regular expressions
     * @param query an FSW query string
     * @returns an array of one or more regular expressions
     */
    export function regex(query: string): string[];

    /**
     * Function that uses a query string to match signs from a string of text.
     * @param query an FSW query string
     * @param text a string of text containing multiple signs
     * @returns an array of FSW signs
     */
    export function results(query: string, text: string): string[];

    /**
     * Function that uses an FSW query string to match signs from multiple lines of text.
     * @param query an FSW query string
     * @param text multiple lines of text, each starting with an FSW sign
     * @returns an array of lines of text, each starting with an FSW sign
     */
    export function lines(query: string, text: string): string[];
  }

  //
  // SWU Module
  //

  /**
   * The swu module contains functions for handling SignWriting in Unicode (SWU) characters.
   * @see https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-signwriting-in-unicode-swu
   */
  export namespace swu {
    /**
     * Function to encode SWU characters using the UTF-16 escape format.
     * @param swu SWU characters
     * @returns UTF-16 escape format
     */
    export function encode(swu: string): string;

    /**
     * Function to decode UTF-16 escape format to SWU characters.
     * @param encoded UTF-16 escape format
     * @returns SWU characters
     */
    export function decode(encoded: string): string;

    /**
     * Function to decompose an SWU character into UTF-16 surrogate pairs.
     * @param swuChar an SWU character
     * @returns an array of UTF-16 surrogate pairs
     */
    export function pair(swuChar: string): [string, string];

    /** Object of regular expressions for SWU strings in UTF-16 */
    export const re: {
      null: string;
      symbol: string;
      nullorsymbol: string;
      sort: string;
      prefix: string;
      box: string;
      coord: string;
      spatial: string;
      signbox: string;
      sign: string;
      sortable: string;
    };

    export namespace parse {
      /**
       * Function to parse an swu symbol with optional coordinate and style string
       * @param swuSym an swu symbol
       * @returns elements of swu symbol
       */
      export function symbol(swuSym: string): SymbolObject;
      /**
       * Function to parse an swu sign with style string
       * @param swuSign an swu sign
       * @returns elements of swu sign
       */
      export function sign(swuSign: string): SignObject;
      /**
       * Function to parse an swu text
       * @param swuText an swu text
       * @returns swu signs and punctuations
       */
      export function text(swuText: string): string[];
    }

    export namespace compose {
      /**
       * Function to compose an swu symbol with optional coordinate and style string
       * @param swuSymObject an swu symbol object
       * @returns an swu symbol string
       */
      export function symbol(swuSymObject: SymbolObject): string;
      /**
       * Function to compose an swu sign with style string
       * @param swuSignObject an swu sign object
       * @returns an swu sign string
       */
      export function sign(swuSignObject: SignObject): string;
    }

    /**
     * Function to gather sizing information about an swu sign or symbol
     * @param swu an swu sign or symbol
     * @returns information about the swu string
     */
    export function info(swu: string): SegmentInfo;

    /**
     * Function to an object of column options with default values
     * @param options object of column options
     * @returns object of column options merged with column defaults
     */
    export function columnDefaultsMerge(options: ColumnOptions): ColumnOptions;

    /**
     * Function to transform an SWU text to an array of columns
     * @param swuText SWU text of signs and punctuation
     * @param options object of column options
     * @returns object of column options, widths array, and column data
     */
    export function columns(
      swuText: string,
      options: ColumnOptions
    ): {
      options: ColumnOptions;
      widths: number[];
      columns: ColumnData;
    };

    /** Array of plane 4 code points for kinds of symbols: writing, location, and punctuation. */
    export const kind: string[];

    /** Array of plane 4 code points for categories of symbols: hand, movement, dynamics, head, trunk & limb, location, and punctuation. */
    export const category: string[];

    /** Array of plane 4 code points for the 30 symbol groups. */
    export const group: string[];

    /** Object of symbol ranges with starting and ending code points on plane 4. */
    export const ranges: {
      all: { start: number; end: number };
      writing: { start: number; end: number };
      hand: { start: number; end: number };
      movement: { start: number; end: number };
      dynamic: { start: number; end: number };
      head: { start: number; end: number };
      hcenter: { start: number; end: number };
      vcenter: { start: number; end: number };
      trunk: { start: number; end: number };
      limb: { start: number; end: number };
      location: { start: number; end: number };
      punctuation: { start: number; end: number };
    };

    /**
     * Function to test if symbol is of a certain type.
     * @param swuSym an SWU symbol character
     * @param type the name of a symbol range
     * @returns is symbol of specified type
     */
    export function isType(swuSym: string, type: string): boolean;

    /** Array of colors associated with the seven symbol categories. */
    export const colors: string[];

    /**
     * Function that returns the standardized color for a symbol.
     * @param swuSym an SWU symbol character
     * @returns name of standardized color for symbol
     */
    export function colorize(swuSym: string): string;
  }

  //
  // SWU Query Module
  //

  /**
   * The swuquery module contains functions for handling the SWU query language.
   * @see https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-query-language
   */
  export namespace swuquery {
    /** Object of regular expressions for SWU query strings */
    export const re: {
      null: string;
      base: string;
      coord: string;
      var: string;
      symbol: string;
      nullorsymbol: string;
      range: string;
      item: string;
      list: string;
      prefix: string;
      signbox: string;
      full: string;
    };

    /**
     * Function to parse SWU query string to object
     * @param swuQueryString an SWU query string
     * @returns elements of an SWU query string
     */
    export function parse(swuQueryString: string): QueryObject;

    /**
     * Function to compose SWU query string from object
     * @param swuQueryObject an object of query options
     * @returns SWU query string
     */
    export function compose(swuQueryObject: QueryObject): string;

    /**
     * Function to convert an SWU sign to a query string
     * For the flags parameter, use one or more of the following.
     * - A: exact symbol in temporal prefix
     * - a: general symbol in temporal prefix
     * - S: exact symbol in spatial signbox
     * - s: general symbol in spatial signbox
     * - L: spatial signbox symbol at location
     * @param swuSign SWU sign
     * @param flags flags for query string creation
     * @returns SWU query string
     */
    export function swu2query(swuSign: string, flags: string): string;

    /**
     * Function to transform a range of SWU characters to a regular expression
     * @param min an SWU character
     * @param max an SWU character
     * @returns a regular expression that matches a range of SWU characters
     */
    export function range(min: string, max: string): string;

    /**
     * Function to transform an SWU symbol with fill and rotation flags to a regular expression
     * @param symbolFR an SWU character with optional flags of 'f' for any fill and 'r' for any rotation
     * @returns a regular expression that matches one or more ranges of SWU symbols
     */
    export function symbolRanges(symbolFR: string): string;

    /**
     * Function to transform an SWU query string to one or more regular expressions
     * @param query an SWU query string
     * @returns an array of one or more regular expressions
     */
    export function regex(query: string): string[];

    /**
     * Function that uses a query string to match signs from a string of text.
     * @param query an SWU query string
     * @param text a string of text containing multiple signs
     * @returns an array of SWU signs
     */
    export function results(query: string, text: string): string[];

    /**
     * Function that uses an SWU query string to match signs from multiple lines of text.
     * @param query an SWU query string
     * @param text multiple lines of text, each starting with an SWU sign
     * @returns an array of lines of text, each starting with an SWU sign
     */
    export function lines(query: string, text: string): string[];
  }

  //
  // Style Module
  //

  /**
   * The style module contains regular expressions and functions for parsing and composing style strings.
   * @see https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-styling-string
   */
  export namespace style {
    /** Object of regular expressions for style strings */
    export const re: {
      colorize: string;
      colorhex: string;
      colorname: string;
      padding: string;
      zoom: string;
      classbase: string;
      id: string;
      colorbase: string;
      color: string;
      colors: string;
      background: string;
      detail: string;
      detailsym: string;
      classes: string;
      full: string;
    };

    /**
     * Function to parse style string to object
     * @param styleString a style string
     * @returns elements of style string
     */
    export function parse(styleString: string): StyleObject;

    /**
     * Function to compose style string from object
     * @param styleObject an object of style options
     * @returns style string
     */
    export function compose(styleObject: StyleObject): string;

    /**
     * Function to merge style objects
     * @param style1 a style object
     * @param style2 a style object
     * @returns a style object
     */
    export function merge(
      style1: StyleObject,
      style2: StyleObject
    ): StyleObject;

    /**
     * Function to convert rgb color to hex or "transparent" if below tolerance
     * @param rgb an rgb color
     * @param tolerance max alpha for full transparency (default: 0)
     * @returns a hex color or "transparent"
     */
    export function rgb2hex(rgb: string, tolerance?: number): string;

    /**
     * Function to merge color with background based on alpha transparency
     * @param color an rgba color
     * @param background an rgba background color
     * @returns a hex color or "transparent"
     */
    export function rgba2hex(color: string, background: string): string;
  }

  //
  // Convert Module
  //

  /**
   * The convert module contains functions to convert between Formal SignWriitng in ASCII (FSW) and SignWriting in Unicode (SWU) characters, along with other types of data.
   * @see https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-characters
   */
  export namespace convert {
    /**
     * Function to convert an SWU structural marker to FSW equivalent
     * @param swuMark character for SWU structural marker
     * @returns FSW structural marker
     */
    export function swu2mark(swuMark: string): string;

    /**
     * Function to convert an FSW structural marker to SWU equivalent
     * @param fswMark character for FSW structural marker
     * @returns SWU structural marker
     */
    export function mark2swu(fswMark: string): string;

    /**
     * Function to convert an SWU number character to an integer
     * @param swuNum SWU number character
     * @returns Integer value for number
     */
    export function swu2num(swuNum: string): number;

    /**
     * Function to convert a number to an SWU number character
     * @param num Integer value for number
     * @returns SWU number character
     */
    export function num2swu(num: number): string;

    /**
     * Function to convert two SWU number characters to an array of x,y integers
     * @param swuCoord Two SWU number character
     * @returns Array of x,y integers
     */
    export function swu2coord(swuCoord: string): [number, number];

    /**
     * Function to convert an array of x,y integers to two SWU number characters
     * @param coord Array of x,y integers
     * @returns Two SWU number character
     */
    export function coord2swu(coord: [number, number]): string;

    /**
     * Function to convert an FSW coordinate string to an array of x,y integers
     * @param fswCoord An FSW coordinate string
     * @returns Array of x,y integers
     */
    export function fsw2coord(fswCoord: string): [number, number];

    /**
     * Function to convert an array of x,y integers to an FSW coordinate string
     * @param coord Array of x,y integers
     * @returns An FSW coordinate string
     */
    export function coord2fsw(coord: [number, number]): string;

    /**
     * Function to convert an SWU symbol character to a code point on plane 4
     * @param swuSym SWU symbol character
     * @returns Code point on plane 4
     */
    export function swu2code(swuSym: string): number;

    /**
     * Function to convert a code point on plane 4 to an SWU symbol character
     * @param code Code point on plane 4
     * @returns SWU symbol character
     */
    export function code2swu(code: number): string;

    /**
     * Function to convert an SWU symbol character to a 16-bit ID
     * @param swuSym SWU symbol character
     * @returns 16-bit ID
     */
    export function swu2id(swuSym: string): number;

    /**
     * Function to convert a 16-bit ID to an SWU symbol character
     * @param id 16-bit ID
     * @returns SWU symbol character
     */
    export function id2swu(id: number): string;

    /**
     * Function to convert an FSW symbol key to a 16-bit ID
     * @param key FSW symbol key
     * @returns 16-bit ID
     */
    export function key2id(key: string): number;

    /**
     * Function to convert a 16-bit ID to an FSW symbol key
     * @param id 16-bit ID
     * @returns FSW symbol key
     */
    export function id2key(id: number): string;

    /**
     * Function to convert an SWU symbol character to an FSW symbol key
     * @param swuSym SWU symbol character
     * @returns FSW symbol key
     */
    export function swu2key(swuSym: string): string;

    /**
     * Function to convert an FSW symbol key to an SWU symbol character
     * @param key FSW symbol key
     * @returns SWU symbol character
     */
    export function key2swu(key: string): string;

    /**
     * Function to convert SWU text to FSW text
     * @param swuText SWU text
     * @returns FSW text
     */
    export function swu2fsw(swuText: string): string;

    /**
     * Function to convert FSW text to SWU text
     * @param fswText FSW text
     * @returns SWU text
     */
    export function fsw2swu(fswText: string): string;

    /** An array of symbol IDs in minimized format such as "101011" */
    export const symidArr: string[];

    /**
     * Function to convert base or full symid Min to symid Max
     * @param symidMin Symbol ID minimized
     * @returns Symbol ID maximized
     */
    export function symidMax(symidMin: string): string;

    /**
     * Function to convert base or full symid Max to symid Min
     * @param symidMax Symbol ID maximized
     * @returns Symbol ID minimized
     */
    export function symidMin(symidMax: string): string;

    /**
     * Function to convert base or full symid to key
     * @param symid Symbol ID
     * @returns Symbol key
     */
    export function symid2key(symid: string): string;

    /**
     * Function to convert base or full key to symid
     * @param key Symbol key
     * @returns Symbol ID
     */
    export function key2symid(key: string): string;
  }
}
