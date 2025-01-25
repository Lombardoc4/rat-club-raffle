export type AmplifyDependentResourcesAttributes = {
  api: {
    ratclubraffle: {
      GraphQLAPIEndpointOutput: 'string';
      GraphQLAPIIdOutput: 'string';
      GraphQLAPIKeyOutput: 'string';
    };
  };
  auth: {
    ratclubraffle: {
      AppClientID: 'string';
      AppClientIDWeb: 'string';
      IdentityPoolId: 'string';
      IdentityPoolName: 'string';
      UserPoolArn: 'string';
      UserPoolId: 'string';
      UserPoolName: 'string';
    };
  };
  storage: {
    s3ratclubraffleimages: {
      BucketName: 'string';
      Region: 'string';
    };
  };
};
