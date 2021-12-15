const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = process.env.dynamodb_table_name;

  const content = event["detail"]["content"];
  const item = content["values"];
  const options = content["options"];

  const params = Object.assign(
    {
      TableName: table,
      Item: item,
    },
    options
  );

  try {
    const res = await docClient.put(params).promise();
    return { body: "Successfully put item" };
  } catch (e) {
    console.log("err", e);
    return { error: e };
  }
};
