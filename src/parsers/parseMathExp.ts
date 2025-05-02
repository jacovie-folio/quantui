type Token = string;

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < expr.length) {
    const char = expr[i];

    if (/\s/.test(char)) {
      i++;
    } else if (/\d/.test(char)) {
      let num = '';
      while (i < expr.length && /[\d.]/.test(expr[i])) {
        num += expr[i++];
      }
      tokens.push(num);
    } else if ('+-*/()'.includes(char)) {
      tokens.push(char);
      i++;
    } else {
      throw new Error(`Unexpected character: ${char}`);
    }
  }

  return tokens;
}

function parse(tokens: Token[]): number {
  let i = 0;

  function parseExpression(): number {
    let value = parseTerm();

    while (i < tokens.length && (tokens[i] === '+' || tokens[i] === '-')) {
      const op = tokens[i++];
      const nextValue = parseTerm();
      value = op === '+' ? value + nextValue : value - nextValue;
    }

    return value;
  }

  function parseTerm(): number {
    let value = parseFactor();

    while (i < tokens.length && (tokens[i] === '*' || tokens[i] === '/')) {
      const op = tokens[i++];
      const nextValue = parseFactor();
      value = op === '*' ? value * nextValue : value / nextValue;
    }

    return value;
  }

  function parseFactor(): number {
    const token = tokens[i++];

    if (token === '(') {
      const value = parseExpression();
      if (tokens[i++] !== ')') throw new Error('Mismatched parentheses');
      return value;
    }

    const num = parseFloat(token);
    if (isNaN(num)) throw new Error(`Expected number but got ${token}`);
    return num;
  }

  const result = parseExpression();
  if (i < tokens.length) throw new Error('Unexpected tokens at end');
  return result;
}

export function parseMathExpression(expr: string): number {
  const tokens = tokenize(expr);
  return parse(tokens);
}
