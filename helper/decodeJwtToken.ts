const decodeJwtToken = (token: string) => {
  const tokenParts = token.split(".");

  if (tokenParts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const encodedPayload = tokenParts[1];
  const decodedPayload = Buffer.from(encodedPayload, "base64").toString(
    "utf-8"
  );
  const parsedPayload = JSON.parse(decodedPayload);

  return parsedPayload;
};

export default decodeJwtToken;
