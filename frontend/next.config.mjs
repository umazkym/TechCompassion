import dotenv from 'dotenv';
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_ENDPOINT: process.env.API_ENDPOINT,
      }
}