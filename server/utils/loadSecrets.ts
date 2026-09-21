import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import dotenv from 'dotenv';
import path from 'path';

export async function loadEnvironment(): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Local development: load from .env file
    const __dirname = path.resolve();
    dotenv.config({ path: path.join(__dirname, '.env') });
    console.log('Loaded environment variables from local .env');
    return;
  }

  // Production: fetch from AWS Secrets Manager
  const secretName = process.env.AWS_SECRET_ID || 'prod/plottrade/mern';
  const region = process.env.AWS_REGION || 'us-east-1';

  const client = new SecretsManagerClient({ region });

  try {
    const response = await client.send(
      new GetSecretValueCommand({ SecretId: secretName })
    );

    if (!response.SecretString) {
      throw new Error(`Secret ${secretName} has no string value.`);
    }

    const secrets = JSON.parse(response.SecretString) as Record<string, string>;

    // Inject into process.env so the rest of your app reads them transparently
    for (const [key, value] of Object.entries(secrets)) {
      process.env[key] = value;
    }

    console.log('Successfully fetched and mounted secrets from AWS Secrets Manager.');
  } catch (error) {
    console.error('Failed to retrieve secrets from AWS Secrets Manager:', error);
    process.exit(1);
  }
}