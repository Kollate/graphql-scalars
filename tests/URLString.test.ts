/* global describe, test, expect */

import { Kind } from 'graphql/language';

import { GraphQLURLString } from '../src/scalars/URLString';

/*
 * these test cases are picked up from https://mathiasbynens.be/demo/url-regex
 */

describe('URLString', () => {
  describe('valid - localhost', () => {
    test('serialize', () => {
      expect(GraphQLURLString.serialize('http://localhost')).toEqual(
        'http://localhost',
      );
    });

    test('parseValue', () => {
      expect(GraphQLURLString.parseValue('http://localhost/')).toEqual(
        'http://localhost/',
      );
    });

    test('parseLiteral', () => {
      expect(
        GraphQLURLString.parseLiteral(
          { value: 'http://localhost/', kind: Kind.STRING },
          {},
        ),
      ).toEqual('http://localhost/');
    });
  });

  describe('valid - localhost with port', () => {
    test('serialize', () => {
      expect(GraphQLURLString.serialize('http://localhost:3000/')).toEqual(
        'http://localhost:3000/',
      );
    });

    test('parseValue', () => {
      expect(GraphQLURLString.parseValue('http://localhost:3000/')).toEqual(
        'http://localhost:3000/',
      );
    });

    test('parseLiteral', () => {
      expect(
        GraphQLURLString.parseLiteral(
          { value: 'http://localhost:3000/', kind: Kind.STRING },
          {},
        ),
      ).toEqual('http://localhost:3000/');
    });
  });

  describe('invalid', () => {
    describe('not a URL', () => {
      expect(() => GraphQLURLString.serialize('invalidurlexample')).toThrow(
        'Invalid URL: invalidurlexample',
      );
    });

    test(`parseValue invalidurlexample`, () => {
      expect(() => GraphQLURLString.parseValue('invalidurlexample')).toThrow(
        'Invalid URL: invalidurlexample',
      );
    });

    test(`parseLiteral invalidurlexample`, () => {
      expect(() =>
        GraphQLURLString.parseLiteral(
          { value: 'invalidurlexample', kind: Kind.STRING },
          {},
        ),
      ).toThrow('Invalid URL: invalidurlexample');
    });
  });

  describe('not a string', () => {
    test('serialize', () => {
      expect(() => GraphQLURLString.serialize(123)).toThrow();
    });

    test('parseValue', () => {
      expect(() => GraphQLURLString.parseValue(123)).toThrow();
    });

    test('parseLiteral', () => {
      expect(() =>
        GraphQLURLString.parseLiteral({ value: '123', kind: Kind.INT }, {}),
      ).toThrow();
    });
  });
});
