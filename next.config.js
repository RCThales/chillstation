/** @type {import('next').NextConfig} */
const nextConfig = {

    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'chillstation.s3.amazonaws.com',
              pathname: '**',
            },
          ],
    }
}

module.exports = nextConfig
