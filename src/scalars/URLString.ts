import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';

function isValidUrl(val: string) {
  try {
    // eslint-disable-next-line no-new
    new URL(val);
  } catch (_) {
    return false;
  }
  return true;
}

export const GraphQLURLString = /*#__PURE__*/ new GraphQLScalarType({
  name: 'URLString',

  description:
    'A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.',

  serialize(value) {
    if (isValidUrl(value)) {
      return value;
    }
    throw new Error(`Invalid URL: ${value}`);
  },

  parseValue: (value) => {
    if (isValidUrl(value)) {
      return value;
    }
    throw new Error(`Invalid URL: ${value}`);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as URLs but got a: ${ast.kind}`,
      );
    }
    if (!isValidUrl(ast.value)) {
      throw new Error(`Invalid URL: ${ast.value}`);
    }
    return ast.value.toString();
  },
});
