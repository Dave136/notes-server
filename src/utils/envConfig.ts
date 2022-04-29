export default async function () {
  if (process.env.NODE_ENV !== 'development') return;

  const dotenv = await import('dotenv');
  const result = dotenv.config();

  if (result.error) {
    throw new Error('Error! Failed to read ".env" file');
  }

  console.info('Loading environment variables...');
}
