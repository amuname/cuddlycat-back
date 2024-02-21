# Base image
FROM node:20.9.0

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./back.tar.gz .

# Unpack archive
RUN tar -xzf back.tar.gz

# Install app dependencies
RUN npm install

# Generate @prisma/client
RUN npx prisma generate

# ENVs
ENV NODE_ENV=production
ENV JWT_SECRET=kruygni7ygqcmlo4wuamly4
ENV DATABASE_URL=postgresql://dev321:Sense9y9@localhost:5432/cuddly_cat?schema=cuddly_cat
# ENV DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/cuddly_cat?schema=cuddly_cat

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/main" ]
