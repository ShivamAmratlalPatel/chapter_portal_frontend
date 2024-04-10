FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /frontend
WORKDIR /frontend
RUN pnpm install
EXPOSE 3000
RUN pnpm build
CMD [ "pnpm", "start" ]