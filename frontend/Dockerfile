# Node.js 20을 사용하여 프론트엔드 빌드
FROM node:20 as build

# 작업 디렉토리 생성
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# serve 패키지 설치 (정적 파일을 서빙하기 위한 패키지)
RUN npm install -g serve

# 빌드된 파일을 서빙하기 위한 포트 노출
EXPOSE 4000

CMD ["serve", "-s", "build", "-l", "4000"]
