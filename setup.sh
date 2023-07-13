# Build client
cd ./client
npm ci
npm run build

# Build server
cd ../server
rm -f database.sqlite
npm ci
./typeorm.sh -d ./src/data-source.ts migration:run
npm run start seeds
npm run start setup
npm run build