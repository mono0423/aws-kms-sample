const AWS = require("aws-sdk");
const kms = new AWS.KMS();

exports.handler = async event => {
  var params = {
    KeyId: process.env.KEY_ID,
    KeySpec: "AES_256"
  };
  const key = await kms.generateDataKey(params).promise();
  console.log("key.Plaintext", key.Plaintext.toString("hex"));

  var params2 = {
    CiphertextBlob: key.CiphertextBlob
  };
  const decrypted = await kms.decrypt(params2).promise();
  console.log("decrypted.Plaintext", decrypted.Plaintext.toString("hex"));

  console.log("\n----------------------------------------------------------------------");
  console.log("key.CiphertextBlob", key.CiphertextBlob.toString("hex"));
  console.log("key.CiphertextBlob(raw)", key.CiphertextBlob);

  const buf = Buffer.from(key.CiphertextBlob.toString("hex"), "hex");
  console.log("buf", buf);

  var params3 = {
    CiphertextBlob: buf
  };
  const rawDataKey = await kms.decrypt(params3).promise();
  console.log("decrypted.Plaintext", rawDataKey.Plaintext.toString("hex"));
};
