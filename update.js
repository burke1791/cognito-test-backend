import * as dynamodbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: 'SET content = :content',
    ExpressionAttributeValues: {
      ':content': data.content || null
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    await dynamodbLib.call('update', params);
    return success({ status: true });
  } catch (error) {
    console.log(error);
    return failure({ status: false });
  }
}