# Server Configuration

NODE_ENV=development
PORT=8888
API_URL=http://localhost:8888

# Database Configuration

DB_HOST=localhost
DB_PORT=5432
DB_NAME=websitebanhangmini
DB_USER=postgres
DB_PASSWORD=your_database_password
CORS_ORIGIN=\*
DB_SYNC=false

# JWT Configuration

JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_FROM=noreply@shopmini.com
FRONTEND_URL=http://localhost:5175
EMAIL_FROM_NAME=shopmini

# Redis Configuration

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Stripe Configuration

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Gemini AI Configuration

GEMINI_API_KEY=your_gemini_api_key

# File Upload

UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880 # 5MB
