import uuid from 'uuid';
import * as dynamodbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  // request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      createdAt: Date.now()
    }
  };

  try {
    await dynamodbLib.call('put', params);
    return success(params.Item);
  } catch (error) {
    console.log(error);
    return failure({ status: false });
  }
}