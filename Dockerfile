FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /frontend
WORKDIR /frontend

FROM base AS prod-deps
RUN pnpm install

FROM base
COPY --from=prod-deps /frontend/node_modules /frontend/node_modules
EXPOSE 3000
RUN pnpm build
CMD [ "pnpm", "start" ]